import React from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type TSection = ComponentProps<'section'> & {
  title: string;
  subtitle?: string;
};

export default function Section({
  title,
  subtitle,
  children,
  className,
  ...otherProperties
}: TSection) {
  const id = title.replaceAll(' ', '-').toLowerCase();
  const headerId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headerId}
      className={cn('flex w-full max-w-7xl flex-col gap-y-5', className)}
      {...otherProperties}
    >
      <header>
        <h2 id={headerId} className='text-3xl font-medium'>
          {title}
        </h2>
        {subtitle ? <h3 className='text-2xl'>{subtitle}</h3> : null}
      </header>

      {children}
    </section>
  );
}
