'use client';

import React from 'react';
import { Tooltip, Button } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
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
import { Playground } from '@/components/docs/Playground';

export default function TooltipPage() {
  const pt = usePageTranslation('tooltip');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Tooltip'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A small informational popup that appears on hover or focus, providing additional context for an element.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Tooltip } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Tooltip props below.</DocText>
        <Playground
          controls={{
            content: {
              type: 'text',
              label: 'Content',
              defaultValue: 'This is a tooltip',
            },
            placement: {
              type: 'select',
              label: 'Placement',
              options: ['top', 'bottom', 'left', 'right'],
              defaultValue: 'top',
            },
          }}
          render={(values) => (
            <Tooltip
              content={values.content as string}
              placement={values.placement as 'top' | 'bottom' | 'left' | 'right'}
            >
              <Button variant="outline">Hover me</Button>
            </Tooltip>
          )}
          code={(values) =>
            `<Tooltip content="${values.content}" placement="${values.placement}">
  <Button variant="outline">Hover me</Button>
</Tooltip>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'Wrap any element with Tooltip and provide a content string. The tooltip appears after a configurable delay (default 200 ms) and is anchored to the top of the trigger by default.'}
        </DocText>
        <Showcase
          code={`<Tooltip content="This is a tooltip">
  <Button variant="outline">Hover me</Button>
</Tooltip>`}
        >
          <Tooltip content="This is a tooltip">
            <Button variant="outline">Hover me</Button>
          </Tooltip>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['placements']?.title ?? 'Placements'}>
        <DocText>
          {pt?.sections?.['placements']?.texts?.[0] ??
            'Use the placement prop to control which side of the trigger the tooltip appears on. All four directions are supported: top, bottom, left, and right.'}
        </DocText>
        <Showcase
          code={`<Tooltip content="Appears on top" placement="top">
  <Button variant="outline">Top</Button>
</Tooltip>
<Tooltip content="Appears on bottom" placement="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>
<Tooltip content="Appears on left" placement="left">
  <Button variant="outline">Left</Button>
</Tooltip>
<Tooltip content="Appears on right" placement="right">
  <Button variant="outline">Right</Button>
</Tooltip>`}
        >
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Tooltip content="Appears on top" placement="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Appears on bottom" placement="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Appears on left" placement="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Appears on right" placement="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-description']?.title ?? 'With Description'}>
        <DocText>
          {pt?.sections?.['with-description']?.texts?.[0] ??
            'Providing a description prop switches the tooltip to rich mode: the content becomes a bold title and the description is rendered as smaller secondary text below it.'}
        </DocText>
        <Showcase
          code={`<Tooltip
  content="Save document"
  description="Saves the current file to your account."
  placement="bottom"
>
  <Button variant="secondary">Save</Button>
</Tooltip>
<Tooltip
  content="Delete item"
  description="This action cannot be undone."
  placement="bottom"
>
  <Button variant="outline">Delete</Button>
</Tooltip>`}
        >
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Tooltip content="Save document" description="Saves the current file to your account." placement="bottom">
              <Button variant="secondary">Save</Button>
            </Tooltip>
            <Tooltip content="Delete item" description="This action cannot be undone." placement="bottom">
              <Button variant="outline">Delete</Button>
            </Tooltip>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-delay']?.title ?? 'Custom Delay'}>
        <DocText>
          {pt?.sections?.['custom-delay']?.texts?.[0] ??
            'Set the delay prop (in milliseconds) to control how long the user must hover before the tooltip appears. Use 0 for instant tooltips or a longer delay for less intrusive ones.'}
        </DocText>
        <Showcase
          code={`<Tooltip content="Instant tooltip" delay={0} placement="top">
  <Button variant="ghost">No delay</Button>
</Tooltip>
<Tooltip content="Slow tooltip" delay={800} placement="top">
  <Button variant="ghost">800 ms delay</Button>
</Tooltip>`}
        >
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Tooltip content="Instant tooltip" delay={0} placement="top">
              <Button variant="ghost">No delay</Button>
            </Tooltip>
            <Tooltip content="Slow tooltip" delay={800} placement="top">
              <Button variant="ghost">800 ms delay</Button>
            </Tooltip>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'content',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['content'] ??
                'The main tooltip label text. Acts as a title when description is also provided.',
            },
            {
              name: 'description',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['description'] ?? 'Optional secondary text shown below content in rich tooltip mode.',
            },
            {
              name: 'placement',
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: pt?.props?.['placement'] ?? 'Where the tooltip appears relative to its trigger element.',
            },
            {
              name: 'delay',
              type: 'number',
              default: '200',
              description:
                pt?.props?.['delay'] ?? 'Delay in milliseconds before the tooltip appears after hover or focus.',
            },
            {
              name: 'children',
              type: 'React.ReactElement',
              default: '-',
              description:
                pt?.props?.['children'] ??
                'The trigger element. Must be a single React element; aria-describedby is injected automatically.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
