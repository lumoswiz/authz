import { Data } from "effect"
import type { Address, Hex } from "viem"

export type RoleError =
  | BuildAssignRolesTxError
  | BuildScopeFunctionTxError
  | BuildScopeTargetTxError
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

export class BuildScopeFunctionTxError extends Data.TaggedError("BuildScopeFunctionTxError")<{
  module: Address
  roleKey: Hex
  target: Address
  selector: Hex
  cause: unknown
}> {}

export class BuildScopeTargetTxError extends Data.TaggedError("BuildScopeTargetTxError")<{
  module: Address
  roleKey: Hex
  target: Address
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
