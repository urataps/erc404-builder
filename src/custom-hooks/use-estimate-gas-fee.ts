import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Abi, PublicClient } from 'viem';

import { createPublicClient, http } from 'viem';
import { useChainId } from 'wagmi';

import { testnetChains } from '@/config/testnet-chains';
import { mapWalletErrorsToMessage } from '@/lib/errors-mapper';

export default function useEstimateGasFee() {
  const chainId = useChainId();
  const activeChain = useMemo(
    () => testnetChains.find((chain) => chain.network.id === chainId) ?? testnetChains[0],
    [chainId]
  );

  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<bigint | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const publicClient = createPublicClient({
        chain: activeChain?.network,
        transport: http()
      });
      setPublicClient(publicClient);
    }
  }, [activeChain]);

  const estimateGasFee = useCallback(
    async (
      abi: Abi,
      functionName: string,
      contractAddress: `0x${string}`,
      walletAddress: `0x${string}`,
      arguments_?: string[],
      value = 0n
    ) => {
      if (!publicClient) {
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);
        setResponse(null);

        const gasPrice = await publicClient.getGasPrice();
        const gasCost = await publicClient.estimateContractGas({
          abi,
          functionName,
          args: arguments_,
          address: contractAddress,
          account: walletAddress,
          value
        });

        const gasFee = gasPrice * gasCost;
        console.log('GAS FEE', functionName, gasFee);

        setIsLoading(false);
        setErrorMessage(null);
        setResponse(gasFee);
      } catch (error: unknown) {
        setIsLoading(false);
        setErrorMessage(mapWalletErrorsToMessage(error));
        setResponse(null);

        console.error('ERROR ESTIMATING GAS', functionName, error);
      }
    },
    [publicClient]
  );

  return {
    publicClient,
    isLoading,
    errorMessage,
    response,
    estimateGasFee
  };
}
