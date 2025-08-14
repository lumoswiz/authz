import { Context, type Effect } from "effect"
import type { MetaTransactionData, TransactionData } from "../../shared/types.js"
import type { BuilderError } from "./errors.js"
import type { BuildAllTxArgs } from "./types.js"

export class BuilderService extends Context.Tag("BuilderService")<
  BuilderService,
  {
    buildAllTx: (args: BuildAllTxArgs) => Effect.Effect<{
      setupTxs: Array<TransactionData>
      multisendTxs: Array<MetaTransactionData>
    }, BuilderError>
  }
>() {}
