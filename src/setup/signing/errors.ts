import { Data } from "effect"
import type { Address } from "viem"
import type { OperationType } from "../../shared/types.js"

export type SigningError =
  | GetChainIdForSigningError
  | SignTypedDataForSigningError
  | EncodeMultiForSigningError
  | BuildSafeTxForSigningError
  | GetVersionForSigningError

export class GetChainIdForSigningError extends Data.TaggedError("GetChainIdForSigningError")<{
  cause: unknown
}> {}

export class SignTypedDataForSigningError extends Data.TaggedError("SignTypedDataForSigningError")<{
  safe: Address
  cause: unknown
}> {}

export class EncodeMultiForSigningError extends Data.TaggedError("EncodeMultiForSigningError")<{
  cause: unknown
}> {}

export class BuildSafeTxForSigningError extends Data.TaggedError("BuildSafeTxForSigningError")<{
  safe: Address
  to: Address
  operation: OperationType
  cause: unknown
}> {}

export class GetVersionForSigningError extends Data.TaggedError("GetVersionForSigningError")<{
  safe: Address
  cause: unknown
}> {}
