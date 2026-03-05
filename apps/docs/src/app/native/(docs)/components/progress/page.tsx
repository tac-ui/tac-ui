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
import { Progress } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeProgressPage() {
  const pt = usePageTranslation('native-progress');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Progress'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'Visualizes a determinate completion value as a linear bar or circular ring.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Progress } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Progress props below.'}
        </DocText>
        <NativePlayground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['linear', 'circular'],
              defaultValue: 'linear',
            },
            value: {
              type: 'select',
              label: 'Value',
              options: ['0', '25', '50', '75', '100'],
              defaultValue: '50',
            },
            showLabel: {
              type: 'boolean',
              label: 'Show Label',
              defaultValue: false,
            },
          }}
          render={(values) => {
            const variant = values.variant as 'linear' | 'circular';
            const numValue = Number(values.value);
            const showLabel = values.showLabel as boolean;
            if (variant === 'circular') {
              return <Progress variant={variant} value={numValue} size={64} showLabel={showLabel} />;
            }
            return <Progress variant={variant} value={numValue} showLabel={showLabel} />;
          }}
          code={(values) => {
            const variant = values.variant;
            const numValue = Number(values.value);
            const showLabel = values.showLabel;
            if (variant === 'circular') {
              return `<Progress variant="${variant}" value={${numValue}} size={64}${showLabel ? ' showLabel' : ''} />`;
            }
            return `<Progress variant="${variant}" value={${numValue}}${showLabel ? ' showLabel' : ''} />`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['linear']?.title ?? 'Linear'}>
        <DocText>{pt?.sections?.['linear']?.texts?.[0] ?? 'Horizontal bar at various completion values.'}</DocText>
        <NativeShowcase
          code={`<Progress value={30} />
<Progress value={60} />
<Progress value={100} />`}
        >
          <Progress value={30} />
          <Progress value={60} />
          <Progress value={100} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['linear-with-label']?.title ?? 'Linear with Label'}>
        <DocText>
          {pt?.sections?.['linear-with-label']?.texts?.[0] ?? 'Show a percentage label alongside the bar.'}
        </DocText>
        <NativeShowcase
          code={`<Progress value={45} showLabel />
<Progress value={75} showLabel />`}
        >
          <Progress value={45} showLabel />
          <Progress value={75} showLabel />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['circular']?.title ?? 'Circular'}>
        <DocText>
          {pt?.sections?.['circular']?.texts?.[0] ?? 'Ring variant in three sizes with a label in the center.'}
        </DocText>
        <NativeShowcase
          code={`<Progress variant="circular" value={65} size={48} showLabel />
<Progress variant="circular" value={65} size={64} showLabel />
<Progress variant="circular" value={65} size={96} showLabel />`}
        >
          <Progress variant="circular" value={65} size={48} showLabel />
          <Progress variant="circular" value={65} size={64} showLabel />
          <Progress variant="circular" value={65} size={96} showLabel />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'number',
              default: '0',
              description: pt?.props?.['value'] ?? 'Current progress value.',
            },
            {
              name: 'max',
              type: 'number',
              default: '100',
              description: pt?.props?.['max'] ?? 'Maximum value used to calculate the percentage.',
            },
            {
              name: 'variant',
              type: '"linear" | "circular"',
              default: '"linear"',
              description: pt?.props?.['variant'] ?? 'Display style — horizontal bar or circular ring.',
            },
            {
              name: 'size',
              type: 'number',
              default: '64',
              description: pt?.props?.['size'] ?? 'Diameter in pixels for the circular variant.',
            },
            {
              name: 'barSize',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description:
                pt?.props?.['barSize'] ??
                'Thickness of the progress track, applies to both linear and circular variants.',
            },
            {
              name: 'showLabel',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['showLabel'] ?? 'When true, renders a percentage label alongside the progress indicator.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
