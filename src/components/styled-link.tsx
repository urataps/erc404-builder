import React from 'react';

import type { UrlObject } from 'node:url';
import type { HTMLAttributeAnchorTarget } from 'react';
import type { ButtonProperties } from './ui/button';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

type TStyledLink = ButtonProperties & {
  href: string | UrlObject;
  target?: HTMLAttributeAnchorTarget;
};

export default function StyledLink({
  href,
  target,
  variant,
  children,
  className,
  ...otherButtonProperties
}: TStyledLink) {
  return (
    <Button
      variant={variant}
      className={cn(
        'text-base',
        { 'h-fit px-0 py-0 text-foreground': variant === 'link' },
        className
      )}
      asChild
      {...otherButtonProperties}
    >
      <Link href={href} target={target}>
        {children}
      </Link>
    </Button>
  );
}
