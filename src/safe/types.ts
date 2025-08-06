import type { Address, Hex, TypedDataDomain, TypedDataParameter } from "viem"

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

export interface SafeTransactionData extends MetaTransactionData {
  readonly operation: OperationType
  readonly safeTxGas: bigint
  readonly baseGas: bigint
  readonly gasPrice: bigint
  readonly gasToken: Address
  readonly refundReceiver: Address
  readonly nonce: bigint
}

export type TypedMessageTypes = Record<string, Array<TypedDataParameter>>

export interface EIP712TypedData {
  domain: TypedDataDomain
  types: TypedMessageTypes
  message: Record<string, unknown>
  primaryType: string
}

export interface SafeEIP712Args {
  safeAddress: Address
  safeVersion: string
  chainId: number
  data: SafeTransactionData | EIP712TypedData | Hex
}

export interface EIP712TxTypes {
  EIP712Domain: Array<TypedDataParameter>
  SafeTx: Array<TypedDataParameter>
}
