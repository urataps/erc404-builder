import React from 'react';

import type { ComponentProps } from 'react';

import { PencilRuler } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

const email = 'hello@defibuilder.com';

type TFeatureBanner = ComponentProps<'div'>;

export default function FeatureBanner({ className, ...otherProperties }: TFeatureBanner) {
  return (
    <div className={cn('flex gap-x-5', className)} {...otherProperties}>
      <PencilRuler className='h-6 w-6' />

      <div className='flex flex-col'>
        <h3 className='font-semibold'>Are we missing some features?</h3>
        <p>
          Write us an email at:{' '}
          <Button variant='link' className='px-0 py-0 text-secondary-foreground' asChild>
            <Link href={`mailto:${email}`} className='font-medium'>
              {email}
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
