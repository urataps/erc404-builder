import React from 'react';

import type { LucideIcon } from 'lucide-react';

import { MoveRight } from 'lucide-react';
import Link from 'next/link';

type TCreateCallToAction = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export default function CreateCallToAction({
  icon: Icon,
  title,
  description,
  href
}: TCreateCallToAction) {
  return (
    <Link
      href={href}
      className='flex items-center justify-between rounded-md bg-secondary p-5 text-secondary-foreground transition-[background-color_transform] hover:-translate-y-1 hover:bg-secondary/80'
    >
      <div className='flex flex-col gap-y-2.5'>
        <div className='flex items-center gap-x-5'>
          <Icon className='h-6 w-6' />
          <p className='text-lg font-medium'>{title}</p>
        </div>

        <p>{description}</p>
      </div>

      <MoveRight />
    </Link>
  );
}
