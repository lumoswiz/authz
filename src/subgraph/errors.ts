import { Data } from "effect"
import type { Address } from "viem"

export type SubgraphError =
  | GetSubgraphChainPrefixError
  | FetchSubgraphError
  | InvalidAddressError
  | InvalidBytes32Error
  | ParseClearanceError
  | ParseExecutionOptionsError
  | ParseConditionPayloadError

export class FetchSubgraphError extends Data.TaggedError("FetchSubgraphError")<{
  id: string
  cause: unknown
}> {}

export class GetSubgraphChainPrefixError extends Data.TaggedError("GetSubgraphChainPrefixError")<{
  chainId: number
  module: Address
}> {}

export class InvalidAddressError extends Data.TaggedError("InvalidAddressError")<{
  value: string
  reason: "not-hex" | "wrong-length"
}> {}

export class InvalidBytes32Error extends Data.TaggedError("InvalidBytes32Error")<{
  value: string
  reason: "not-hex" | "wrong-length"
}> {}

export class ParseClearanceError extends Data.TaggedError("ParseClearanceError")<{
  value: string
}> {}

export class ParseConditionPayloadError extends Data.TaggedError("ParseConditionPayloadError")<{
  json: string
  cause: unknown
}> {}

export class ParseExecutionOptionsError extends Data.TaggedError("ParseExecutionOptionsError")<{
  value: string
}> {}

export type SubgraphMappingError =
  | ParseClearanceError
  | ParseConditionPayloadError
  | ParseExecutionOptionsError
