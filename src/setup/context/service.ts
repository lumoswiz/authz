import { Context, type Effect } from "effect"
import type { ResolvedSafeContext } from "../types.js"
import type { SetupContextError } from "./errors.js"
import type { ResolveArgs } from "./types.js"

export class ContextService extends Context.Tag("ContextService")<
  ContextService,
  {
    resolve: (args: ResolveArgs) => Effect.Effect<ResolvedSafeContext, SetupContextError>
  }
>() {}
