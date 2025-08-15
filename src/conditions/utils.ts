import { Effect } from "effect"
import { type Abi, type AbiFunction, type AbiParameter, getAbiItem } from "viem"
import { AbiItemNotFoundError, AbiItemNotFunctionError, type ConditionError } from "./errors.js"
import type { CalldataNode, ConditionNode, GetFunctionAbiArgs, TupleAbiParameter } from "./types.js"

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

const isTupleParam = (p: AbiParameter): p is TupleAbiParameter => p.type === "tuple" || p.type.startsWith("tuple[")

const parseArrayDims = (type: string) => {
  const dims: Array<number | null> = []
  const re = /\[(\d*)\]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(type))) dims.push(m[1] === "" ? null : Number(m[1]))
  const base = type.replace(/\[(\d*)\]/g, "")
  return { base, dims }
}

const isDynamicPrimitive = (t: string) => t === "bytes" || t === "string"

const paramToPassNode = (p: AbiParameter): ConditionNode => {
  const { base, dims } = parseArrayDims(p.type)

  if (dims.length > 0) {
    const elementParam: AbiParameter = { ...p, type: base }
    let node: ConditionNode = paramToPassNode(elementParam)
    for (let i = dims.length - 1; i >= 0; i--) {
      node = {
        paramType: "Array",
        operator: "Pass",
        ...(dims[i] !== null ? { length: dims[i]! } : {}),
        element: node
      } as const
    }
    return node
  }

  if (isTupleParam(p)) {
    return {
      paramType: "Tuple",
      operator: "Pass",
      children: p.components.map(paramToPassNode)
    } as const
  }

  if (isDynamicPrimitive(base)) {
    return { paramType: "Dynamic", operator: "Pass" } as const
  }

  return { paramType: "Static", operator: "Pass" } as const
}

export const buildPassAllConditionFx = ({
  abi,
  args,
  name
}: {
  abi: Abi
  name: string
  args?: ReadonlyArray<unknown>
}): Effect.Effect<CalldataNode, ConditionError> =>
  getFunctionAbi({ abi, name, ...(args !== undefined ? { args } : {}) }).pipe(
    Effect.map((fn): CalldataNode => ({
      paramType: "Calldata",
      operator: "Matches",
      children: fn.inputs.map(paramToPassNode)
    }))
  )
