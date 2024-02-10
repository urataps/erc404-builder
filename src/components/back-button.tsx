import React from 'react';

import type { ButtonProperties } from './ui/button';

import { Undo } from 'lucide-react';
import Link from 'next/link';

import { type ERoutesPath } from '@/constants/routes';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';

type TBackButton = ButtonProperties & {
  to: ERoutesPath;
};

export default function BackButton({ to, className, ...otherProperties }: TBackButton) {
  return (
    <Button
      variant='outline'
      size='icon'
      className={cn('rounded-full p-1.5', className)}
      asChild
      {...otherProperties}
    >
      <Link href={to}>
        <Undo />
      </Link>
    </Button>
  );
}
