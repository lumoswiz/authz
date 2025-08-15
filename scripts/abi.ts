// scripts/abi.ts
import { Effect } from "effect"
import { type Abi } from "viem"
import { LOCKUP_ABI, POOL_ABI } from "../abis/abi"
import type { ConditionError } from "../src/conditions/errors"
import { getFunctionAbi } from "../src/conditions/utils"

/**
 * Examples:
 *   pnpm tsx scripts/abi.ts pool supply
 *   pnpm tsx scripts/abi.ts lockup vest '[["0xabc..."], 123]'
 *   pnpm tsx scripts/abi.ts supply '[1, "0xabc..."]'  // defaults to abi=pool
 */

const ABI_REGISTRY: Record<string, Abi> = {
  pool: POOL_ABI as Abi,
  lockup: LOCKUP_ABI as Abi
} as const

const argv = process.argv.slice(2)

const first = argv[0]?.toLowerCase()
const isAbiKey = !!first && first in ABI_REGISTRY

const abiKey = (isAbiKey ? first : "pool") as keyof typeof ABI_REGISTRY
const name = (isAbiKey ? argv[1] : argv[0]) ?? "supply"
const argsJson = isAbiKey ? argv[2] : argv[1]

const abi = ABI_REGISTRY[abiKey]
if (!abi) {
  console.error(
    `Unknown ABI "${String(abiKey)}". Available: ${Object.keys(ABI_REGISTRY).sort().join(", ")}`
  )
  process.exit(1)
}

let maybeArgs: ReadonlyArray<unknown> | undefined
if (argsJson) {
  try {
    const parsed = JSON.parse(argsJson)
    if (!Array.isArray(parsed)) {
      throw new Error("argsJson must be a JSON array, e.g. [1, \"0xabc...\"]")
    }
    maybeArgs = parsed as ReadonlyArray<unknown>
  } catch (e) {
    console.error(`Failed to parse argsJson: ${(e as Error).message}`)
    process.exit(1)
  }
}

const program = getFunctionAbi({
  abi,
  name,
  ...(maybeArgs ? { args: maybeArgs } : {})
}).pipe(
  Effect.matchEffect({
    onSuccess: (fn) =>
      Effect.sync(() => {
        console.log(JSON.stringify(fn.inputs, null, 2))
      }),
    onFailure: (err: ConditionError) =>
      Effect.sync(() => {
        switch (err._tag) {
          case "AbiItemNotFoundError":
            console.error(`No ABI item named "${name}" found in "${String(abiKey)}".`)
            break
          case "AbiItemNotFunctionError":
            console.error(
              `ABI entry "${name}" in "${String(abiKey)}" is a "${err.actualType}", not a "function".`
            )
            break
          default:
            console.error("Unexpected error:", err)
        }
        process.exitCode = 1
      })
  })
)

await Effect.runPromise(program)
