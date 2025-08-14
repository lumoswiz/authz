import type { Address, Hex } from "viem"
import type { ExecutionOptions } from "../shared/types.js"

export interface Annotation {
  uri: string
  schema: string
}

export enum Clearance {
  None = 0,
  Target = 1,
  Function = 2
}

export interface SubgraphCondition {
  id: string
  payload: unknown
}

export interface SubgraphFunction {
  selector: Hex
  executionOptions: ExecutionOptions
  wildcarded: boolean
  condition: SubgraphCondition | null
}

export interface Target {
  address: Hex
  clearance: Clearance
  executionOptions: ExecutionOptions
  functions: Array<SubgraphFunction>
}

export interface MemberAssignment {
  address: Hex
}

export interface SubgraphRole {
  key: Hex
  members: Array<MemberAssignment>
  targets: Array<Target>
  annotations: Array<Annotation>
  lastUpdate: number
}

export interface RawSubgraphRole {
  key: Hex
  members: Array<{ member: { address: Hex } }>
  targets: Array<{
    address: Hex
    clearance: keyof typeof Clearance
    executionOptions: keyof typeof ExecutionOptions
    functions: Array<{
      selector: Hex
      executionOptions: keyof typeof ExecutionOptions
      wildcarded: boolean
      condition: { id: string; json: string } | null
    }>
  }>
  annotations: Array<Annotation>
  lastUpdate: number
}

export interface FetchRoleArgs {
  readonly chainId: number
  readonly moduleAddress: Address
  readonly roleKey: Hex
}
