import { Effect } from "effect"
import { type Chain, extractChain } from "viem"
import { CHAINS } from "./constants.js"
import type { ChainResolutionError } from "./errors.js"
import { ChainExtractionError, UnsupportedChainIdError } from "./errors.js"
import type { SupportedChainId } from "./types.js"

const SUPPORTED_CHAIN_IDS_ARRAY = CHAINS.map((c) => c.id) as ReadonlyArray<number>
const SUPPORTED_CHAIN_IDS: ReadonlySet<number> = new Set(SUPPORTED_CHAIN_IDS_ARRAY)

export const toSupportedChainId = (
  id: number
): Effect.Effect<SupportedChainId, UnsupportedChainIdError, never> =>
  SUPPORTED_CHAIN_IDS.has(id)
    ? Effect.succeed(id as SupportedChainId)
    : Effect.fail(new UnsupportedChainIdError({ id, supported: SUPPORTED_CHAIN_IDS_ARRAY }))

export const getSupportedChainById = (
  id: number
): Effect.Effect<Chain, ChainResolutionError, never> =>
  Effect.gen(function*() {
    const supportedId = yield* toSupportedChainId(id)
    const chain = yield* Effect.try({
      try: () => extractChain({ chains: CHAINS, id: supportedId }),
      catch: (cause) => new ChainExtractionError({ id: supportedId, cause })
    })
    return chain
  })
