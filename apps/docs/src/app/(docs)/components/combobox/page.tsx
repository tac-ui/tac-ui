'use client';

import React, { useState } from 'react';
import { Combobox } from '@tac-ui/web';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';
import { usePageTranslation } from '@/i18n';

const frameworkOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
];

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
];

const disabledOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue', disabled: true },
  { label: 'Angular', value: 'angular', disabled: true },
  { label: 'Svelte', value: 'svelte' },
];

function ControlledExample() {
  const [value, setValue] = useState('react');
  return (
    <div className="flex flex-col gap-2 w-full">
      <Combobox
        options={frameworkOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a framework..."
      />
      <span className="text-xs text-[var(--muted-foreground)]">Selected value: {value || 'none'}</span>
    </div>
  );
}

export default function ComboboxPage() {
  const pt = usePageTranslation('combobox');
  const [value, setValue] = useState('');
  const [labelValue, setLabelValue] = useState('');
  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Combobox'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A searchable select input that allows users to filter and choose from a list of options.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'A searchable dropdown that filters options as the user types. Supports keyboard navigation with Arrow keys, Enter to select, and Escape to close.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`const [value, setValue] = useState('');

<Combobox
  options={frameworkOptions}
  value={value}
  onChange={setValue}
  placeholder="Select a framework..."
  emptyText="No framework found."
/>`}>
          <Combobox
            options={frameworkOptions}
            value={value}
            onChange={setValue}
            placeholder="Select a framework..."
            emptyText="No framework found."
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>{pt?.sections?.['with-label']?.texts?.[0] ?? 'Pair the Combobox with a Label component using matching htmlFor and id props for accessible labeling.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<div className="flex flex-col gap-1.5">
  <label htmlFor="country" className="text-sm font-medium text-[var(--foreground)]">Country</label>
  <Combobox
    id="country"
    options={countryOptions}
    value={value}
    onChange={setValue}
    placeholder="Search countries..."
  />
</div>`}>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="country-combobox" className="text-sm font-medium text-[var(--foreground)]">Country</label>
            <Combobox
              id="country-combobox"
              options={countryOptions}
              value={labelValue}
              onChange={setLabelValue}
              placeholder="Search countries..."
            />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled-options']?.title ?? 'Disabled Options'}>
        <DocText>{pt?.sections?.['disabled-options']?.texts?.[0] ?? 'Individual options can be marked disabled — they appear at reduced opacity, are not keyboard-focusable, and cannot be selected.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Combobox
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue', disabled: true },
    { label: 'Angular', value: 'angular', disabled: true },
    { label: 'Svelte', value: 'svelte' },
  ]}
  placeholder="Select a framework..."
/>`}>
          <Combobox
            options={disabledOptions}
            placeholder="Select a framework..."
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'The disabled prop (via HTML input attribute) prevents interaction with the entire component, rendering it at reduced opacity with a not-allowed cursor.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Combobox
  disabled
  options={frameworkOptions}
  placeholder="Select a framework..."
/>`}>
          <Combobox
            disabled
            options={frameworkOptions}
            placeholder="Select a framework..."
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>{pt?.sections?.['controlled']?.texts?.[0] ?? 'Manage the selected value externally with value and onChange — the display reflects the matching option label and resets to search mode on focus.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`const [value, setValue] = useState('react');

<Combobox
  options={frameworkOptions}
  value={value}
  onChange={setValue}
  placeholder="Select a framework..."
/>`}>
          <ControlledExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'options', type: 'ComboboxOption[]', default: '-', description: pt?.props?.['options'] ?? 'Array of { label, value, disabled? } option objects to display and filter.' },
          { name: 'value', type: 'string', default: '-', description: pt?.props?.['value'] ?? 'Controlled selected value. The matching option label is displayed in the input.' },
          { name: 'onChange', type: '(value: string) => void', default: '-', description: pt?.props?.['onChange'] ?? 'Called when the user selects an option from the dropdown.' },
          { name: 'placeholder', type: 'string', default: '-', description: pt?.props?.['placeholder'] ?? 'Placeholder text shown in the input when no value is selected.' },
          { name: 'emptyText', type: 'string', default: '"No results found"', description: pt?.props?.['emptyText'] ?? 'Text displayed in the dropdown when no options match the search query.' },
          { name: 'id', type: 'string', default: '-', description: pt?.props?.['id'] ?? 'HTML id for the input element, auto-generated if omitted. Use with Label htmlFor for accessibility.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the input, blocking all interaction and showing a not-allowed cursor.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the input element.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
