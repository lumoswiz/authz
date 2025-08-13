import type { Address, Hex } from "viem"
import type { ConditionFlat, ExecutionOptions } from "../shared/types.js"

export type PredictedSafeContext = Readonly<{
  safeAddress: Address
  deployed: false
  saltNonce: bigint
}>

export type DeployedSafeContext = Readonly<{
  safeAddress: Address
  deployed: true
  saltNonce?: never
}>

export type ResolvedSafeContext =
  | PredictedSafeContext
  | DeployedSafeContext

export type ScopeConfig = Readonly<{
  selectors: ReadonlyArray<Hex>
  conditions?: ReadonlyArray<ConditionFlat>
  execOpts?: ExecutionOptions
}>

export type RolesSetupConfig = Readonly<{
  rolesNonce?: bigint
  rolesSetup?: Readonly<{
    member?: Address
    roleKey?: Hex
    target?: Address
    scopes?: ReadonlyArray<ScopeConfig>
  }>
}>

export type RoleSubgraphStatus = Readonly<{
  assigned: boolean
  assignedToMember: boolean
  targetScoped: boolean
  selectorsScoped: boolean
  missingSelectors?: ReadonlyArray<Hex>
}>

export const SetupStage = {
  DeploySafe: "DeploySafe",
  DeployModule: "DeployModule",
  EnableModule: "EnableModule",
  AssignRoles: "AssignRoles",
  ScopeTarget: "ScopeTarget",
  ScopeFunctions: "ScopeFunctions",
  NothingToDo: "NothingToDo"
} as const

export type SetupStage = typeof SetupStage[keyof typeof SetupStage]

export const StageOrder: ReadonlyArray<SetupStage> = [
  SetupStage.DeploySafe,
  SetupStage.DeployModule,
  SetupStage.EnableModule,
  SetupStage.AssignRoles,
  SetupStage.ScopeTarget,
  SetupStage.ScopeFunctions,
  SetupStage.NothingToDo
] as const

export const stagesFrom = (start: SetupStage): ReadonlyArray<SetupStage> => {
  const i = StageOrder.indexOf(start)
  return i < 0 ? [] : StageOrder.slice(i)
}
