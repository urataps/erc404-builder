import React from 'react';

import type { ComponentProps } from 'react';

import { Brush, NotepadText, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

type TCollectionFeatures = ComponentProps<'div'>;

export default function CollectionFeatures({ className, ...otherProperties }: TCollectionFeatures) {
  const actions = [
    {
      icon: NotepadText,
      title: 'Manage collection settings',
      description: 'Edit collection details, earnings, and links.'
    },
    {
      icon: Sparkles,
      title: 'Set up your drop',
      description: 'Set up your mint schedule and presale stages.'
    },
    {
      icon: Brush,
      title: 'Prepare designs',
      description: 'Customize your pages and upload all assets.'
    }
  ];

  return (
    <div
      className={cn('rounded-md bg-secondary p-5 text-secondary-foreground', className)}
      {...otherProperties}
    >
      <h3 className='mb-5 font-semibold'>After you deploy your contract you will be able to:</h3>

      <ul className='flex flex-col gap-y-5 text-muted-foreground'>
        {actions.map((action) => (
          <li key={action.title} className='flex gap-x-5'>
            <action.icon className='h-6 w-6' />

            <div className='flex flex-col'>
              <h4 className='font-medium'>{action.title}</h4>
              <span className='text-xs font-semibold italic'>Coming soon!</span>
              <p className='mt-2 text-sm'>{action.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
