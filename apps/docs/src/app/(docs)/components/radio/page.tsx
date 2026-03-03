'use client';

import React, { useState } from 'react';
import { RadioGroup, Radio } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocSubSection, DocText } from '@/components/docs/DocPage';

function ControlledExample() {
  const [value, setValue] = useState('react');
  return (
    <div className="flex flex-col gap-2 items-start">
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio radioValue="react" label="React" />
        <Radio radioValue="vue" label="Vue" />
        <Radio radioValue="angular" label="Angular" />
      </RadioGroup>
      <span className="text-xs text-[var(--muted-foreground)]">Selected: {value}</span>
    </div>
  );
}

export default function RadioPage() {
  const pt = usePageTranslation('radio');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Radio'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A set of mutually exclusive options where only one can be selected at a time.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default-group']?.title ?? 'Default Group'}>
        <DocText>{pt?.sections?.['default-group']?.texts?.[0] ?? 'RadioGroup manages selection state and provides it via context to child Radio items. Use defaultValue for uncontrolled initial selection.'}</DocText>
        <Showcase code={`<RadioGroup defaultValue="vue">
  <Radio radioValue="react" label="React" id="radio-react" />
  <Radio radioValue="vue" label="Vue" id="radio-vue" />
  <Radio radioValue="angular" label="Angular" id="radio-angular" />
</RadioGroup>`}>
          <RadioGroup defaultValue="vue">
            <Radio radioValue="react" label="React" id="radio-react" />
            <Radio radioValue="vue" label="Vue" id="radio-vue" />
            <Radio radioValue="angular" label="Angular" id="radio-angular" />
          </RadioGroup>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>{pt?.sections?.['controlled']?.texts?.[0] ?? 'Use value and onValueChange on RadioGroup for controlled usage. The callback receives the radioValue string of the newly selected item.'}</DocText>
        <Showcase code={`const [value, setValue] = useState('react');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio radioValue="react" label="React" />
  <Radio radioValue="vue" label="Vue" />
  <Radio radioValue="angular" label="Angular" />
</RadioGroup>`}>
          <ControlledExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'Set disabled on individual Radio items to prevent them from being selected while keeping the rest of the group interactive.'}</DocText>
        <Showcase code={`<RadioGroup defaultValue="a">
  <Radio radioValue="a" label="Option A" id="radio-a" />
  <Radio radioValue="b" label="Option B (disabled)" id="radio-b" disabled />
</RadioGroup>`}>
          <RadioGroup defaultValue="a">
            <Radio radioValue="a" label="Option A" id="radio-a2" />
            <Radio radioValue="b" label="Option B (disabled)" id="radio-b2" disabled />
          </RadioGroup>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocSubSection title="RadioGroup">
          <PropsTable data={[
            { name: 'defaultValue', type: 'string', default: '-', description: pt?.props?.['defaultValue'] ?? 'Default selected value for uncontrolled usage.' },
            { name: 'value', type: 'string', default: '-', description: pt?.props?.['value'] ?? 'Controlled selected value.' },
            { name: 'onValueChange', type: '(value: string) => void', default: '-', description: pt?.props?.['onValueChange'] ?? 'Called when the selected radio changes.' },
            { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['children'] ?? 'Radio items to render inside the group.' },
          ]} />
        </DocSubSection>
        <DocSubSection title="Radio">
          <PropsTable data={[
            { name: 'radioValue', type: 'string', default: '-', description: pt?.props?.['radioValue'] ?? 'The value this radio item represents; compared against RadioGroup selection.' },
            { name: 'label', type: 'string', default: '-', description: pt?.props?.['label'] ?? 'Label text displayed next to the radio.' },
            { name: 'id', type: 'string', default: '-', description: pt?.props?.['id'] ?? 'Unique id for the radio input element.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables this radio item when true.' },
          ]} />
        </DocSubSection>
      </DocSection>
    </DocPage>
  );
}
