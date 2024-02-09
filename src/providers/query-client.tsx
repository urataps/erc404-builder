'use client';

import React from 'react';

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider as TQueryClientProvider } from '@tanstack/react-query';

type TQueryClientProvider = PropsWithChildren;

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: TQueryClientProvider) {
  return <TQueryClientProvider client={queryClient}>{children}</TQueryClientProvider>;
}
