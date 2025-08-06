import type { Effect } from "effect"
import { Context } from "effect"
import type { Hex } from "viem"
import type { MetaTransactionData } from "../shared/types.js"

export class MultiSendService extends Context.Tag("MultiSendService")<
  MultiSendService,
  {
    encodeMulti: (
      txs: ReadonlyArray<MetaTransactionData>
    ) => Effect.Effect<MetaTransactionData, never>
    decodeMulti: (data: Hex) => Effect.Effect<Array<MetaTransactionData>, never>
  }
>() {}
