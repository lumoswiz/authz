import type { Address } from "viem"
import type { MetaTransactionData, TransactionData } from "../../shared/types.js"
import type { ResolvedSafeContext, RolesSetupConfig } from "../types.js"

export interface BuildAllTxOptions {
  readonly extraSetupTxs?: ReadonlyArray<TransactionData>
  readonly extraMultisendTxs?: ReadonlyArray<MetaTransactionData>
}

export interface BuildAllTxArgs {
  readonly context: ResolvedSafeContext
  readonly owner: Address
  readonly config: RolesSetupConfig
  readonly options?: BuildAllTxOptions
  readonly chainId: number
}
