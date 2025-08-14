import type { Effect } from "effect"
import { Context } from "effect"
import type { SubgraphError } from "./errors.js"
import type { FetchRoleArgs, SubgraphRole } from "./types.js"

export class SubgraphService extends Context.Tag("SubgraphService")<
  SubgraphService,
  {
    fetchRole: (args: FetchRoleArgs) => Effect.Effect<SubgraphRole | null, SubgraphError>
  }
>() {}
