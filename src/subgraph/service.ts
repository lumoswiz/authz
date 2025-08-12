import type { Effect } from "effect"
import { Context } from "effect"
import type { Address, Hex } from "viem"
import type { SubgraphError } from "./errors.js"
import type { SubgraphRole } from "./types.js"

export class SubgraphService extends Context.Tag("SubgraphService")<
  SubgraphService,
  {
    fetchRole: (args: {
      chainId: number
      moduleAddress: Address
      roleKey: Hex
    }) => Effect.Effect<SubgraphRole | null, SubgraphError>
  }
>() {}
