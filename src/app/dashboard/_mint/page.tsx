import React from 'react';

import Section from '@/components/section';

import MintForm from './_components/mint-form';

export default function Mint() {
  return (
    <Section title='Create an NFT'>
      <p>Once your item is minted you will not be able to change any of its information.</p>

      <MintForm />
    </Section>
  );
}
