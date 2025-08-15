import { Data } from "effect"

export type ConstructorError =
  | ConstructorUnsupportedChainIdError
  | ConstructorChainExtractionError
  | ConstructorTransportBuildError

export class ConstructorUnsupportedChainIdError extends Data.TaggedError("ConstructorUnsupportedChainIdError")<{
  readonly id: number
  readonly supported: ReadonlyArray<number>
}> {}

export class ConstructorChainExtractionError extends Data.TaggedError("ConstructorChainExtractionError")<{
  readonly id: number
  readonly cause: unknown
}> {}

export class ConstructorTransportBuildError extends Data.TaggedError("ConstructorTransportBuildError")<{
  readonly cause: unknown
}> {}

export type AccountError = PrivateKeyAccountError

export class PrivateKeyAccountError extends Data.TaggedError("PrivateKeyAccountError")<{
  readonly cause: unknown
}> {}
