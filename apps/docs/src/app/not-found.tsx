'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@tac-ui/web';
import { TacLogo, ArrowLeft } from '@tac-ui/icon';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center mb-8">
          <TacLogo size={40} className="text-[var(--muted-foreground)] opacity-30" />
        </div>
        <h1 className="text-7xl font-bold text-[var(--foreground)] tracking-tight">404</h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)]">Page not found</p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="no-underline">
            <Button variant="outline">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
          <Link href="/web/docs" className="no-underline">
            <Button>Web Docs</Button>
          </Link>
          <Link href="/native/docs" className="no-underline">
            <Button variant="secondary">Native Docs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
