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
import { Select } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export default function NativeSelectPage() {
  const pt = usePageTranslation('native-select');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Select'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A dropdown selector for choosing a single value from a list of options.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Select } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Select props below.</DocText>
        <NativePlayground
          controls={{
            placeholder: {
              type: 'text',
              label: 'Placeholder',
              defaultValue: 'Choose an option',
            },
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
            error: {
              type: 'boolean',
              label: 'Error',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <Select
              options={options}
              placeholder={values.placeholder as string}
              disabled={values.disabled as boolean}
              error={values.error as boolean}
              errorMessage={values.error ? 'Please select an option.' : undefined}
            />
          )}
          code={(values) =>
            `<Select options={options} placeholder="${values.placeholder}"${values.disabled ? ' disabled' : ''}${values.error ? ' error errorMessage="Please select an option."' : ''} />`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The base select renders a styled trigger button that opens a listbox with the available options.'}
        </DocText>
        <NativeShowcase code={`<Select options={options} placeholder="Choose an option" />`}>
          <Select options={options} placeholder="Choose an option" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ??
            'Three size variants are available via size: sm, md (default), and lg. Font size scales accordingly.'}
        </DocText>
        <NativeShowcase
          code={`<Select options={options} label="Small" placeholder="Choose an option" size="sm" />
<Select options={options} label="Medium" placeholder="Choose an option" size="md" />
<Select options={options} label="Large" placeholder="Choose an option" size="lg" />`}
        >
          <Select options={options} label="Small" placeholder="Choose an option" size="sm" />
          <Select options={options} label="Medium" placeholder="Choose an option" size="md" />
          <Select options={options} label="Large" placeholder="Choose an option" size="lg" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-helper-text']?.title ?? 'With Helper Text'}>
        <DocText>
          {pt?.sections?.['with-helper-text']?.texts?.[0] ??
            'helperText renders a muted hint below the trigger when there is no active error. The label prop renders an associated label above.'}
        </DocText>
        <NativeShowcase
          code={`<Select options={options} label="Category" placeholder="Pick a category" helperText="Select the category that best fits." />`}
        >
          <Select
            options={options}
            label="Category"
            placeholder="Pick a category"
            helperText="Select the category that best fits."
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>
          {pt?.sections?.['error-state']?.texts?.[0] ??
            'Set error to apply destructive border styling and pass errorMessage to display an accessible validation message below the trigger.'}
        </DocText>
        <NativeShowcase
          code={`<Select options={options} label="Category" placeholder="Pick a category" error errorMessage="Please select a category." />`}
        >
          <Select
            options={options}
            label="Category"
            placeholder="Pick a category"
            error
            errorMessage="Please select a category."
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'When disabled is true the trigger button is non-interactive and the dropdown will not open.'}
        </DocText>
        <NativeShowcase code={`<Select options={options} placeholder="Disabled select" disabled />`}>
          <Select options={options} placeholder="Disabled select" disabled />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'options',
              type: 'SelectOption[]',
              default: '-',
              description: pt?.props?.['options'] ?? 'Array of { label, value, disabled? } option objects.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label displayed above the select.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: '"Select an option"',
              description: pt?.props?.['placeholder'] ?? 'Placeholder option shown when no value is selected.',
            },
            {
              name: 'helperText',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['helperText'] ?? 'Helper text displayed below the select when there is no error.',
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Visual size of the select element.',
            },
            {
              name: 'value',
              type: 'string',
              default: '-',
              description: pt?.props?.['value'] ?? 'Controlled selected value.',
            },
            {
              name: 'onChange',
              type: '(value: string) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Called when an option is selected.',
            },
            {
              name: 'error',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['error'] ?? 'Applies error styling when true.',
            },
            {
              name: 'errorMessage',
              type: 'string',
              default: '-',
              description: pt?.props?.['errorMessage'] ?? 'Error message displayed when error is true.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the select when true.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
