'use client';

import React from 'react';
import { Meter } from '@tac-ui/web';
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
import { usePageTranslation } from '@/i18n';

export default function MeterPage() {
  const pt = usePageTranslation('meter');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Meter'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Displays a scalar measurement within a known range, such as storage usage, score, or quota consumption.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Meter } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Meter props below.</DocText>
        <Playground
          controls={{
            value: {
              type: 'select',
              label: 'Value',
              options: ['0', '25', '50', '75', '100'],
              defaultValue: '50',
            },
            showValue: {
              type: 'boolean',
              label: 'Show Value',
              defaultValue: true,
            },
          }}
          render={(values) => (
            <Meter
              value={parseInt(values.value as string, 10)}
              label="Usage"
              showValue={values.showValue as boolean}
              className="w-full"
            />
          )}
          code={(values) =>
            `<Meter value={${values.value}} label="Usage"${values.showValue ? '' : ' showValue={false}'} />`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'A basic meter showing a labeled value with a percentage display.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Meter value={42} label="Storage used" />`}
        >
          <Meter value={42} label="Storage used" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['various-values']?.title ?? 'Various Values'}>
        <DocText>
          {pt?.sections?.['various-values']?.texts?.[0] ??
            'The meter bar color changes based on the fill level — green under 60%, yellow between 60–80%, and red above 80%.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Meter value={25} label="Low usage" />
<Meter value={50} label="Moderate usage" />
<Meter value={75} label="High usage" />
<Meter value={95} label="Critical usage" />`}
        >
          <Meter value={25} label="Low usage" />
          <Meter value={50} label="Moderate usage" />
          <Meter value={75} label="High usage" />
          <Meter value={95} label="Critical usage" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-value']?.title ?? 'Custom Value'}>
        <DocText>
          {pt?.sections?.['custom-value']?.texts?.[0] ??
            'Use customValue to display a formatted string instead of the default percentage.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Meter value={72} label="Storage" customValue="7.2 GB / 10 GB" />
<Meter value={3} min={0} max={5} label="Rating" customValue="3 / 5 stars" />`}
        >
          <Meter value={72} label="Storage" customValue="7.2 GB / 10 GB" />
          <Meter value={3} min={0} max={5} label="Rating" customValue="3 / 5 stars" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['hidden-value']?.title ?? 'Hidden Value'}>
        <DocText>
          {pt?.sections?.['hidden-value']?.texts?.[0] ??
            'Set showValue to false to hide the value text and display only the label and bar.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Meter value={60} label="Progress" showValue={false} />`}
        >
          <Meter value={60} label="Progress" showValue={false} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['vs-progress']?.title ?? 'Meter vs Progress'}>
        <DocText>
          {pt?.sections?.['vs-progress']?.texts?.[0] ??
            'Use Meter to represent a static scalar value within a known range (e.g., storage, scores). Use Progress to indicate the completion status of an ongoing operation (e.g., file upload, loading).'}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'number',
              default: '-',
              description: pt?.props?.['value'] ?? 'Current meter value.',
            },
            {
              name: 'min',
              type: 'number',
              default: '0',
              description: pt?.props?.['min'] ?? 'Minimum value of the range.',
            },
            {
              name: 'max',
              type: 'number',
              default: '100',
              description: pt?.props?.['max'] ?? 'Maximum value of the range.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label displayed to the left of the value.',
            },
            {
              name: 'customValue',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['customValue'] ??
                'Custom display text for the value. When omitted, shows percentage.',
            },
            {
              name: 'showValue',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['showValue'] ??
                'When true, displays the value/percentage to the right of the label.',
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
