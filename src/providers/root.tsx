'use client';

import React from 'react';

import type { PropsWithChildren } from 'react';

import EStorageKeys from '@/constants/keys';

import ThemeProvider from './theme';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      storageKey={EStorageKeys.theme}
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
