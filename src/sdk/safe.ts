import { Effect } from "effect"
import type { Address } from "viem"
import { SafeService } from "../safe/service.js"
import { run } from "./runtime.js"

export const getOwners = (safe: Address): Promise<Array<Address>> =>
  run(
    SafeService.pipe(
      Effect.flatMap((svc) => svc.getOwners(safe))
    )
  )
