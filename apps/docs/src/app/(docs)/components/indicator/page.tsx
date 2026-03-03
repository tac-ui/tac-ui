'use client';

import React from 'react';
import { Indicator } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function IndicatorPage() {
  const pt = usePageTranslation('indicator');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Indicator'}</DocTitle>
        <DocDescription>{pt?.description ?? 'An indeterminate loading animation available as a linear bar or circular spinner.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['linear']?.title ?? 'Linear'}>
        <DocText>{pt?.sections?.['linear']?.texts?.[0] ?? 'Horizontal indeterminate progress bar that slides a gradient segment across the track width, suitable for page-level loading states.'}</DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Indicator variant="linear" />`}
        >
          <Indicator variant="linear" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['circular']?.title ?? 'Circular'}>
        <DocText>{pt?.sections?.['circular']?.texts?.[0] ?? 'Circular spinner using a conic-gradient mask technique. The size prop controls the diameter in pixels; stroke width scales proportionally.'}</DocText>
        <Showcase
          code={`<Indicator variant="circular" size={24} />
<Indicator variant="circular" size={32} />
<Indicator variant="circular" size={48} />`}
        >
          <Indicator variant="circular" size={24} />
          <Indicator variant="circular" size={32} />
          <Indicator variant="circular" size={48} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-colors']?.title ?? 'Custom Colors'}>
        <DocText>{pt?.sections?.['custom-colors']?.texts?.[0] ?? 'Use the color prop to customize the animated portion with any CSS color value or design token variable.'}</DocText>
        <Showcase
          code={`<Indicator color="var(--error)" />
<Indicator color="var(--success)" />
<Indicator variant="circular" color="var(--warning)" />`}
        >
          <Indicator color="var(--error)" />
          <Indicator color="var(--success)" />
          <Indicator variant="circular" color="var(--warning)" />
        </Showcase>
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
              description: pt?.props?.['size'] ?? 'Diameter in pixels used for the circular variant. Stroke width scales automatically.',
            },
            {
              name: 'color',
              type: 'string',
              default: 'var(--point)',
              description: pt?.props?.['color'] ?? 'CSS color value for the animated portion. Accepts any valid CSS color or token variable.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the root element.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
