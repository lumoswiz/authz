import { type Address, type Hex } from "viem"
import { fetchRole } from "../src/sdk/subgraph.js"

// Example: pnpm tsx ./scripts/fetch-role.ts 8453 0x14E522a7Ee527DFbfEEbB5F81578B9B4d3872844 0x27f294e9e6bb2a10580760fb315517b99e1eb648c904a30706e3bc9e1953d3a4

const [chainIdStr, moduleAddress, roleKey] = process.argv.slice(2)

if (!chainIdStr || !moduleAddress || !roleKey) {
  console.error("Usage: tsx scripts/fetchRole.ts <CHAIN_ID> <MODULE_ADDRESS> <ROLE_KEY>")
  process.exit(1)
}

const chainId = Number(chainIdStr)

fetchRole({
  chainId,
  moduleAddress: moduleAddress as Address,
  roleKey: roleKey as Hex
})
  .then((role) => {
    if (!role) {
      console.log("Role not found.")
    } else {
      console.dir(role, { depth: null })
    }
  })
  .catch((err) => {
    console.error("Error:", err)
    process.exit(1)
  })
