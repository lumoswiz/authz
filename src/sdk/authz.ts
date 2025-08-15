import { Effect, Option, SynchronizedRef } from "effect"
import type { Account, Address, PublicClient } from "viem"

import { RoleService } from "../roles/service.js"
import { SafeService } from "../safe/service.js"
import { ContextService } from "../setup/context/service.js"
import type { ExecResult } from "../setup/execute/types.js"
import { OrchestrateService } from "../setup/orchestrate/service.js"

import { makeSetupRuntime } from "./runtime.js"
import type { AccountInput, ConstructorArgs, RunSetupArgs } from "./types.js"
import { buildPublicClient, resolveAccount } from "./utils.js"

export class Authz {
  private readonly run: <A, E>(
    eff: Effect.Effect<A, E, OrchestrateService | SafeService | RoleService | ContextService>
  ) => Promise<A>

  private readonly accountRef: SynchronizedRef.SynchronizedRef<Option.Option<Account>>

  constructor(args: ConstructorArgs) {
    const publicClient: PublicClient = Effect.runSync(buildPublicClient(args))
    const initial = Effect.runSync(resolveAccount(args.account))
    this.accountRef = Effect.runSync(SynchronizedRef.make(Option.some(initial)))
    this.run = makeSetupRuntime(publicClient).run
  }

  setAccount(input: AccountInput): Promise<void> {
    return Effect.runPromise(
      SynchronizedRef.updateEffect(this.accountRef, () => resolveAccount(input).pipe(Effect.map(Option.some))).pipe(
        Effect.asVoid
      )
    )
  }

  private getStoredAccount(): Effect.Effect<Account, never, never> {
    return SynchronizedRef.get(this.accountRef).pipe(
      Effect.flatMap((
        opt
      ) => (Option.isSome(opt) ? Effect.succeed(opt.value) : Effect.die(new Error("invariant: missing account"))))
    )
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
    const { config, maybeSaltNonce, options, safe } = args
    const accEff = this.getStoredAccount()

    const eff = Effect.gen(function*() {
      const account = yield* accEff
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

    return this.run(eff)
  }
}
