import { Effect, Layer } from "effect"
import { ViemClient } from "src/client/service.js"
import { type Address, encodeFunctionData } from "viem"
import { SAFE_PROXY_ABI } from "./abi.js"
import { GAS_DEFAULTS, ZERO_ADDRESS } from "./constants.js"
import {
  GetNonceError,
  GetOwnersError,
  GetThresholdError,
  GetVersionError,
  IsModuleEnabledError,
  IsOwnerError
} from "./errors.js"
import { SafeService } from "./service.js"
import { OperationType } from "./types.js"

export const LiveSafeServiceLayer = Layer.effect(
  SafeService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient

    return {
      buildEnableModuleTx: ({ module, safe }) =>
        Effect.sync(() => ({
          to: safe,
          value: "0x0",
          data: encodeFunctionData({
            abi: SAFE_PROXY_ABI,
            functionName: "enableModule",
            args: [module]
          })
        })),

      buildExecTransaction: ({ safe, signatures, tx }) =>
        Effect.sync(() => ({
          to: safe,
          value: "0x00",
          data: encodeFunctionData({
            abi: SAFE_PROXY_ABI,
            functionName: "execTransaction",
            args: [
              tx.to,
              BigInt(tx.value),
              tx.data,
              tx.operation,
              tx.safeTxGas,
              tx.baseGas,
              tx.gasPrice,
              tx.gasToken,
              tx.refundReceiver,
              signatures
            ]
          })
        })),

      buildSafeTransactionData: ({
        data,
        operation = OperationType.Call,
        safe,
        to,
        useOnChainNonce = true
      }) =>
        Effect.gen(function*() {
          const nonce = useOnChainNonce
            ? yield* Effect.tryPromise({
              try: () =>
                publicClient.readContract({
                  address: safe,
                  abi: SAFE_PROXY_ABI,
                  functionName: "nonce"
                }) as Promise<bigint>,
              catch: (error) => new GetNonceError({ safe, cause: error })
            })
            : 0n

          return {
            to,
            value: "0x0",
            data,
            operation,
            ...GAS_DEFAULTS,
            gasToken: ZERO_ADDRESS,
            refundReceiver: ZERO_ADDRESS,
            nonce
          }
        }),

      getNonce: (safe) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "nonce"
            }) as Promise<bigint>,
          catch: (error) => new GetNonceError({ safe, cause: error })
        }),

      getOwners: (safe) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "getOwners"
            }) as Promise<Array<Address>>,
          catch: (error) => new GetOwnersError({ safe, cause: error })
        }),

      getThreshold: (safe) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "getThreshold"
            }) as Promise<bigint>,
          catch: (error) => new GetThresholdError({ safe, cause: error })
        }),

      getVersion: (safe) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "VERSION"
            }) as Promise<string>,
          catch: (error) => new GetVersionError({ safe, cause: error })
        }),

      isModuleEnabled: ({ module, safe }) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "isModuleEnabled",
              args: [module]
            }) as Promise<boolean>,
          catch: (error) => new IsModuleEnabledError({ safe, module, cause: error })
        }),

      isOwner: ({ owner, safe }) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "isOwner",
              args: [owner]
            }) as Promise<boolean>,
          catch: (error) => new IsOwnerError({ safe, owner, cause: error })
        })
    }
  })
)
