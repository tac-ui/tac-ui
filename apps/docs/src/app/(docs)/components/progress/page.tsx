'use client';

import React from 'react';
import { Progress } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function ProgressPage() {
  const pt = usePageTranslation('progress');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Progress'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Visualizes a determinate completion value as a linear bar or circular ring.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['linear']?.title ?? 'Linear'}>
        <DocText>{pt?.sections?.['linear']?.texts?.[0] ?? 'Horizontal bar at various completion values.'}</DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Progress value={30} />
<Progress value={60} />
<Progress value={100} />`}
        >
          <Progress value={30} />
          <Progress value={60} />
          <Progress value={100} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['linear-with-label']?.title ?? 'Linear with Label'}>
        <DocText>{pt?.sections?.['linear-with-label']?.texts?.[0] ?? 'Show a percentage label alongside the bar.'}</DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Progress value={45} showLabel />
<Progress value={75} showLabel />`}
        >
          <Progress value={45} showLabel />
          <Progress value={75} showLabel />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['circular']?.title ?? 'Circular'}>
        <DocText>{pt?.sections?.['circular']?.texts?.[0] ?? 'Ring variant in three sizes with a label in the center.'}</DocText>
        <Showcase
          code={`<Progress variant="circular" value={65} size={48} showLabel />
<Progress variant="circular" value={65} size={64} showLabel />
<Progress variant="circular" value={65} size={96} showLabel />`}
        >
          <Progress variant="circular" value={65} size={48} showLabel />
          <Progress variant="circular" value={65} size={64} showLabel />
          <Progress variant="circular" value={65} size={96} showLabel />
        </Showcase>
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
              description: pt?.props?.['barSize'] ?? 'Thickness of the progress track, applies to both linear and circular variants.',
            },
            {
              name: 'showLabel',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['showLabel'] ?? 'When true, renders a percentage label alongside the progress indicator.',
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
