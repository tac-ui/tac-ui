'use client';

import React from 'react';
import { Select } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export default function SelectPage() {
  const pt = usePageTranslation('select');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Select'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A dropdown selector for choosing a single value from a list of options.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'The base select renders a styled trigger button that opens a keyboard-navigable listbox dropdown with animated entrance and exit transitions.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Select options={options} placeholder="Choose an option" />`}>
          <Select options={options} placeholder="Choose an option" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>{pt?.sections?.['sizes']?.texts?.[0] ?? 'Three size variants are available via selectSize: sm (32px), md (40px, default), and lg (48px). Font size scales accordingly.'}</DocText>
        <Showcase className="items-start" code={`<Select options={options} label="Small" placeholder="Choose an option" selectSize="sm" />
<Select options={options} label="Medium" placeholder="Choose an option" selectSize="md" />
<Select options={options} label="Large" placeholder="Choose an option" selectSize="lg" />`}>
          <Select options={options} label="Small" placeholder="Choose an option" selectSize="sm" />
          <Select options={options} label="Medium" placeholder="Choose an option" selectSize="md" />
          <Select options={options} label="Large" placeholder="Choose an option" selectSize="lg" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-helper-text']?.title ?? 'With Helper Text'}>
        <DocText>{pt?.sections?.['with-helper-text']?.texts?.[0] ?? 'helperText renders a muted hint below the trigger when there is no active error. The label prop renders an associated label element above.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Select options={options} label="Category" placeholder="Pick a category" helperText="Select the category that best fits." />`}>
          <Select options={options} label="Category" placeholder="Pick a category" helperText="Select the category that best fits." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>{pt?.sections?.['error-state']?.texts?.[0] ?? 'Set error to apply destructive border styling and pass errorMessage to display an accessible validation message below the trigger.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Select options={options} label="Category" placeholder="Pick a category" error errorMessage="Please select a category." />`}>
          <Select options={options} label="Category" placeholder="Pick a category" error errorMessage="Please select a category." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'When disabled is true the trigger button is non-interactive and the dropdown will not open.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Select options={options} placeholder="Disabled select" disabled />`}>
          <Select options={options} placeholder="Disabled select" disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'options', type: 'SelectOption[]', default: '-', description: pt?.props?.['options'] ?? 'Array of { label, value, disabled? } option objects.' },
          { name: 'label', type: 'string', default: '-', description: pt?.props?.['label'] ?? 'Label displayed above the select.' },
          { name: 'placeholder', type: 'string', default: '-', description: pt?.props?.['placeholder'] ?? 'Placeholder option shown when no value is selected.' },
          { name: 'helperText', type: 'string', default: '-', description: pt?.props?.['helperText'] ?? 'Helper text displayed below the select when there is no error.' },
          { name: 'selectSize', type: '"sm" | "md" | "lg"', default: '"md"', description: pt?.props?.['selectSize'] ?? 'Visual size of the select element.' },
          { name: 'value', type: 'string', default: '-', description: pt?.props?.['value'] ?? 'Controlled selected value.' },
          { name: 'onChange', type: '(value: string) => void', default: '-', description: pt?.props?.['onChange'] ?? 'Called when an option is selected.' },
          { name: 'error', type: 'boolean', default: 'false', description: pt?.props?.['error'] ?? 'Applies error styling when true.' },
          { name: 'errorMessage', type: 'string', default: '-', description: pt?.props?.['errorMessage'] ?? 'Error message displayed when error is true.' },
          { name: 'id', type: 'string', default: '-', description: pt?.props?.['id'] ?? 'ID attribute for the trigger button; auto-generated if omitted.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the select when true.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
