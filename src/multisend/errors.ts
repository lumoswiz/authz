import { Data } from "effect"

export type MultiSendError =
  | EncodeMultiError
  | DecodeMultiError

export class EncodeMultiError extends Data.TaggedError("EncodeMultiError")<{
  cause: unknown
}> {}

export class DecodeMultiError extends Data.TaggedError("DecodeMultiError")<{
  cause: unknown
}> {}
