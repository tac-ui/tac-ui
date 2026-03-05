import React, { useState } from 'react';
import { Checkbox } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function CheckboxScreen() {
  const [checked, setChecked] = useState(false);

  return (
    <ScreenLayout title="Checkbox" description="A binary toggle control for selecting options.">
      <Section title="Import">
        <CodePreview code={`import { Checkbox } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Uncontrolled checkbox using defaultChecked.">
        <ShowcaseCard
          code={`<Checkbox label="Accept terms and conditions" />
<Checkbox label="Pre-checked" defaultChecked />`}
        >
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Pre-checked" defaultChecked />
        </ShowcaseCard>
      </Section>

      <Section title="Indeterminate" description="Represents a partially-selected state.">
        <ShowcaseCard code={`<Checkbox label="Select all (partial)" indeterminate />`}>
          <Checkbox label="Select all (partial)" indeterminate />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled checkboxes are non-interactive.">
        <ShowcaseCard
          code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`}
        >
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </ShowcaseCard>
      </Section>

      <Section title="Controlled" description="Pass checked and onChange to control state.">
        <ShowcaseCard
          code={`<Checkbox
  label={checked ? 'Checked' : 'Unchecked'}
  checked={checked}
  onChange={setChecked}
/>`}
        >
          <Checkbox label={checked ? 'Checked' : 'Unchecked'} checked={checked} onChange={setChecked} />
        </ShowcaseCard>
      </Section>

      <Section title="All States" description="Overview of all four visual states.">
        <ShowcaseCard
          code={`<Checkbox label="Default" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />`}
        >
          <Checkbox label="Default" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'label', type: 'string', default: '-', description: 'Label text displayed beside the checkbox.' },
            {
              name: 'checked',
              type: 'boolean',
              default: '-',
              description: 'Controlled checked state. Use with onChange for a controlled input.',
            },
            {
              name: 'defaultChecked',
              type: 'boolean',
              default: 'false',
              description: 'Initial checked state for uncontrolled usage.',
            },
            {
              name: 'indeterminate',
              type: 'boolean',
              default: 'false',
              description: 'Renders a dash icon representing a partially-selected state.',
            },
            {
              name: 'filled',
              type: 'boolean',
              default: 'false',
              description: 'Adds a tinted background to the checkbox label area.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables the checkbox, making it non-interactive and visually dimmed.',
            },
            {
              name: 'onChange',
              type: '(checked: boolean) => void',
              default: '-',
              description: 'Callback fired when the checked state changes.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
