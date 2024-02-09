import React from 'react';

import type { PropsWithChildren } from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar/navbar';

type TLayout = PropsWithChildren;

export default function Layout({ children }: TLayout) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}
