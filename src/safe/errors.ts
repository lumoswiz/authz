import { Data } from "effect"
import type { Address } from "viem"

export type SafeError = GetNonceError | GetOwnersError

export class GetNonceError extends Data.TaggedError("GetNonceError")<{
  safe: Address
  cause: unknown
}> {}

export class GetOwnersError extends Data.TaggedError("GetOwnersError")<{
  safe: Address
  cause: unknown
}> {}
