import { Effect, Layer } from "effect"
import { SafeService } from "../../safe/service.js"
import { type MetaTransactionData, OperationType } from "../../shared/types.js"
import { SigningService } from "../signing/service.js"
import { type MetaError, SignMultisendForMetaError } from "./errors.js"
import { MetaService } from "./service.js"
import type { BuildMultisendExecMetaTxArgs } from "./types.js"

export const MetaServiceLive = Layer.effect(
  MetaService,
  Effect.gen(function*() {
    const safeSvc = yield* SafeService
    const signing = yield* SigningService

    const buildMultisendExecMetaTx = ({
      account,
      isDeployed = true,
      multisendTxs,
      safe
    }: BuildMultisendExecMetaTxArgs): Effect.Effect<MetaTransactionData, MetaError> =>
      signing.signMultisendTx({ safe, multisendTxs, account, isDeployed }).pipe(
        Effect.mapError((cause) => new SignMultisendForMetaError({ safe, cause })),
        Effect.flatMap(({ signature, txData }) =>
          safeSvc.buildExecTransaction({ safe, tx: txData, signatures: signature }).pipe(
            Effect.map(({ data, to, value }) => ({
              to,
              data,
              value,
              operation: OperationType.DelegateCall
            }))
          )
        )
      )

    return { buildMultisendExecMetaTx }
  })
)
