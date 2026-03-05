import React, { useState } from 'react';
import { ColorPicker } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

const presetColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#6366f1', '#a855f7', '#ec4899'];

export default function ColorPickerScreen() {
  const [color, setColor] = useState('#6366f1');
  const [colorWithLabel, setColorWithLabel] = useState('#22c55e');
  const [colorWithPresets, setColorWithPresets] = useState('#ef4444');

  return (
    <ScreenLayout title="ColorPicker" description="An input for selecting colors with optional preset swatches.">
      <Section title="Import">
        <CodePreview code={`import { ColorPicker } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic color picker.">
        <ShowcaseCard
          code={`const [color, setColor] = useState('#6366f1');

<ColorPicker value={color} onChange={setColor} />`}
        >
          <ColorPicker value={color} onChange={setColor} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label" description="Color picker with a visible label.">
        <ShowcaseCard
          code={`<ColorPicker
  label="Brand Color"
  value={color}
  onChange={setColor}
/>`}
        >
          <ColorPicker label="Brand Color" value={colorWithLabel} onChange={setColorWithLabel} />
        </ShowcaseCard>
      </Section>

      <Section title="With Preset Colors" description="Provides quick-select preset color swatches.">
        <ShowcaseCard
          code={`const presetColors = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#6366f1', '#a855f7', '#ec4899',
];

<ColorPicker
  label="Accent"
  colors={presetColors}
  value={color}
  onChange={setColor}
/>`}
        >
          <ColorPicker label="Accent" colors={presetColors} value={colorWithPresets} onChange={setColorWithPresets} />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled color picker prevents interaction.">
        <ShowcaseCard code={`<ColorPicker label="Locked Color" value="#6366f1" onChange={() => {}} disabled />`}>
          <ColorPicker label="Locked Color" value="#6366f1" onChange={() => {}} disabled />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'value', type: 'string', default: '-', description: 'Currently selected color as a hex string.' },
            {
              name: 'onChange',
              type: '(color: string) => void',
              default: '-',
              description: 'Callback fired when color changes.',
            },
            { name: 'label', type: 'string', default: '-', description: 'Label displayed above the color picker.' },
            { name: 'colors', type: 'string[]', default: '-', description: 'Array of preset color hex strings.' },
            { name: 'showInput', type: 'boolean', default: 'true', description: 'Shows a hex input field when true.' },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables the color picker when true.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
