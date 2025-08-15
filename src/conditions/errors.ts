import { Data } from "effect"

export type GetFunctionAbiError =
  | AbiItemNotFoundError
  | AbiItemNotFunctionError

export type ConditionError = GetFunctionAbiError

export class AbiItemNotFoundError extends Data.TaggedError("AbiItemNotFoundError")<{
  query: string
}> {}

export class AbiItemNotFunctionError extends Data.TaggedError("AbiItemNotFunctionError")<{
  name: string
  actualType: string
}> {}
