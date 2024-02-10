import React from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type TMintAside = ComponentProps<'aside'>;

export default function MintAside({ className, ...otherProperties }: TMintAside) {
  return (
    <aside
      className={cn('rounded-md bg-secondary p-5 text-secondary-foreground', className)}
      {...otherProperties}
    >
      MINT ASIDE
    </aside>
  );
}
