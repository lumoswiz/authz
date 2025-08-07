import { Effect } from "effect"
import { ExecutionOptions } from "../shared/types.js"
import { ParseExecutionOptionsError } from "./errors.js"

export const parseExecutionOptions = (value: string): Effect.Effect<ExecutionOptions, ParseExecutionOptionsError> =>
  value in ExecutionOptions
    ? Effect.succeed(ExecutionOptions[value as keyof typeof ExecutionOptions])
    : Effect.fail(new ParseExecutionOptionsError({ value }))
