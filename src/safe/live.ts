import { Effect, Layer } from "effect"
import { ViemClient } from "src/client/service.js"
import type { Address } from "viem"
import { SAFE_PROXY_ABI } from "./abi.js"
import { GetNonceError, GetOwnersError, GetVersionError } from "./errors.js"
import { SafeService } from "./service.js"

export const LiveSafeServiceLayer = Layer.effect(
  SafeService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient

    return {
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
      getVersion: (safe: Address) =>
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "VERSION"
            }) as Promise<string>,
          catch: (error) => new GetVersionError({ safe, cause: error })
        })
    }
  })
)
