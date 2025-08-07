import { Effect } from "effect"
import type { Address } from "viem"
import { SafeService } from "../safe/service.js"
import { runSafe } from "./runtime.js"

export const getOwners = (safe: Address): Promise<Array<Address>> =>
  runSafe(
    SafeService.pipe(
      Effect.flatMap((svc) => svc.getOwners(safe))
    )
  )
