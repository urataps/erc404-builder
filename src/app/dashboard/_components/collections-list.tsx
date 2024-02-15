'use client';

import React, { useEffect, useMemo } from 'react';

import type { PropsWithChildren } from 'react';
import type { Abi } from 'viem';

import Link from 'next/link';
import { useAccount, useChainId } from 'wagmi';

import factoryAbi from '@/artifacts/Factory.json';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mainnetChains } from '@/config/mainnet-chains';
import { ERoutesName, ERoutesPath } from '@/constants/routes';
import useReadContract from '@/custom-hooks/use-read-contract';

import CollectionEmpty from './collection-empty';
import CollectionItem from './collection-item';

export default function CollectionsList() {
  const chainId = useChainId();
  const { address } = useAccount();
  const activeChain = useMemo(
    () => mainnetChains.find((chain) => chain.network.id === chainId) ?? mainnetChains[0],
    [chainId]
  );

  const { isLoading, response: collections, readContract } = useReadContract<string[]>();

  useEffect(() => {
    if (activeChain && address) {
      // prettier-ignore
      readContract(
        factoryAbi.abi as Abi,
        'deploymentsOf',
        activeChain.contractAddress,
        [address],
      );
    }
  }, [activeChain, address, readContract]);

  if (isLoading) {
    return (
      <ListContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className='h-16 w-full shrink-0'>
            <Skeleton className='h-full w-full' />
          </li>
        ))}
      </ListContainer>
    );
  }

  if (!collections || collections.length === 0) {
    return (
      <ListContainer>
        <CollectionEmpty />
      </ListContainer>
    );
  }

  return (
    <ul className='flex h-full w-full flex-col gap-y-2.5 overflow-y-scroll rounded-md border border-border p-5'>
      <Button className='absolute right-0 top-0' asChild>
        <Link href={ERoutesPath.deployContract}>{ERoutesName.deployContract} new collection</Link>
      </Button>

      {collections?.map((collection, index) => (
        <li key={index} className='h-16 w-full shrink-0 rounded-md border border-border p-2.5'>
          <CollectionItem collectionAddress={collection} />
        </li>
      ))}
    </ul>
  );
}

type TListContainer = PropsWithChildren;

function ListContainer({ children }: TListContainer) {
  return (
    <ul className='flex h-full w-full flex-col gap-y-2.5 overflow-y-scroll rounded-md border border-border p-5'>
      {children}
    </ul>
  );
}
