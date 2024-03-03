import React from 'react';

import Main from '@/components/main';
import Spotlight from '@/components/spotlight';
import StyledLink from '@/components/styled-link';
import { ERoutesName, ERoutesPath } from '@/constants/routes';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

export default function Home() {
  return (
    <WithSignTAC>
      <Main className='mx-auto max-w-7xl justify-center gap-y-2.5'>
        <header className='bg-grid-white/[0.02] relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md antialiased'>
          <Spotlight className='-top-40 left-0 md:left-60' fill='white' />

          <div className='relative z-10 mt-10 w-full md:mt-0'>
            <h1 className='bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-5xl font-bold text-transparent [line-height:_1.3]'>
              ERC404 token generator
            </h1>
            <h2 className='mt-1 text-center text-2xl font-semibold text-neutral-300'>
              Deploy a custom ERC404 token using tested Smart Contracts
            </h2>
          </div>

          <div className='mt-10 flex gap-x-10'>
            <StyledLink variant='default' href={ERoutesPath.deployContract}>
              {ERoutesName.deployContract}
            </StyledLink>

            <StyledLink variant='secondary' href={ERoutesPath.dashboard}>
              {ERoutesName.dashboard}
            </StyledLink>
          </div>
        </header>
      </Main>
    </WithSignTAC>
  );
}
