'use client';

import React from 'react';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocSubSection,
  DocText,
  PreviewCode,
  PropsTable,
} from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { NativeShowcase } from '@/components/docs/NativeShowcase';
import { NativePlayground } from '@/components/docs/NativePlayground';
import { RadioGroup, Radio } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeRadioPage() {
  const pt = usePageTranslation('native-radio');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Radio'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A set of mutually exclusive options where only one can be selected at a time.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { RadioGroup, Radio } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Radio group props below.'}
        </DocText>
        <NativePlayground
          controls={{
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <RadioGroup defaultValue="react">
              <Radio radioValue="react" label="React" disabled={values.disabled as boolean} />
              <Radio radioValue="vue" label="Vue" disabled={values.disabled as boolean} />
              <Radio radioValue="angular" label="Angular" disabled={values.disabled as boolean} />
            </RadioGroup>
          )}
          code={(values) =>
            `<RadioGroup defaultValue="react">
  <Radio radioValue="react" label="React"${values.disabled ? ' disabled' : ''} />
  <Radio radioValue="vue" label="Vue"${values.disabled ? ' disabled' : ''} />
  <Radio radioValue="angular" label="Angular"${values.disabled ? ' disabled' : ''} />
</RadioGroup>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default-group']?.title ?? 'Default Group'}>
        <DocText>
          {pt?.sections?.['default-group']?.texts?.[0] ??
            'RadioGroup manages selection state and provides it via context to child Radio items. Use defaultValue for uncontrolled initial selection.'}
        </DocText>
        <NativeShowcase
          code={`<RadioGroup defaultValue="vue">
  <Radio radioValue="react" label="React" />
  <Radio radioValue="vue" label="Vue" />
  <Radio radioValue="angular" label="Angular" />
</RadioGroup>`}
        >
          <RadioGroup defaultValue="vue">
            <Radio radioValue="react" label="React" />
            <Radio radioValue="vue" label="Vue" />
            <Radio radioValue="angular" label="Angular" />
          </RadioGroup>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Use value and onValueChange on RadioGroup for controlled usage. The callback receives the value string of the newly selected item.'}
        </DocText>
        <PreviewCode
          code={`const [value, setValue] = React.useState('react');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio radioValue="react" label="React" />
  <Radio radioValue="vue" label="Vue" />
  <Radio radioValue="angular" label="Angular" />
</RadioGroup>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Set disabled on individual Radio items to prevent them from being selected while keeping the rest of the group interactive.'}
        </DocText>
        <NativeShowcase
          code={`<RadioGroup defaultValue="a">
  <Radio radioValue="a" label="Option A" />
  <Radio radioValue="b" label="Option B (disabled)" disabled />
</RadioGroup>`}
        >
          <RadioGroup defaultValue="a">
            <Radio radioValue="a" label="Option A" />
            <Radio radioValue="b" label="Option B (disabled)" disabled />
          </RadioGroup>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocSubSection title="RadioGroup">
          <PropsTable
            data={[
              {
                name: 'defaultValue',
                type: 'string',
                default: '-',
                description: pt?.props?.['defaultValue'] ?? 'Default selected value for uncontrolled usage.',
              },
              {
                name: 'value',
                type: 'string',
                default: '-',
                description: pt?.props?.['value'] ?? 'Controlled selected value.',
              },
              {
                name: 'onValueChange',
                type: '(value: string) => void',
                default: '-',
                description: pt?.props?.['onValueChange'] ?? 'Called when the selected radio changes.',
              },
              {
                name: 'children',
                type: 'React.ReactNode',
                default: '-',
                description: pt?.props?.['children'] ?? 'Radio items to render inside the group.',
              },
              {
                name: 'style',
                type: 'ViewStyle',
                default: '-',
                description: pt?.props?.['radiogroup-style'] ?? 'Additional styles applied to the group container.',
              },
            ]}
          />
        </DocSubSection>
        <DocSubSection title="Radio">
          <PropsTable
            data={[
              {
                name: 'radioValue',
                type: 'string',
                default: '-',
                description:
                  pt?.props?.['radio-value'] ??
                  'The value this radio item represents; compared against RadioGroup selection.',
              },
              {
                name: 'label',
                type: 'string',
                default: '-',
                description: pt?.props?.['radio-label'] ?? 'Label text displayed next to the radio.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: pt?.props?.['radio-disabled'] ?? 'Disables this radio item when true.',
              },
              {
                name: 'filled',
                type: 'boolean',
                default: 'false',
                description:
                  pt?.props?.['radio-filled'] ?? 'Adds a tinted background and padding to the radio wrapper.',
              },
              {
                name: 'style',
                type: 'ViewStyle',
                default: '-',
                description: pt?.props?.['radio-style'] ?? 'Additional styles applied to the radio wrapper.',
              },
            ]}
          />
        </DocSubSection>
      </DocSection>
    </DocPage>
  );
}
