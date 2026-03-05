'use client';

import React from 'react';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocText,
  PreviewCode,
  PropsTable,
} from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { NativeShowcase } from '@/components/docs/NativeShowcase';
import { NativePlayground } from '@/components/docs/NativePlayground';
import { Chip } from '@tac-ui/native';
import { Star, MapPin } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

export default function NativeChipPage() {
  const pt = usePageTranslation('native-chip');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Chip'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A compact interactive element used for filters, tags, suggestions, or input tokens.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Chip } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>{pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Chip props below.'}</DocText>
        <NativePlayground
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
          render={(values) => (
            <Chip variant={values.variant as 'filter'} onPress={() => {}}>
              {values.label as string}
            </Chip>
          )}
          code={(values) => `<Chip variant="${values.variant}" onPress={() => {}}>${values.label}</Chip>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Five visually distinct variants: filter (accent text + border), assist (solid secondary fill), suggestion (dashed border, outlined), input (semi-transparent fill + solid border), and glass (solid secondary fill without border).'}
        </DocText>
        <NativeShowcase
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
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-delete']?.title ?? 'With Delete'}>
        <DocText>
          {pt?.sections?.['with-delete']?.texts?.[0] ??
            "Provide an onDismiss callback to render the remove button. Tapping the × button calls onDismiss without triggering the chip's own onPress."}
        </DocText>
        <NativeShowcase
          code={`<Chip variant="filter" onDismiss={() => console.log('dismissed')}>React</Chip>
<Chip variant="input" onDismiss={() => console.log('dismissed')}>TypeScript</Chip>
<Chip variant="suggestion" onDismiss={() => console.log('dismissed')}>Next.js</Chip>`}
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
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-left-icon']?.title ?? 'With Icon'}>
        <DocText>
          {pt?.sections?.['with-left-icon']?.texts?.[0] ??
            'Add a left icon with the leftIcon prop; pass any React node to display an icon before the chip label.'}
        </DocText>
        <NativeShowcase
          code={`import { Star, MapPin } from '@tac-ui/icon-native';

<Chip variant="assist" leftIcon={<Star size={14} />} onPress={() => {}}>
  Favorites
</Chip>
<Chip variant="filter" leftIcon={<MapPin size={14} />} onPress={() => {}}>
  Near Me
</Chip>`}
        >
          <Chip variant="assist" leftIcon={<Star size={14} />} onPress={() => {}}>
            Favorites
          </Chip>
          <Chip variant="filter" leftIcon={<MapPin size={14} />} onPress={() => {}}>
            Near Me
          </Chip>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Pass the disabled prop to mute the chip and block all press interactions including onPress and onDismiss.'}
        </DocText>
        <NativeShowcase
          code={`<Chip variant="filter" disabled>Disabled Filter</Chip>
<Chip variant="assist" disabled>Disabled Assist</Chip>`}
        >
          <Chip variant="filter" disabled>
            Disabled Filter
          </Chip>
          <Chip variant="assist" disabled>
            Disabled Assist
          </Chip>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['selected-state']?.title ?? 'Selected State'}>
        <DocText>
          {pt?.sections?.['selected-state']?.texts?.[0] ??
            'Set selected to true to apply the accent color, indicating the chip is active in a filter group.'}
        </DocText>
        <NativeShowcase
          code={`<Chip variant="filter" onPress={() => {}}>All</Chip>
<Chip variant="filter" selected onPress={() => {}}>Active</Chip>
<Chip variant="filter" onPress={() => {}}>Design</Chip>
<Chip variant="filter" onPress={() => {}}>Engineering</Chip>`}
        >
          <Chip variant="filter" onPress={() => {}}>
            All
          </Chip>
          <Chip variant="filter" selected onPress={() => {}}>
            Active
          </Chip>
          <Chip variant="filter" onPress={() => {}}>
            Design
          </Chip>
          <Chip variant="filter" onPress={() => {}}>
            Engineering
          </Chip>
        </NativeShowcase>
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
                'Callback fired when the dismiss button is tapped. Renders the dismiss button when provided.',
            },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['leftIcon'] ?? 'Icon node rendered at the leading edge of the chip.',
            },
            {
              name: 'selected',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['selected'] ?? 'When true, applies the accent color to indicate active selection.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['disabled'] ?? 'Disables the chip, muting it visually and blocking all press interactions.',
            },
            {
              name: 'onPress',
              type: '() => void',
              default: '-',
              description: pt?.props?.['onPress'] ?? 'Press handler for the chip.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'Label content of the chip.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the chip container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
