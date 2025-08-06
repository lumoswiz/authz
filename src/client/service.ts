import { Context } from "effect"
import type { PublicClient } from "viem"

export class ViemClient extends Context.Tag("ViemClient")<
  ViemClient,
  { publicClient: PublicClient }
>() {}
