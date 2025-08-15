import type { Abi, AbiParameter } from "viem"

export interface GetFunctionAbiArgs {
  abi: Abi
  name: string
  args?: ReadonlyArray<unknown>
}

export type TupleAbiParameter = Extract<
  AbiParameter,
  { type: "tuple" | `tuple[${string}]`; components: ReadonlyArray<AbiParameter> }
>

export type Operator = "Matches" | "Pass"

export type CalldataNode = {
  readonly paramType: "Calldata"
  readonly operator: "Matches"
  readonly children: ReadonlyArray<ConditionNode>
}

export type TuplePassNode = {
  readonly paramType: "Tuple"
  readonly operator: "Pass"
  readonly children: ReadonlyArray<ConditionNode>
}

export type ArrayPassNode = {
  readonly paramType: "Array"
  readonly operator: "Pass"
  readonly length?: number
  readonly element: ConditionNode
}

export type StaticPassNode = {
  readonly paramType: "Static"
  readonly operator: "Pass"
}

export type DynamicPassNode = {
  readonly paramType: "Dynamic"
  readonly operator: "Pass"
}

export type ConditionNode =
  | CalldataNode
  | TuplePassNode
  | ArrayPassNode
  | StaticPassNode
  | DynamicPassNode
