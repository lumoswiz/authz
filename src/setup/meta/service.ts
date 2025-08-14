import type { Effect } from "effect"
import { Context } from "effect"
import type { Account, Address } from "viem"
import type { MetaTransactionData } from "../../shared/types.js"
import type { MetaError } from "./errors.js"

export class MetaService extends Context.Tag("MetaService")<
  MetaService,
  {
    buildMultisendExecMetaTx: (args: {
      safe: Address
      multisendTxs: ReadonlyArray<MetaTransactionData>
      account: Account
      isDeployed?: boolean
    }) => Effect.Effect<MetaTransactionData, MetaError>
  }
>() {}
