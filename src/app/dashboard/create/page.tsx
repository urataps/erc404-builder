import React from 'react';

import { Image, LayoutGrid } from 'lucide-react';

import Main from '@/components/main';
import Section from '@/components/section';
import { ERoutesPath } from '@/constants/routes';

import CreateCallToAction from './_components/call-to-action';

export default function Create() {
  return (
    <Main className='flex-row'>
      <Section title='Create' className='h-full w-1/2 justify-center'>
        <CreateCallToAction
          icon={LayoutGrid}
          title='Drop a collection'
          description='Launch your NFT collection for others to mint.'
          href={ERoutesPath.deployContract}
        />

        <CreateCallToAction
          icon={Image}
          title='Mint an NFT'
          description='Create a collection and mint NFTs directly to your wallet.'
          href={ERoutesPath.mint}
        />
      </Section>

      <div className='flex h-full w-1/2 items-center justify-center'>
        <h1>IMAGES CAROUSEL</h1>
      </div>
    </Main>
  );
}
