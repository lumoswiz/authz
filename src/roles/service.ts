import type { Effect } from "effect"
import { Context } from "effect"
import type { Address } from "viem"
import type { TransactionData } from "../shared/types.js"
import type { RoleError } from "./errors.js"

export class RoleService extends Context.Tag("RoleService")<
  RoleService,
  {
    buildDeployModuleTx: (args: {
      safe: Address
      saltNonce: bigint
    }) => Effect.Effect<TransactionData, RoleError>

    calculateModuleProxyAddress: (args: {
      safe: Address
      saltNonce: bigint
    }) => Effect.Effect<Address, RoleError>
  }
>() {}
