import { Data } from "effect"
import type { Address } from "viem"
import type { RoleError } from "../../roles/errors.js"
import type { SafeError } from "../../safe/errors.js"
import type { StageError } from "../stage/errors.js"
import type { SetupStage } from "../types.js"

export type BuilderError =
  | StageError
  | RoleError
  | SafeError
  | MissingRolesSetupError
  | AssignRolesRequiresMemberError
  | AssignRolesRequiresRoleKeyError
  | ScopeTargetRequiresTargetError
  | ScopeFunctionsRequiresScopesError
  | ScopeFunctionsRequiresRoleKeyError
  | ScopeFunctionsRequiresTargetError
  | CalculateModuleAddressForBuilderError

export class MissingRolesSetupError extends Data.TaggedError("MissingRolesSetupError")<{
  startAt: SetupStage
}> {}

export class AssignRolesRequiresMemberError extends Data.TaggedError("AssignRolesRequiresMemberError")<{
  startAt: SetupStage
}> {}

export class AssignRolesRequiresRoleKeyError extends Data.TaggedError("AssignRolesRequiresRoleKeyError")<{
  startAt: SetupStage
}> {}

export class ScopeTargetRequiresTargetError extends Data.TaggedError("ScopeTargetRequiresTargetError")<{
  startAt: SetupStage
}> {}

export class ScopeFunctionsRequiresScopesError extends Data.TaggedError("ScopeFunctionsRequiresScopesError")<{
  startAt: SetupStage
}> {}

export class ScopeFunctionsRequiresRoleKeyError extends Data.TaggedError("ScopeFunctionsRequiresRoleKeyError")<{
  startAt: SetupStage
}> {}

export class ScopeFunctionsRequiresTargetError extends Data.TaggedError("ScopeFunctionsRequiresTargetError")<{
  startAt: SetupStage
}> {}

export class CalculateModuleAddressForBuilderError extends Data.TaggedError("CalculateModuleAddressForBuildError")<{
  safe: Address
  saltNonce: bigint
  cause: unknown
}> {}
