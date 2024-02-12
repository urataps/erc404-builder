import React from 'react';

import dynamic from 'next/dynamic';

import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import ThemeToggle from '../ui/theme-toggle';
import Logo from './logo';
import NavbarLinks from './navbar-links';

const WalletButton = dynamic(() => import('./wallet-button'), {
  ssr: false,
  loading: () => <Skeleton className='h-10 w-[11.25rem]' />
});

export default function Navbar() {
  return (
    <header className='flex h-20 w-full justify-between border-b border-border px-5'>
      <nav className='flex items-center gap-x-5'>
        <Logo />
        <Separator orientation='vertical' className='h-[65%] w-0.5 rounded-md' />
        <NavbarLinks />
      </nav>

      <div className='flex h-full items-center gap-x-5'>
        <WalletButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
