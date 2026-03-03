'use client';

import React from 'react';
import Link from 'next/link';
import { GridPage, Header } from '@tac-ui/web';
import { ArrowLeft, Image, Film, Music, FileText, Code, Palette } from '@tac-ui/icon';

const items = [
  { icon: Image, title: 'Photography', description: 'Capture moments with professional techniques', color: 'var(--chart-1)' },
  { icon: Film, title: 'Videography', description: 'Create compelling visual stories', color: 'var(--chart-2)' },
  { icon: Music, title: 'Audio Production', description: 'Mix and master professional audio', color: 'var(--chart-3)' },
  { icon: FileText, title: 'Content Writing', description: 'Craft engaging written content', color: 'var(--chart-4)' },
  { icon: Code, title: 'Development', description: 'Build modern web applications', color: 'var(--chart-5)' },
  { icon: Palette, title: 'Design', description: 'Create beautiful user interfaces', color: 'var(--chart-6)' },
];

export default function GridExample() {
  return (
    <GridPage
      columns={3}
      header={
        <Header bordered sticky>
          <Link href="/components/layout" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">GridPage</span>
        </Header>
      }
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="p-6 rounded-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40 transition-colors cursor-pointer flex flex-col gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-m)] flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)` }}>
              <Icon size={22} style={{ color: item.color }} />
            </div>
            <div>
              <h3 className="text-base font-semibold m-0">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] m-0 mt-1">{item.description}</p>
            </div>
            <div className="h-24 rounded-[var(--radius-m)] bg-[var(--secondary)]" />
          </div>
        );
      })}
    </GridPage>
  );
}
