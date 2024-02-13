import React, { useEffect, useMemo } from 'react';

import type { EChainsName } from '@/config/testnet-chains';
import type { Abi } from 'viem';

import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import factoryAbi from '@/artifacts/Factory.json';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast/use-toast';
import { testnetChains } from '@/config/testnet-chains';
import useEstimateGasFee from '@/custom-hooks/use-estimate-gas-fee';
import { trimBigString } from '@/lib/utils';

const dummyArguments = [
  'DeFi Builder', // name
  'DFB', // symbol
  'ipfs://QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB/', // baseURI
  '10000' // totalNFTSupply
];

type TGasFeeEstimation = {
  chainName: EChainsName;
  deploymentFee: bigint | null;
};

export default function GasFeeEstimation({ chainName, deploymentFee }: TGasFeeEstimation) {
  const { address } = useAccount();
  const activeChain = useMemo(
    () => testnetChains.find((chain) => chain.name === chainName) ?? testnetChains[0],
    [chainName]
  );

  const { toast } = useToast();

  const {
    isLoading: isEstimateGasFeeLoading,
    errorMessage: estimateGasFeeError,
    response: gasFee,
    estimateGasFee
  } = useEstimateGasFee();

  useEffect(() => {
    if (activeChain && address && deploymentFee) {
      // prettier-ignore
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
  }, [activeChain, address, deploymentFee, estimateGasFee]);

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
