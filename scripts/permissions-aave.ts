import "dotenv/config"
import { createPublicClient, http } from "viem"
import type { Address, Hex } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"
import { Authz } from "../src/sdk/authz.js"
import type { RunSetupArgs } from "../src/sdk/types.js"
import { DEFAULT_ROLES_NONCE } from "../src/setup/constants.js"

async function main() {
  const RPC_URL = process.env.RPC_URL!
  const PRIVATE_KEY = process.env.PRIVATE_KEY! as Hex
  if (!RPC_URL || !PRIVATE_KEY) throw new Error("RPC_URL and PRIVATE_KEY must be set")

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(RPC_URL)
  })

  const account = privateKeyToAccount(PRIVATE_KEY)
  const authz = new Authz(publicClient)

  const SAFE: Address = "0x0DE8D7F18D3b9887903dc8CE4198436B7fC1e7fd"
  const SAFE_SALT_NONCE: bigint | undefined = undefined
  const MEMBER: Address = account.address
  const ROLE_KEY: Hex = "0x476f81dfc536cec42e86f95b0de8d7f18d3b9887903dc8ce4198436b7fc1e7fd"

  const config: RunSetupArgs["config"] = {
    rolesNonce: DEFAULT_ROLES_NONCE,
    rolesSetup: {
      member: MEMBER,
      roleKey: ROLE_KEY
    }
  }

  const options: RunSetupArgs["options"] = {
    // Optional extra tx buckets to prepend/append into the plan:
    // extraSetupTxs: [],
    // extraMultisendTxs: [],
  }

  console.log("Starting setup...")
  const res = await authz.runSetup({
    safe: SAFE,
    account,
    ...(SAFE_SALT_NONCE !== undefined ? { SAFE_SALT_NONCE } : {}),
    config,
    ...(options ? { options } : {})
  })

  console.log("Executed. Result:", res)
}

main().catch((err) => {
  console.error("Failed:", err)
  process.exit(1)
})
