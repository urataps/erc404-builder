'use client';

import React, { useEffect, useState } from 'react';

import { useModal } from 'connectkit';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAccount } from 'wagmi';

import { Button } from '@/components/ui/button';
import { ERoutesName, ERoutesPath } from '@/constants/routes';

export default function HomeCTAs() {
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
    <div className='mt-10 flex gap-x-10'>
      <Button className='text-base font-semibold' asChild>
        <Link
          href={ERoutesPath.deployContract}
          onClick={(event) => {
            if (!isConnected) {
              event.preventDefault();

              setOpen(true);
              setDesiredPath(ERoutesPath.deployContract);
            }
          }}
        >
          {ERoutesName.deployContract}
        </Link>
      </Button>

      <Button variant='secondary' className='text-base font-semibold' asChild>
        <Link
          href={ERoutesPath.dashboard}
          onClick={(event) => {
            if (!isConnected) {
              event.preventDefault();

              setOpen(true);
              setDesiredPath(ERoutesPath.dashboard);
            }
          }}
        >
          {ERoutesName.dashboard}
        </Link>
      </Button>
    </div>
  );
}
