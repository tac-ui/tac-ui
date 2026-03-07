import React from 'react';
import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tac-ui.github.io/tac-ui'),
  title: {
    default: 'Tac UI — Cross-Platform Design System',
    template: '%s | Tac UI',
  },
  description:
    'A design system where code breathes. Spring physics, sequential illumination, and glassmorphic depth — crafted for React and React Native.',
  openGraph: {
    type: 'website',
    siteName: 'Tac UI',
    title: 'Tac UI — Cross-Platform Design System',
    description:
      'A design system where code breathes. Spring physics, sequential illumination, and glassmorphic depth — crafted for React and React Native.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tac UI — Cross-Platform Design System',
    description:
      'A design system where code breathes. Spring physics, sequential illumination, and glassmorphic depth — crafted for React and React Native.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className="m-0 p-0 font-[var(--font-primary)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
