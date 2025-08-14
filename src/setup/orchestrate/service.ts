import { Context, type Effect } from "effect"
import type { OrchestrateError } from "./errors.js"
import type { OrchestrateArgs, OrchestrateResult } from "./types.js"

export class OrchestrateService extends Context.Tag("OrchestrateService")<
  OrchestrateService,
  {
    orchestrate: (
      args: OrchestrateArgs
    ) => Effect.Effect<OrchestrateResult, OrchestrateError>
  }
>() {}
