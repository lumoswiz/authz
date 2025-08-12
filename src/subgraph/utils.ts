import { Effect, Schema } from "effect"
import type { Address, Hex } from "viem"
import { CHAINS } from "../shared/constants.js"
import { ExecutionOptions } from "../shared/types.js"
import type { SubgraphMappingError } from "./errors.js"
import {
  GetSubgraphChainPrefixError,
  InvalidAddressError,
  InvalidBytes32Error,
  ParseClearanceError,
  ParseConditionPayloadError,
  ParseExecutionOptionsError
} from "./errors.js"
import { AddressLower, Bytes32Lower } from "./schema.js"
import type { RawSubgraphRole, SubgraphCondition, SubgraphFunction, SubgraphRole, Target } from "./types.js"
import { Clearance } from "./types.js"

export const getRoleIdForSubgraph = (
  chainId: number,
  moduleAddress: Address,
  roleKey: Hex
): Effect.Effect<
  string,
  GetSubgraphChainPrefixError | InvalidAddressError | InvalidBytes32Error,
  never
> =>
  Effect.sync(() => CHAINS[chainId]).pipe(
    Effect.flatMap((chain) =>
      chain
        ? Effect.succeed(chain)
        : Effect.fail(new GetSubgraphChainPrefixError({ chainId, module: moduleAddress }))
    ),
    Effect.flatMap((chain) => {
      const addrE = Effect.try({
        try: () => Schema.decodeUnknownSync(AddressLower)(moduleAddress),
        catch: () => new InvalidAddressError({ value: moduleAddress, reason: "wrong-length" })
      })

      const keyE = Effect.try({
        try: () => Schema.decodeUnknownSync(Bytes32Lower)(roleKey),
        catch: () => new InvalidBytes32Error({ value: roleKey, reason: "wrong-length" })
      })

      return Effect.zipWith(
        addrE,
        keyE,
        (addr, key) => `${chain.prefix}:${addr}:${key}`
      )
    })
  )

export const mapGraphQlRole = (
  raw: RawSubgraphRole
): Effect.Effect<SubgraphRole, SubgraphMappingError> =>
  Effect.gen(function*() {
    const key = raw.key

    const members = raw.members.map((m) => m.member)

    const targets = yield* Effect.forEach(
      raw.targets,
      mapRawTarget
    ) as Effect.Effect<Array<SubgraphRole["targets"][number]>, SubgraphMappingError>

    return {
      key,
      members,
      targets,
      annotations: raw.annotations,
      lastUpdate: raw.lastUpdate
    }
  })

export const mapRawFunction = (
  fn: RawSubgraphRole["targets"][number]["functions"][number]
): Effect.Effect<SubgraphFunction, SubgraphMappingError> =>
  Effect.gen(function*() {
    const executionOptions = yield* parseExecutionOptions(fn.executionOptions)
    const condition = fn.condition
      ? yield* parseConditionPayload(fn.condition.json, fn.condition.id)
      : null

    return {
      selector: fn.selector,
      executionOptions,
      wildcarded: fn.wildcarded,
      condition
    }
  })

export const mapRawTarget = (
  target: RawSubgraphRole["targets"][number]
): Effect.Effect<Target, SubgraphMappingError> =>
  Effect.gen(function*() {
    const clearance = yield* parseClearance(target.clearance)
    const executionOptions = yield* parseExecutionOptions(target.executionOptions)

    const functions = yield* Effect.forEach(
      target.functions,
      mapRawFunction
    ) as Effect.Effect<Array<SubgraphFunction>, SubgraphMappingError>

    return {
      address: target.address,
      clearance,
      executionOptions,
      functions
    }
  })

export const parseClearance = (value: string): Effect.Effect<Clearance, ParseClearanceError> =>
  value in Clearance
    ? Effect.succeed(Clearance[value as keyof typeof Clearance])
    : Effect.fail(new ParseClearanceError({ value }))

export const parseConditionPayload = (
  json: string,
  id: string
): Effect.Effect<SubgraphCondition, ParseConditionPayloadError> =>
  Effect.try({
    try: () => ({ id, payload: JSON.parse(json) }),
    catch: (cause) => new ParseConditionPayloadError({ json, cause })
  })

export const parseExecutionOptions = (value: string): Effect.Effect<ExecutionOptions, ParseExecutionOptionsError> =>
  value in ExecutionOptions
    ? Effect.succeed(ExecutionOptions[value as keyof typeof ExecutionOptions])
    : Effect.fail(new ParseExecutionOptionsError({ value }))
