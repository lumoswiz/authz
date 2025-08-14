import type { Account, Address } from "viem"
import type { SafeTransactionData } from "../../safe/types.js"
import type { MetaTransactionData } from "../../shared/types.js"

export interface SignTxArgs {
  readonly safe: Address
  readonly txData: SafeTransactionData
  readonly account: Account
}

export interface SignMultisendTxArgs {
  readonly safe: Address
  readonly multisendTxs: ReadonlyArray<MetaTransactionData>
  readonly account: Account
  readonly isDeployed?: boolean
}
