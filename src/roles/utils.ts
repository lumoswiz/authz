import { encodeAbiParameters, parseAbiParameters } from "viem"
import type { Address } from "viem"

export const getRolesModuleInitParams = (safe: Address) =>
  encodeAbiParameters(
    parseAbiParameters("address, address, address"),
    [safe, safe, safe]
  )
