import { Layer } from "effect"
import { createPublicClient, http } from "viem"
import { sepolia } from "viem/chains"
import { ViemClient } from "./service.js"

export const ViemClientLive = Layer.succeed(ViemClient, {
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http()
  })
})
