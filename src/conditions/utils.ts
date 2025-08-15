import { Effect } from "effect"
import { type AbiFunction, getAbiItem } from "viem"
import type { ConditionError } from "./errors.js"
import { AbiItemNotFoundError, AbiItemNotFunctionError } from "./errors.js"
import type { GetFunctionAbiArgs } from "./types.js"

export const getFunctionAbi = (
  { abi, args, name }: GetFunctionAbiArgs
): Effect.Effect<AbiFunction, ConditionError, never> =>
  Effect.sync(() => getAbiItem({ abi, name, args })).pipe(
    Effect.flatMap((item) =>
      item
        ? Effect.succeed(item)
        : Effect.fail<ConditionError>(new AbiItemNotFoundError({ query: name }))
    ),
    Effect.flatMap((item) =>
      item.type === "function"
        ? Effect.succeed(item as AbiFunction)
        : Effect.fail<ConditionError>(
          new AbiItemNotFunctionError({ name, actualType: item.type })
        )
    )
  )
