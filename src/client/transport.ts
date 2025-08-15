import { Effect } from "effect"
import {
  custom,
  type CustomTransportConfig,
  type EIP1193Provider,
  fallback,
  type FallbackTransportConfig,
  http,
  type HttpTransportConfig,
  type Transport
} from "viem"
import { TransportBuildError } from "./errors.js"
import type { CustomInput, FallbackInput, HttpInput, SdkTransportConfig, TransportInput } from "./types.js"

export const defaultTransport: SdkTransportConfig = { type: "http" }

const isProvider = (u: unknown): u is EIP1193Provider =>
  !!u && typeof u === "object" && "request" in (u as any) && typeof (u as any).request === "function"

const isSdkConfig = (u: unknown): u is SdkTransportConfig =>
  !!u && typeof u === "object" && "type" in (u as any) &&
  ((u as any).type === "http" || (u as any).type === "custom" || (u as any).type === "fallback")

const isFallbackObject = (u: unknown): u is Extract<FallbackInput, { transports: ReadonlyArray<TransportInput> }> =>
  !!u && typeof u === "object" && Array.isArray((u as any).transports)

const isCustomObject = (u: unknown): u is Extract<CustomInput, { provider: EIP1193Provider }> =>
  !!u && typeof u === "object" && "provider" in (u as any) && isProvider((u as any).provider)

const httpConfig = (h: HttpInput): SdkTransportConfig =>
  typeof h === "string"
    ? { type: "http", url: h }
    : {
      type: "http",
      ...(h.url !== undefined ? { url: h.url } : {}),
      ...(h.options !== undefined ? { options: h.options } : {})
    }

export const normalizeTransport = (input?: TransportInput): SdkTransportConfig => {
  if (input === undefined) return defaultTransport
  if (typeof input === "string") return { type: "http", url: input }
  if (Array.isArray(input)) {
    const transports = input.map(normalizeTransport) as ReadonlyArray<SdkTransportConfig>
    return { type: "fallback", transports }
  }
  if (isProvider(input)) return { type: "custom", provider: input }
  if (isSdkConfig(input)) return input
  if (isCustomObject(input)) {
    return {
      type: "custom",
      provider: input.provider,
      ...(input.options !== undefined ? { options: input.options } : {})
    }
  }
  if (isFallbackObject(input)) {
    const transports = input.transports.map(normalizeTransport) as ReadonlyArray<SdkTransportConfig>
    return { type: "fallback", transports, ...(input.options !== undefined ? { options: input.options } : {}) }
  }
  return httpConfig(input as HttpInput)
}

export const makeTransport = (
  config: SdkTransportConfig
): Effect.Effect<Transport, TransportBuildError, never> =>
  config.type === "http"
    ? Effect.try({
      try: () => http(config.url, config.options as HttpTransportConfig | undefined),
      catch: (cause) => new TransportBuildError({ config, cause })
    })
    : config.type === "custom"
    ? Effect.try({
      try: () => custom(config.provider, config.options as CustomTransportConfig | undefined),
      catch: (cause) => new TransportBuildError({ config, cause })
    })
    : Effect.gen(function*() {
      if (config.transports.length === 0) {
        return yield* Effect.fail(
          new TransportBuildError({ config, cause: new Error("Empty fallback transports") })
        )
      }
      const parts = yield* Effect.forEach(config.transports, (t) => makeTransport(t), { discard: false })
      return fallback(parts, config.options as FallbackTransportConfig | undefined)
    }).pipe(Effect.mapError((cause) => new TransportBuildError({ config, cause })))

export const buildTransport = (input?: TransportInput) =>
  Effect.sync(() => normalizeTransport(input)).pipe(Effect.flatMap(makeTransport))
