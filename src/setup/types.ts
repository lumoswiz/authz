import type { Address, Hex } from "viem"
import type { ExecutionOptions } from "../shared/types.js"

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
  conditions?: ReadonlyArray<Hex>
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
