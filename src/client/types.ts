import type { CustomTransportConfig, EIP1193Provider, FallbackTransportConfig, HttpTransportConfig } from "viem"
import type { CHAINS } from "./constants.js"

export type SupportedChainId = (typeof CHAINS)[number]["id"]

export type SdkTransportConfig =
  | { readonly type: "http"; readonly url?: string; readonly options?: HttpTransportConfig }
  | { readonly type: "custom"; readonly provider: EIP1193Provider; readonly options?: CustomTransportConfig }
  | {
    readonly type: "fallback"
    readonly transports: ReadonlyArray<SdkTransportConfig>
    readonly options?: FallbackTransportConfig
  }

export type HttpInput = string | { readonly url?: string; readonly options?: HttpTransportConfig }
export type CustomInput = EIP1193Provider | {
  readonly provider: EIP1193Provider
  readonly options?: CustomTransportConfig
}

export type FallbackInput =
  | ReadonlyArray<TransportInput>
  | { readonly transports: ReadonlyArray<TransportInput>; readonly options?: FallbackTransportConfig }

export type TransportInput =
  | SdkTransportConfig
  | HttpInput
  | CustomInput
  | FallbackInput
