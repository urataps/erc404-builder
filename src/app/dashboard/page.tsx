import React from 'react';

import { PencilRuler } from 'lucide-react';
import Link from 'next/link';

import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { ERoutesName, ERoutesPath } from '@/constants/routes';
import WithAuthentication from '@/higher-order-components/with-authentication';
import WithSignTAC from '@/higher-order-components/with-sign-tac';

import Collections from './_components/collections-list';

export default function Dashboard() {
  return (
    <WithAuthentication>
      <WithSignTAC>
        <Section title='Collections' className='h-full'>
          <div className='border-boder flex h-24 w-full items-center gap-x-5 rounded-md border p-5 transition-[background-color_transform] hover:-translate-y-1 hover:bg-secondary'>
            <div className='justify-cetner flex h-10 w-10 items-center rounded-full bg-primary p-2.5'>
              <PencilRuler className='h-10 w-10 text-primary-foreground' />
            </div>

            <div className='flex w-full items-center justify-between'>
              <p>You have not created any collection yet.</p>

              <Button asChild>
                <Link href={ERoutesPath.deployContract}>{ERoutesName.deployContract}</Link>
              </Button>
            </div>
          </div>

          <Collections />
        </Section>
      </WithSignTAC>
    </WithAuthentication>
  );
}
