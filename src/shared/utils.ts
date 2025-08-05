import { Effect } from "effect"
import type { Address, PublicClient } from "viem"

export const isContractDeployedFx = ({
  address,
  client
}: {
  client: PublicClient
  address: Address
}): Effect.Effect<boolean, never> =>
  Effect.tryPromise(() => client.getCode({ address })).pipe(
    Effect.map((code) => !!(code && code !== "0x")),
    Effect.catchAll(() => Effect.succeed(false))
  )
