import { Data } from "effect"
import type { SdkTransportConfig } from "./types.js"

export type ChainResolutionError = UnsupportedChainIdError | ChainExtractionError

export class UnsupportedChainIdError extends Data.TaggedError("UnsupportedChainIdError")<{
  readonly id: number
  readonly supported: ReadonlyArray<number>
}> {}

export class ChainExtractionError extends Data.TaggedError("ChainExtractionError")<{
  readonly id: number
  readonly cause: unknown
}> {}

export class TransportBuildError extends Data.TaggedError("TransportBuildError")<{
  readonly config: SdkTransportConfig
  readonly cause: unknown
}> {}
