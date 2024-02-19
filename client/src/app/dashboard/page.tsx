import React from 'react';

import config from '_config';

import Section from '@/components/section';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

import Collections from './_components/collections-list';

export const metadata = {
  title: `${config.metadata.title} | Dashboard`
};

export default function Dashboard() {
  return (
    <WithSignTAC>
      <Section
        title='Collections'
        subtitle='After you will deploy your collections, you will be able to manage them here'
        className='relative h-full'
      >
        <Collections />
      </Section>
    </WithSignTAC>
  );
}
