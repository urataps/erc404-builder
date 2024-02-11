import React from 'react';

import Section from '@/components/section';
import WithAuthentication from '@/higher-order-components/with-authentication';

import DeployContractForm from './_components/deploy-contract-form';

export default function DeployContract() {
  return (
    <WithAuthentication>
      <Section title='First, you will need to deploy a contract'>
        <p>
          You will need to deploy an ERC-404 contract onto the blockchain before you can create a
          drop.
        </p>

        <DeployContractForm />
      </Section>
    </WithAuthentication>
  );
}
