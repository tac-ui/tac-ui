'use client';

import React, { useState } from 'react';
import { Badge } from '@tac-ui/web';
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

function CountDemo() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-4">
      <Badge variant="default" count={count} />
      <div className="flex gap-2">
        <button
          className="px-3 py-1 text-sm rounded-[var(--radius-s)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--interactive-hover)]"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
        >
          −
        </button>
        <button
          className="px-3 py-1 text-sm rounded-[var(--radius-s)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--interactive-hover)]"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function BadgePage() {
  const pt = usePageTranslation('badge');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Badge'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A small status label used to display counts, states, or categories.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Badge } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Badge props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: [
                'default',
                'secondary',
                'outline',
                'destructive',
                'success',
                'error',
                'warning',
                'info',
                'glass',
              ],
              defaultValue: 'default',
            },
            label: {
              type: 'text',
              label: 'Label',
              defaultValue: 'Badge',
            },
          }}
          render={(values) => <Badge variant={values.variant as 'default'}>{values.label as string}</Badge>}
          code={(values) => `<Badge variant="${values.variant}">${values.label}</Badge>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Nine semantic variants cover the full range of status communication from neutral to critical.'}
        </DocText>
        <Showcase
          code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="glass">Glass</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>`}
        >
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="glass">Glass</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['glass']?.title ?? 'Glass'}>
        <DocText>
          {pt?.sections?.['glass']?.texts?.[0] ??
            'The glass variant uses a frosted-glass backdrop filter with a subtle border, adapting naturally to both light and dark themes.'}
        </DocText>
        <Showcase
          code={`<Badge variant="glass">New</Badge>
<Badge variant="glass">Beta</Badge>
<Badge variant="glass">Pro</Badge>`}
        >
          <Badge variant="glass">New</Badge>
          <Badge variant="glass">Beta</Badge>
          <Badge variant="glass">Pro</Badge>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['interactive']?.title ?? 'Interactive'}>
        <DocText>
          {pt?.sections?.['interactive']?.texts?.[0] ??
            'Set interactive or provide an onClick to enable spring hover and tap animations. Useful for filterable tag chips.'}
        </DocText>
        <Showcase
          code={`<Badge variant="default" interactive>Clickable</Badge>
<Badge variant="outline" interactive>Filter</Badge>
<Badge variant="success" onClick={() => alert('clicked')}>Status</Badge>`}
        >
          <Badge variant="default" interactive>
            Clickable
          </Badge>
          <Badge variant="outline" interactive>
            Filter
          </Badge>
          <Badge variant="success" onClick={() => alert('clicked')}>
            Status
          </Badge>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['count']?.title ?? 'Count'}>
        <DocText>
          {pt?.sections?.['count']?.texts?.[0] ??
            'The count prop animates numeric value changes with a popLayout exit transition. Use it for notification counts or unread indicators.'}
        </DocText>
        <Showcase
          code={`const [count, setCount] = useState(3);

<Badge variant="default" count={count} />
<button onClick={() => setCount((c) => c - 1)}>−</button>
<button onClick={() => setCount((c) => c + 1)}>+</button>`}
        >
          <CountDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"default" | "secondary" | "outline" | "glass" | "destructive" | "success" | "error" | "warning" | "info"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style of the badge.',
            },
            {
              name: 'count',
              type: 'number',
              default: '-',
              description:
                pt?.props?.['count'] ??
                'Numeric value to display. When provided, changes animate with an exit transition via AnimatePresence.',
            },
            {
              name: 'interactive',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['interactive'] ??
                'Enables spring hover and tap animations. Automatically enabled when onClick is provided.',
            },
            {
              name: 'onClick',
              type: 'React.MouseEventHandler<HTMLSpanElement>',
              default: '-',
              description: pt?.props?.['onClick'] ?? 'Click handler. Implicitly enables interactive mode when set.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ?? 'Content displayed inside the badge. Ignored when count is provided.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
