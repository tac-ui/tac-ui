'use client';

import React from 'react';
import Link from 'next/link';
import { SplitPage, Header } from '@tac-ui/web';
import { ArrowLeft, TacLogo } from '@tac-ui/icon';

export default function SplitExample() {
  return (
    <SplitPage
      header={
        <Header bordered sticky>
          <Link
            href="/web/components/layout"
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">SplitPage</span>
        </Header>
      }
      left={
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <div className="w-20 h-20 rounded-full bg-[var(--primary)] flex items-center justify-center">
            <TacLogo size={36} fill="var(--primary-foreground)" />
          </div>
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold m-0 mb-3">Welcome Back</h1>
            <p className="text-base text-[var(--muted-foreground)] m-0 leading-relaxed">
              Sign in to your account to continue where you left off.
            </p>
          </div>
        </div>
      }
      right={
        <div className="flex flex-col justify-center h-full px-12 lg:px-16">
          <div className="w-full flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-semibold m-0 mb-2">Sign In</h2>
              <p className="text-base text-[var(--muted-foreground)] m-0">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Email</label>
                <div className="w-full h-11 px-4 rounded-[var(--radius-m)] border border-solid border-[var(--border)] bg-[var(--background)] flex items-center text-sm text-[var(--muted-foreground)]">
                  name@example.com
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Password</label>
                <div className="w-full h-11 px-4 rounded-[var(--radius-m)] border border-solid border-[var(--border)] bg-[var(--background)] flex items-center text-sm text-[var(--muted-foreground)]">
                  ••••••••
                </div>
              </div>
              <div className="w-full h-11 rounded-[var(--radius-m)] bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-sm font-medium cursor-pointer mt-1">
                Sign In
              </div>
              <p className="text-sm text-center text-[var(--muted-foreground)] m-0">
                Don&apos;t have an account?{' '}
                <span className="text-[var(--primary)] cursor-pointer font-medium">Sign up</span>
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
