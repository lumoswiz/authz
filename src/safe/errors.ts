import { Data } from "effect"
import type { Address } from "viem"

export type SafeError =
  | GetNonceError
  | GetOwnersError
  | GetSafeTxHashError
  | GetThresholdError
  | GetVersionError
  | IsModuleEnabledError
  | IsOwnerError

export class GetNonceError extends Data.TaggedError("GetNonceError")<{
  safe: Address
  cause: unknown
}> {}

export class GetOwnersError extends Data.TaggedError("GetOwnersError")<{
  safe: Address
  cause: unknown
}> {}

export class GetSafeTxHashError extends Data.TaggedError("GetSafeTxHashError")<{
  safe: Address
  cause: unknown
}> {}

export class GetThresholdError extends Data.TaggedError("GetThresholdError")<{
  safe: Address
  cause: unknown
}> {}

export class GetVersionError extends Data.TaggedError("GetVersionError")<{
  safe: Address
  cause: unknown
}> {}

export class IsModuleEnabledError extends Data.TaggedError("IsModuleEnabledError")<{
  safe: Address
  module: Address
  cause: unknown
}> {}

export class IsOwnerError extends Data.TaggedError("IsOwnerError")<{
  safe: Address
  owner: Address
  cause: unknown
}> {}
