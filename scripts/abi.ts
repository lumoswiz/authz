import { Effect } from "effect"
import type { Abi } from "viem"
import { LOCKUP_ABI } from "../abi/abi"
import { buildPassAllConditionFx } from "../src/conditions/utils"

// pnpm tsx ./scripts/abi.ts
const name = process.argv[2] ?? "createWithDurationsLL"
const maybeArgs = process.argv[3] ? (JSON.parse(process.argv[3]) as ReadonlyArray<unknown>) : undefined

const program = buildPassAllConditionFx({
  abi: LOCKUP_ABI as Abi,
  name,
  ...(maybeArgs !== undefined ? { args: maybeArgs } : {})
}).pipe(
  Effect.tap((tpl) => Effect.sync(() => console.log(JSON.stringify(tpl, null, 2)))),
  Effect.catchAll((err) =>
    Effect.sync(() => {
      console.error(err)
      process.exitCode = 1
    })
  )
)

await Effect.runPromise(program)
