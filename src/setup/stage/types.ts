import type { ResolvedSafeContext, RolesSetupConfig } from "../types.js"

export interface DetermineStartStageArgs {
  readonly context: ResolvedSafeContext
  readonly config: RolesSetupConfig
  readonly chainId: number
}
