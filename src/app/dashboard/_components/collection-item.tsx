'use client';

import React, { useEffect, useMemo } from 'react';

import type { ComponentProps } from 'react';
import type { Abi } from 'viem';

import Link from 'next/link';
import { formatUnits } from 'viem';
import { useChainId } from 'wagmi';

import erc404ManagedUri from '@/artifacts/ERC404ManagedURI.json';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { testnetChains } from '@/config/testnet-chains';
import useReadContract from '@/custom-hooks/use-read-contract';
import { cn } from '@/lib/utils';

type TCollectionItem = {
  collectionAddress: string;
};

export default function CollectionItem({ collectionAddress }: TCollectionItem) {
  const chainId = useChainId();
  const selectedChain = useMemo(() => {
    const chain = testnetChains.find((chain) => chain.network.id === chainId);
    return chain ?? testnetChains[0];
  }, [chainId]);
  const explorer = useMemo(() => selectedChain?.network.blockExplorers.default, [selectedChain]);

  const displayCollectionAddress =
    collectionAddress?.slice(0, 8) + '...' + collectionAddress?.slice(-8);

  // prettier-ignore
  const { 
    isLoading: isNameLoading,
    response: name,
    readContract: readName
  } = useReadContract<string>();

  // prettier-ignore
  const { 
    isLoading: isSymbolLoading,
    response: symbol,
    readContract: readSymbol
  } = useReadContract<string>();

  // prettier-ignore
  const { 
    isLoading: isTotalSupplyLoading,
    response: totalSupply,
    readContract: readTotalSupply
  } = useReadContract<bigint>();

  useEffect(() => {
    if (selectedChain) {
      // prettier-ignore
      readName(
        erc404ManagedUri.abi as Abi,
        'name',
        collectionAddress as `0x${string}`
      );

      // prettier-ignore
      readSymbol(
        erc404ManagedUri.abi as Abi,
        'symbol',
        collectionAddress as `0x${string}`
      );

      // prettier-ignore
      readTotalSupply(
        erc404ManagedUri.abi as Abi,
        'totalSupply',
        collectionAddress as `0x${string}`
      );
    }
  }, [selectedChain, collectionAddress, readName, readSymbol, readTotalSupply]);

  return (
    <div className='flex h-full w-full items-center gap-x-5'>
      <Column
        cTitle='Collection name'
        className='w-[20%]'
        skeletonClassName='w-[20%]'
        isLoading={isNameLoading}
      >
        {name}
      </Column>

      <Column
        cTitle='Collection symbol'
        className='w-[20%]'
        skeletonClassName='w-[20%]'
        isLoading={isSymbolLoading}
      >
        {symbol}
      </Column>

      <Column
        cTitle='Total supply'
        className='w-[20%]'
        skeletonClassName='w-[20%]'
        isLoading={isTotalSupplyLoading}
      >
        {formatUnits(totalSupply ?? 0n, 18)}
      </Column>

      <Column
        cTitle='Address'
        className='w-[40%]'
        skeletonClassName='w-[40%]'
        isLoading={isNameLoading || isSymbolLoading || isTotalSupplyLoading}
      >
        <Button variant='link' className='h-min px-0 py-0 text-foreground' asChild>
          <Link href={`${explorer?.url}/address/${collectionAddress}`} target='_blank'>
            {displayCollectionAddress}
          </Link>
        </Button>
      </Column>
    </div>
  );
}

type TColumn = ComponentProps<'div'> & {
  isLoading: boolean;
  cTitle: string;
  skeletonClassName: string;
};

function Column({
  isLoading,
  cTitle,
  children,
  className,
  skeletonClassName,
  ...otherProperties
}: TColumn) {
  if (isLoading) {
    return <Skeleton className={cn('h-full', skeletonClassName)} />;
  }

  return (
    <div className={cn('flex h-full flex-col justify-between', className)} {...otherProperties}>
      <p className='text-xs text-muted-foreground'>{cTitle}</p>
      <p className='text-sm font-semibold'>{children}</p>
    </div>
  );
}
