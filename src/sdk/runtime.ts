import { Effect, Layer } from "effect"
import { ViemClientLive } from "../client/live.js"
import { SafeServiceLive } from "../safe/live.js"
import type { SafeService } from "../safe/service.js"
import { SubgraphServiceLive } from "../subgraph/live.js"
import type { SubgraphService } from "../subgraph/service.js"

//
// Safe runtime — depends on ViemClient
//
const SafeLive = SafeServiceLive.pipe(
  Layer.provide(ViemClientLive)
)

export const runSafe = <A, E>(
  effect: Effect.Effect<A, E, SafeService>
): Promise<A> => Effect.runPromise(Effect.provide(effect, SafeLive))

//
// Subgraph runtime — does NOT depend on ViemClient
//
const SubgraphLive = SubgraphServiceLive

export const runSubgraph = <A, E>(
  effect: Effect.Effect<A, E, SubgraphService>
): Promise<A> => Effect.runPromise(Effect.provide(effect, SubgraphLive))

//
// Combined runtime — provides both Safe + Subgraph
//
const Live = Layer.merge(SafeLive, SubgraphLive)

export const provideLive = <A, E>(
  effect: Effect.Effect<A, E, SafeService | SubgraphService>
): Effect.Effect<A, E, never> => Effect.provide(effect, Live)

export const run = <A, E>(
  effect: Effect.Effect<A, E, SafeService | SubgraphService>
): Promise<A> => Effect.runPromise(provideLive(effect))
