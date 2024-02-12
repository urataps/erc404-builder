'use client';

import React, { useCallback, useEffect, useMemo } from 'react';

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

import MintDialog from './mint-dialog';

type TCollectionItem = {
  collectionAddress: string;
};

export default function CollectionItem({ collectionAddress }: TCollectionItem) {
  const chainId = useChainId();
  const activeChain = useMemo(
    () => testnetChains.find((chain) => chain.network.id === chainId) ?? testnetChains[0],
    [chainId]
  );
  const explorer = useMemo(() => activeChain?.network.blockExplorers.default, [activeChain]);

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
    isLoading: isCurrentSupplyLoading,
    response: currentSupply,
    readContract: readCurrentSupply
  } = useReadContract<bigint>();

  // prettier-ignore
  const { 
    isLoading: isTotalSupplyLoading,
    response: totalSupply,
    readContract: readTotalSupply
  } = useReadContract<bigint>();

  const isCollectionLoading = useMemo(
    () => isNameLoading || isSymbolLoading || isCurrentSupplyLoading || isTotalSupplyLoading,
    [isNameLoading, isSymbolLoading, isCurrentSupplyLoading, isTotalSupplyLoading]
  );

  const readCollectionState = useCallback(() => {
    if (activeChain) {
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
      readCurrentSupply(
        erc404ManagedUri.abi as Abi,
        'currentSupply',
        collectionAddress as `0x${string}`
      );

      // prettier-ignore
      readTotalSupply(
        erc404ManagedUri.abi as Abi,
        'totalSupply',
        collectionAddress as `0x${string}`
      );
    }
  }, [activeChain, collectionAddress, readName, readSymbol, readCurrentSupply, readTotalSupply]);

  useEffect(() => {
    readCollectionState();
  }, [readCollectionState]);

  function onMintDialogClose() {
    readCollectionState();
  }

  return (
    <div className='flex h-full w-full items-center gap-x-2.5'>
      <Column
        cTitle='Collection name'
        className='w-[17.5%]'
        skeletonClassName='w-[17.5%]'
        isLoading={isNameLoading}
      >
        {name}
      </Column>

      <Column
        cTitle='Collection symbol'
        className='w-[17.5%]'
        skeletonClassName='w-[17.5%]'
        isLoading={isSymbolLoading}
      >
        {symbol}
      </Column>

      <Column
        cTitle='Current supply'
        className='w-[15%]'
        skeletonClassName='w-[15%]'
        isLoading={isCurrentSupplyLoading}
      >
        {formatUnits(currentSupply ?? 0n, 18)}
      </Column>

      <Column
        cTitle='Total supply'
        className='w-[15%]'
        skeletonClassName='w-[15%]'
        isLoading={isTotalSupplyLoading}
      >
        {formatUnits(totalSupply ?? 0n, 18)}
      </Column>

      <Column
        cTitle='Address'
        className='w-[25%]'
        skeletonClassName='w-[25%]'
        isLoading={isCollectionLoading}
      >
        <Button variant='link' className='h-min px-0 py-0 text-foreground' asChild>
          <Link href={`${explorer?.url}/address/${collectionAddress}`} target='_blank'>
            {displayCollectionAddress}
          </Link>
        </Button>
      </Column>

      <MintDialog
        collectionAddress={collectionAddress}
        currentSupply={currentSupply}
        totalSupply={totalSupply}
        isDialogTriggerDisabled={isCollectionLoading}
        dialogTriggerClassName='w-[10%]'
        onMintDialogClose={onMintDialogClose}
      />
    </div>
  );
}

type TColumn = ComponentProps<'div'> & {
  cTitle: string;
  skeletonClassName: string;
  isLoading: boolean;
};

function Column({
  cTitle,
  children,
  className,
  skeletonClassName,
  isLoading,
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
