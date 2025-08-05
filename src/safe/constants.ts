import type { Address } from "viem"

export const ZERO_ADDRESS: Address = "0x0000000000000000000000000000000000000000"

export const GAS_DEFAULTS = {
  safeTxGas: 0n,
  baseGas: 0n,
  gasPrice: 0n
} as const
