#!/usr/bin/env tsx

import { Effect, Layer } from "effect"
import { type Address } from "viem"
import { ViemClientLive } from "../src/client/live"
import { SafeServiceLive } from "../src/safe/live"
import { SafeService } from "../src/safe/service"

const safeAddress = process.argv[2] as Address | undefined

if (!safeAddress) {
  console.error("Usage: tsx scripts/owners.ts <SAFE_ADDRESS>")
  process.exit(1)
}

const program = (safeAddress: Address) =>
  Effect.gen(function*() {
    const safe = yield* SafeService
    const owners = yield* safe.getOwners(safeAddress)
    console.log("Owners:", owners)
    return owners
  }).pipe(
    Effect.catchAll((err) =>
      Effect.sync(() => {
        console.error("Error:", err)
        process.exit(1)
      })
    )
  )

const MainLive = SafeServiceLive.pipe(
  Layer.provide(ViemClientLive)
)

const runnable = program(safeAddress).pipe(
  Effect.provide(MainLive)
)

Effect.runPromise(runnable)
