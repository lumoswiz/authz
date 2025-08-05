import { Effect, Layer } from "effect"
import { ViemClient } from "src/client/service.js"
import { type Address, encodeFunctionData } from "viem"
import { SAFE_PROXY_ABI } from "./abi.js"
import {
  GetNonceError,
  GetOwnersError,
  GetThresholdError,
  GetVersionError,
  IsModuleEnabledError,
  IsOwnerError
} from "./errors.js"
import { SafeService } from "./service.js"

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
      getNonce: (safe: Address) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "nonce"
            }) as Promise<bigint>,
          catch: (error) => new GetNonceError({ safe, cause: error })
        }),

      getOwners: (safe: Address) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "getOwners"
            }) as Promise<Array<Address>>,
          catch: (error) => new GetOwnersError({ safe, cause: error })
        }),
      getThreshold: (safe: Address) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "getThreshold"
            }) as Promise<bigint>,
          catch: (error) => new GetThresholdError({ safe, cause: error })
        }),
      getVersion: (safe: Address) =>
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
