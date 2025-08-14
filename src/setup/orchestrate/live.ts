import { Effect, Layer } from "effect"
import { ViemClient } from "../../client/service.js"
import { BuilderService } from "../builder/service.js"
import { ExecService } from "../execute/service.js"
import { MetaService } from "../meta/service.js"
import { GetChainIdForOrchestrateError, type OrchestrateError } from "./errors.js"
import { OrchestrateService } from "./service.js"
import type { OrchestrateArgs, OrchestrateResult } from "./types.js"

export const OrchestrateServiceLive = Layer.effect(
  OrchestrateService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient
    const exec = yield* ExecService
    const builder = yield* BuilderService
    const meta = yield* MetaService

    const orchestrate = ({
      account,
      config,
      context,
      options
    }: OrchestrateArgs): Effect.Effect<OrchestrateResult, OrchestrateError> =>
      Effect.promise(() => publicClient.getChainId()).pipe(
        Effect.mapError((cause) => new GetChainIdForOrchestrateError({ cause })),
        Effect.flatMap((chainId) =>
          builder.buildAllTx({
            context,
            owner: account.address,
            config,
            ...(options ? { options } : {}),
            chainId
          })
            .pipe(
              Effect.flatMap(({ multisendTxs, setupTxs }) =>
                Effect.if(Effect.succeed(multisendTxs.length > 0), {
                  onTrue: () =>
                    meta
                      .buildMultisendExecMetaTx({
                        safe: context.safeAddress,
                        multisendTxs,
                        account,
                        isDeployed: context.deployed
                      })
                      .pipe(
                        Effect.map((execMeta) => [
                          ...setupTxs,
                          { to: execMeta.to, data: execMeta.data, value: execMeta.value }
                        ])
                      ),
                  onFalse: () => Effect.succeed(setupTxs)
                })
              ),
              Effect.flatMap((txs) =>
                exec.execute({
                  account,
                  safe: context.safeAddress,
                  txs
                })
              )
            )
        )
      )

    return { orchestrate }
  })
)
