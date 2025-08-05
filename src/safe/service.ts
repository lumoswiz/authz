import { Effect } from "effect"
import { type Address } from "viem"
import type { SafeError } from "./errors.js"
import type { MetaTransactionData } from "./types.js"

export class SafeService extends Effect.Tag("SafeService")<
  SafeService,
  {
    buildEnableModuleTx: (args: {
      safe: Address
      module: Address
    }) => Effect.Effect<MetaTransactionData, never>
    getNonce: (safe: Address) => Effect.Effect<bigint, SafeError>
    getOwners: (safe: Address) => Effect.Effect<Array<Address>, SafeError>
    getThreshold: (safe: Address) => Effect.Effect<bigint, SafeError>
    getVersion: (safe: Address) => Effect.Effect<string, SafeError>
    isModuleEnabled: (args: { safe: Address; module: Address }) => Effect.Effect<boolean, SafeError>
    isOwner: (args: { safe: Address; owner: Address }) => Effect.Effect<boolean, SafeError>
  }
>() {}
