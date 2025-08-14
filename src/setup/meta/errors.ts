import { Data } from "effect"
import type { Address } from "viem"

export type MetaError = SignMultisendForMetaError

export class SignMultisendForMetaError extends Data.TaggedError("SignMultisendForMetaError")<{
  safe: Address
  cause: unknown
}> {}
