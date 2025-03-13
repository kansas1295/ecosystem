import type { Account, Chain, Client, Transport } from 'viem'
import type { PublicActionsL2 as OpPublicActionsL2 } from 'viem/op-stack'
import { publicActionsL2 as opPublicActionsL2 } from 'viem/op-stack'

import type {
  BuildExecutingMessageParameters,
  BuildExecutingMessageReturnType,
  DepositSuperchainWETHContractReturnType,
  DepositSuperchainWETHParameters,
  GetCrossDomainMessagesParameters,
  GetCrossDomainMessagesReturnType,
  GetCrossDomainMessageStatusParameters,
  GetCrossDomainMessageStatusReturnType,
  RelayCrossDomainMessageContractReturnType,
  RelayCrossDomainMessageParameters,
  SendCrossDomainMessageContractReturnType,
  SendCrossDomainMessageParameters,
  SendETHContractReturnType,
  SendETHParameters,
  SendSuperchainERC20ContractReturnType,
  SendSuperchainERC20Parameters,
  WithdrawSuperchainWETHContractReturnType,
  WithdrawSuperchainWETHParameters,
} from '@/actions/interop/index.js'
import {
  buildExecutingMessage,
  estimateDepositSuperchainWETHGas,
  estimateRelayCrossDomainMessageGas,
  estimateSendCrossDomainMessageGas,
  estimateSendETHGas,
  estimateSendSuperchainERC20Gas,
  estimateWithdrawSuperchainWETHGas,
  getCrossDomainMessages,
  getCrossDomainMessageStatus,
  simulateDepositSuperchainWETH,
  simulateRelayCrossDomainMessage,
  simulateSendCrossDomainMessage,
  simulateSendETH,
  simulateSendSuperchainERC20,
  simulateWithdrawSuperchainWETH,
} from '@/actions/interop/index.js'

export type PublicInteropActionsL2<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
> = {
  buildExecutingMessage: (
    parameters: BuildExecutingMessageParameters,
  ) => Promise<BuildExecutingMessageReturnType>

  estimateSendCrossDomainMessageGas: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: SendCrossDomainMessageParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<bigint>

  estimateRelayCrossDomainMessageGas: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: RelayCrossDomainMessageParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<bigint>

  estimateSendSuperchainERC20Gas: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: SendSuperchainERC20Parameters<TChain, TAccount, TChainOverride>,
  ) => Promise<bigint>

  estimateDepositSuperchainWETHGas: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: DepositSuperchainWETHParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<bigint>

  estimateSendETHGas: <TChainOverride extends Chain | undefined = undefined>(
    parameters: SendETHParameters<TChain, TAccount, TChainOverride>,
  ) => Promise<bigint>

  estimateWithdrawSuperchainWETHGas: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: WithdrawSuperchainWETHParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<bigint>

  getCrossDomainMessages: (
    parameters: GetCrossDomainMessagesParameters,
  ) => Promise<GetCrossDomainMessagesReturnType>

  getCrossDomainMessageStatus: (
    parameters: GetCrossDomainMessageStatusParameters,
  ) => Promise<GetCrossDomainMessageStatusReturnType>

  simulateSendCrossDomainMessage: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: SendCrossDomainMessageParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<SendCrossDomainMessageContractReturnType>

  simulateRelayCrossDomainMessage: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: RelayCrossDomainMessageParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<RelayCrossDomainMessageContractReturnType>

  simulateSendSuperchainERC20: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: SendSuperchainERC20Parameters<TChain, TAccount, TChainOverride>,
  ) => Promise<SendSuperchainERC20ContractReturnType>

  simulateDepositSuperchainWETH: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: DepositSuperchainWETHParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<DepositSuperchainWETHContractReturnType>

  simulateSendETH: <TChainOverride extends Chain | undefined = undefined>(
    parameters: SendETHParameters<TChain, TAccount, TChainOverride>,
  ) => Promise<SendETHContractReturnType>

  simulateWithdrawSuperchainWETH: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: WithdrawSuperchainWETHParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WithdrawSuperchainWETHContractReturnType>
}

export type PublicActionsL2<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
> = OpPublicActionsL2<TChain, TAccount> & {
  /** scoped interop actions */
  interop: PublicInteropActionsL2<TChain, TAccount>
}

export function publicActionsL2() {
  return <
    TTransport extends Transport,
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<TTransport, TChain, TAccount>,
  ): PublicActionsL2<TChain, TAccount> => {
    return {
      ...opPublicActionsL2(),
      interop: {
        buildExecutingMessage: (args) => buildExecutingMessage(client, args),
        estimateSendCrossDomainMessageGas: (args) =>
          estimateSendCrossDomainMessageGas(client, args),
        estimateRelayCrossDomainMessageGas: (args) =>
          estimateRelayCrossDomainMessageGas(client, args),
        estimateSendSuperchainERC20Gas: (args) =>
          estimateSendSuperchainERC20Gas(client, args),
        estimateDepositSuperchainWETHGas: (args) =>
          estimateDepositSuperchainWETHGas(client, args),
        estimateWithdrawSuperchainWETHGas: (args) =>
          estimateWithdrawSuperchainWETHGas(client, args),
        estimateSendETHGas: (args) => estimateSendETHGas(client, args),
        getCrossDomainMessages: (args) => getCrossDomainMessages(client, args),
        getCrossDomainMessageStatus: (args) =>
          getCrossDomainMessageStatus(client, args),
        simulateSendCrossDomainMessage: (args) =>
          simulateSendCrossDomainMessage(client, args),
        simulateRelayCrossDomainMessage: (args) =>
          simulateRelayCrossDomainMessage(client, args),
        simulateSendSuperchainERC20: (args) =>
          simulateSendSuperchainERC20(client, args),
        simulateDepositSuperchainWETH: (args) =>
          simulateDepositSuperchainWETH(client, args),
        simulateWithdrawSuperchainWETH: (args) =>
          simulateWithdrawSuperchainWETH(client, args),
        simulateSendETH: (args) => simulateSendETH(client, args),
      },
    } as PublicActionsL2<TChain, TAccount>
  }
}
