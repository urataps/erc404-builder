/* eslint-disable indent */

'use client';

import React, { useEffect, useMemo } from 'react';

import type { Abi } from 'viem';

import { useAccount, useChainId } from 'wagmi';

import factoryAbi from '@/artifacts/Factory.json';
import { Skeleton } from '@/components/ui/skeleton';
import { testnetChains } from '@/config/testnet-chains';
import useReadContract from '@/custom-hooks/use-read-contract';

import CollectionItem from './collection-item';

export default function CollectionsList() {
  const chainId = useChainId();
  const { address } = useAccount();
  const selectedChain = useMemo(() => {
    const chain = testnetChains.find((chain) => chain.network.id === chainId);
    return chain ?? testnetChains[0];
  }, [chainId]);

  const { isLoading, response: collections, readContract } = useReadContract<string[]>();

  useEffect(() => {
    if (selectedChain && address) {
      // prettier-ignore
      readContract(
        factoryAbi.abi as Abi,
        'deploymentsOf',
        selectedChain.contractAddress,
        [address],
      );
    }
  }, [selectedChain, address, readContract]);

  return (
    <ul className='flex h-full w-full flex-col gap-y-2.5 overflow-y-scroll rounded-md border border-border p-5'>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className='h-16 w-full'>
              <Skeleton className='h-full w-full' />
            </li>
          ))
        : collections?.map((collection, index) => (
            <li key={index} className='h-16 w-full shrink-0 rounded-md border border-border p-2.5'>
              <CollectionItem collectionAddress={collection} />
            </li>
          ))}
    </ul>
  );
}
