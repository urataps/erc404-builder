'use client';

import React from 'react';

import type { PropsWithChildren } from 'react';

import EStorageKeys from '@/constants/keys';

import ThemeProvider from './theme';
import Web3Provider from './web3';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <Web3Provider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        storageKey={EStorageKeys.theme}
        enableSystem
      >
        {children}
      </ThemeProvider>
    </Web3Provider>
  );
}
