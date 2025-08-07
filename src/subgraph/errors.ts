import { Data } from "effect"
import type { Address } from "viem"

export class GetSubgraphChainPrefixError extends Data.TaggedError("GetSubgraphChainPrefixError")<{
  chainId: number
  module: Address
}> {}

export class ParseExecutionOptionsError extends Data.TaggedError("ParseExecutionOptionsError")<{
  value: string
}> {}
