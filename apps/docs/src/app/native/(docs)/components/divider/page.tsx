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
import { Divider } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeDividerPage() {
  const pt = usePageTranslation('native-divider');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Divider'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A visual separator used to divide content sections or list items.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Divider } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Divider props below.'}
        </DocText>
        <NativePlayground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['full', 'inset', 'thick', 'withLabel'],
              defaultValue: 'full',
            },
            orientation: {
              type: 'select',
              label: 'Orientation',
              options: ['horizontal', 'vertical'],
              defaultValue: 'horizontal',
            },
            label: {
              type: 'text',
              label: 'Label (for withLabel variant)',
              defaultValue: 'OR',
            },
          }}
          render={(values) => (
            <div
              className="w-full"
              style={{
                display: 'flex',
                flexDirection: values.orientation === 'vertical' ? 'row' : 'column',
                alignItems: values.orientation === 'vertical' ? 'center' : 'stretch',
                height: values.orientation === 'vertical' ? 40 : undefined,
              }}
            >
              <Divider
                variant={values.variant as 'full'}
                orientation={values.orientation as 'horizontal'}
                label={values.variant === 'withLabel' ? (values.label as string) : undefined}
              />
            </div>
          )}
          code={(values) =>
            `<Divider variant="${values.variant}" orientation="${values.orientation}"${values.variant === 'withLabel' ? ` label="${values.label}"` : ''} />`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['full']?.title ?? 'Full'}>
        <DocText>
          {pt?.sections?.['full']?.texts?.[0] ??
            'The default variant spans the full width of its container as a 1px horizontal rule.'}
        </DocText>
        <NativeShowcase code={`<Divider />`}>
          <div className="w-full">
            <Divider />
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['inset']?.title ?? 'Inset'}>
        <DocText>
          {pt?.sections?.['inset']?.texts?.[0] ??
            'The inset variant adds horizontal margins on both sides, commonly used inside list items or cards.'}
        </DocText>
        <NativeShowcase code={`<Divider variant="inset" />`}>
          <div className="w-full">
            <Divider variant="inset" />
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['thick']?.title ?? 'Thick'}>
        <DocText>
          {pt?.sections?.['thick']?.texts?.[0] ??
            'The thick variant renders a 2px rule for stronger visual separation between major sections.'}
        </DocText>
        <NativeShowcase code={`<Divider variant="thick" />`}>
          <div className="w-full">
            <Divider variant="thick" />
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>
          {pt?.sections?.['with-label']?.texts?.[0] ??
            'Pass a label string to render centered text between two rule lines, useful for separating form sections or login options.'}
        </DocText>
        <NativeShowcase
          code={`<Divider variant="withLabel" label="OR" />

<Divider variant="withLabel" label="Continue with" />`}
        >
          <div className="flex flex-col gap-4 w-full">
            <Divider variant="withLabel" label="OR" />
            <Divider variant="withLabel" label="Continue with" />
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['vertical']?.title ?? 'Vertical Orientation'}>
        <DocText>
          {pt?.sections?.['vertical']?.texts?.[0] ??
            'Set orientation to vertical to create a vertical separator, useful inside HStack or row layouts.'}
        </DocText>
        <NativeShowcase
          code={`<HStack gap="md" style={{ height: 40 }}>
  <Text>Home</Text>
  <Divider orientation="vertical" />
  <Text>About</Text>
  <Divider orientation="vertical" />
  <Text>Contact</Text>
</HStack>`}
        >
          <div className="flex flex-row gap-3 items-center" style={{ height: 40 }}>
            <span className="text-sm">Home</span>
            <Divider orientation="vertical" />
            <span className="text-sm">About</span>
            <Divider orientation="vertical" />
            <span className="text-sm">Contact</span>
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"full" | "inset" | "thick" | "withLabel"',
              default: '"full"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the divider.',
            },
            {
              name: 'orientation',
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: pt?.props?.['orientation'] ?? 'Orientation of the divider line.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['label'] ?? 'Text label rendered in the center of the divider; implies withLabel layout.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the divider container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
