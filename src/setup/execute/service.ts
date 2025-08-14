import type { Effect } from "effect"
import { Context } from "effect"
import type { ExecError } from "./errors.js"
import type { ExecResult, ExecuteArgs } from "./types.js"

export class ExecService extends Context.Tag("ExecService")<
  ExecService,
  {
    execute: (args: ExecuteArgs) => Effect.Effect<ExecResult, ExecError>
  }
>() {}
