import { Effect } from "effect"
import { custom, fallback, http, type Transport } from "viem"
import { TransportBuildError } from "./errors.js"
import type { SdkTransportConfig } from "./types.js"

export const defaultTransport: SdkTransportConfig = { type: "http" }

export const makeTransport = (
  config: SdkTransportConfig
): Effect.Effect<Transport, TransportBuildError, never> =>
  config.type === "http"
    ? Effect.try({
      try: () => http(config.url, config.options),
      catch: (cause) => new TransportBuildError({ config, cause })
    })
    : config.type === "custom"
    ? Effect.try({
      try: () => custom(config.provider, config.options),
      catch: (cause) => new TransportBuildError({ config, cause })
    })
    : Effect.gen(function*() {
      if (config.transports.length === 0) {
        return yield* Effect.fail(
          new TransportBuildError({ config, cause: new Error("Empty fallback transports") })
        )
      }
      const parts = yield* Effect.forEach(config.transports, (t) => makeTransport(t), { discard: false })
      return fallback(parts, config.options)
    }).pipe(Effect.mapError((cause) => new TransportBuildError({ config, cause })))
