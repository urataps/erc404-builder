'use client';

import React, { useEffect } from 'react';

import type { PropsWithChildren } from 'react';

import { redirect, usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';

import { ERoutesPath, routes } from '@/constants/routes';

type TWithAuthentication = PropsWithChildren;

export default function WithAuthentication({ children }: TWithAuthentication) {
  const { isConnected } = useAccount();

  const pathname = usePathname();

  useEffect(() => {
    if (!isConnected) {
      for (const route of routes) {
        if (route.isAuthed && pathname === route.path.toString()) {
          redirect(ERoutesPath.home);
        }
      }
    }
  }, [isConnected, pathname]);

  return <>{children}</>;
}
