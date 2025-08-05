import type { Address, Hex } from "viem"

export const OperationType = {
  Call: 0,
  DelegateCall: 1
} as const

export type OperationType = typeof OperationType[keyof typeof OperationType]

export interface MetaTransactionData {
  readonly to: Address
  readonly value: Hex
  readonly data: Hex
}
