import { Context, type Effect } from "effect"
import type { AbiFunction } from "viem"
import type { ConditionError } from "./errors.js"
import type { GetFunctionAbiArgs } from "./types.js"

export class ConditionService extends Context.Tag("ConditionService")<
  ConditionService,
  {
    getFunctionAbi: (args: GetFunctionAbiArgs) => Effect.Effect<AbiFunction, ConditionError>
  }
>() {}
