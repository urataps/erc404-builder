'use client';

import React, { useEffect, useState } from 'react';

import { useModal } from 'connectkit';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAccount } from 'wagmi';

import { routes } from '@/constants/routes';

import { Button } from '../ui/button';

export default function NavbarLinks() {
  const { isConnected } = useAccount();
  const { setOpen } = useModal();

  const [desiredPath, setDesiredPath] = useState('');

  useEffect(() => {
    if (isConnected && desiredPath !== '') {
      setDesiredPath('');
      redirect(desiredPath);
    }
  }, [isConnected, desiredPath]);

  return (
    <ul className='flex items-center gap-x-5'>
      {routes.map((route) => (
        <li key={route.name}>
          <Button variant='link' className='px-0 py-0 text-base font-semibold' asChild>
            <Link
              href={route.path}
              onClick={(event) => {
                if (!isConnected) {
                  event.preventDefault();

                  setOpen(true);
                  setDesiredPath(route.path);
                }
              }}
            >
              {route.name}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
