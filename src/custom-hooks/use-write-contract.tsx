import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Abi, PublicClient, WalletClient } from 'viem';

import { createPublicClient, createWalletClient, custom, parseUnits } from 'viem';
import { useChainId } from 'wagmi';

import { testnetChains } from '@/config/testnet-chains';
import { mapWalletErrorsToMessage } from '@/lib/errors-mapper';

export default function useWriteContract() {
  const chainId = useChainId();
  const activeChain = useMemo(() => {
    const chain = testnetChains.find((chain) => chain.network.id === chainId);
    return chain ?? testnetChains[0];
  }, [chainId]);

  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const publicClient = createPublicClient({
        chain: activeChain?.network,
        transport: custom(window.ethereum)
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
      value = 0
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

        const writeSimulation = await publicClient.simulateContract({
          abi,
          functionName,
          args: arguments_,
          address: contractAddress,
          account: walletAddress,
          value: parseUnits(value.toString(), 18)
        });

        const writeHash = await walletClient.writeContract(writeSimulation.request);

        await publicClient.waitForTransactionReceipt({ hash: writeHash });

        setIsLoading(false);
        setErrorMessage(null);
        setResponse(writeSimulation.result);
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
