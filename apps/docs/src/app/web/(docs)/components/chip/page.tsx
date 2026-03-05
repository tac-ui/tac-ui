'use client';

import React from 'react';
import { Chip } from '@tac-ui/web';
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

export default function ChipPage() {
  const pt = usePageTranslation('chip');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Chip'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A compact interactive element used for filters, tags, suggestions, or input tokens.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Chip } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Chip props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['filter', 'assist', 'suggestion', 'input', 'glass'],
              defaultValue: 'filter',
            },
            label: {
              type: 'text',
              label: 'Label',
              defaultValue: 'Chip',
            },
          }}
          render={(values) => <Chip variant={values.variant as 'filter'}>{values.label as string}</Chip>}
          code={(values) => `<Chip variant="${values.variant}">${values.label}</Chip>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Five visually distinct variants: filter (accent text + glass blur), assist (solid secondary fill), suggestion (dashed border, outlined), input (semi-transparent fill + solid border), and glass (heavy frosted blur).'}
        </DocText>
        <Showcase
          code={`<Chip variant="filter">Filter</Chip>
<Chip variant="assist">Assist</Chip>
<Chip variant="suggestion">Suggestion</Chip>
<Chip variant="input">Input</Chip>
<Chip variant="glass">Glass</Chip>`}
        >
          <Chip variant="filter">Filter</Chip>
          <Chip variant="assist">Assist</Chip>
          <Chip variant="suggestion">Suggestion</Chip>
          <Chip variant="input">Input</Chip>
          <Chip variant="glass">Glass</Chip>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-delete']?.title ?? 'With Dismiss'}>
        <DocText>
          {pt?.sections?.['with-delete']?.texts?.[0] ??
            "Provide an onDismiss callback to render the remove button. Clicking the × button stops propagation and calls onDismiss without triggering the chip's own onClick."}
        </DocText>
        <Showcase
          code={`<Chip variant="filter" onDismiss={() => {}}>React</Chip>
<Chip variant="input" onDismiss={() => {}}>TypeScript</Chip>
<Chip variant="suggestion" onDismiss={() => {}}>Next.js</Chip>`}
        >
          <Chip variant="filter" onDismiss={() => {}}>
            React
          </Chip>
          <Chip variant="input" onDismiss={() => {}}>
            TypeScript
          </Chip>
          <Chip variant="suggestion" onDismiss={() => {}}>
            Next.js
          </Chip>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icon']?.title ?? 'With Icon'}>
        <DocText>
          {pt?.sections?.['with-icon']?.texts?.[0] ??
            'Add a left icon with the leftIcon prop; it is rendered at 14×14px and adjusts padding automatically.'}
        </DocText>
        <Showcase
          code={`<Chip
  variant="assist"
  leftIcon={
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 2" strokeLinecap="round" />
    </svg>
  }
>
  Scheduled
</Chip>
<Chip
  variant="filter"
  leftIcon={
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 018 3z" />
    </svg>
  }
>
  Active
</Chip>`}
        >
          <Chip
            variant="assist"
            leftIcon={
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5v3l2 2" strokeLinecap="round" />
              </svg>
            }
          >
            Scheduled
          </Chip>
          <Chip
            variant="filter"
            leftIcon={
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 018 3z" />
              </svg>
            }
          >
            Active
          </Chip>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Pass the disabled prop to mute the chip and block all pointer interactions.'}
        </DocText>
        <Showcase
          code={`<Chip variant="filter" disabled>Disabled Filter</Chip>
<Chip variant="assist" disabled>Disabled Assist</Chip>`}
        >
          <Chip variant="filter" disabled>
            Disabled Filter
          </Chip>
          <Chip variant="assist" disabled>
            Disabled Assist
          </Chip>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"filter" | "assist" | "suggestion" | "input" | "glass"',
              default: '"filter"',
              description: pt?.props?.['variant'] ?? 'Visual and behavioral style of the chip.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onDismiss'] ??
                'Callback fired when the dismiss button is clicked. Renders the dismiss button when provided.',
            },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['leftIcon'] ?? 'Icon rendered to the left of the chip label at 14×14px.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['disabled'] ?? 'Disables the chip, muting it visually and blocking pointer interactions.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'Label content of the chip.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
