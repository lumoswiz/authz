import type { Address, Hex } from "viem"

export const OperationType = {
  Call: 0,
  DelegateCall: 1
} as const

export type OperationType = typeof OperationType[keyof typeof OperationType]

export interface TransactionData {
  readonly to: Address
  readonly value: Hex
  readonly data: Hex
}

export interface MetaTransactionData extends TransactionData {
  readonly operation: OperationType
}
