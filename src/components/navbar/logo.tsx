'use client';

import React from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import { ERoutesPath } from '@/constants/routes';

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const isThemeDark = resolvedTheme === 'dark';

  return (
    <Link href={ERoutesPath.home}>
      <Image
        src={isThemeDark ? logoLight : logoDark}
        alt="DeFi Builder's logo"
        width={190}
        height={30}
      />
    </Link>
  );
}
