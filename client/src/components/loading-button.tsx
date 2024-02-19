import React from 'react';

import type { ButtonProperties } from './ui/button';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

type TLoadingButtonProperties = ButtonProperties & {
  isLoading: boolean;
  defaultContent: string;
  loadingContent: string;
};

export default function LoadingButton({
  isLoading,
  defaultContent,
  loadingContent,
  className,
  ...otherProperties
}: TLoadingButtonProperties) {
  return (
    <Button disabled={isLoading} className={cn(className)} {...otherProperties}>
      {isLoading ? (
        <div className='flex items-center gap-x-2.5'>
          <Loader2 className='h-5 w-5 animate-spin' />
          <span>{loadingContent}</span>
        </div>
      ) : (
        <span>{defaultContent}</span>
      )}
    </Button>
  );
}
