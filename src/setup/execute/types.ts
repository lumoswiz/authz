import type { Account, Address } from "viem"
import type { TransactionData } from "../../shared/types.js"

export interface ExecResult {
  readonly id: string
}

export interface ExecuteArgs {
  readonly account: Account
  readonly safe: Address
  readonly txs: ReadonlyArray<TransactionData>
}
