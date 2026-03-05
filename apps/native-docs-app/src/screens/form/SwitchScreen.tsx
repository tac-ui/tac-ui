import React, { useState } from 'react';
import { Switch } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function SwitchScreen() {
  const [checked, setChecked] = useState(false);
  const [checkedWithLabel, setCheckedWithLabel] = useState(true);

  return (
    <ScreenLayout title="Switch" description="A toggle control for enabling or disabling a setting.">
      <Section title="Import">
        <CodePreview code={`import { Switch } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic switch without a label.">
        <ShowcaseCard
          code={`const [checked, setChecked] = useState(false);

<Switch checked={checked} onChange={setChecked} />`}
        >
          <Switch checked={checked} onChange={setChecked} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label" description="Switch with an associated label.">
        <ShowcaseCard
          code={`<Switch
  label="Enable notifications"
  checked={checked}
  onChange={setChecked}
/>`}
        >
          <Switch label="Enable notifications" checked={checkedWithLabel} onChange={setCheckedWithLabel} />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled switch prevents interaction.">
        <ShowcaseCard
          code={`<Switch label="Off disabled" checked={false} onChange={() => {}} disabled />
<Switch label="On disabled" checked={true} onChange={() => {}} disabled />`}
        >
          <Switch label="Off disabled" checked={false} onChange={() => {}} disabled />
          <Switch label="On disabled" checked={true} onChange={() => {}} disabled />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is on.' },
            {
              name: 'onChange',
              type: '(checked: boolean) => void',
              default: '-',
              description: 'Callback fired when toggle state changes.',
            },
            { name: 'label', type: 'string', default: '-', description: 'Label text displayed beside the switch.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch when true.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
