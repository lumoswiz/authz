import { Context, type Effect } from "effect"
import type { Hex } from "viem"
import type { SafeTransactionData } from "../../safe/types.js"
import type { SigningError } from "./errors.js"
import type { SignMultisendTxArgs, SignTxArgs } from "./types.js"

export class SigningService extends Context.Tag("SigningService")<
  SigningService,
  {
    signTx: (args: SignTxArgs) => Effect.Effect<Hex, SigningError>

    signMultisendTx: (
      args: SignMultisendTxArgs
    ) => Effect.Effect<{ txData: SafeTransactionData; signature: Hex }, SigningError>
  }
>() {}
