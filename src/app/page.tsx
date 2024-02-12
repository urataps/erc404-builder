import React from 'react';

import Main from '@/components/main';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

import Layout from './_components/layout';

export default function Home() {
  return (
    <WithSignTAC>
      <Layout>
        <Main className='justify-center'>
          <h1 className='text-2xl font-bold'>Home page</h1>
        </Main>
      </Layout>
    </WithSignTAC>
  );
}
