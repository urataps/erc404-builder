import React from 'react';

import type { ComponentProps } from 'react';

import { PencilRuler } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

const email = 'hello@defibuilder.com';

type TFeatureRequest = ComponentProps<'div'>;

export default function FeatureRequest({ className, ...otherProperties }: TFeatureRequest) {
  return (
    <div
      className={cn(
        'flex gap-x-5 rounded-md bg-secondary p-5 text-secondary-foreground',
        className
      )}
      {...otherProperties}
    >
      <PencilRuler className='h-6 w-6' />

      <div className='flex flex-col'>
        <h3 className='font-semibold'>Are we missing some features?</h3>
        <p>
          Write us an email at:{' '}
          <Button variant='link' className='px-0 py-0 text-inherit' asChild>
            <Link href={`mailto:${email}`} className='font-medium'>
              {email}
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
