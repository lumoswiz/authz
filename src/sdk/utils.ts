import { Effect } from "effect"
import { createPublicClient, type PublicClient } from "viem"
import { getSupportedChainById } from "../client/chain.js"
import type { ChainResolutionError, TransportBuildError } from "../client/errors.js"
import { defaultTransport, makeTransport } from "../client/transport.js"
import type { SdkTransportConfig } from "../client/types.js"
import {
  ConstructorChainExtractionError,
  type ConstructorError,
  ConstructorTransportBuildError,
  ConstructorUnsupportedChainIdError
} from "./errors.js"
import type { ConstructorArgs } from "./types.js"

const mapChainResolutionError = (e: ChainResolutionError): ConstructorError => {
  switch (e._tag) {
    case "UnsupportedChainIdError":
      return new ConstructorUnsupportedChainIdError({ id: e.id, supported: e.supported })
    case "ChainExtractionError":
      return new ConstructorChainExtractionError({ id: e.id, cause: e.cause })
  }
}

const mapTransportError = (e: TransportBuildError): ConstructorError =>
  new ConstructorTransportBuildError({ cause: e.cause })

export const buildPublicClient = (
  args: ConstructorArgs
): Effect.Effect<PublicClient, ConstructorError, never> =>
  Effect.gen(function*() {
    const chain = yield* getSupportedChainById(args.chainId).pipe(
      Effect.mapError(mapChainResolutionError)
    )
    const cfg: SdkTransportConfig = args.transport ?? defaultTransport
    const transport = yield* makeTransport(cfg).pipe(
      Effect.mapError(mapTransportError)
    )
    const client: PublicClient = createPublicClient({ chain, transport })
    return client
  })
