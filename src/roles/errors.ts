import { Data } from "effect"
import type { Address } from "viem"

export type RoleError =
  | BuildAssignRolesTxError
  | BuildDeployModuleTxError
  | CalculateProxyAddressError
  | IsModuleDeployedError
  | IsModuleEnabledError

export class BuildAssignRolesTxError extends Data.TaggedError("BuildAssignRolesTxError")<{
  module: Address
  cause: unknown
}> {}

export class BuildDeployModuleTxError extends Data.TaggedError("BuildDeployModuleTxError")<{
  safe: Address
  saltNonce: bigint
  cause: unknown
}> {}

export class CalculateProxyAddressError extends Data.TaggedError("CalculateProxyAddressError")<{
  cause: unknown
}> {}

export class IsModuleDeployedError extends Data.TaggedError("IsModuleDeployedError")<{
  safe: Address
  saltNonce: bigint
  cause: unknown
}> {}

export class IsModuleEnabledError extends Data.TaggedError("IsModuleEnabledError")<{
  module: Address
  member: Address
  cause: unknown
}> {}
