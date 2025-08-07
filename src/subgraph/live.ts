import { Effect, Layer } from "effect"
import { ROLE_QUERY, SUBGRAPH_URL } from "./constants.js"
import { FetchSubgraphError } from "./errors.js"
import { SubgraphService } from "./service.js"
import type { RawSubgraphRole } from "./types.js"
import { getRoleIdForSubgraph, mapGraphQlRole } from "./utils.js"

export const SubgraphServiceLive = Layer.effect(
  SubgraphService,
  Effect.succeed({
    fetchRole: ({ chainId, moduleAddress, roleKey }) =>
      Effect.gen(function*() {
        const id = yield* getRoleIdForSubgraph(chainId, moduleAddress, roleKey)

        const res = yield* Effect.tryPromise({
          try: () =>
            fetch(SUBGRAPH_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: ROLE_QUERY,
                variables: { id },
                operationName: "Role"
              })
            }).then((res) => res.json()),
          catch: (cause) => new FetchSubgraphError({ id, cause })
        })

        const error = res.error ?? (Array.isArray(res.errors) && res.errors[0])
        if (error) {
          return yield* Effect.fail(new FetchSubgraphError({ id, cause: error }))
        }

        const raw = res.data?.role as RawSubgraphRole | null
        if (!raw) return null

        return yield* mapGraphQlRole(raw)
      })
  })
)
