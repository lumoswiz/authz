import { Data } from "effect"
import type { Address } from "viem"

export type RoleError =
  | BuildDeployModuleTxError
  | CalculateProxyAddressError
  | IsModuleDeployedError

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
