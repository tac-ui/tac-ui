import React, { useState } from 'react';
import { Select } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Mango', value: 'mango' },
];

export default function SelectScreen() {
  const [value, setValue] = useState('');

  return (
    <ScreenLayout title="Select" description="A dropdown selection input for choosing from a list of options.">
      <Section title="Import">
        <CodePreview code={`import { Select } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic select with options.">
        <ShowcaseCard
          code={`const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

<Select options={options} value={value} onChange={setValue} />`}
        >
          <Select options={options} value={value} onChange={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Sizes" description="Three available size options.">
        <ShowcaseCard code={`<Select options={options} value={value} onChange={setValue} />`}>
          <Select options={options} value={value} onChange={setValue} />
          <Select options={options} value={value} onChange={setValue} />
          <Select options={options} value={value} onChange={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label and Placeholder" description="Select with label and placeholder text.">
        <ShowcaseCard
          code={`<Select
  label="Fruit"
  placeholder="Choose a fruit..."
  options={options}
  value={value}
  onChange={setValue}
/>`}
        >
          <Select label="Fruit" placeholder="Choose a fruit..." options={options} value={value} onChange={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Error State" description="Shows an error when selection is required.">
        <ShowcaseCard
          code={`<Select
  label="Fruit"
  error
  errorMessage="Please select a fruit."
  options={options}
  value=""
  onChange={setValue}
/>`}
        >
          <Select
            label="Fruit"
            error
            errorMessage="Please select a fruit."
            options={options}
            value=""
            onChange={setValue}
          />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled select prevents user interaction.">
        <ShowcaseCard code={`<Select label="Fruit" options={options} value="apple" onChange={setValue} disabled />`}>
          <Select label="Fruit" options={options} value="apple" onChange={setValue} disabled />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'options', type: 'SelectOption[]', default: '[]', description: 'Array of {label, value} options.' },
            { name: 'value', type: 'string', default: '-', description: 'Currently selected value.' },
            {
              name: 'onChange',
              type: '(value: string) => void',
              default: '-',
              description: 'Callback fired when selection changes.',
            },
            { name: 'label', type: 'string', default: '-', description: 'Label displayed above the select.' },
            {
              name: 'placeholder',
              type: 'string',
              default: '-',
              description: 'Placeholder text shown when no value is selected.',
            },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the select field.' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Shows error styling when true.' },
            {
              name: 'errorMessage',
              type: 'string',
              default: '-',
              description: 'Error message displayed below select.',
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select when true.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
