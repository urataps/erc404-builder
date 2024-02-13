import { useCallback, useState } from 'react';

import type { TWalletError } from '@/lib/errors-mapper';
import type { Abi, Address, Chain } from 'viem';

import { createPublicClient, http } from 'viem';

import { mapWalletErrorsToMessage } from '@/lib/errors-mapper';

export default function useEstimateGasFee() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<TWalletError | null>(null);
  const [response, setResponse] = useState<bigint | null>(null);

  const estimateGasFee = useCallback(
    async (
      chain: Chain,
      abi: Abi,
      functionName: string,
      contractAddress: Address,
      estimatorAddress: Address,
      arguments_?: string[],
      value = 0n
    ) => {
      const publicClient = createPublicClient({
        chain,
        transport: http()
      });

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
          account: estimatorAddress,
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
    []
  );

  return {
    isLoading,
    errorMessage,
    response,
    estimateGasFee
  };
}
