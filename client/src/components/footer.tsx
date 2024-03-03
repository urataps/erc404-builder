import React from 'react';

import { Heart } from 'lucide-react';

import StyledLink from './styled-link';

export default function Footer() {
  const website = 'https://dorahacks.io/hackathon/bnbchain-hackathon/bnb-chain-challenge-tracks';
  const year = new Date().getFullYear();

  return (
    <footer className='flex h-10 w-full items-center justify-center border-t border-border text-xs'>
      Made with &nbsp;
      <Heart className='h-4 w-4 text-red-500' /> &nbsp; at
      <StyledLink variant='link' href={website} target='_blank' className='px-1 text-xs'>
        BNB
      </StyledLink>
      hackathon &nbsp;
    </footer>
  );
}
