import { Effect } from "effect"
import type { PublicClient } from "viem"

export class ViemClient extends Effect.Tag("ViemClient")<ViemClient, { publicClient: PublicClient }>() {}
