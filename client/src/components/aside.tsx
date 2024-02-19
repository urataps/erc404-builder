import React from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type TAside = ComponentProps<'aside'>;

export default function Aside({ children, className, ...otherProperties }: TAside) {
  return (
    <aside
      className={cn('flex h-full flex-col gap-y-5 overflow-y-auto p-10', className)}
      {...otherProperties}
    >
      {children}
    </aside>
  );
}
