import { Data } from "effect"
import type { Address } from "viem"

export class GetSubgraphChainPrefixError extends Data.TaggedError("GetSubgraphChainPrefixError")<{
  chainId: number
  module: Address
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
