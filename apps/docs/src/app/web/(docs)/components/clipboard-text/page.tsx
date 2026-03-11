'use client';

import React from 'react';
import { ClipboardText } from '@tac-ui/web';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  Showcase,
  PropsTable,
  DocText,
  PreviewCode,
} from '@/components/docs/DocPage';
import { usePageTranslation } from '@/i18n';
import { Playground } from '@/components/docs/Playground';

export default function ClipboardTextPage() {
  const pt = usePageTranslation('clipboard-text');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'ClipboardText'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Displays a monospace text value with a one-click copy-to-clipboard button that appears on hover.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { ClipboardText } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the ClipboardText props below.</DocText>
        <Playground
          controls={{
            size: {
              type: 'select',
              label: 'Size',
              options: ['sm', 'md', 'lg'],
              defaultValue: 'md',
            },
            text: {
              type: 'text',
              label: 'Text',
              defaultValue: 'npm install @tac-ui/web',
            },
          }}
          render={(values) => (
            <ClipboardText
              size={values.size as 'sm' | 'md' | 'lg'}
              text={values.text as string}
            />
          )}
          code={(values) =>
            `<ClipboardText${values.size !== 'md' ? ` size="${values.size}"` : ''} text="${values.text}" />`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The copy button appears on hover with an animated icon swap between the copy and check states.'}
        </DocText>
        <Showcase code={`<ClipboardText text="npm install @tac-ui/web" />`}>
          <ClipboardText text="npm install @tac-ui/web" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ??
            'Three size options control the padding, font size, and icon size to match surrounding content.'}
        </DocText>
        <Showcase
          className="flex-col items-start"
          code={`<ClipboardText size="sm" text="npm install @tac-ui/web" />
<ClipboardText size="md" text="npm install @tac-ui/web" />
<ClipboardText size="lg" text="npm install @tac-ui/web" />`}
        >
          <ClipboardText size="sm" text="npm install @tac-ui/web" />
          <ClipboardText size="md" text="npm install @tac-ui/web" />
          <ClipboardText size="lg" text="npm install @tac-ui/web" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['various-content']?.title ?? 'Various Content'}>
        <DocText>
          {pt?.sections?.['various-content']?.texts?.[0] ??
            'Use ClipboardText to display any copyable value: install commands, API keys, URLs, or environment variables.'}
        </DocText>
        <Showcase
          className="flex-col items-start"
          code={`<ClipboardText text="npm install @tac-ui/web" />
<ClipboardText text="sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890" />
<ClipboardText text="https://tac-ui.vercel.app/web/components/button" />`}
        >
          <ClipboardText text="npm install @tac-ui/web" />
          <ClipboardText text="sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890" />
          <ClipboardText text="https://tac-ui.vercel.app/web/components/button" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'text',
              type: 'string',
              default: '-',
              description: pt?.props?.['text'] ?? 'The text value to display and copy to clipboard.',
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Controls the padding, font size, and icon size.',
            },
            {
              name: 'onCopy',
              type: '() => void',
              default: '-',
              description: pt?.props?.['onCopy'] ?? 'Called after the text is successfully copied to clipboard.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
