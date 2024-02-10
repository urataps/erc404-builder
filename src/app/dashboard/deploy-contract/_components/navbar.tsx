import React from 'react';

import BackButton from '@/components/back-button';
import WalletButton from '@/components/navbar/wallet-button';
import ThemeToggle from '@/components/ui/theme-toggle';
import { ERoutesPath } from '@/constants/routes';

export default function Navbar() {
  return (
    <header className='flex h-20 w-full justify-between border-b border-border px-5'>
      <nav className='flex items-center gap-x-5'>
        <BackButton to={ERoutesPath.create} />
        <h1 className='text-lg font-semibold'>Drop a collection</h1>
      </nav>

      <div className='flex h-full items-center gap-x-5'>
        <WalletButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
