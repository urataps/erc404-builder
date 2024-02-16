import React from 'react';

import Link from 'next/link';

import { routes } from '@/constants/routes';

import { Button } from '../ui/button';

export default function NavbarLinks() {
  return (
    <ul className='flex items-center gap-x-5'>
      {routes.map((route) => (
        <li key={route.name}>
          <Button variant='link' className='px-0 py-0 text-base font-semibold' asChild>
            <Link href={route.path}>{route.name}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
