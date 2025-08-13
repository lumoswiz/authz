import { Data } from "effect"
import type { Address, Hex } from "viem"

export type StageError =
  | StageCalculateProxyAddressError
  | StageIsModuleDeployedError
  | StageIsModuleEnabledError
  | StageMissingRoleKeyError
  | StageFetchRoleError

export class StageCalculateProxyAddressError extends Data.TaggedError("StageCalculateProxyAddressError")<{
  safe: Address
  saltNonce: bigint
  cause: unknown
}> {}

export class StageIsModuleDeployedError extends Data.TaggedError("StageIsModuleDeployedError")<{
  safe: Address
  saltNonce: bigint
  cause: unknown
}> {}

export class StageIsModuleEnabledError extends Data.TaggedError("StageIsModuleEnabledError")<{
  safe: Address
  module: Address
  cause: unknown
}> {}

export class StageMissingRoleKeyError extends Data.TaggedError("StageMissingRoleKeyError")<{
  safe: Address
}> {}

export class StageFetchRoleError extends Data.TaggedError("StageFetchRoleError")<{
  chainId: number
  moduleAddress: Address
  roleKey: Hex
  cause: unknown
}> {}
