import { Effect, Layer } from "effect"
import type { PublicClient } from "viem"
import { ViemClient } from "../client/service.js"
import { MultiSendServiceLive } from "../multisend/live.js"
import { RoleServiceLive } from "../roles/live.js"
import type { RoleService } from "../roles/service.js"
import { SafeServiceLive } from "../safe/live.js"
import type { SafeService } from "../safe/service.js"
import { BuilderServiceLive } from "../setup/builder/live.js"
import { ContextServiceLive } from "../setup/context/live.js"
import type { ContextService } from "../setup/context/service.js"
import { ExecServiceLive } from "../setup/execute/live.js"
import { MetaServiceLive } from "../setup/meta/live.js"
import { OrchestrateServiceLive } from "../setup/orchestrate/live.js"
import type { OrchestrateService } from "../setup/orchestrate/service.js"
import { SigningServiceLive } from "../setup/signing/live.js"
import { StageServiceLive } from "../setup/stage/live.js"
import { SubgraphServiceLive } from "../subgraph/live.js"

export const makeSetupRuntime = (publicClient: PublicClient) => {
  const ViemFromArg = Layer.succeed(ViemClient, { publicClient })

  const SafeLive = SafeServiceLive.pipe(Layer.provide(ViemFromArg))
  const RoleLive = RoleServiceLive.pipe(Layer.provide(ViemFromArg))
  const MultiSendLive = MultiSendServiceLive
  const SubgraphLive = SubgraphServiceLive

  const ContextLive = ContextServiceLive.pipe(
    Layer.provide(SafeLive),
    Layer.provide(ViemFromArg)
  )

  const StageLive = StageServiceLive.pipe(
    Layer.provide(RoleLive),
    Layer.provide(SafeLive),
    Layer.provide(SubgraphLive)
  )

  const BuilderLive = BuilderServiceLive.pipe(
    Layer.provide(StageLive),
    Layer.provide(SafeLive),
    Layer.provide(RoleLive)
  )

  const SigningLive = SigningServiceLive.pipe(
    Layer.provide(ViemFromArg),
    Layer.provide(SafeLive),
    Layer.provide(MultiSendLive)
  )

  const ExecLive = ExecServiceLive.pipe(Layer.provide(ViemFromArg))

  const MetaLive = MetaServiceLive.pipe(
    Layer.provide(SafeLive),
    Layer.provide(SigningLive)
  )

  const OrchestrateLive = OrchestrateServiceLive.pipe(
    Layer.provide(ContextLive),
    Layer.provide(BuilderLive),
    Layer.provide(MetaLive),
    Layer.provide(ExecLive)
  )

  const Live = Layer.mergeAll(OrchestrateLive, SafeLive, RoleLive, ContextLive)

  const run = <A, E>(
    eff: Effect.Effect<A, E, OrchestrateService | SafeService | RoleService | ContextService>
  ) =>
    Effect.runPromise(
      Effect.provide(eff, Layer.provide(Live, ViemFromArg))
    )

  return { run }
}
