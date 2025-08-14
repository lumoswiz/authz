import { Data } from "effect"
import type { BuilderError } from "../builder/errors.js"
import type { SetupContextError } from "../context/errors.js"
import type { ExecError } from "../execute/errors.js"
import type { MetaError } from "../meta/errors.js"
import type { StageError } from "../stage/errors.js"

export type OrchestrateError =
  | SetupContextError
  | StageError
  | BuilderError
  | MetaError
  | ExecError
  | GetChainIdForOrchestrateError

export class GetChainIdForOrchestrateError extends Data.TaggedError("GetChainIdForOrchestrateError")<{
  cause: unknown
}> {}
