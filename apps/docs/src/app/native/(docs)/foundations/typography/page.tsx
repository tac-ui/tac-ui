'use client';

import React from 'react';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, InlineCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';

const typeScale = [
  { label: 'Display', key: 'display.lg', size: 34, lineHeight: 42, weight: '700' },
  { label: 'Display SM', key: 'display.md', size: 28, lineHeight: 36, weight: '700' },
  { label: 'Heading 1', key: 'heading.h1', size: 24, lineHeight: 32, weight: '700' },
  { label: 'Heading 2', key: 'heading.h2', size: 20, lineHeight: 28, weight: '600' },
  { label: 'Heading 3', key: 'heading.h3', size: 18, lineHeight: 26, weight: '600' },
  { label: 'Heading 4', key: 'heading.h4', size: 16, lineHeight: 24, weight: '600' },
  { label: 'Body LG', key: 'body.lg', size: 16, lineHeight: 24, weight: '400' },
  { label: 'Body MD', key: 'body.md', size: 14, lineHeight: 22, weight: '400' },
  { label: 'Body SM', key: 'body.sm', size: 13, lineHeight: 20, weight: '400' },
  { label: 'Caption', key: 'caption.md', size: 12, lineHeight: 18, weight: '400' },
  { label: 'Caption SM', key: 'caption.sm', size: 11, lineHeight: 16, weight: '500' },
];

const fontWeights = [
  { label: 'Regular', weight: '400', value: 'normal' },
  { label: 'Medium', weight: '500', value: 'medium' },
  { label: 'Semibold', weight: '600', value: 'semibold' },
  { label: 'Bold', weight: '700', value: 'bold' },
];

export default function NativeTypographyPage() {
  const pt = usePageTranslation('native-typography');

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Typography'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Font families, sizes, and weights for React Native. All values are numeric (points) — accessed via the theme context.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['font-families']?.title ?? 'Font Families'}>
        <DocText>
          {pt?.sections?.['font-families']?.texts?.[0] ?? (
            <>
              The primary font uses the system font family via{' '}
              <InlineCode>theme.typography.fontFamily.primary</InlineCode>. A monospace family is also available for
              code and technical text.
            </>
          )}
        </DocText>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
              Primary
            </p>
            <p className="text-2xl font-medium">Aa Bb Cc 123</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2 font-mono">theme.typography.fontFamily.primary</p>
          </div>
          <div className="p-5 rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
              Monospace
            </p>
            <p className="text-2xl font-medium font-mono">Aa Bb Cc 123</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2 font-mono">theme.typography.fontFamily.mono</p>
          </div>
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['type-scale']?.title ?? 'Type Scale'}>
        <DocText>
          {pt?.sections?.['type-scale']?.texts?.[0] ??
            'A harmonious scale from caption (11pt) to display (34pt). All values are in points.'}
        </DocText>
        <div className="flex flex-col">
          {typeScale.map((s) => (
            <React.Fragment key={s.label}>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4 border-b border-solid border-[var(--border)]">
                <div className="flex items-center gap-3 w-32 shrink-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {s.label}
                  </span>
                </div>
                <p
                  className="text-[var(--foreground)] flex-1"
                  style={{
                    fontSize: s.size,
                    lineHeight: `${s.lineHeight}px`,
                    fontWeight: s.weight as React.CSSProperties['fontWeight'],
                  }}
                >
                  The quick brown fox
                </p>
                <span className="text-[11px] font-mono text-[var(--muted-foreground)] shrink-0">
                  {s.size}px / {s.lineHeight}px / {s.weight}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['font-weights']?.title ?? 'Font Weights'}>
        <DocText>{pt?.sections?.['font-weights']?.texts?.[0] ?? 'Available weights from regular to bold.'}</DocText>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {fontWeights.map(({ label, weight }) => (
            <div
              key={label}
              className="p-4 rounded-[var(--radius-lg)] border border-solid border-[var(--border)] text-center"
            >
              <p
                className="text-xl text-[var(--foreground)]"
                style={{ fontWeight: weight as React.CSSProperties['fontWeight'] }}
              >
                Ag
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                {label} ({weight})
              </p>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}
