import React from 'react';

import { PencilRuler } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import theNftGeneratorLogo from '@/assets/images/the-nft-generator-logo.svg';
import Aside from '@/components/aside';
import Main from '@/components/main';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { ERoutesName, ERoutesPath } from '@/constants/routes';
import WithAuthentication from '@/higher-order-components/with-authentication';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

import Layout from '../_components/layout';
import Collections from './_components/collections-list';

const nftPartnerLinks = [
  {
    logo: theNftGeneratorLogo as string,
    name: 'The NFT Generator',
    link: 'https://the-nft-generator.com/?via=defibuilder'
  }
];

export default function Dashboard() {
  return (
    <WithAuthentication>
      <WithSignTAC>
        <Layout>
          <Main className='flex-row items-start overflow-hidden'>
            <Section title='Collections' className='h-full'>
              <div className='border-boder flex h-24 w-full items-center gap-x-5 rounded-md border p-5 transition-[background-color_transform] hover:-translate-y-1 hover:bg-secondary'>
                <div className='justify-cetner flex h-10 w-10 items-center rounded-full bg-primary p-2.5'>
                  <PencilRuler className='h-10 w-10 text-primary-foreground' />
                </div>

                <div className='flex w-full items-center justify-between'>
                  <p>You have not created any collection yet.</p>

                  <Button asChild>
                    <Link href={ERoutesPath.deployContract}>{ERoutesName.create}</Link>
                  </Button>
                </div>
              </div>

              <Collections />
            </Section>

            <Aside className='mt-10'>
              <h3 className='text-semibold text-lg'>Need to generate your own NFTs?</h3>
              <p className='mt-1.5'>
                Get started using one of the best <span className='font-medium'>no coding</span>{' '}
                NFTs generator platforms:
              </p>

              <ul className='mt-5'>
                {nftPartnerLinks.map((partner) => (
                  <li key={partner.name}>
                    <Button variant='link' className='px-0 py-0 text-foreground' asChild>
                      <Link href={partner.link} className='flex gap-x-2.5 text-sm'>
                        <Image
                          src={partner.logo}
                          alt={`${partner.name}'s logo`}
                          width={25}
                          height={25}
                        />
                        {partner.name}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </Aside>
          </Main>
        </Layout>
      </WithSignTAC>
    </WithAuthentication>
  );
}
