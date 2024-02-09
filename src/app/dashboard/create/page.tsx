import React from 'react';

import { Image as ImageIcon, LayoutGrid, Undo } from 'lucide-react';
import Link from 'next/link';

import Main from '@/components/main';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { ERoutesPath } from '@/constants/routes';

import CreateCallToAction from './_components/call-to-action';
import Carousel from './_components/carousel';

export default function Create() {
  return (
    <Main className='flex-row p-0'>
      <Button
        variant='outline'
        size='icon'
        className='absolute left-10 top-10 rounded-full p-1.5'
        asChild
      >
        <Link href={ERoutesPath.dashboard}>
          <Undo />
        </Link>
      </Button>

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
          href={ERoutesPath.mint}
        />
      </Section>

      <div className='h-full w-1/2'>
        <Carousel />
      </div>
    </Main>
  );
}
