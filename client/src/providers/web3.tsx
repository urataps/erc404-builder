'use client';

import React from 'react';

import type { PropsWithChildren } from 'react';
import type { Chain } from 'wagmi/chains';

import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { createConfig, WagmiProvider } from 'wagmi';

import { chains } from '@/config/chains';

import QueryClientProvider from './query-client';

const betworks = chains.map((chain) => chain.network);
const chainsConfig: [Chain, ...Chain[]] = [betworks[0]!, ...betworks.slice(1)];

const config = createConfig(
  getDefaultConfig({
    appName: 'Your App Name',
    appDescription: 'Your App Description',
    appIcon: 'https://family.co/logo.png',
    appUrl: 'https://family.co',
    chains: chainsConfig,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
  })
);

type TWeb3Provider = PropsWithChildren;

export default function Web3Provider({ children }: TWeb3Provider) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
