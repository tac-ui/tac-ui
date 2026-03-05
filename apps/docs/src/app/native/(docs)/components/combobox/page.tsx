'use client';

import React, { useState } from 'react';
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
import { Combobox } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

const frameworkOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
];

const disabledOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue', disabled: true },
  { label: 'Angular', value: 'angular', disabled: true },
  { label: 'Svelte', value: 'svelte' },
];

function ControlledExample() {
  const [value, setValue] = useState('react');
  return <Combobox options={frameworkOptions} value={value} onChange={setValue} placeholder="Select a framework..." />;
}

export default function NativeComboboxPage() {
  const pt = usePageTranslation('native-combobox');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Combobox'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A searchable select input that allows users to filter and choose from a list of options.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Combobox } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ?? 'A searchable dropdown that filters options as the user types.'}
        </DocText>
        <NativeShowcase
          code={`const [value, setValue] = useState('');

<Combobox
  options={frameworkOptions}
  value={value}
  onChange={setValue}
  placeholder="Select a framework..."
  emptyText="No framework found."
/>`}
        >
          <Combobox options={frameworkOptions} placeholder="Select a framework..." emptyText="No framework found." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled-options']?.title ?? 'Disabled Options'}>
        <DocText>
          {pt?.sections?.['disabled-options']?.texts?.[0] ??
            'Individual options can be marked disabled — they appear at reduced opacity and cannot be selected.'}
        </DocText>
        <NativeShowcase
          code={`<Combobox
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue', disabled: true },
    { label: 'Angular', value: 'angular', disabled: true },
    { label: 'Svelte', value: 'svelte' },
  ]}
  placeholder="Select a framework..."
/>`}
        >
          <Combobox options={disabledOptions} placeholder="Select a framework..." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Manage the selected value externally with value and onChange — the display reflects the matching option label.'}
        </DocText>
        <NativeShowcase
          code={`const [value, setValue] = useState('react');

<Combobox
  options={frameworkOptions}
  value={value}
  onChange={setValue}
  placeholder="Select a framework..."
/>`}
        >
          <ControlledExample />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'options',
              type: 'ComboboxOption[]',
              default: '-',
              description:
                pt?.props?.['options'] ?? 'Array of { label, value, disabled? } option objects to display and filter.',
            },
            {
              name: 'value',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['value'] ??
                'Controlled selected value. The matching option label is displayed in the input.',
            },
            {
              name: 'onChange',
              type: '(value: string) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Called when the user selects an option from the dropdown.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: '"Search\u2026"',
              description:
                pt?.props?.['placeholder'] ?? 'Placeholder text shown in the input when no value is selected.',
            },
            {
              name: 'emptyText',
              type: 'string',
              default: '"No results found"',
              description:
                pt?.props?.['emptyText'] ?? 'Text displayed in the dropdown when no options match the search query.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the outer container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
