'use client';

import React from 'react';
import { CodeBlock, Badge } from '@tac-ui/web';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, InlineCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { usePageTranslation } from '@/i18n';

const badgeVariants: Record<string, 'info' | 'success' | 'warning' | 'outline' | 'glass' | undefined> = {
  install: 'info',
  components: 'success',
  tokens: 'outline',
  animation: 'warning',
  icons: 'glass',
};

const itemDefs: { key: string; badge: string; defaultText: string }[] = [
  { key: 'install', badge: 'install', defaultText: 'Quick start installation and TacNativeProvider setup' },
  {
    key: 'components',
    badge: 'components',
    defaultText: '20+ React Native components with props, variants, and usage examples',
  },
  {
    key: 'tokens',
    badge: 'tokens',
    defaultText: 'Design tokens — colors, spacing, radius, shadows accessible via useTacNativeTheme()',
  },
  {
    key: 'animation',
    badge: 'animation',
    defaultText: 'Motion constants — duration values and spring configs for Animated API',
  },
  { key: 'icons', badge: 'icons', defaultText: 'Icon usage with @tac-ui/icon-native (lucide-react-native + TacLogo)' },
];

export default function NativeLlmsTxtPage() {
  const pt = usePageTranslation('native-llms-txt');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'llms.txt'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Tac UI Native provides an llms.txt file — a machine-readable reference for LLM-powered coding assistants (Cursor, Copilot, Claude, etc.).'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['what-is-llms-txt']?.title ?? 'What is llms.txt?'}>
        <DocText>
          <InlineCode>llms.txt</InlineCode>{' '}
          {pt?.sections?.['what-is-llms-txt']?.texts?.[0] ?? (
            <>
              is a standardized file that helps AI coding assistants understand your library. It contains component
              APIs, prop tables, usage examples, and design token references in a format optimized for LLM context
              windows.
            </>
          )}
        </DocText>
        <DocText>
          {pt?.sections?.['what-is-llms-txt']?.texts?.[1] ??
            'When an AI tool reads this file, it can generate accurate Tac UI Native code without hallucinating prop names, inventing non-existent APIs, or using web-specific patterns like Tailwind classes.'}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['location']?.title ?? 'Location'}>
        <DocText>
          {pt?.sections?.['location']?.texts?.[0] ??
            'The file is served as a static asset from the documentation site:'}
        </DocText>
        <CodeBlock language="text" code="https://tac-ui.com/native/llms.txt" />
        <DocText>{pt?.sections?.['location']?.texts?.[1] ?? 'In the repository, it lives at:'}</DocText>
        <CodeBlock language="text" code="apps/docs/public/llms-native.txt" />
      </DocSection>

      <DocSection title={pt?.sections?.['whats-included']?.title ?? "What's Included"}>
        <DocText>{pt?.sections?.['whats-included']?.texts?.[0] ?? 'The llms.txt file covers:'}</DocText>
        <div className="flex flex-col gap-2 pl-1">
          {itemDefs.map(({ key, badge, defaultText }) => (
            <div key={key} className="flex items-start gap-2 text-[14px] text-[var(--muted-foreground)]">
              <Badge variant={badgeVariants[key]} className="mt-0.5 shrink-0">
                {badge}
              </Badge>
              <span>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(pt as any)?.items?.[key] ?? defaultText}
              </span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['usage-with-ai-tools']?.title ?? 'Usage with AI Tools'}>
        <DocText>
          {pt?.sections?.['usage-with-ai-tools']?.texts?.[0] ??
            'Most AI coding assistants automatically discover llms.txt when configured with your docs URL. You can also manually reference it:'}
        </DocText>
        <CodeBlock
          language="markdown"
          code={`# In Cursor rules or system prompt:
Refer to https://tac-ui.com/native/llms.txt for Tac UI Native component APIs.

# Or paste directly into context:
@llms.txt`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['keeping-updated']?.title ?? 'Keeping it Updated'}>
        <DocText>
          {pt?.sections?.['keeping-updated']?.texts?.[0] ??
            'The llms.txt file should be updated whenever component APIs change — new props, renamed variants, or default value changes. It lives in apps/docs/public/llms-native.txt and is deployed with the documentation site.'}
        </DocText>
      </DocSection>
    </DocPage>
  );
}
