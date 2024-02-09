'use client';

import React from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';

export default function Logo() {
  const { theme } = useTheme();
  const isThemeDark = theme === 'dark';

  return (
    <Link href='/'>
      <Image
        src={isThemeDark ? logoLight : logoDark}
        alt="DeFi Builder's logo"
        width={190}
        height={30}
      />
    </Link>
  );
}
