import React from 'react';

import Section from '@/components/section';
import WithAuthentication from '@/higher-order-components/with-authentication';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

import Collections from './_components/collections-list';

export default function Dashboard() {
  return (
    <WithAuthentication>
      <WithSignTAC>
        <Section title='Collections' className='relative h-full'>
          <Collections />
        </Section>
      </WithSignTAC>
    </WithAuthentication>
  );
}
