import React from 'react';

import Main from '@/components/main';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

export default function Home() {
  return (
    <WithSignTAC>
      <Main className='mx-auto max-w-7xl justify-center gap-y-2.5'>
        <h1 className='text-3xl font-bold'>Free ERC404 token generator</h1>
        <h2 className='text-center text-2xl font-medium'>
          Generate custom ERC404 token using tested Smart contract. <br />
          Deploy ERC404 directly from your wallet using metamask. <br />
          Create ERC404 token on Binance Smart Chain, Linea, Arbitrum and many other EVM
          blockchains.
        </h2>
      </Main>
    </WithSignTAC>
  );
}
