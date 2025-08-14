import type { Address, Hex, TypedDataDomain, TypedDataParameter } from "viem"
import type { MetaTransactionData, OperationType } from "../shared/types.js"

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

export interface SafeModuleArgs {
  readonly safe: Address
  readonly module: Address
}

export interface SafeOwnerArgs {
  readonly safe: Address
  readonly owner: Address
}

export interface SafeTxInputArgs {
  readonly safe: Address
  readonly to: Address
  readonly data: Hex
  readonly operation?: OperationType
  readonly useOnChainNonce?: boolean
}

export type BuildEnableModuleTxArgs = SafeModuleArgs
export type IsModuleEnabledArgs = SafeModuleArgs

export type BuildSafeTransactionDataArgs = SafeTxInputArgs
export type BuildSignSafeTxArgs = SafeTxInputArgs

export interface BuildExecTransactionArgs {
  readonly safe: Address
  readonly tx: SafeTransactionData
  readonly signatures: Hex
}

export interface BuildSafeDeploymentTxArgs {
  readonly owner: Address
  readonly saltNonce: bigint
}

export interface CalculateSafeAddressArgs {
  readonly owners: Array<Address>
  readonly saltNonce: bigint
}

export interface GetSafeTransactionHashArgs {
  readonly safe: Address
  readonly tx: SafeTransactionData
  readonly version: string
  readonly chainId: number
}
