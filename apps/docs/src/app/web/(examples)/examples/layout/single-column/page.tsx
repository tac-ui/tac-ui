'use client';

import React from 'react';
import Link from 'next/link';
import { SingleColumnPage, Header, Footer } from '@tac-ui/web';
import { ArrowLeft } from '@tac-ui/icon';

export default function SingleColumnExample() {
  return (
    <SingleColumnPage
      maxWidth="lg"
      header={
        <Header bordered sticky>
          <Link
            href="/web/components/layout"
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">SingleColumnPage</span>
        </Header>
      }
      footer={
        <Footer bordered>
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Tac UI</span>
            <span>SingleColumnPage Example</span>
          </div>
        </Footer>
      }
    >
      <article className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold m-0">Building Modern Web Applications</h1>
          <p className="text-[var(--muted-foreground)] text-base m-0">
            A comprehensive guide to creating scalable and maintainable web apps with modern tools and best practices.
          </p>
          <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
            <span>March 15, 2026</span>
            <span>12 min read</span>
          </div>
        </div>
        <div className="h-48 rounded-[var(--radius-lg)] bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)]">
          Cover Image
        </div>
        <div className="flex flex-col gap-4 text-[var(--foreground)] leading-relaxed">
          <p className="m-0">
            The landscape of web development continues to evolve at a rapid pace. Modern frameworks, build tools, and
            deployment platforms have made it easier than ever to create sophisticated applications that deliver
            exceptional user experiences.
          </p>
          <h2 className="text-xl font-semibold m-0 mt-4">Getting Started</h2>
          <p className="m-0">
            Before diving into the code, it&apos;s important to understand the fundamental concepts that underpin modern
            web development. Component-based architecture, state management, and responsive design are all critical
            aspects of building successful applications.
          </p>
          <div className="p-4 rounded-[var(--radius-m)] bg-[var(--secondary)] border border-solid border-[var(--border)]">
            <p className="m-0 text-sm font-mono">npm create next-app@latest my-app</p>
          </div>
          <h2 className="text-xl font-semibold m-0 mt-4">Architecture Patterns</h2>
          <p className="m-0">
            Choosing the right architecture pattern is crucial for long-term maintainability. Whether you prefer a
            monolithic approach or a micro-frontend strategy, the key is to establish clear boundaries and consistent
            patterns across your codebase.
          </p>
          <p className="m-0">
            Consider factors such as team size, deployment frequency, and the complexity of your domain when making
            architectural decisions. There is no one-size-fits-all solution, and the best approach often involves a
            combination of patterns.
          </p>
        </div>
      </article>
    </SingleColumnPage>
  );
}
