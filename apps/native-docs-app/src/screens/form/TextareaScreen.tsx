import React, { useState } from 'react';
import { Textarea } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function TextareaScreen() {
  const [value, setValue] = useState('');

  return (
    <ScreenLayout title="Textarea" description="A multi-line text input for longer content.">
      <Section title="Import">
        <CodePreview code={`import { Textarea } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic textarea input.">
        <ShowcaseCard code={`<Textarea value={value} onChangeText={setValue} />`}>
          <Textarea value={value} onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label" description="Textarea with a visible label.">
        <ShowcaseCard code={`<Textarea label="Description" value={value} onChangeText={setValue} />`}>
          <Textarea label="Description" value={value} onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Helper Text" description="Supplementary guidance below the textarea.">
        <ShowcaseCard
          code={`<Textarea
  label="Bio"
  helperText="Max 200 characters."
  value={value}
  onChangeText={setValue}
/>`}
        >
          <Textarea label="Bio" helperText="Max 200 characters." value={value} onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Error State" description="Shows an error message when validation fails.">
        <ShowcaseCard
          code={`<Textarea
  label="Comment"
  error
  errorMessage="Comment cannot be empty."
  value=""
  onChangeText={setValue}
/>`}
        >
          <Textarea label="Comment" error errorMessage="Comment cannot be empty." value="" onChangeText={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled textarea prevents user interaction.">
        <ShowcaseCard code={`<Textarea label="Notes" value="This field is read-only." editable={false} />`}>
          <Textarea label="Notes" value="This field is read-only." editable={false} />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'value', type: 'string', default: '-', description: 'Current value of the textarea.' },
            {
              name: 'onChangeText',
              type: '(text: string) => void',
              default: '-',
              description: 'Callback fired when text changes.',
            },
            { name: 'label', type: 'string', default: '-', description: 'Label displayed above the textarea.' },
            { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text shown when empty.' },
            { name: 'helperText', type: 'string', default: '-', description: 'Supplementary text below the textarea.' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Shows error styling when true.' },
            {
              name: 'errorMessage',
              type: 'string',
              default: '-',
              description: 'Error message displayed below textarea.',
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea when true.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
