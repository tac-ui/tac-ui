import React from 'react';
import { Providers } from '@/components/Providers';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className="m-0 p-0 font-[var(--font-primary)]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
