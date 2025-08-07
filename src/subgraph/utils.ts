import { Effect } from "effect"
import type { Address, Hex } from "viem"
import { CHAINS } from "../shared/constants.js"
import { ExecutionOptions } from "../shared/types.js"
import { GetSubgraphChainPrefixError, ParseExecutionOptionsError } from "./errors.js"

export const getRoleIdForSubgraph = (
  chainId: number,
  moduleAddress: Address,
  roleKey: Hex
): Effect.Effect<string, GetSubgraphChainPrefixError> =>
  Effect.try({
    try: () => {
      const chain = CHAINS[chainId]
      if (!chain) {
        throw new GetSubgraphChainPrefixError({ chainId, module: moduleAddress })
      }
      return `${chain.prefix}:${moduleAddress.toLowerCase()}:${roleKey}`
    },
    catch: (cause) =>
      cause instanceof GetSubgraphChainPrefixError
        ? cause
        : new GetSubgraphChainPrefixError({ chainId, module: moduleAddress })
  })

export const parseExecutionOptions = (value: string): Effect.Effect<ExecutionOptions, ParseExecutionOptionsError> =>
  value in ExecutionOptions
    ? Effect.succeed(ExecutionOptions[value as keyof typeof ExecutionOptions])
    : Effect.fail(new ParseExecutionOptionsError({ value }))
