import { type Address } from "viem"
import { getOwners } from "../src/sdk/safe.js"

const safeAddress = process.argv[2] as Address | undefined

if (!safeAddress) {
  console.error("Usage: tsx scripts/owners.ts <SAFE_ADDRESS>")
  process.exit(1)
}

getOwners(safeAddress)
  .then((owners) => {
    console.log("Owners:", owners)
  })
  .catch((err) => {
    console.error("Error:", err)
    process.exit(1)
  })
