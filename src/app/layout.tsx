import '../styles/globals.css';
import '../styles/globals.scss';

import React from 'react';

import type { Metadata, Viewport } from 'next';

import config from '_config';
import { Analytics } from '@vercel/analytics/react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar/navbar';
import { Toaster } from '@/components/ui/toast/toaster';
import RootProvider from '@/providers/root';

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  keywords: config.metadata.keywords,
  icons: 'favicon.svg',
  manifest: 'app.webmanifest',
  robots: {
    index: false,
    follow: false
  },
  other: {
    'google-site-verification': 'au3_ZmG9kVHgAkYvYNIM_cZgrLfWv2ZtEnHSv8JiN0E'
  }
};

export const viewport: Viewport = {
  themeColor: '#000'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <RootProvider>
          <Navbar />

          {children}

          <Footer />

          <Analytics />
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
