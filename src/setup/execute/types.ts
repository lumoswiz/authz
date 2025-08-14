import type { Account, Address, Hex } from "viem"
import type { TransactionData } from "../../shared/types.js"

export type ExecutionMode = "sendTransactions" | "sendCalls"

export interface ExecResult {
  readonly hashes: ReadonlyArray<Hex>
}

export interface ExecuteArgs {
  readonly mode: ExecutionMode
  readonly account: Account
  readonly chainId: number
  readonly safe: Address
  readonly txs: ReadonlyArray<TransactionData>
  readonly wait?: boolean
}
