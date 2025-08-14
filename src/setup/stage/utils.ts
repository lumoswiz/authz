import type { SubgraphRole } from "src/subgraph/types.js"
import type { Address, Hex } from "viem"
import type { RoleSubgraphStatus } from "../types.js"

export function getRoleSubgraphStatus(
  role: SubgraphRole,
  member: Address,
  target: Address,
  selectors: ReadonlyArray<Hex>
): RoleSubgraphStatus {
  const assigned = role.members.length > 0
  const assignedToMember = role.members.some((m) => m.address.toLowerCase() === member.toLowerCase())
  const scopedTarget = role.targets.find((t) => t.address.toLowerCase() === target.toLowerCase())
  const targetScoped = !!scopedTarget
  const scopedSelectors = new Set(scopedTarget?.functions.map((f) => f.selector.toLowerCase()) ?? [])
  const normalized = selectors.map((s) => s.toLowerCase() as Hex)
  const missing = normalized.filter((sel) => !scopedSelectors.has(sel))
  return {
    assigned,
    assignedToMember,
    targetScoped,
    selectorsScoped: missing.length === 0,
    ...(missing.length > 0 ? { missingSelectors: missing as ReadonlyArray<Hex> } : {})
  }
}
