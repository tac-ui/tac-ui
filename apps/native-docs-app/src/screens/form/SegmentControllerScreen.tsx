import React, { useState } from 'react';
import { SegmentController } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

const viewOptions = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

export default function SegmentControllerScreen() {
  const [value, setValue] = useState('day');
  const [sizeSm, setSizeSm] = useState('day');
  const [sizeMd, setSizeMd] = useState('day');
  const [sizeLg, setSizeLg] = useState('day');

  return (
    <ScreenLayout
      title="SegmentController"
      description="A segmented control for switching between mutually exclusive views."
    >
      <Section title="Import">
        <CodePreview code={`import { SegmentController } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic segment controller with three options.">
        <ShowcaseCard
          code={`const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

<SegmentController options={options} value={value} onValueChange={setValue} />`}
        >
          <SegmentController options={viewOptions} value={value} onValueChange={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Sizes" description="Three available size options.">
        <ShowcaseCard
          code={`<SegmentController size="sm" options={options} value={value} onValueChange={setValue} />
<SegmentController size="md" options={options} value={value} onValueChange={setValue} />
<SegmentController size="lg" options={options} value={value} onValueChange={setValue} />`}
        >
          <SegmentController size="sm" options={viewOptions} value={sizeSm} onValueChange={setSizeSm} />
          <SegmentController size="md" options={viewOptions} value={sizeMd} onValueChange={setSizeMd} />
          <SegmentController size="lg" options={viewOptions} value={sizeLg} onValueChange={setSizeLg} />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'options',
              type: 'SegmentOption[]',
              default: '[]',
              description: 'Array of {label, value} options.',
            },
            { name: 'value', type: 'string', default: '-', description: 'Currently selected segment value.' },
            {
              name: 'onValueChange',
              type: '(value: string) => void',
              default: '-',
              description: 'Callback fired when selection changes.',
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: 'Size of the segment controller.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
