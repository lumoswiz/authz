import { Effect, Layer } from "effect"
import type { Address, Hex } from "viem"
import { encodeFunctionData, encodePacked, getContractAddress, keccak256 } from "viem"
import { ViemClient } from "../client/service.js"
import type { ConditionFlat, ExecutionOptions, TransactionData } from "../shared/types.js"
import { isContractDeployedFx } from "../shared/utils.js"
import { MODULE_PROXY_FACTORY_ABI, ROLES_V2_MODULE_ABI } from "./abi.js"
import {
  MODULE_PROXY_FACTORY,
  PROXY_BYTECODE_PREFIX,
  PROXY_BYTECODE_SUFFIX,
  ROLES_V2_MODULE_MASTERCOPY
} from "./constants.js"
import type { RoleError } from "./errors.js"
import {
  BuildAssignRolesTxError,
  BuildDeployModuleTxError,
  BuildScopeFunctionTxError,
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
    }): Effect.Effect<TransactionData, RoleError> =>
      Effect.try((): TransactionData => ({
        to: module,
        data: encodeFunctionData({
          abi: ROLES_V2_MODULE_ABI,
          functionName: "assignRoles",
          args: [member, roleKeys, memberOf]
        }),
        value: "0x0"
      })).pipe(
        Effect.mapError((cause) => new BuildAssignRolesTxError({ module, cause })),
        Effect.mapError((e) => e as RoleError)
      )

    const buildDeployModuleTx = (
      { safe, saltNonce }: { safe: Address; saltNonce: bigint }
    ): Effect.Effect<TransactionData, RoleError> =>
      calculateModuleProxyAddress({ safe, saltNonce }).pipe(
        Effect.mapError((cause) => new BuildDeployModuleTxError({ safe, saltNonce, cause })),
        Effect.flatMap((moduleAddress) =>
          Effect.if(isContractDeployedFx({ client: publicClient, address: moduleAddress }), {
            onTrue: () =>
              Effect.fail(
                new BuildDeployModuleTxError({ safe, saltNonce, cause: new Error("Module already deployed") })
              ),
            onFalse: () =>
              Effect.succeed<TransactionData>({
                to: MODULE_PROXY_FACTORY,
                data: encodeFunctionData({
                  abi: MODULE_PROXY_FACTORY_ABI,
                  functionName: "deployModule",
                  args: [
                    ROLES_V2_MODULE_MASTERCOPY,
                    encodeFunctionData({
                      abi: ROLES_V2_MODULE_ABI,
                      functionName: "setUp",
                      args: [getRolesModuleInitParams(safe)]
                    }),
                    saltNonce
                  ]
                }),
                value: "0x0"
              })
          })
        ),
        Effect.mapError((e): RoleError => e)
      )

    const buildScopeFunctionTx = ({
      conditions,
      executionOpts,
      module,
      roleKey,
      selector,
      target
    }: {
      module: Address
      roleKey: Hex
      target: Address
      selector: Hex
      conditions: ReadonlyArray<ConditionFlat>
      executionOpts: ExecutionOptions
    }): Effect.Effect<TransactionData, RoleError> =>
      Effect.try((): TransactionData => ({
        to: module,
        value: "0x0",
        data: encodeFunctionData({
          abi: ROLES_V2_MODULE_ABI,
          functionName: "scopeFunction",
          args: [roleKey, target, selector, conditions, executionOpts]
        })
      })).pipe(
        Effect.mapError((cause) => new BuildScopeFunctionTxError({ module, roleKey, target, selector, cause })),
        Effect.mapError((e) => e as RoleError)
      )

    const buildScopeTargetTx = ({
      module,
      roleKey,
      target
    }: {
      module: Address
      roleKey: Hex
      target: Address
    }): Effect.Effect<TransactionData, RoleError> =>
      Effect.try((): TransactionData => ({
        to: module,
        value: "0x0",
        data: encodeFunctionData({
          abi: ROLES_V2_MODULE_ABI,
          functionName: "scopeTarget",
          args: [roleKey, target]
        })
      })).pipe(
        Effect.mapError((cause) => new BuildScopeTargetTxError({ module, roleKey, target, cause })),
        Effect.mapError((e) => e as RoleError)
      )

    const calculateModuleProxyAddress = ({
      safe,
      saltNonce
    }: {
      safe: Address
      saltNonce: bigint
    }): Effect.Effect<Address, RoleError> =>
      Effect.try((): Address => {
        const initParams = getRolesModuleInitParams(safe)
        const setupData = encodeFunctionData({
          abi: ROLES_V2_MODULE_ABI,
          functionName: "setUp",
          args: [initParams]
        })
        const salt = keccak256(encodePacked(["bytes32", "uint256"], [keccak256(setupData), saltNonce]))
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
      }).pipe(
        Effect.mapError((cause) => new CalculateProxyAddressError({ cause })),
        Effect.mapError((e) => e as RoleError)
      )

    const isModuleDeployed = ({
      safe,
      saltNonce
    }: {
      safe: Address
      saltNonce: bigint
    }): Effect.Effect<boolean, RoleError> =>
      calculateModuleProxyAddress({ safe, saltNonce }).pipe(
        Effect.mapError((cause) => new IsModuleDeployedError({ safe, saltNonce, cause })),
        Effect.flatMap((address) => isContractDeployedFx({ client: publicClient, address })),
        Effect.mapError((e) => e as RoleError)
      )

    const isModuleEnabled = (
      { member, module }: { module: Address; member: Address }
    ): Effect.Effect<boolean, RoleError> =>
      Effect.promise(() =>
        publicClient.readContract({
          address: module,
          abi: ROLES_V2_MODULE_ABI,
          functionName: "isModuleEnabled",
          args: [member]
        }) as Promise<boolean>
      ).pipe(
        Effect.mapError((cause) => new IsModuleEnabledError({ module, member, cause })),
        Effect.mapError((e) => e as RoleError)
      )

    return {
      buildAssignRolesTx,
      buildDeployModuleTx,
      buildScopeFunctionTx,
      buildScopeTargetTx,
      calculateModuleProxyAddress,
      isModuleDeployed,
      isModuleEnabled
    }
  })
)
