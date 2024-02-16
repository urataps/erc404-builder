import React from 'react';

import type { ComponentProps } from 'react';

import Image from 'next/image';

import theNftGeneratorLogo from '@/assets/images/the-nft-generator-logo.svg';
import StyledLink from '@/components/styled-link';
import { cn } from '@/lib/utils';

const nftPartnerLinks = [
  {
    logo: theNftGeneratorLogo as string,
    name: 'The NFT Generator',
    link: 'https://the-nft-generator.com/?via=defibuilder'
  }
];

type TNftPartners = ComponentProps<'div'>;

export default function NftPartners({ className, ...otherProperties }: TNftPartners) {
  return (
    <div
      className={cn('rounded-md bg-secondary p-5 text-secondary-foreground', className)}
      {...otherProperties}
    >
      <h3 className='text-semibold text-lg'>Need to generate your own NFTs?</h3>
      <p className='mt-1.5'>
        Get started using one of the best <span className='font-medium'>no coding</span> NFTs
        generator platforms:
      </p>

      <ul className='mt-5'>
        {nftPartnerLinks.map((partner) => (
          <li key={partner.name}>
            <StyledLink variant='link' href={partner.link} target='_blank'>
              <div className='flex gap-x-2.5'>
                <Image src={partner.logo} alt={`${partner.name}'s logo`} width={25} height={25} />
                <span>{partner.name}</span>
              </div>
            </StyledLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
