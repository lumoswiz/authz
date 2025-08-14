import { Data } from "effect"
import type { Address, Hex } from "viem"

export type ExecError =
  | BroadcastError
  | WaitReceiptError
  | MissingSendCallsSupportError

export class BroadcastError extends Data.TaggedError("BroadcastError")<{
  safe: Address
  cause: unknown
}> {}

export class WaitReceiptError extends Data.TaggedError("WaitReceiptError")<{
  safe: Address
  hash: Hex
  cause: unknown
}> {}

export class MissingSendCallsSupportError extends Data.TaggedError("MissingSendCallsSupportError")<{
  chainId: number
}> {}
