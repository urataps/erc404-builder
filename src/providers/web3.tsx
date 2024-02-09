'use client';

import React from 'react';

import type { PropsWithChildren } from 'react';

import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { createConfig, WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import QueryClientProvider from './query-client';

const config = createConfig(
  getDefaultConfig({
    appName: 'Your App Name',
    appDescription: 'Your App Description',
    appIcon: 'https://family.co/logo.png',
    appUrl: 'https://family.co',
    chains: [sepolia],
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
