import type { Effect } from "effect"
import { Context } from "effect"
import type { ResolvedSafeContext, RolesSetupConfig, SetupStage } from "../types.js"
import type { StageError } from "./errors.js"

export class StageService extends Context.Tag("StageService")<
  StageService,
  {
    determineStartStage: (args: {
      context: ResolvedSafeContext
      config: RolesSetupConfig
      chainId: number
    }) => Effect.Effect<SetupStage, StageError>
  }
>() {}
