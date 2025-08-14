import type { Effect } from "effect"
import { Context } from "effect"
import type { Account, Address, Hex } from "viem"
import type { SafeTransactionData } from "../../safe/types.js"
import type { MetaTransactionData } from "../../shared/types.js"
import type { SigningError } from "./errors.js"

export class SigningService extends Context.Tag("SigningService")<
  SigningService,
  {
    signTx: (args: {
      safe: Address
      txData: SafeTransactionData
      account: Account
    }) => Effect.Effect<Hex, SigningError>

    signMultisendTx: (args: {
      safe: Address
      multisendTxs: ReadonlyArray<MetaTransactionData>
      account: Account
      isDeployed?: boolean
    }) => Effect.Effect<{ txData: SafeTransactionData; signature: Hex }, SigningError>
  }
>() {}
