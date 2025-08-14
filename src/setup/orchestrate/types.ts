import type { Account } from "viem"
import type { MetaTransactionData, TransactionData } from "../../shared/types.js"
import type { ExecResult } from "../execute/types.js"
import type { ResolvedSafeContext, RolesSetupConfig } from "../types.js"

export interface OrchestrateOptions {
  readonly extraSetupTxs?: ReadonlyArray<TransactionData>
  readonly extraMultisendTxs?: ReadonlyArray<MetaTransactionData>
}

export interface OrchestrateArgs {
  readonly context: ResolvedSafeContext
  readonly account: Account
  readonly config: RolesSetupConfig
  readonly options?: OrchestrateOptions
}

export type OrchestrateResult = ExecResult
