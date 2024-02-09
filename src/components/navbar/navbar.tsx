import React from 'react';

import ThemeToggle from '../ui/theme-toggle';
import Logo from './logo';
import WalletButton from './wallet-button';

export default function Navbar() {
  return (
    <header className='flex h-20 w-full justify-between border-b border-border px-5'>
      <nav className='flex items-center gap-x-5'>
        <Logo />
      </nav>

      <div className='flex h-full items-center gap-x-5'>
        <WalletButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
