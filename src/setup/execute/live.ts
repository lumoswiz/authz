import { Effect, Layer } from "effect"
import { walletActions } from "viem"
import type { Account, Address, Hex } from "viem"
import { ViemClient } from "../../client/service.js"
import type { TransactionData } from "../../shared/types.js"
import { BroadcastError, type ExecError, MissingSendCallsSupportError, WaitReceiptError } from "./errors.js"
import { ExecService } from "./service.js"
import type { ExecResult, ExecuteArgs } from "./types.js"

export const ExecServiceLive = Layer.effect(
  ExecService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient
    const client = publicClient.extend(walletActions)

    const sendOne = (args: {
      to: Address
      data: Hex
      value: Hex
      account: Account
      safeForErrors: Address
    }) =>
      Effect.tryPromise(() =>
        client.sendTransaction({
          account: args.account,
          chain: null,
          to: args.to,
          data: args.data,
          value: BigInt(args.value)
        })
      ).pipe(Effect.mapError((cause) => new BroadcastError({ safe: args.safeForErrors, cause })))

    const waitReceipt = (hash: Hex, safe: Address) =>
      Effect.tryPromise(() => publicClient.waitForTransactionReceipt({ hash })).pipe(
        Effect.mapError((cause) => new WaitReceiptError({ safe, hash, cause })),
        Effect.as(hash)
      )

    const runSendTransactions = (
      txs: ReadonlyArray<TransactionData>,
      {
        account,
        safe,
        wait
      }: {
        account: Account
        safe: Address
        wait?: boolean
      }
    ) => {
      const shouldWait = wait ?? true
      return Effect.forEach(
        txs,
        (tx) =>
          sendOne({ ...tx, account, safeForErrors: safe }).pipe(
            Effect.flatMap((h) =>
              Effect.if(Effect.succeed(shouldWait), {
                onTrue: () => waitReceipt(h, safe),
                onFalse: () => Effect.succeed(h)
              })
            )
          ),
        { discard: false }
      ).pipe(Effect.map((hashes): ExecResult => ({ hashes })))
    }

    const runSendCalls = (
      txs: ReadonlyArray<TransactionData>,
      {
        account,
        chainId,
        safe
      }: {
        account: Account
        chainId: number
        safe: Address
      }
    ) =>
      Effect.if(Effect.succeed(typeof client.sendCalls === "function"), {
        onTrue: () => {
          const calls = txs.map((tx) => ({
            to: tx.to,
            data: tx.data,
            value: BigInt(tx.value)
          }))
          return Effect.tryPromise(() => client.sendCalls({ account, calls })).pipe(
            Effect.map(({ id }) => ({ hashes: [id as Hex] })),
            Effect.mapError((cause) => new BroadcastError({ safe, cause }))
          )
        },
        onFalse: () => Effect.fail<ExecError>(new MissingSendCallsSupportError({ chainId }))
      })

    const execute = ({
      account,
      chainId,
      mode,
      safe,
      txs,
      wait
    }: ExecuteArgs): Effect.Effect<ExecResult, ExecError> =>
      Effect.if(Effect.succeed(txs.length === 0), {
        onTrue: () => Effect.succeed({ hashes: [] as const }),
        onFalse: () =>
          Effect.if(Effect.succeed(mode === "sendTransactions"), {
            onTrue: () =>
              runSendTransactions(
                txs,
                { account, safe, ...(wait !== undefined ? { wait } : {}) }
              ),
            onFalse: () => runSendCalls(txs, { account, chainId, safe })
          })
      })

    return { execute }
  })
)
