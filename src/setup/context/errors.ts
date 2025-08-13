import { Data } from "effect"
import type { Address } from "viem"

export type SetupContextError =
  | CheckDeploymentError
  | GetOwnersError
  | CalculateSafeAddressError
  | InvalidSafeOwnershipError
  | MissingSaltNonceError
  | Create2MismatchError

export class CheckDeploymentError extends Data.TaggedError("CheckDeploymentError")<{
  safe: Address
  cause: unknown
}> {}

export class GetOwnersError extends Data.TaggedError("GetOwnersError")<{
  safe: Address
  cause: unknown
}> {}

export class CalculateSafeAddressError extends Data.TaggedError("CalculateSafeAddressError")<{
  owners: ReadonlyArray<Address>
  saltNonce: bigint
  cause: unknown
}> {}

export class InvalidSafeOwnershipError extends Data.TaggedError("InvalidSafeOwnershipError")<{
  safe: Address
  owners: ReadonlyArray<Address>
  expectedOwner: Address
}> {}

export class MissingSaltNonceError extends Data.TaggedError("MissingSaltNonceError")<{
  safe: Address
}> {}

export class Create2MismatchError extends Data.TaggedError("Create2MismatchError")<{
  provided: Address
  predicted: Address
  owner: Address
  saltNonce: bigint
}> {}
