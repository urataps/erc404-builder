import React from 'react';

import type { PropsWithChildren } from 'react';

import Aside from '@/components/aside';
import FeatureBanner from '@/components/feature-banner';
import Main from '@/components/main';
import { ERoutesPath } from '@/constants/routes';

import Navbar from '../_components/navbar';
import DeployContractAside from './_components/deploy-contract-aside';

type TLayout = PropsWithChildren;

export default function Layout({ children }: TLayout) {
  return (
    <>
      <Navbar title='Drop a collection' backTo={ERoutesPath.dashboard} />

      <Main className='flex-row items-start gap-x-5 overflow-y-auto'>
        <div className='w-2/3'>{children}</div>

        <div className='mt-10 flex w-1/3 flex-col gap-y-5'>
          <DeployContractAside />

          <Aside>
            <FeatureBanner />
          </Aside>
        </div>
      </Main>
    </>
  );
}
