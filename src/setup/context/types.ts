import type { Address } from "viem"

export type PredictedSafeContext = Readonly<{
  safeAddress: Address
  deployed: false
  saltNonce: bigint
}>

export type DeployedSafeContext = Readonly<{
  safeAddress: Address
  deployed: true
  saltNonce?: never
}>

export type ResolvedSafeContext =
  | PredictedSafeContext
  | DeployedSafeContext
