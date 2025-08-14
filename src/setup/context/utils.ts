import type { OwnershipPolicy } from "./types.js"

export const OneOfOneOwnership: OwnershipPolicy = {
  validate: (owners, expected) => owners.length === 1 && owners[0]?.toLowerCase() === expected.toLowerCase()
}
