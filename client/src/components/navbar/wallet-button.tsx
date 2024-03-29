'use client';

import React from 'react';

import type { ButtonProperties } from '../ui/button';

import { useModal } from 'connectkit';
import { useAccount } from 'wagmi';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type TWalletButton = ButtonProperties;

export default function WalletButton({ className, ...otherProperties }: TWalletButton) {
  const { isConnected, address } = useAccount();
  const { setOpen } = useModal();

  const displayAddress = address?.slice(0, 8) + '...' + address?.slice(-8);

  if (!isConnected) {
    return (
      <Button className={cn(className)} onClick={() => setOpen(true)} {...otherProperties}>
        Connect Wallet
      </Button>
    );
  }

  return (
    <Button
      variant='secondary'
      className={cn(className)}
      onClick={() => setOpen(true)}
      {...otherProperties}
    >
      {displayAddress}
    </Button>
  );
}
