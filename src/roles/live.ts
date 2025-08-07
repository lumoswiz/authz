import { Effect, Layer } from "effect"
import type { Address } from "viem"
import {
  encodeAbiParameters,
  encodeFunctionData,
  encodePacked,
  getContractAddress,
  keccak256,
  parseAbiParameters
} from "viem"
import { ViemClient } from "../client/service.js"
import { ROLES_V2_MODULE_ABI } from "./abi.js"
import {
  MODULE_PROXY_FACTORY,
  PROXY_BYTECODE_PREFIX,
  PROXY_BYTECODE_SUFFIX,
  ROLES_V2_MODULE_MASTERCOPY
} from "./constants.js"
import { CalculateProxyAddressError } from "./errors.js"
import { RoleService } from "./service.js"

export const RoleServiceLive = Layer.effect(
  RoleService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient

    const calculateModuleProxyAddress = ({
      safe,
      saltNonce
    }: {
      safe: Address
      saltNonce: bigint
    }): Effect.Effect<Address, CalculateProxyAddressError> =>
      Effect.try({
        try: () => {
          const setupData = encodeFunctionData({
            abi: ROLES_V2_MODULE_ABI,
            functionName: "setUp",
            args: [encodeAbiParameters(parseAbiParameters("address,address,address"), [
              safe,
              safe,
              safe
            ])]
          })

          const salt = keccak256(
            encodePacked(["bytes32", "uint256"], [keccak256(setupData), saltNonce])
          )

          const bytecode = encodePacked(
            ["bytes", "address", "bytes"],
            [PROXY_BYTECODE_PREFIX, ROLES_V2_MODULE_MASTERCOPY, PROXY_BYTECODE_SUFFIX]
          )

          return getContractAddress({
            from: MODULE_PROXY_FACTORY,
            opcode: "CREATE2",
            salt,
            bytecode
          })
        },
        catch: (cause) => new CalculateProxyAddressError({ cause })
      })

    return {
      calculateModuleProxyAddress
    }
  })
)
