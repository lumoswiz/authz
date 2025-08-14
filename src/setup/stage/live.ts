import { Effect, Layer } from "effect"
import type { Address, Hex } from "viem"
import { RoleService } from "../../roles/service.js"
import { SafeService } from "../../safe/service.js"
import { SubgraphService } from "../../subgraph/service.js"
import { DEFAULT_ROLES_NONCE } from "../constants.js"
import { SetupStage } from "../types.js"
import type { RolesSetupConfig, SetupStage as SetupStageT } from "../types.js"
import {
  StageCalculateProxyAddressError,
  type StageError,
  StageFetchRoleError,
  StageIsModuleDeployedError,
  StageIsModuleEnabledError,
  StageMissingRoleKeyError
} from "./errors.js"
import { StageService } from "./service.js"
import type { DetermineStartStageArgs } from "./types.js"
import { getRoleSubgraphStatus } from "./utils.js"

export const StageServiceLive = Layer.effect(
  StageService,
  Effect.gen(function*() {
    const safeSvc = yield* SafeService
    const roleSvc = yield* RoleService
    const subgraph = yield* SubgraphService

    const determineStartStage = (
      { chainId, config, context }: DetermineStartStageArgs
    ): Effect.Effect<SetupStageT, StageError> => {
      const safe = context.safeAddress
      const rolesNonce = config.rolesNonce ?? DEFAULT_ROLES_NONCE

      const onUndeployed: () => Effect.Effect<SetupStageT, StageError> = () =>
        Effect.succeed<SetupStageT>(SetupStage.DeploySafe)

      const nextAfterEnabled = (
        moduleAddress: Address,
        setup: NonNullable<RolesSetupConfig["rolesSetup"]>
      ) =>
      (enabled: boolean): Effect.Effect<SetupStageT, StageError> => {
        if (!enabled) return Effect.succeed<SetupStageT>(SetupStage.EnableModule)
        if (!setup.roleKey) return Effect.fail<StageError>(new StageMissingRoleKeyError({ safe }))
        if (!setup.member) return Effect.succeed<SetupStageT>(SetupStage.AssignRoles)
        if (setup.target === undefined) return Effect.succeed<SetupStageT>(SetupStage.ScopeTarget)

        return subgraph.fetchRole({ chainId, moduleAddress, roleKey: setup.roleKey }).pipe(
          Effect.mapError((cause) =>
            new StageFetchRoleError({ chainId, moduleAddress, roleKey: setup.roleKey!, cause })
          ),
          Effect.flatMap((role) => {
            if (!role) return Effect.succeed<SetupStageT>(SetupStage.AssignRoles)
            const desiredTarget = setup.target!
            const desiredSelectors: ReadonlyArray<Hex> = setup.scopes?.flatMap((s) => s.selectors) ?? []
            const status = getRoleSubgraphStatus(role, setup.member!, desiredTarget, desiredSelectors)
            if (!status.assignedToMember) return Effect.succeed<SetupStageT>(SetupStage.AssignRoles)
            if (!status.targetScoped) return Effect.succeed<SetupStageT>(SetupStage.ScopeTarget)
            if (!status.selectorsScoped) return Effect.succeed<SetupStageT>(SetupStage.ScopeFunctions)
            return Effect.succeed<SetupStageT>(SetupStage.NothingToDo)
          })
        )
      }

      const decideWithSetup = (
        safe: Address,
        rolesNonce: bigint,
        config: RolesSetupConfig
      ): Effect.Effect<SetupStageT, StageError> => {
        const setup = config.rolesSetup
        if (!setup) return Effect.succeed<SetupStageT>(SetupStage.NothingToDo)

        return roleSvc.calculateModuleProxyAddress({ safe, saltNonce: rolesNonce }).pipe(
          Effect.mapError((cause) => new StageCalculateProxyAddressError({ safe, saltNonce: rolesNonce, cause })),
          Effect.flatMap((moduleAddress) =>
            safeSvc.isModuleEnabled({ safe, module: moduleAddress }).pipe(
              Effect.mapError((cause) => new StageIsModuleEnabledError({ safe, module: moduleAddress, cause })),
              Effect.flatMap(nextAfterEnabled(moduleAddress, setup))
            )
          )
        )
      }

      const onDeployed: () => Effect.Effect<SetupStageT, StageError> = () =>
        roleSvc.isModuleDeployed({ safe, saltNonce: rolesNonce }).pipe(
          Effect.mapError((cause) => new StageIsModuleDeployedError({ safe, saltNonce: rolesNonce, cause })),
          Effect.flatMap((moduleDeployed) =>
            moduleDeployed
              ? decideWithSetup(safe, rolesNonce, config)
              : Effect.succeed<SetupStageT>(SetupStage.DeployModule)
          )
        )

      return Effect.if(Effect.succeed(context.deployed === false), {
        onTrue: onUndeployed,
        onFalse: onDeployed
      })
    }

    return { determineStartStage }
  })
)
