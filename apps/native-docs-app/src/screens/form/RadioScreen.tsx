import React, { useState } from 'react';
import { RadioGroup, Radio } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function RadioScreen() {
  const [value, setValue] = useState('option1');
  const [valueDisabled, setValueDisabled] = useState('option1');

  return (
    <ScreenLayout title="Radio" description="A group of mutually exclusive selection controls.">
      <Section title="Import">
        <CodePreview code={`import { RadioGroup, Radio } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic radio group with multiple options.">
        <ShowcaseCard
          code={`const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio radioValue="option1" label="Option 1" />
  <Radio radioValue="option2" label="Option 2" />
  <Radio radioValue="option3" label="Option 3" />
</RadioGroup>`}
        >
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio radioValue="option1" label="Option 1" />
            <Radio radioValue="option2" label="Option 2" />
            <Radio radioValue="option3" label="Option 3" />
          </RadioGroup>
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Individual radio items can be disabled.">
        <ShowcaseCard
          code={`<RadioGroup value={value} onValueChange={setValueDisabled}>
  <Radio radioValue="option1" label="Available" />
  <Radio radioValue="option2" label="Disabled option" disabled />
  <Radio radioValue="option3" label="Also available" />
</RadioGroup>`}
        >
          <RadioGroup value={valueDisabled} onValueChange={setValueDisabled}>
            <Radio radioValue="option1" label="Available" />
            <Radio radioValue="option2" label="Disabled option" disabled />
            <Radio radioValue="option3" label="Also available" />
          </RadioGroup>
        </ShowcaseCard>
      </Section>

      <Section title="RadioGroup API Reference">
        <PropsTable
          data={[
            { name: 'value', type: 'string', default: '-', description: 'Currently selected value.' },
            {
              name: 'onValueChange',
              type: '(value: string) => void',
              default: '-',
              description: 'Callback fired when selection changes.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: 'Radio items to render inside the group.',
            },
          ]}
        />
      </Section>

      <Section title="Radio API Reference">
        <PropsTable
          data={[
            { name: 'radioValue', type: 'string', default: '-', description: 'Value this radio represents.' },
            { name: 'label', type: 'string', default: '-', description: 'Label text displayed beside the radio.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables this radio item when true.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
