import { useCallback, useEffect, useMemo, useState } from 'react';

import type { TWalletError } from '@/lib/errors-mapper';
import type { Abi, PublicClient, WalletClient } from 'viem';

import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { useChainId } from 'wagmi';

import { chains } from '@/config/chains';
import { mapWalletErrorsToMessage } from '@/lib/errors-mapper';

export default function useReadContract<R>() {
  const chainId = useChainId();
  const activeChain = useMemo(
    () => chains.find((chain) => chain.network.id === chainId) ?? chains[0],
    [chainId]
  );

  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<TWalletError | null>(null);
  const [response, setResponse] = useState<R | null>(null);

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

  const readContract = useCallback(
    async (
      abi: Abi,
      functionName: string,
      contractAddress: `0x${string}`,
      arguments_?: string[]
    ) => {
      if (!publicClient || !walletClient) {
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);
        setResponse(null);

        const readResponse = await publicClient.readContract({
          abi,
          functionName,
          args: arguments_,
          address: contractAddress
        });

        console.log('READ', functionName, readResponse);

        setIsLoading(false);
        setErrorMessage(null);
        setResponse(readResponse as R);
      } catch (error: unknown) {
        setIsLoading(false);
        setErrorMessage(mapWalletErrorsToMessage(error));
        setResponse(null);

        console.error('ERROR READING CONTRACT', functionName, error);
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
    readContract
  };
}
