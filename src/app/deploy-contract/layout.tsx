import React from 'react';

import type { PropsWithChildren } from 'react';

import Aside from '@/components/aside';
import FeatureRequest from '@/components/feature-request';
import Main from '@/components/main';
import NftPartners from '@/components/nft-partners';

import CollectionFeatures from './_components/collection-features';

type TLayout = PropsWithChildren;

export default function Layout({ children }: TLayout) {
  return (
    <div className='flex h-full w-full flex-row items-start justify-start overflow-hidden'>
      <Main className='w-2/3'>{children}</Main>

      <Aside className='w-1/3 p-10'>
        <NftPartners />
        <CollectionFeatures />
        <FeatureRequest />
      </Aside>
    </div>
  );
}
