import { Data } from "effect"

export type ConditionError = GetFunctionAbiError

export type GetFunctionAbiError =
  | AbiItemNotFoundError
  | AbiItemNotFunctionError

export class AbiItemNotFoundError extends Data.TaggedError("AbiItemNotFoundError")<{
  query: string
}> {}

export class AbiItemNotFunctionError extends Data.TaggedError("AbiItemNotFunctionError")<{
  name: string
  actualType: string
}> {}
