import { Effect } from "effect"
import type { Address, Hex } from "viem"
import { SubgraphService } from "../subgraph/service.js"
import type { SubgraphRole } from "../subgraph/types.js"
import { runSubgraph } from "./runtime.js"

export const fetchRole = (args: {
  chainId: number
  moduleAddress: Address
  roleKey: Hex
}): Promise<SubgraphRole | null> =>
  runSubgraph(
    SubgraphService.pipe(
      Effect.flatMap((svc) => svc.fetchRole(args))
    )
  )
