import React from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type TAside = ComponentProps<'aside'>;

export default function Aside({ children, className, ...otherProperties }: TAside) {
  return (
    <aside className={cn('flex flex-col gap-y-5', className)} {...otherProperties}>
      {children}
    </aside>
  );
}
