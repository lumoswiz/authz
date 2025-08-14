import { Effect, Layer } from "effect"
import { isAddressEqual } from "viem"
import { ViemClient } from "../../client/service.js"
import { SafeService } from "../../safe/service.js"
import { isContractDeployedFx } from "../../shared/utils.js"
import type { DeployedSafeContext, PredictedSafeContext, ResolvedSafeContext } from "../types.js"
import type { SetupContextError } from "./errors.js"
import {
  CalculateSafeAddressError,
  CheckDeploymentError,
  Create2MismatchError,
  GetOwnersError,
  InvalidSafeOwnershipError,
  MissingSaltNonceError
} from "./errors.js"
import { ContextService } from "./service.js"
import type { ResolveArgs } from "./types.js"
import { OneOfOneOwnership } from "./utils.js"

export const ContextServiceLive = Layer.effect(
  ContextService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient
    const safeSvc = yield* SafeService

    const resolve = (
      { maybeSaltNonce, owner, policy, safe }: ResolveArgs
    ): Effect.Effect<ResolvedSafeContext, SetupContextError> => {
      const p = policy ?? OneOfOneOwnership

      const deployedPredicate = isContractDeployedFx({ client: publicClient, address: safe }).pipe(
        Effect.mapError((cause) => new CheckDeploymentError({ safe, cause }))
      )

      const onTrue: () => Effect.Effect<
        DeployedSafeContext,
        GetOwnersError | InvalidSafeOwnershipError
      > = () =>
        safeSvc.getOwners(safe).pipe(
          Effect.mapError((cause) => new GetOwnersError({ safe, cause })),
          Effect.flatMap((owners) => {
            if (p.validate(owners, owner)) {
              return Effect.succeed<DeployedSafeContext>({ safeAddress: safe, deployed: true })
            }
            return Effect.fail<InvalidSafeOwnershipError>(
              new InvalidSafeOwnershipError({ safe, owners, expectedOwner: owner })
            )
          })
        )

      const onFalse: () => Effect.Effect<
        PredictedSafeContext,
        MissingSaltNonceError | CalculateSafeAddressError | Create2MismatchError
      > = () => {
        if (maybeSaltNonce === undefined) {
          return Effect.fail<MissingSaltNonceError>(new MissingSaltNonceError({ safe }))
        }

        return safeSvc.calculateSafeAddress({
          owners: [owner],
          saltNonce: maybeSaltNonce
        }).pipe(
          Effect.mapError((cause) =>
            new CalculateSafeAddressError({ owners: [owner], saltNonce: maybeSaltNonce, cause })
          ),
          Effect.flatMap((predicted) => {
            if (isAddressEqual(predicted, safe)) {
              return Effect.succeed<PredictedSafeContext>({
                safeAddress: predicted,
                saltNonce: maybeSaltNonce,
                deployed: false
              })
            }
            return Effect.fail<Create2MismatchError>(
              new Create2MismatchError({
                provided: safe,
                predicted,
                owner,
                saltNonce: maybeSaltNonce
              })
            )
          })
        )
      }

      return Effect.if(deployedPredicate, { onTrue, onFalse })
    }

    return { resolve }
  })
)
