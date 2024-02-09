import React from 'react';

import Main from '@/components/main';

import Layout from './_components/layout';

export default function Home() {
  return (
    <Layout>
      <Main className='justify-center'>
        <h1 className='text-2xl font-bold'>Home page</h1>
      </Main>
    </Layout>
  );
}
