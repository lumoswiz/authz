import { Effect, Layer } from "effect"
import { walletActions } from "viem"
import { ViemClient } from "../../client/service.js"
import type { TransactionData } from "../../shared/types.js"
import { BroadcastError, type ExecError } from "./errors.js"
import { ExecService } from "./service.js"
import type { ExecResult, ExecuteArgs } from "./types.js"

export const ExecServiceLive = Layer.effect(
  ExecService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient
    const client = publicClient.extend(walletActions)

    const execute = ({
      account,
      safe,
      txs
    }: ExecuteArgs): Effect.Effect<ExecResult, ExecError> =>
      Effect.if(Effect.succeed(txs.length === 0), {
        onTrue: () => Effect.succeed({ id: "" as const }),
        onFalse: () =>
          Effect.gen(function*() {
            const calls = txs.map((tx: TransactionData) => ({
              to: tx.to,
              data: tx.data,
              ...(tx.value ? { value: BigInt(tx.value) } : {})
            }))

            const { id } = yield* Effect
              .tryPromise(() =>
                client.sendCalls({
                  account,
                  calls,
                  experimental_fallback: true,
                  forceAtomic: true
                })
              )
              .pipe(Effect.mapError((cause) => new BroadcastError({ safe, cause })))

            return { id }
          })
      })

    return { execute }
  })
)
