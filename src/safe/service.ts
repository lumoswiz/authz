import { Effect } from "effect"
import { type Address } from "viem"
import type { SafeError } from "./errors.js"

export class SafeService extends Effect.Tag("SafeService")<
  SafeService,
  {
    getNonce: (safe: Address) => Effect.Effect<bigint, SafeError>
    getOwners: (safe: Address) => Effect.Effect<Array<Address>, SafeError>
    getVersion: (safe: Address) => Effect.Effect<string, SafeError>
  }
>() {}
