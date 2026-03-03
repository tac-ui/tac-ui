'use client';

import React from 'react';
import { VStack, Divider } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, InlineCode } from '@/components/docs/DocPage';

const samples = [
  { label: 'Display', className: 'text-4xl font-bold', text: 'The quick brown fox' },
  { label: 'Heading 1', className: 'text-3xl font-bold', text: 'The quick brown fox' },
  { label: 'Heading 2', className: 'text-2xl font-semibold', text: 'The quick brown fox' },
  { label: 'Heading 3', className: 'text-xl font-semibold', text: 'The quick brown fox' },
  { label: 'Heading 4', className: 'text-lg font-medium', text: 'The quick brown fox' },
  { label: 'Body', className: 'text-base', text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  { label: 'Body Small', className: 'text-sm', text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  { label: 'Caption', className: 'text-xs text-[var(--muted-foreground)]', text: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Overline', className: 'text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]', text: 'CATEGORY LABEL' },
];

export default function TypographyPage() {
  const pt = usePageTranslation('typography');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Typography'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Font families, sizes, and weights used across the design system.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['font-families']?.title ?? 'Font Families'}>
        <DocText>
          {pt?.sections?.['font-families']?.texts?.[0] ?? <>The primary font is set via <InlineCode>--font-primary</InlineCode> and used for all UI text. A secondary font <InlineCode>--font-secondary</InlineCode> is available for display or branding.</>}
        </DocText>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">Primary</p>
            <p className="text-2xl font-medium" style={{ fontFamily: 'var(--font-primary)' }}>Aa Bb Cc 123</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2 font-mono">var(--font-primary)</p>
          </div>
          <div className="p-5 rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">Monospace</p>
            <p className="text-2xl font-medium font-mono">Aa Bb Cc 123</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2 font-mono">font-mono</p>
          </div>
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['type-scale']?.title ?? 'Type Scale'}>
        <DocText>{pt?.sections?.['type-scale']?.texts?.[0] ?? 'A harmonious scale from caption (12px) to display (36px).'}</DocText>
        <VStack gap="none">
          {samples.map((s) => (
            <React.Fragment key={s.label}>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] w-24 shrink-0">{s.label}</span>
                <p className={`text-[var(--foreground)] ${s.className}`}>{s.text}</p>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </VStack>
      </DocSection>

      <DocSection title={pt?.sections?.['font-weights']?.title ?? 'Font Weights'}>
        <DocText>{pt?.sections?.['font-weights']?.texts?.[0] ?? 'Available weights from regular to bold.'}</DocText>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ['Regular', 'font-normal', '400'],
            ['Medium', 'font-medium', '500'],
            ['Semibold', 'font-semibold', '600'],
            ['Bold', 'font-bold', '700'],
          ].map(([label, cls, weight]) => (
            <div key={label} className="p-4 rounded-[var(--radius-lg)] border border-solid border-[var(--border)] text-center">
              <p className={`text-xl ${cls} text-[var(--foreground)]`}>Ag</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{label} ({weight})</p>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}
