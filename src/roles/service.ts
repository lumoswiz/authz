import type { Effect } from "effect"
import { Context } from "effect"
import type { Address } from "viem"
import type { TransactionData } from "../shared/types.js"
import type { RoleError } from "./errors.js"
import type {
  BuildAssignRolesTxArgs,
  BuildDeployModuleTxArgs,
  BuildScopeFunctionTxArgs,
  BuildScopeTargetTxArgs,
  CalculateModuleProxyAddressArgs,
  IsModuleDeployedArgs,
  IsModuleEnabledArgs
} from "./types.js"

export class RoleService extends Context.Tag("RoleService")<
  RoleService,
  {
    buildAssignRolesTx: (args: BuildAssignRolesTxArgs) => Effect.Effect<TransactionData, RoleError>

    buildDeployModuleTx: (args: BuildDeployModuleTxArgs) => Effect.Effect<TransactionData, RoleError>

    buildScopeFunctionTx: (args: BuildScopeFunctionTxArgs) => Effect.Effect<TransactionData, RoleError>

    buildScopeTargetTx: (args: BuildScopeTargetTxArgs) => Effect.Effect<TransactionData, RoleError>

    calculateModuleProxyAddress: (args: CalculateModuleProxyAddressArgs) => Effect.Effect<Address, RoleError>

    isModuleDeployed: (args: IsModuleDeployedArgs) => Effect.Effect<boolean, RoleError>

    isModuleEnabled: (args: IsModuleEnabledArgs) => Effect.Effect<boolean, RoleError>
  }
>() {}
