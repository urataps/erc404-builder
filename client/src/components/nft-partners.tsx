import React from 'react';

import type { ComponentProps } from 'react';

import Image from 'next/image';

import StyledLink from '@/components/styled-link';
import { cn } from '@/lib/utils';

const nftPartnerLinks = [
  {
    logo: 'https://dex-bin.bnbstatic.com/greenfield/static/images/greenfield/hero-illustration-sm.png',
    name: 'BNB Greenfield',
    link: 'https://greenfield.bnbchain.org/en'
  }
];

type TNftPartners = ComponentProps<'div'>;

export default function NftPartners({ className, ...otherProperties }: TNftPartners) {
  return (
    <div
      className={cn('rounded-md bg-secondary p-5 text-secondary-foreground', className)}
      {...otherProperties}
    >
      <h3 className='text-semibold text-lg'>Need to generate Base URI for your NFTs?</h3>
      <p className='mt-1.5'>
        Get started using one of the best decentralized storage solutions for NFTs on the market.
      </p>

      <ul className='mt-5'>
        {nftPartnerLinks.map((partner) => (
          <li key={partner.name}>
            <StyledLink variant='link' href={partner.link} target='_blank'>
              <div className='flex gap-x-2.5'>
                <Image src={partner.logo} alt={`${partner.name}'s logo`} width={35} height={35} />
                <span>{partner.name}</span>
              </div>
            </StyledLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
