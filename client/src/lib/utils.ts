import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trimBigString(value: string) {
  return value.length > 12 ? `${value.slice(0, 12)}...` : value;
}
