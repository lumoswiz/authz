import { Data } from "effect"

export type RoleError = CalculateProxyAddressError

export class CalculateProxyAddressError extends Data.TaggedError("CalculateProxyAddressError")<{
  cause: unknown
}> {}
