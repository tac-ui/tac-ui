import React, { useState } from 'react';
import { Slider } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function SliderScreen() {
  const [value, setValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(30);
  const [stepValue, setStepValue] = useState(25);

  return (
    <ScreenLayout title="Slider" description="A draggable control for selecting a value within a range.">
      <Section title="Import">
        <CodePreview code={`import { Slider } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic slider with default range.">
        <ShowcaseCard
          code={`const [value, setValue] = useState(50);

<Slider value={value} onChange={setValue} />`}
        >
          <Slider value={value} onChange={setValue} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label and Value" description="Slider displaying its current value.">
        <ShowcaseCard
          code={`<Slider
  label="Volume"
  showValue
  value={value}
  onChange={setValue}
/>`}
        >
          <Slider label="Volume" showValue value={volumeValue} onChange={setVolumeValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Min / Max / Step" description="Custom range and step increments.">
        <ShowcaseCard
          code={`<Slider
  label="Progress"
  showValue
  min={0}
  max={100}
  step={25}
  value={value}
  onChange={setValue}
/>`}
        >
          <Slider label="Progress" showValue min={0} max={100} step={25} value={stepValue} onChange={setStepValue} />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled slider prevents interaction.">
        <ShowcaseCard code={`<Slider label="Locked" value={40} onChange={() => {}} disabled />`}>
          <Slider label="Locked" value={40} onChange={() => {}} disabled />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'value', type: 'number', default: '0', description: 'Current value of the slider.' },
            {
              name: 'onChange',
              type: '(value: number) => void',
              default: '-',
              description: 'Callback fired when value changes.',
            },
            { name: 'min', type: 'number', default: '0', description: 'Minimum value of the slider.' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum value of the slider.' },
            { name: 'step', type: 'number', default: '1', description: 'Step increment between values.' },
            { name: 'label', type: 'string', default: '-', description: 'Label displayed above the slider.' },
            {
              name: 'showValue',
              type: 'boolean',
              default: 'false',
              description: 'Displays the current value when true.',
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider when true.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
