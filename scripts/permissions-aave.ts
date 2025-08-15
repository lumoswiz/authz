import "dotenv/config"
import type { Address, Hex } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { Authz } from "../src/sdk/authz.js"
import type { RunSetupArgs } from "../src/sdk/types.js"
import { DEFAULT_ROLES_NONCE } from "../src/setup/constants.js"
import { ExecutionOptions } from "../src/shared/types.js"

async function main() {
  const RPC_URL = process.env.RPC_URL!
  const PRIVATE_KEY = process.env.PRIVATE_KEY! as Hex
  if (!RPC_URL || !PRIVATE_KEY) throw new Error("RPC_URL and PRIVATE_KEY must be set")
  const account = privateKeyToAccount(PRIVATE_KEY)

  const authz = new Authz({ account, chainId: 11155111, transport: { type: "http", url: RPC_URL } })

  const SAFE: Address = "0x0DE8D7F18D3b9887903dc8CE4198436B7fC1e7fd"
  const SAFE_SALT_NONCE: bigint | undefined = undefined
  const MEMBER: Address = account.address
  const ROLE_KEY: Hex = "0x476f81dfc536cec42e86f95b0de8d7f18d3b9887903dc8ce4198436b7fc1e7fd" as Hex
  const TARGET: Address = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951" as Address // Aave V3 Sepolia Pool

  const config: RunSetupArgs["config"] = {
    rolesNonce: DEFAULT_ROLES_NONCE,
    rolesSetup: {
      member: MEMBER,
      roleKey: ROLE_KEY,
      target: TARGET,
      scopes: [
        {
          selectors: [
            "0x617ba037" as Hex // supply(address,uint256,address,uint16)
          ],
          execOpts: ExecutionOptions.Send
          // conditions: []
        }
      ]
    }
  }

  const options: RunSetupArgs["options"] = {
    // extraSetupTxs: [],
    // extraMultisendTxs: [],
  }

  console.log("Starting setup...")
  const res = await authz.runSetup({
    safe: SAFE,
    ...(SAFE_SALT_NONCE !== undefined ? { maybeSaltNonce: SAFE_SALT_NONCE } : {}),
    config,
    ...(options ? { options } : {})
  })

  console.log("Executed. Result:", res)
}

main().catch((err) => {
  console.error("Failed:", err)
  process.exit(1)
})
