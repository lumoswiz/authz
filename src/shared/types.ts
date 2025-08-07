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

export enum ExecutionOptions {
  None = 0,
  Send = 1,
  DelegateCall = 2,
  Both = 3
}
