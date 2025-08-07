import { Effect, Layer } from "effect"
import type { Address, Hex } from "viem"
import { encodeFunctionData, encodePacked, getContractAddress, keccak256 } from "viem"
import { ViemClient } from "../client/service.js"
import type { TransactionData } from "../shared/types.js"
import { isContractDeployedFx } from "../shared/utils.js"
import { MODULE_PROXY_FACTORY_ABI, ROLES_V2_MODULE_ABI } from "./abi.js"
import {
  MODULE_PROXY_FACTORY,
  PROXY_BYTECODE_PREFIX,
  PROXY_BYTECODE_SUFFIX,
  ROLES_V2_MODULE_MASTERCOPY
} from "./constants.js"
import {
  BuildAssignRolesTxError,
  BuildDeployModuleTxError,
  BuildScopeTargetTxError,
  CalculateProxyAddressError,
  IsModuleDeployedError,
  IsModuleEnabledError
} from "./errors.js"
import { RoleService } from "./service.js"
import { getRolesModuleInitParams } from "./utils.js"

export const RoleServiceLive = Layer.effect(
  RoleService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient

    const buildAssignRolesTx = ({
      member,
      memberOf,
      module,
      roleKeys
    }: {
      module: Address
      member: Address
      roleKeys: Array<Hex>
      memberOf: Array<boolean>
    }): Effect.Effect<TransactionData, BuildAssignRolesTxError> =>
      Effect.try({
        try: () => ({
          to: module,
          data: encodeFunctionData({
            abi: ROLES_V2_MODULE_ABI,
            functionName: "assignRoles",
            args: [member, roleKeys, memberOf]
          }),
          value: "0x0"
        }),
        catch: (cause) => new BuildAssignRolesTxError({ module, cause })
      })

    const buildDeployModuleTx = ({
      safe,
      saltNonce
    }: {
      safe: Address
      saltNonce: bigint
    }): Effect.Effect<TransactionData, BuildDeployModuleTxError> =>
      Effect.gen(function*() {
        const moduleAddress = yield* calculateModuleProxyAddress({ safe, saltNonce }).pipe(
          Effect.mapError((cause) => new BuildDeployModuleTxError({ safe, saltNonce, cause }))
        )

        const isDeployed = yield* isContractDeployedFx({ client: publicClient, address: moduleAddress })

        if (isDeployed) {
          return yield* Effect.fail(
            new BuildDeployModuleTxError({
              safe,
              saltNonce,
              cause: new Error("Module already deployed")
            })
          )
        }

        const initParams = getRolesModuleInitParams(safe)

        const setupData = encodeFunctionData({
          abi: ROLES_V2_MODULE_ABI,
          functionName: "setUp",
          args: [initParams]
        })

        return {
          to: MODULE_PROXY_FACTORY,
          data: encodeFunctionData({
            abi: MODULE_PROXY_FACTORY_ABI,
            functionName: "deployModule",
            args: [ROLES_V2_MODULE_MASTERCOPY, setupData, saltNonce]
          }),
          value: "0x0"
        }
      })

    const buildScopeTargetTx = ({
      module,
      roleKey,
      target
    }: {
      module: Address
      roleKey: Hex
      target: Address
    }): Effect.Effect<TransactionData, BuildScopeTargetTxError> =>
      Effect.try({
        try: () => ({
          to: module,
          value: "0x0",
          data: encodeFunctionData({
            abi: ROLES_V2_MODULE_ABI,
            functionName: "scopeTarget",
            args: [roleKey, target]
          })
        }),
        catch: (cause) => new BuildScopeTargetTxError({ module, roleKey, target, cause })
      })

    const calculateModuleProxyAddress = ({
      safe,
      saltNonce
    }: {
      safe: Address
      saltNonce: bigint
    }): Effect.Effect<Address, CalculateProxyAddressError> =>
      Effect.try({
        try: () => {
          const initParams = getRolesModuleInitParams(safe)

          const setupData = encodeFunctionData({
            abi: ROLES_V2_MODULE_ABI,
            functionName: "setUp",
            args: [initParams]
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

    const isModuleDeployed = ({
      safe,
      saltNonce
    }: {
      safe: Address
      saltNonce: bigint
    }): Effect.Effect<boolean, IsModuleDeployedError> =>
      calculateModuleProxyAddress({ safe, saltNonce }).pipe(
        Effect.mapError((cause) => new IsModuleDeployedError({ safe, saltNonce, cause })),
        Effect.flatMap((address) => isContractDeployedFx({ client: publicClient, address }))
      )

    const isModuleEnabled = ({
      member,
      module
    }: {
      module: Address
      member: Address
    }): Effect.Effect<boolean, IsModuleEnabledError> =>
      Effect.tryPromise({
        try: () =>
          publicClient.readContract({
            address: module,
            abi: ROLES_V2_MODULE_ABI,
            functionName: "isModuleEnabled",
            args: [member]
          }) as Promise<boolean>,
        catch: (cause) => new IsModuleEnabledError({ module, member, cause })
      })

    return {
      buildAssignRolesTx,
      buildDeployModuleTx,
      buildScopeTargetTx,
      calculateModuleProxyAddress,
      isModuleDeployed,
      isModuleEnabled
    }
  })
)
