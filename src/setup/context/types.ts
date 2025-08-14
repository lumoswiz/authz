import type { Address } from "viem"

export interface OwnershipPolicy {
  readonly validate: (owners: ReadonlyArray<Address>, expectedSigner: Address) => boolean
}

export interface ResolveArgs {
  readonly safe: Address
  readonly owner: Address
  readonly maybeSaltNonce?: bigint
  readonly policy?: OwnershipPolicy
}
