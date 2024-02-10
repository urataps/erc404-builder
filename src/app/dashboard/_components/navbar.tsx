import React from 'react';

import type { ERoutesPath } from '@/constants/routes';

import BackButton from '@/components/back-button';
import WalletButton from '@/components/navbar/wallet-button';
import ThemeToggle from '@/components/ui/theme-toggle';

type TNavbar = {
  title: string;
  backTo: ERoutesPath;
};

export default function Navbar({ title, backTo }: TNavbar) {
  return (
    <header className='flex h-20 w-full justify-between border-b border-border px-5'>
      <div className='flex items-center gap-x-5'>
        <nav>
          <BackButton to={backTo} />
        </nav>
        <h1 className='text-lg font-semibold'>{title}</h1>
      </div>

      <div className='flex h-full items-center gap-x-5'>
        <WalletButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
