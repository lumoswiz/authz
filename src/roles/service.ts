import type { Effect } from "effect"
import { Context } from "effect"
import type { Address, Hex } from "viem"
import type { TransactionData } from "../shared/types.js"
import type { RoleError } from "./errors.js"

export class RoleService extends Context.Tag("RoleService")<
  RoleService,
  {
    buildAssignRolesTx: (args: {
      module: Address
      member: Address
      roleKeys: Array<Hex>
      memberOf: Array<boolean>
    }) => Effect.Effect<TransactionData, RoleError>

    buildDeployModuleTx: (args: {
      safe: Address
      saltNonce: bigint
    }) => Effect.Effect<TransactionData, RoleError>

    buildScopeTargetTx: (args: {
      module: Address
      roleKey: Hex
      target: Address
    }) => Effect.Effect<TransactionData, RoleError>

    calculateModuleProxyAddress: (args: {
      safe: Address
      saltNonce: bigint
    }) => Effect.Effect<Address, RoleError>

    isModuleDeployed: (args: {
      safe: Address
      saltNonce: bigint
    }) => Effect.Effect<boolean, RoleError>

    isModuleEnabled: (args: {
      module: Address
      member: Address
    }) => Effect.Effect<boolean, RoleError>
  }
>() {}
