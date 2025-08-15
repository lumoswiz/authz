import { Effect } from "effect"
import type { Account, Hex, PublicClient } from "viem"
import { createPublicClient } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { getSupportedChainById } from "../client/chain.js"
import type { ChainResolutionError, TransportBuildError } from "../client/errors.js"
import { defaultTransport, makeTransport } from "../client/transport.js"
import type { SdkTransportConfig } from "../client/types.js"
import {
  ConstructorChainExtractionError,
  type ConstructorError,
  ConstructorTransportBuildError,
  ConstructorUnsupportedChainIdError,
  PrivateKeyAccountError
} from "./errors.js"
import type { AccountInput, ConstructorArgs } from "./types.js"

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

export const resolveAccount = (
  input: AccountInput
): Effect.Effect<Account, PrivateKeyAccountError, never> =>
  (typeof input === "object" && input !== null && "privateKey" in input)
    ? Effect.try({
      try: () => privateKeyToAccount((input as { privateKey: Hex }).privateKey),
      catch: (cause) => new PrivateKeyAccountError({ cause })
    })
    : Effect.succeed(input as Account)
