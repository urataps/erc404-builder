'use client';

import React, { useEffect, useMemo } from 'react';

import type { PropsWithChildren } from 'react';
import type { Abi } from 'viem';

import { PencilRuler, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useAccount, useChainId } from 'wagmi';

import factoryAbi from '@/artifacts/Factory.json';
import Banner from '@/components/banner';
import WalletButton from '@/components/navbar/wallet-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { chains } from '@/config/chains';
import { ERoutesName, ERoutesPath } from '@/constants/routes';
import useReadContract from '@/custom-hooks/use-read-contract';

import CollectionItem from './collection-item';

export default function CollectionsList() {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const activeChain = useMemo(
    () => chains.find((chain) => chain.network.id === chainId) ?? chains[0],
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

  if (!isConnected) {
    return (
      <Banner
        icon={ShieldAlert}
        description='Connect your wallet to view your deployed collections, if any.'
        ctaButton={<WalletButton />}
      />
    );
  }

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
      <Banner
        icon={PencilRuler}
        description='You have not created any collection yet.'
        ctaButton={
          <Button asChild>
            <Link href={ERoutesPath.deployContract}>{ERoutesName.deployContract}</Link>
          </Button>
        }
      />
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
