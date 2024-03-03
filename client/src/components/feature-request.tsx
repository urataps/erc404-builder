import React from 'react';

import type { ComponentProps } from 'react';

import { PencilRuler } from 'lucide-react';

import { cn } from '@/lib/utils';

import StyledLink from './styled-link';

const email = 'alexe@forgenie.com';

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
          <StyledLink variant='link' href={`mailto:${email}`}>
            {email}
          </StyledLink>
        </p>
      </div>
    </div>
  );
}
