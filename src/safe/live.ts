import { Effect, Layer } from "effect"
import { ViemClient } from "src/client/service.js"
import type { Address } from "viem"
import { SAFE_PROXY_ABI } from "./abi.js"
import { GetNonceError } from "./errors.js"
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
        })
    }
  })
)
