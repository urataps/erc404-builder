import React from 'react';

import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type TBanner = ComponentProps<'div'> & {
  icon: LucideIcon;
  description: string;
  ctaButton: React.ReactNode;
};

export default function Banner({
  icon: Icon,
  description,
  ctaButton,
  className: divClassname,
  ...otherDivProperties
}: TBanner) {
  return (
    <div
      className={cn(
        'border-boder flex h-24 w-full items-center gap-x-5 rounded-md border p-5 transition-[background-color_transform] hover:-translate-y-1 hover:bg-secondary',
        divClassname
      )}
      {...otherDivProperties}
    >
      <div className='justify-cetner flex h-10 w-10 items-center rounded-full bg-secondary p-2.5'>
        <Icon className='h-10 w-10 text-secondary-foreground' />
      </div>

      <div className='flex w-full items-center justify-between'>
        <p>{description}</p>

        {ctaButton}
      </div>
    </div>
  );
}
