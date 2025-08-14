import type { Effect } from "effect"
import { Context } from "effect"
import type { Address, Hex } from "viem"
import type { TransactionData } from "../shared/types.js"
import type { SafeError } from "./errors.js"
import type {
  BuildEnableModuleTxArgs,
  BuildExecTransactionArgs,
  BuildSafeDeploymentTxArgs,
  BuildSafeTransactionDataArgs,
  BuildSignSafeTxArgs,
  CalculateSafeAddressArgs,
  GetSafeTransactionHashArgs,
  IsModuleEnabledArgs,
  SafeOwnerArgs,
  SafeTransactionData
} from "./types.js"

export class SafeService extends Context.Tag("SafeService")<
  SafeService,
  {
    buildEnableModuleTx: (args: BuildEnableModuleTxArgs) => Effect.Effect<TransactionData, never>
    buildExecTransaction: (args: BuildExecTransactionArgs) => Effect.Effect<TransactionData, never>
    buildSafeDeploymentTx: (args: BuildSafeDeploymentTxArgs) => Effect.Effect<TransactionData, SafeError>
    buildSafeTransactionData: (args: BuildSafeTransactionDataArgs) => Effect.Effect<SafeTransactionData, SafeError>
    buildSignSafeTx: (
      args: BuildSignSafeTxArgs
    ) => Effect.Effect<{ txData: SafeTransactionData; safeTxHash: Hex }, SafeError>
    calculateSafeAddress: (args: CalculateSafeAddressArgs) => Effect.Effect<Address, SafeError>
    getNonce: (safe: Address, useOnChainNonce: boolean) => Effect.Effect<bigint, SafeError>
    getOwners: (safe: Address) => Effect.Effect<Array<Address>, SafeError>
    getSafeTransactionHash: (args: GetSafeTransactionHashArgs) => Effect.Effect<Hex, SafeError>
    getThreshold: (safe: Address) => Effect.Effect<bigint, SafeError>
    getVersion: (safe: Address) => Effect.Effect<string, SafeError>
    isModuleEnabled: (args: IsModuleEnabledArgs) => Effect.Effect<boolean, SafeError>
    isOwner: (args: SafeOwnerArgs) => Effect.Effect<boolean, SafeError>
  }
>() {}
