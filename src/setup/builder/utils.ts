import { Effect } from "effect"
import { SetupStage, stagesFrom } from "../types.js"
import type { RolesSetupConfig } from "../types.js"
import type { BuilderError } from "./errors.js"
import {
  AssignRolesRequiresMemberError,
  AssignRolesRequiresRoleKeyError,
  MissingRolesSetupError,
  ScopeFunctionsRequiresRoleKeyError,
  ScopeFunctionsRequiresScopesError,
  ScopeFunctionsRequiresTargetError,
  ScopeTargetRequiresTargetError
} from "./errors.js"

export const buildPlan = (startAt: SetupStage): ReadonlyArray<SetupStage> =>
  stagesFrom(startAt).filter((s) => s !== SetupStage.NothingToDo)

export const includesStage = (startAt: SetupStage, stage: SetupStage): boolean => buildPlan(startAt).includes(stage)

export const validateForStart = (
  startAt: SetupStage,
  config: RolesSetupConfig
): Effect.Effect<void, BuilderError> => {
  const setup = config.rolesSetup

  if (includesStage(startAt, SetupStage.ScopeFunctions) && !setup) {
    return Effect.fail<BuilderError>(new MissingRolesSetupError({ startAt }))
  }
  if (includesStage(startAt, SetupStage.AssignRoles)) {
    if (!setup?.member) return Effect.fail<BuilderError>(new AssignRolesRequiresMemberError({ startAt }))
    if (!setup?.roleKey) return Effect.fail<BuilderError>(new AssignRolesRequiresRoleKeyError({ startAt }))
  }
  if (includesStage(startAt, SetupStage.ScopeTarget)) {
    if (!setup?.target) return Effect.fail<BuilderError>(new ScopeTargetRequiresTargetError({ startAt }))
  }
  if (includesStage(startAt, SetupStage.ScopeFunctions)) {
    if (!setup?.scopes) return Effect.fail<BuilderError>(new ScopeFunctionsRequiresScopesError({ startAt }))
    if (!setup?.roleKey) return Effect.fail<BuilderError>(new ScopeFunctionsRequiresRoleKeyError({ startAt }))
    if (!setup?.target) return Effect.fail<BuilderError>(new ScopeFunctionsRequiresTargetError({ startAt }))
  }

  return Effect.void as Effect.Effect<void, BuilderError>
}
