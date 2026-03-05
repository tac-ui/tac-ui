import React, { useState } from 'react';
import { View } from 'react-native';
import { Toggle } from '@tac-ui/native';
import { Sun, Moon, Bold, Italic } from '@tac-ui/icon-native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function ToggleScreen() {
  const [themeToggle, setThemeToggle] = useState(false);
  const [boldToggle, setBoldToggle] = useState(false);
  const [italicToggle, setItalicToggle] = useState(false);

  return (
    <ScreenLayout
      title="Toggle"
      description="An icon toggle button that switches between two states with a rotation animation."
    >
      <Section title="Import">
        <CodePreview code={`import { Toggle } from '@tac-ui/native';`} />
      </Section>

      <Section title="Theme Toggle" description="Toggle between light and dark icons.">
        <ShowcaseCard
          code={`import { Sun, Moon } from '@tac-ui/icon-native';

const [checked, setChecked] = useState(false);

<Toggle
  checked={checked}
  onChange={setChecked}
  iconOn={<Moon size={20} color="#6366f1" />}
  iconOff={<Sun size={20} color="#f59e0b" />}
/>`}
        >
          <Toggle
            checked={themeToggle}
            onChange={setThemeToggle}
            iconOn={<Moon size={20} color="#6366f1" />}
            iconOff={<Sun size={20} color="#f59e0b" />}
          />
        </ShowcaseCard>
      </Section>

      <Section title="Text Formatting" description="Multiple toggles for text formatting options.">
        <ShowcaseCard
          code={`<Toggle
  checked={bold}
  onChange={setBold}
  iconOn={<Bold size={18} color="#6366f1" />}
  iconOff={<Bold size={18} color="#9ca3af" />}
/>
<Toggle
  checked={italic}
  onChange={setItalic}
  iconOn={<Italic size={18} color="#6366f1" />}
  iconOff={<Italic size={18} color="#9ca3af" />}
/>`}
        >
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Toggle
              checked={boldToggle}
              onChange={setBoldToggle}
              iconOn={<Bold size={18} color="#6366f1" />}
              iconOff={<Bold size={18} color="#9ca3af" />}
            />
            <Toggle
              checked={italicToggle}
              onChange={setItalicToggle}
              iconOn={<Italic size={18} color="#6366f1" />}
              iconOff={<Italic size={18} color="#9ca3af" />}
            />
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled toggle prevents interaction.">
        <ShowcaseCard
          code={`<Toggle
  checked={false}
  onChange={() => {}}
  iconOn={<Sun size={20} color="#6366f1" />}
  iconOff={<Sun size={20} color="#9ca3af" />}
  disabled
/>`}
        >
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Toggle
              checked={false}
              onChange={() => {}}
              iconOn={<Sun size={20} color="#6366f1" />}
              iconOff={<Sun size={20} color="#9ca3af" />}
              disabled
            />
            <Toggle
              checked={true}
              onChange={() => {}}
              iconOn={<Moon size={20} color="#6366f1" />}
              iconOff={<Moon size={20} color="#9ca3af" />}
              disabled
            />
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'checked',
              type: 'boolean',
              default: 'false',
              description: 'Whether the toggle is in the active state.',
            },
            {
              name: 'onChange',
              type: '(checked: boolean) => void',
              default: '-',
              description: 'Callback fired when toggle state changes.',
            },
            {
              name: 'iconOn',
              type: 'React.ReactNode',
              default: '-',
              description: 'Icon rendered when checked is true.',
            },
            {
              name: 'iconOff',
              type: 'React.ReactNode',
              default: '-',
              description: 'Icon rendered when checked is false.',
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle when true.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
