import { Data } from "effect"
import type { Address } from "viem"

export type ExecError = BroadcastError

export class BroadcastError extends Data.TaggedError("BroadcastError")<{
  safe: Address
  cause: unknown
}> {}
