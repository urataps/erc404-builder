import React from 'react';

import { PencilRuler } from 'lucide-react';
import Link from 'next/link';

import Main from '@/components/main';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { ERoutesName, ERoutesPath } from '@/constants/routes';

export default function Dashboard() {
  return (
    <Main className='justify-start'>
      <Section title='Collections'>
        <div className='border-boder flex h-24 w-full items-center gap-x-5 rounded-md border p-5 transition-[background-color_transform] hover:-translate-y-1 hover:bg-secondary'>
          <div className='justify-cetner flex h-10 w-10 items-center rounded-full bg-primary p-2.5'>
            <PencilRuler className='h-10 w-10 text-primary-foreground' />
          </div>

          <div className='flex w-full items-center justify-between'>
            <p>You have not created any collection yet.</p>

            <Button asChild>
              <Link href={ERoutesPath.create}>{ERoutesName.create}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Main>
  );
}
