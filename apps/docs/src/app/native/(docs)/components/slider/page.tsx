'use client';

import React from 'react';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocText,
  PreviewCode,
  PropsTable,
} from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { NativeShowcase } from '@/components/docs/NativeShowcase';
import { NativePlayground } from '@/components/docs/NativePlayground';
import { Slider } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeSliderPage() {
  const pt = usePageTranslation('native-slider');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Slider'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A range input that lets users select a numeric value within a defined min/max range.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Slider } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Slider props below.</DocText>
        <NativePlayground
          controls={{
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
          }}
          render={(values) => <Slider defaultValue={50} min={0} max={100} disabled={values.disabled as boolean} />}
          code={(values) => `<Slider defaultValue={50} min={0} max={100}${values.disabled ? ' disabled' : ''} />`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The base slider renders a styled range input with a filled track and an animated thumb that scales on press interactions.'}
        </DocText>
        <NativeShowcase code={`<Slider defaultValue={50} min={0} max={100} />`}>
          <Slider defaultValue={50} min={0} max={100} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['unfilled']?.title ?? 'Unfilled'}>
        <DocText>
          {pt?.sections?.['unfilled']?.texts?.[0] ??
            'Set filled={false} to render the track as a flat secondary color without the progressive fill, useful when the position alone conveys the value.'}
        </DocText>
        <NativeShowcase code={`<Slider defaultValue={50} min={0} max={100} filled={false} />`}>
          <Slider defaultValue={50} min={0} max={100} filled={false} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label-and-value-display']?.title ?? 'With Label and Value Display'}>
        <DocText>
          {pt?.sections?.['with-label-and-value-display']?.texts?.[0] ??
            'Pass label to render a heading above the track. Enable showValue to display the current numeric value aligned to the right of the label in real time.'}
        </DocText>
        <NativeShowcase
          code={`<Slider
  label="Volume"
  showValue
  defaultValue={40}
  min={0}
  max={100}
  step={1}
/>`}
        >
          <Slider label="Volume" showValue defaultValue={40} min={0} max={100} step={1} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label displayed above the slider.',
            },
            {
              name: 'showValue',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['showValue'] ?? 'Displays the current value next to the label.',
            },
            {
              name: 'filled',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['filled'] ?? 'Fills the track up to the current value with the primary color.',
            },
            {
              name: 'value',
              type: 'number',
              default: '-',
              description: pt?.props?.['value'] ?? 'Controlled current value.',
            },
            {
              name: 'defaultValue',
              type: 'number',
              default: '-',
              description: pt?.props?.['defaultValue'] ?? 'Default value for uncontrolled usage.',
            },
            {
              name: 'min',
              type: 'number',
              default: '0',
              description: pt?.props?.['min'] ?? 'Minimum value of the range.',
            },
            {
              name: 'max',
              type: 'number',
              default: '100',
              description: pt?.props?.['max'] ?? 'Maximum value of the range.',
            },
            {
              name: 'step',
              type: 'number',
              default: '1',
              description: pt?.props?.['step'] ?? 'Increment step between values.',
            },
            {
              name: 'onChange',
              type: '(value: number) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Called when the value changes.',
            },
            {
              name: 'onChangeEnd',
              type: '(value: number) => void',
              default: '-',
              description: pt?.props?.['onChangeEnd'] ?? 'Called when the user releases the thumb.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the slider when true.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
