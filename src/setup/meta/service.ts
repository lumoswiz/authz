import { Context, type Effect } from "effect"
import type { MetaTransactionData } from "../../shared/types.js"
import type { MetaError } from "./errors.js"
import type { BuildMultisendExecMetaTxArgs } from "./types.js"

export class MetaService extends Context.Tag("MetaService")<
  MetaService,
  {
    buildMultisendExecMetaTx: (args: BuildMultisendExecMetaTxArgs) => Effect.Effect<MetaTransactionData, MetaError>
  }
>() {}
