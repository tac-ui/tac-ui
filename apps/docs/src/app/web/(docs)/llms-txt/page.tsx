'use client';

import React from 'react';
import { CodeBlock, Badge } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, InlineCode } from '@/components/docs/DocPage';

const badgeVariants: Record<string, 'info' | 'success' | 'warning' | 'outline' | 'glass' | undefined> = {
  install: 'info',
  components: 'success',
  charts: 'warning',
  layout: undefined,
  tokens: 'outline',
  hooks: 'glass',
};

const itemKeys = ['install', 'components', 'charts', 'layout', 'tokens', 'hooks'] as const;

export default function LlmsTxtPage() {
  const pt = usePageTranslation('llms-txt');

  const s = pt?.sections;
  const what = s?.['what'];
  const location = s?.['location'];
  const included = s?.['included'];
  const usage = s?.['usage'];
  const updating = s?.['updating'];

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'llms.txt'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Tac UI provides an llms.txt file — a machine-readable reference for LLM-powered coding assistants (Cursor, Copilot, Claude, etc.).'}
        </DocDescription>
      </div>

      <DocSection title={what?.title ?? 'What is llms.txt?'}>
        <DocText>
          <InlineCode>llms.txt</InlineCode>{' '}
          {what?.texts?.[0] ??
            'is a standardized file that helps AI coding assistants understand your library. It contains component APIs, prop tables, usage examples, and design token references in a format optimized for LLM context windows.'}
        </DocText>
        <DocText>
          {what?.texts?.[1] ??
            'When an AI tool reads this file, it can generate accurate Tac UI code without hallucinating prop names or inventing non-existent APIs.'}
        </DocText>
      </DocSection>

      <DocSection title={location?.title ?? 'Location'}>
        <DocText>{location?.texts?.[0] ?? 'The file is served as a static asset from the documentation site:'}</DocText>
        <CodeBlock language="text" code="https://tac-ui.com/web/llms.txt" />
        <DocText>{location?.texts?.[1] ?? 'In the repository, it lives at:'}</DocText>
        <CodeBlock language="text" code="apps/docs/public/llms.txt" />
      </DocSection>

      <DocSection title={included?.title ?? "What's Included"}>
        <DocText>{included?.description ?? 'The llms.txt file covers:'}</DocText>
        <div className="flex flex-col gap-2 pl-1">
          {itemKeys.map((key) => {
            const item = (included?.items as Record<string, { badge?: string; text?: string }> | undefined)?.[key];
            return (
              <div key={key} className="flex items-start gap-2 text-[14px] text-[var(--muted-foreground)]">
                <Badge variant={badgeVariants[key]} className="mt-0.5 shrink-0">
                  {item?.badge ?? key}
                </Badge>
                <span>{item?.text ?? key}</span>
              </div>
            );
          })}
        </div>
      </DocSection>

      <DocSection title={usage?.title ?? 'Usage with AI Tools'}>
        <DocText>
          {usage?.texts?.[0] ??
            'Most AI coding assistants automatically discover llms.txt when configured with your docs URL. You can also manually reference it:'}
        </DocText>
        <CodeBlock
          language="markdown"
          code={`# In Cursor rules or system prompt:
Refer to https://tac-ui.com/llms.txt for Tac UI component APIs.

# Or paste directly into context:
@llms.txt`}
        />
      </DocSection>

      <DocSection title={updating?.title ?? 'Keeping it Updated'}>
        <DocText>
          {updating?.texts?.[0] ??
            'The llms.txt file should be updated whenever component APIs change — new props, renamed variants, or default value changes. It lives in apps/docs/public/llms.txt and is deployed with the documentation site.'}
        </DocText>
      </DocSection>
    </DocPage>
  );
}
