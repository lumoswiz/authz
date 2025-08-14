import { Context, type Effect } from "effect"
import type { SetupStage } from "../types.js"
import type { StageError } from "./errors.js"
import type { DetermineStartStageArgs } from "./types.js"

export class StageService extends Context.Tag("StageService")<
  StageService,
  {
    determineStartStage: (args: DetermineStartStageArgs) => Effect.Effect<SetupStage, StageError>
  }
>() {}
