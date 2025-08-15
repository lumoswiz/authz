import type { Account, Address, Hex } from "viem"
import type { TransportInput } from "../client/types.js"
import type { ExecResult } from "../setup/execute/types.js"
import type { OrchestrateOptions } from "../setup/orchestrate/types.js"
import type { RolesSetupConfig } from "../setup/types.js"

export interface ConstructorArgs {
  readonly chain: number
  readonly transport?: TransportInput
  readonly account: AccountInput
}

export interface RunSetupArgs {
  readonly safe: Address
  readonly config: RolesSetupConfig
  readonly maybeSaltNonce?: bigint | undefined
  readonly options?: OrchestrateOptions | undefined
}

export type RunSetupResult = ExecResult

export type AccountInput = Account | { readonly privateKey: Hex }
