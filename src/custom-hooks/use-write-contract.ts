import { useCallback, useEffect, useMemo, useState } from 'react';

import type { TWalletError } from '@/lib/errors-mapper';
import type {
  Abi,
  PublicClient,
  SimulateContractReturnType,
  TransactionReceipt,
  WalletClient
} from 'viem';

import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { useChainId } from 'wagmi';

import { mainnetChains } from '@/config/mainnet-chains';
import { mapWalletErrorsToMessage } from '@/lib/errors-mapper';

type TWriteContractResponse = {
  simulation: SimulateContractReturnType;
  hash: `0x${string}`;
  receipt: TransactionReceipt;
};

export default function useWriteContract() {
  const chainId = useChainId();
  const activeChain = useMemo(
    () => mainnetChains.find((chain) => chain.network.id === chainId) ?? mainnetChains[0],
    [chainId]
  );

  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<TWalletError | null>(null);
  const [response, setResponse] = useState<TWriteContractResponse | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const publicClient = createPublicClient({
        chain: activeChain?.network,
        transport: http()
      });

      const walletClient = createWalletClient({
        chain: activeChain?.network,
        transport: custom(window.ethereum)
      });

      setPublicClient(publicClient);
      setWalletClient(walletClient);
    }
  }, [activeChain]);

  const writeContract = useCallback(
    async (
      abi: Abi,
      functionName: string,
      arguments_: unknown[],
      contractAddress: `0x${string}`,
      value = 0n
    ) => {
      if (!publicClient || !walletClient) {
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);
        setResponse(null);

        const walletAddresses = await walletClient.getAddresses();
        const walletAddress = walletAddresses.at(0);

        const simulation = await publicClient.simulateContract({
          abi,
          functionName,
          args: arguments_,
          address: contractAddress,
          account: walletAddress,
          value
        });

        const hash = await walletClient.writeContract(simulation.request);

        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        setIsLoading(false);
        setErrorMessage(null);
        setResponse({
          simulation,
          hash,
          receipt
        });
      } catch (error: unknown) {
        setIsLoading(false);
        setErrorMessage(mapWalletErrorsToMessage(error));
        setResponse(null);

        console.error('ERROR WRITING CONTRACT', functionName, error);
      }
    },
    [publicClient, walletClient]
  );

  return {
    publicClient,
    walletClient,
    isLoading,
    errorMessage,
    response,
    writeContract
  };
}
