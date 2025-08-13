import { Effect, Layer } from "effect"
import type { Address } from "viem"
import { RoleService } from "../../roles/service.js"
import { SafeService } from "../../safe/service.js"
import { ExecutionOptions, type MetaTransactionData, OperationType, type TransactionData } from "../../shared/types.js"
import { DEFAULT_ROLES_NONCE } from "../constants.js"
import { StageService } from "../stage/service.js"
import { SetupStage } from "../types.js"
import type { ResolvedSafeContext, RolesSetupConfig, SetupStage as SetupStageT } from "../types.js"
import { append } from "../utils.js"
import { type BuilderError, CalculateModuleAddressForBuilderError } from "./errors.js"
import { BuilderService } from "./service.js"
import { buildPlan, validateForStart } from "./utils.js"

export const BuilderServiceLive = Layer.effect(
  BuilderService,
  Effect.gen(function*() {
    const stageSvc = yield* StageService
    const safeSvc = yield* SafeService
    const roleSvc = yield* RoleService

    const buildAllTx = ({
      chainId,
      config,
      context,
      options = {},
      owner
    }: {
      context: ResolvedSafeContext
      owner: Address
      config: RolesSetupConfig
      options?: {
        extraSetupTxs?: ReadonlyArray<TransactionData>
        extraMultisendTxs?: ReadonlyArray<MetaTransactionData>
      }
      chainId: number
    }): Effect.Effect<
      { setupTxs: Array<TransactionData>; multisendTxs: Array<MetaTransactionData> },
      BuilderError
    > =>
      stageSvc.determineStartStage({ context, config, chainId }).pipe(
        Effect.flatMap((startAt) => {
          if (startAt === SetupStage.NothingToDo) {
            return Effect.succeed({ setupTxs: [], multisendTxs: [] })
          }
          return validateForStart(startAt, config).pipe(
            Effect.flatMap(() => {
              const rolesNonce = config.rolesNonce ?? DEFAULT_ROLES_NONCE
              const safe = context.safeAddress
              const safeSalt = context.deployed ? 0n : context.saltNonce

              return roleSvc.calculateModuleProxyAddress({ safe, saltNonce: rolesNonce }).pipe(
                Effect.mapError((cause) =>
                  new CalculateModuleAddressForBuilderError({ safe, saltNonce: rolesNonce, cause })
                ),
                Effect.flatMap((rolesAddress) => {
                  const setupTxs: Array<TransactionData> = []
                  const multisendTxs: Array<MetaTransactionData> = []

                  const steps: Record<SetupStageT, () => Effect.Effect<void, BuilderError>> = {
                    [SetupStage.DeploySafe]: () =>
                      safeSvc.buildSafeDeploymentTx({ owner, saltNonce: safeSalt }).pipe(
                        Effect.map((tx) => {
                          setupTxs.push(tx)
                        }),
                        Effect.asVoid
                      ),
                    [SetupStage.DeployModule]: () =>
                      roleSvc.buildDeployModuleTx({ safe, saltNonce: rolesNonce }).pipe(
                        Effect.map((tx) => {
                          setupTxs.push(tx)
                        }),
                        Effect.asVoid
                      ),
                    [SetupStage.EnableModule]: () =>
                      safeSvc.buildEnableModuleTx({ safe, module: rolesAddress }).pipe(
                        Effect.map((tx) => {
                          multisendTxs.push({ ...tx, operation: OperationType.Call })
                        }),
                        Effect.asVoid
                      ),
                    [SetupStage.AssignRoles]: () => {
                      const rs = config.rolesSetup!
                      return roleSvc.buildAssignRolesTx({
                        module: rolesAddress,
                        member: rs.member!,
                        roleKeys: [rs.roleKey!],
                        memberOf: [true]
                      }).pipe(
                        Effect.map((tx) => {
                          multisendTxs.push({ ...tx, operation: OperationType.Call })
                        }),
                        Effect.asVoid
                      )
                    },
                    [SetupStage.ScopeTarget]: () => {
                      const rs = config.rolesSetup!
                      return roleSvc.buildScopeTargetTx({
                        module: rolesAddress,
                        roleKey: rs.roleKey!,
                        target: rs.target!
                      }).pipe(
                        Effect.map((tx) => {
                          multisendTxs.push({ ...tx, operation: OperationType.Call })
                        }),
                        Effect.asVoid
                      )
                    },
                    [SetupStage.ScopeFunctions]: () => {
                      const rs = config.rolesSetup!
                      const scopes = rs.scopes ?? []
                      return Effect.forEach(
                        scopes,
                        (s) =>
                          Effect.forEach(
                            s.selectors,
                            (sel) =>
                              roleSvc.buildScopeFunctionTx({
                                module: rolesAddress,
                                roleKey: rs.roleKey!,
                                target: rs.target!,
                                selector: sel,
                                conditions: s.conditions ?? [],
                                executionOpts: s.execOpts ?? ExecutionOptions.Send
                              }).pipe(
                                Effect.map((tx) => {
                                  multisendTxs.push({ ...tx, operation: OperationType.Call })
                                })
                              ),
                            { discard: true }
                          ),
                        { discard: true }
                      )
                    },
                    [SetupStage.NothingToDo]: () => Effect.void
                  }

                  const plan = buildPlan(startAt)

                  return Effect.forEach(plan, (st) => steps[st](), { discard: true }).pipe(
                    Effect.map(() => ({
                      setupTxs: append(setupTxs, options.extraSetupTxs),
                      multisendTxs: append(multisendTxs, options.extraMultisendTxs)
                    }))
                  )
                })
              )
            })
          )
        })
      )

    return { buildAllTx }
  })
)
