'use client';

import React, { useEffect, useState } from 'react';

import { useModal } from 'connectkit';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAccount } from 'wagmi';

import { Button } from '../ui/button';

const links = [
  {
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    name: 'Create',
    path: '/dashboard/create'
  }
];

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
      {links.map((link) => (
        <li key={link.name}>
          <Button variant='link' className='px-0 py-0 text-base font-semibold' asChild>
            <Link
              href={link.path}
              onClick={(event) => {
                if (!isConnected) {
                  event.preventDefault();

                  setOpen(true);
                  setDesiredPath(link.path);
                }
              }}
            >
              {link.name}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
