import type { Effect } from "effect"
import { Context } from "effect"
import type { Address } from "viem"
import type { SetupContextError } from "./errors.js"
import type { ResolvedSafeContext } from "./types.js"

export interface OwnershipPolicy {
  readonly validate: (owners: ReadonlyArray<Address>, expectedSigner: Address) => boolean
}

export const OneOfOneOwnership: OwnershipPolicy = {
  validate: (owners, expected) => owners.length === 1 && owners[0]?.toLowerCase() === expected.toLowerCase()
}

export class ContextService extends Context.Tag("ContextService")<
  ContextService,
  {
    resolve: (args: {
      safe: Address
      owner: Address
      maybeSaltNonce?: bigint
      policy?: OwnershipPolicy
    }) => Effect.Effect<ResolvedSafeContext, SetupContextError>
  }
>() {}
