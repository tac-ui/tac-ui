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
import { Indicator } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeIndicatorPage() {
  const pt = usePageTranslation('native-indicator');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Indicator'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'An indeterminate loading animation available as a linear bar or circular spinner.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Indicator } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Indicator props below.'}
        </DocText>
        <NativePlayground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['linear', 'circular'],
              defaultValue: 'linear',
            },
          }}
          render={(values) => {
            const variant = values.variant as 'linear' | 'circular';
            if (variant === 'circular') {
              return <Indicator variant={variant} size={32} />;
            }
            return <Indicator variant={variant} />;
          }}
          code={(values) => {
            const variant = values.variant;
            if (variant === 'circular') {
              return `<Indicator variant="${variant}" size={32} />`;
            }
            return `<Indicator variant="${variant}" />`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['linear']?.title ?? 'Linear'}>
        <DocText>
          {pt?.sections?.['linear']?.texts?.[0] ??
            'Horizontal indeterminate progress bar that slides a segment across the track width, suitable for page-level loading states.'}
        </DocText>
        <NativeShowcase code={`<Indicator variant="linear" />`}>
          <Indicator variant="linear" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['circular']?.title ?? 'Circular'}>
        <DocText>
          {pt?.sections?.['circular']?.texts?.[0] ??
            'Circular spinner. The size prop controls the diameter in dp; stroke width scales proportionally.'}
        </DocText>
        <NativeShowcase
          code={`<Indicator variant="circular" size={24} />
<Indicator variant="circular" size={32} />
<Indicator variant="circular" size={48} />`}
        >
          <Indicator variant="circular" size={24} />
          <Indicator variant="circular" size={32} />
          <Indicator variant="circular" size={48} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-colors']?.title ?? 'Custom Colors'}>
        <DocText>
          {pt?.sections?.['custom-colors']?.texts?.[0] ??
            'Use the color prop to customize the animated portion with any color value.'}
        </DocText>
        <NativeShowcase
          code={`<Indicator color="#ef4444" />
<Indicator color="#22c55e" />
<Indicator variant="circular" color="#f59e0b" />`}
        >
          <Indicator color="#ef4444" />
          <Indicator color="#22c55e" />
          <Indicator variant="circular" color="#f59e0b" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"linear" | "circular"',
              default: '"linear"',
              description: pt?.props?.['variant'] ?? 'Display style — horizontal bar or spinning circle.',
            },
            {
              name: 'size',
              type: 'number',
              default: '32',
              description:
                pt?.props?.['size'] ??
                'Diameter in dp used for the circular variant. Stroke width scales automatically.',
            },
            {
              name: 'color',
              type: 'string',
              default: 'theme.colors.point',
              description:
                pt?.props?.['color'] ?? 'Color value for the animated portion. Accepts any valid color string.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
