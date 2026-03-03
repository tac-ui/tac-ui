'use client';

import React from 'react';
import Link from 'next/link';
import { AsymmetricPage, Header } from '@tac-ui/web';
import { ArrowLeft, Clock, Share2, Bookmark } from '@tac-ui/icon';

const relatedArticles = [
  { title: 'Understanding CSS Grid', date: 'Mar 12' },
  { title: 'Modern JavaScript Patterns', date: 'Mar 10' },
  { title: 'Responsive Design Tips', date: 'Mar 8' },
  { title: 'Web Performance Basics', date: 'Mar 5' },
];

export default function AsymmetricExample() {
  return (
    <AsymmetricPage
      ratio="2:1"
      header={
        <Header bordered sticky>
          <Link href="/components/layout" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">AsymmetricPage</span>
        </Header>
      }
      primary={
        <article className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">Tutorial</span>
              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1"><Clock size={12} /> 8 min read</span>
            </div>
            <h1 className="text-3xl font-bold m-0">A Complete Guide to Flexbox Layout</h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-sm font-medium">J</div>
              <div>
                <div className="text-sm font-medium">Jane Doe</div>
                <div className="text-xs text-[var(--muted-foreground)]">March 15, 2026</div>
              </div>
            </div>
          </div>
          <div className="h-56 rounded-[var(--radius-lg)] bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)]">
            Article Cover Image
          </div>
          <div className="flex flex-col gap-4 text-sm leading-relaxed">
            <p className="m-0">Flexbox is one of the most powerful CSS layout models available today. It provides a flexible way to arrange items in a container, making it easy to create responsive designs without relying on floats or positioning hacks.</p>
            <h2 className="text-xl font-semibold m-0 mt-2">Understanding the Basics</h2>
            <p className="m-0">The flex container is the parent element that holds flex items. By setting <code className="px-1.5 py-0.5 rounded bg-[var(--secondary)] text-xs">display: flex</code>, you transform its children into flex items that can be arranged along a main axis and cross axis.</p>
            <div className="p-4 rounded-[var(--radius-m)] bg-[var(--secondary)] font-mono text-xs leading-relaxed whitespace-pre">{`.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}`}</div>
            <h2 className="text-xl font-semibold m-0 mt-2">Common Patterns</h2>
            <p className="m-0">Flexbox excels at creating navigation bars, card layouts, centering content, and distributing space among items. Understanding the key properties like <code className="px-1.5 py-0.5 rounded bg-[var(--secondary)] text-xs">justify-content</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--secondary)] text-xs">align-items</code>, and <code className="px-1.5 py-0.5 rounded bg-[var(--secondary)] text-xs">flex-wrap</code> is essential for mastering this layout model.</p>
          </div>
        </article>
      }
      secondary={
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-9 rounded-[var(--radius-m)] border border-solid border-[var(--border)] flex items-center px-3 text-xs text-[var(--muted-foreground)]">
              Search articles...
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold m-0">Actions</h3>
            <div className="flex gap-2">
              {[
                { icon: Share2, label: 'Share' },
                { icon: Bookmark, label: 'Save' },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-m)] border border-solid border-[var(--border)] text-xs cursor-pointer hover:bg-[var(--secondary)] transition-colors">
                    <Icon size={12} />
                    {a.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold m-0">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {['CSS', 'Layout', 'Flexbox', 'Responsive', 'Frontend'].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)] cursor-pointer hover:text-[var(--foreground)] transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold m-0">Related Articles</h3>
            {relatedArticles.map((article) => (
              <div key={article.title} className="flex items-center justify-between py-2 border-b border-solid border-[var(--border)] last:border-0 cursor-pointer group">
                <span className="text-xs group-hover:text-[var(--primary)] transition-colors">{article.title}</span>
                <span className="text-[10px] text-[var(--muted-foreground)]">{article.date}</span>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
