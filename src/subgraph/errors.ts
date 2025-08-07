import { Data } from "effect"

export class ParseExecutionOptionsError extends Data.TaggedError("ParseExecutionOptionsError")<{
  value: string
}> {}
