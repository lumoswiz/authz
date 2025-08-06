import { Effect, Layer } from "effect"
import { ViemClientLive } from "../client/live.js"
import { SafeServiceLive } from "../safe/live.js"
import type { SafeService } from "../safe/service.js"

const Live = SafeServiceLive.pipe(
  Layer.provide(ViemClientLive)
)

export const provideLive = <A, E>(
  effect: Effect.Effect<A, E, SafeService>
): Effect.Effect<A, E, never> => Effect.provide(effect, Live)

export const run = <A, E>(
  effect: Effect.Effect<A, E, SafeService>
): Promise<A> => Effect.runPromise(provideLive(effect))
