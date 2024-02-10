import React from 'react';

import type { PropsWithChildren } from 'react';

import Main from '@/components/main';
import { ERoutesPath } from '@/constants/routes';

import Navbar from '../_components/navbar';
import MintAside from './_components/mint-aside';

type TLayout = PropsWithChildren;

export default function Layout({ children }: TLayout) {
  return (
    <>
      <Navbar title='Mint' backTo={ERoutesPath.create} />

      <Main className='flex-row items-start gap-x-5'>
        <MintAside className='mt-5 w-1/3' />

        <div className='w-2/3'>{children}</div>
      </Main>
    </>
  );
}
