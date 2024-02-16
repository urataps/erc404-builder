import React from 'react';

import config from '_config';

import Section from '@/components/section';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

import DeployContractForm from './_components/deploy-contract-form';

export const metadata = {
  title: `${config.metadata.title} | Deploy contract`
};

export default function DeployContract() {
  return (
    <WithSignTAC>
      <Section title='First, you will need to deploy a contract'>
        <p>
          You will need to deploy an ERC-404 contract onto the blockchain before you can create a
          drop.
        </p>

        <DeployContractForm />
      </Section>
    </WithSignTAC>
  );
}
