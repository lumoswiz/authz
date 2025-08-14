import type { Account, Address } from "viem"
import type { MetaTransactionData } from "../../shared/types.js"

export interface BuildMultisendExecMetaTxArgs {
  readonly safe: Address
  readonly multisendTxs: ReadonlyArray<MetaTransactionData>
  readonly account: Account
  readonly isDeployed?: boolean
}
