import React, { useState } from 'react';
import { Combobox } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

const options = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Rust', value: 'rust' },
  { label: 'Go', value: 'go' },
  { label: 'Swift', value: 'swift' },
];

export default function ComboboxScreen() {
  const [value, setValue] = useState('');

  return (
    <ScreenLayout title="Combobox" description="A searchable select input that filters options as you type.">
      <Section title="Import">
        <CodePreview code={`import { Combobox } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic combobox with searchable options.">
        <ShowcaseCard
          code={`const options = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
];

<Combobox options={options} value={value} onChange={setValue} />`}
        >
          <Combobox options={options} value={value} onChange={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="With Placeholder and Label" description="Combobox with label and custom placeholder.">
        <ShowcaseCard
          code={`<Combobox
  label="Language"
  placeholder="Search languages..."
  emptyText="No languages found."
  options={options}
  value={value}
  onChange={setValue}
/>`}
        >
          <Combobox
            label="Language"
            placeholder="Search languages..."
            emptyText="No languages found."
            options={options}
            value={value}
            onChange={setValue}
          />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'options',
              type: 'ComboboxOption[]',
              default: '[]',
              description: 'Array of {label, value} options.',
            },
            { name: 'value', type: 'string', default: '-', description: 'Currently selected value.' },
            {
              name: 'onChange',
              type: '(value: string) => void',
              default: '-',
              description: 'Callback fired when selection changes.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: '-',
              description: 'Placeholder text for the search input.',
            },
            {
              name: 'emptyText',
              type: 'string',
              default: '"No results found."',
              description: 'Text shown when no options match the search.',
            },
            { name: 'label', type: 'string', default: '-', description: 'Label displayed above the combobox.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
