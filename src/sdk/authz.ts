import { Effect } from "effect"
import { type Address } from "viem"

import { RoleService } from "../roles/service.js"
import { SafeService } from "../safe/service.js"
import { ContextService } from "../setup/context/service.js"
import type { ExecResult } from "../setup/execute/types.js"
import { OrchestrateService } from "../setup/orchestrate/service.js"

import { makeSetupRuntime } from "./runtime.js"
import type { ConstructorArgs, RunSetupArgs } from "./types.js"
import { buildPublicClient } from "./utils.js"

export class Authz {
  private readonly run: <A, E>(
    eff: Effect.Effect<A, E, OrchestrateService | SafeService | RoleService | ContextService>
  ) => Promise<A>

  constructor(args: ConstructorArgs) {
    const publicClient = Effect.runSync(buildPublicClient(args))
    this.run = makeSetupRuntime(publicClient).run
  }

  getPredictedSafeAddress(owner: Address, saltNonce: bigint): Promise<Address> {
    return this.run(
      SafeService.pipe(
        Effect.flatMap((svc) => svc.calculateSafeAddress({ owners: [owner], saltNonce }))
      )
    )
  }

  getPredictedRolesAddress(safe: Address, saltNonce: bigint): Promise<Address> {
    return this.run(
      RoleService.pipe(
        Effect.flatMap((svc) => svc.calculateModuleProxyAddress({ safe, saltNonce }))
      )
    )
  }

  runSetup(args: RunSetupArgs): Promise<ExecResult> {
    const { account, config, maybeSaltNonce, options, safe } = args
    return this.run(
      Effect.gen(function*() {
        const ctxSvc = yield* ContextService
        const orch = yield* OrchestrateService

        const context = yield* ctxSvc.resolve({
          safe,
          owner: account.address,
          ...(maybeSaltNonce !== undefined ? { maybeSaltNonce } : {})
        })

        const result = yield* orch.orchestrate({
          context,
          account,
          config,
          ...(options ? { options } : {})
        })

        return result
      })
    )
  }
}
