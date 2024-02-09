import React from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type TMain = ComponentProps<'main'>;

export default function Main({ children, className, ...otherProperties }: TMain) {
  return (
    <main
      className={cn('flex h-full w-full flex-col items-center justify-start p-10', className)}
      {...otherProperties}
    >
      {children}
    </main>
  );
}
