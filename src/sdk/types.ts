import type { Account, Address } from "viem"
import type { SdkTransportConfig } from "../client/types.js"
import type { ExecResult } from "../setup/execute/types.js"
import type { OrchestrateOptions } from "../setup/orchestrate/types.js"
import type { RolesSetupConfig } from "../setup/types.js"

export interface ConstructorArgs {
  readonly chainId: number
  readonly transport?: SdkTransportConfig
}

export interface RunSetupArgs {
  readonly safe: Address
  readonly account: Account
  readonly config: RolesSetupConfig
  readonly maybeSaltNonce?: bigint | undefined
  readonly options?: OrchestrateOptions | undefined
}

export type RunSetupResult = ExecResult
