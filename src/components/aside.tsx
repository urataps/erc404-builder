import React from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type TAside = ComponentProps<'aside'>;
export default function Aside({ children, className, ...otherProperties }: TAside) {
  return (
    <aside
      className={cn('rounded-md bg-secondary p-5 text-secondary-foreground', className)}
      {...otherProperties}
    >
      {children}
    </aside>
  );
}
