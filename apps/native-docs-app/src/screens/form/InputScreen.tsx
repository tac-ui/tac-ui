import React, { useState } from 'react';
import { Input } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function InputScreen() {
  const [value, setValue] = useState('');

  return (
    <ScreenLayout title="Input" description="A text input field for capturing user input.">
      <Section title="Import">
        <CodePreview code={`import { Input } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic text input.">
        <ShowcaseCard code={`<Input value={value} onChangeText={setValue} />`}>
          <Input value={value} onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label" description="Input with a visible label.">
        <ShowcaseCard code={`<Input label="Email" value={value} onChangeText={setValue} />`}>
          <Input label="Email" value={value} onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="With Placeholder" description="Placeholder text hints at expected input.">
        <ShowcaseCard code={`<Input placeholder="Enter your email..." value={value} onChangeText={setValue} />`}>
          <Input placeholder="Enter your email..." value={value} onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Helper Text" description="Supplementary text below the input.">
        <ShowcaseCard
          code={`<Input
  label="Username"
  helperText="Must be 3–20 characters."
  value={value}
  onChangeText={setValue}
/>`}
        >
          <Input label="Username" helperText="Must be 3–20 characters." value={value} onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Error State" description="Shows an error message when validation fails.">
        <ShowcaseCard
          code={`<Input
  label="Email"
  error
  errorMessage="Please enter a valid email address."
  value="invalid-email"
  onChangeText={setValue}
/>`}
        >
          <Input
            label="Email"
            error
            errorMessage="Please enter a valid email address."
            value="invalid-email"
            onChangeText={setValue}
          />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled input prevents user interaction.">
        <ShowcaseCard code={`<Input label="Readonly field" value="Cannot edit this" editable={false} />`}>
          <Input label="Readonly field" value="Cannot edit this" editable={false} />
        </ShowcaseCard>
      </Section>

      <Section title="Sizes" description="Three available size options.">
        <ShowcaseCard
          code={`<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />`}
        >
          <Input inputSize="sm" placeholder="Small" />
          <Input inputSize="md" placeholder="Medium" />
          <Input inputSize="lg" placeholder="Large" />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'value', type: 'string', default: '-', description: 'Current value of the input.' },
            {
              name: 'onChangeText',
              type: '(text: string) => void',
              default: '-',
              description: 'Callback fired when text changes.',
            },
            { name: 'label', type: 'string', default: '-', description: 'Label displayed above the input.' },
            { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text shown when empty.' },
            { name: 'helperText', type: 'string', default: '-', description: 'Supplementary text below the input.' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Shows error styling when true.' },
            { name: 'errorMessage', type: 'string', default: '-', description: 'Error message displayed below input.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input when true.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the input field.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
