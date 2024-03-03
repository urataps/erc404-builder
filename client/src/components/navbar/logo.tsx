import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import { ERoutesPath } from '@/constants/routes';

export default function Logo() {
  return (
    <Link href={ERoutesPath.home}>
      <Image
        src={logoLight}
        alt="404 Factory's logo"
        width={190}
        height={30}
        className='hidden dark:block'
      />
      <Image
        src={logoDark}
        alt="404 Factory's logo"
        width={190}
        height={30}
        className='block dark:hidden'
      />
    </Link>
  );
}
