import type { Effect } from "effect"
import { Context } from "effect"
import type { Address } from "viem"
import type { RoleError } from "./errors.js"

export class RoleService extends Context.Tag("RoleService")<
  RoleService,
  {
    calculateModuleProxyAddress: (args: {
      safe: Address
      saltNonce: bigint
    }) => Effect.Effect<Address, RoleError>
  }
>() {}
