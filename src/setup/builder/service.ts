import type { Effect } from "effect"
import { Context } from "effect"
import type { Address } from "viem"
import type { MetaTransactionData, TransactionData } from "../../shared/types.js"
import type { ResolvedSafeContext, RolesSetupConfig } from "../types.js"
import type { BuilderError } from "./errors.js"

export class BuilderService extends Context.Tag("BuilderService")<
  BuilderService,
  {
    buildAllTx: (args: {
      context: ResolvedSafeContext
      owner: Address
      config: RolesSetupConfig
      options?: {
        extraSetupTxs?: ReadonlyArray<TransactionData>
        extraMultisendTxs?: ReadonlyArray<MetaTransactionData>
      }
      chainId: number
    }) => Effect.Effect<{
      setupTxs: Array<TransactionData>
      multisendTxs: Array<MetaTransactionData>
    }, BuilderError>
  }
>() {}
