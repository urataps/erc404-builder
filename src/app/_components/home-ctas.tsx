import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ERoutesName, ERoutesPath } from '@/constants/routes';

export default function HomeCTAs() {
  return (
    <div className='mt-10 flex gap-x-10'>
      <Button className='text-base font-semibold' asChild>
        <Link href={ERoutesPath.deployContract}>{ERoutesName.deployContract}</Link>
      </Button>

      <Button variant='secondary' className='text-base font-semibold' asChild>
        <Link href={ERoutesPath.dashboard}>{ERoutesName.dashboard}</Link>
      </Button>
    </div>
  );
}
