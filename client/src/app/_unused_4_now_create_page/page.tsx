import React from 'react';

import { Image as ImageIcon, LayoutGrid } from 'lucide-react';

import BackButton from '@/components/back-button';
import Main from '@/components/main';
import Section from '@/components/section';
import { ERoutesPath } from '@/constants/routes';

import CreateCallToAction from './_components/call-to-action';
import Carousel from './_components/carousel';

export default function Create() {
  return (
    <Main className='flex-row p-0'>
      <BackButton to={ERoutesPath.dashboard} className='absolute left-5 top-5' />

      <Section title='Create' className='h-full w-1/2 justify-center p-10'>
        <CreateCallToAction
          icon={LayoutGrid}
          title='Drop a collection'
          description='Launch your NFT collection for others to mint.'
          href={ERoutesPath.deployContract}
        />

        <CreateCallToAction
          icon={ImageIcon}
          title='Mint an NFT'
          description='Create a collection and mint NFTs directly to your wallet.'
          href={ERoutesPath.deployContract}
        />
      </Section>

      <div className='h-full w-1/2'>
        <Carousel />
      </div>
    </Main>
  );
}
