import type { Abi } from "viem"

export interface GetFunctionAbiArgs {
  abi: Abi
  name: string
  args?: ReadonlyArray<unknown>
}
