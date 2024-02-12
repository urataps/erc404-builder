import React from 'react';

import Main from '@/components/main';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

export default function Home() {
  return (
    <WithSignTAC>
      <Main className='justify-center'>
        <h1 className='text-2xl font-bold'>Home page</h1>
      </Main>
    </WithSignTAC>
  );
}
