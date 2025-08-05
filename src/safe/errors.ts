import { Data } from "effect"
import type { Address } from "viem"

export type SafeError = GetNonceError

export class GetNonceError extends Data.TaggedError("GetNonceError")<{
  safe: Address
  cause: unknown
}> {}
