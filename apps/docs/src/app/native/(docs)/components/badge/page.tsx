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
import { Badge } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeBadgePage() {
  const pt = usePageTranslation('native-badge');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Badge'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A small status label used to display counts, states, or categories.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Badge } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Badge props below.'}
        </DocText>
        <NativePlayground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['default', 'secondary', 'outline', 'destructive', 'success', 'error', 'warning', 'info'],
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
            'Eight semantic variants cover the full range of status communication from neutral to critical.'}
        </DocText>
        <NativeShowcase
          code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>`}
        >
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['interactive']?.title ?? 'Interactive'}>
        <DocText>
          {pt?.sections?.['interactive']?.texts?.[0] ??
            'Set interactive or provide an onPress handler to make the badge tappable with press feedback. Useful for filterable tag chips.'}
        </DocText>
        <NativeShowcase
          code={`<Badge variant="default" interactive onPress={() => console.log('pressed')}>Clickable</Badge>
<Badge variant="outline" interactive onPress={() => console.log('filter')}>Filter</Badge>
<Badge variant="success" onPress={() => console.log('status')}>Status</Badge>`}
        >
          <Badge variant="default" interactive onPress={() => {}}>
            Clickable
          </Badge>
          <Badge variant="outline" interactive onPress={() => {}}>
            Filter
          </Badge>
          <Badge variant="success" onPress={() => {}}>
            Status
          </Badge>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['count']?.title ?? 'Count'}>
        <DocText>
          {pt?.sections?.['count']?.texts?.[0] ??
            'Pass a numeric count prop to display a number inside the badge. The count animates with a spring scale effect whenever the value changes.'}
        </DocText>
        <NativeShowcase
          code={`<Badge variant="default" count={3} />
<Badge variant="info" count={12} />
<Badge variant="destructive" count={99} />`}
        >
          <Badge variant="default" count={3} />
          <Badge variant="info" count={12} />
          <Badge variant="destructive" count={99} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"default" | "secondary" | "outline" | "destructive" | "success" | "error" | "warning" | "info"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style of the badge.',
            },
            {
              name: 'count',
              type: 'number',
              default: '-',
              description:
                pt?.props?.['count'] ??
                'Numeric count displayed inside the badge. Animates with a spring scale when the value changes.',
            },
            {
              name: 'interactive',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['interactive'] ??
                'When true, renders as a Pressable with press feedback animation. Automatically enabled when onPress is provided.',
            },
            {
              name: 'onPress',
              type: '() => void',
              default: '-',
              description: pt?.props?.['onPress'] ?? 'Press handler. Implicitly enables interactive mode when set.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ??
                'Content displayed inside the badge. Strings are automatically wrapped in a styled Text component.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the badge container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
