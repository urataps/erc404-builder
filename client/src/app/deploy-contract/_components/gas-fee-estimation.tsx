import React, { useEffect, useMemo, useState } from 'react';

import type { EChainsName } from '@/config/chains';
import type { Abi } from 'viem';

import { createPublicClient, formatUnits, http } from 'viem';
import { useChainId } from 'wagmi';

import factoryAbi from '@/artifacts/Factory.json';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast/use-toast';
import { chains } from '@/config/chains';
import useEstimateGasFee from '@/custom-hooks/use-estimate-gas-fee';
import { trimBigString } from '@/lib/utils';

const dummyArguments = [
  'DFB', // name
  'DFB', // symbol
  'https://gnfd-testnet-sp-1.nodereal.io/view/example/', // baseURI
  '10000' // totalNFTSupply
];

type TGasFeeEstimation = {
  chainName: EChainsName;
};

export default function GasFeeEstimation({ chainName }: TGasFeeEstimation) {
  const chainId = useChainId();
  const activeChain = useMemo(
    () => chains.find((chain) => chain.name === chainName) ?? chains[0],
    [chainName]
  );

  const { toast } = useToast();
  const [deploymentFee, setDeploymentFee] = useState<bigint | null>(null);

  const {
    isLoading: isEstimateGasFeeLoading,
    errorMessage: estimateGasFeeError,
    response: gasFee,
    estimateGasFee
  } = useEstimateGasFee();

  useEffect(() => {
    if (deploymentFee === null && activeChain) {
      async function fetchDeploymentFee(chain: (typeof chains)[0]) {
        const publicClient = createPublicClient({
          chain: chain.network,
          transport: http()
        });

        const deploymentFee = await publicClient.readContract({
          // prettier-ignore
          abi: [{type: 'function',name: 'deploymentFee',inputs: [],outputs: [{ name: '', type: 'uint128', internalType: 'uint128' }],stateMutability: 'view'}],
          address: chain.contractAddress,
          functionName: 'deploymentFee'
        });

        setDeploymentFee(deploymentFee);
      }

      fetchDeploymentFee(activeChain);
    }
  }, [activeChain]);

  useEffect(() => {
    if (activeChain && deploymentFee !== null) {
      estimateGasFee(
        activeChain.network,
        factoryAbi.abi as Abi,
        'deployERC404',
        activeChain.contractAddress,
        activeChain.gasEstimatorAddress,
        dummyArguments,
        deploymentFee
      );
    }
  }, [activeChain, chainId, deploymentFee, estimateGasFee]);

  useEffect(() => {
    if (estimateGasFeeError) {
      toast({
        variant: 'destructive',
        title: estimateGasFeeError.title,
        description: estimateGasFeeError.message
      });
    }
  }, [estimateGasFeeError, toast]);

  return (
    <div className='flex flex-col items-start gap-y-0.5 text-sm text-foreground'>
      <>
        <p className='text-muted-foreground'>Estimated gas fees:</p>
        <br />
      </>
      {isEstimateGasFeeLoading ? (
        <Skeleton className='h-5 w-full' />
      ) : (
        <div className='flex gap-x-1'>
          <span className='font-medium'>{trimBigString(formatUnits(gasFee ?? 0n, 18))}</span>
          <span className='font-medium'>
            {activeChain ? activeChain.network.nativeCurrency.symbol : 'ETH'}
          </span>
        </div>
      )}
    </div>
  );
}
