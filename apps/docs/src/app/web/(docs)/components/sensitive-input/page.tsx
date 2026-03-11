'use client';

import React, { useState } from 'react';
import { SensitiveInput, Label } from '@tac-ui/web';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  Showcase,
  PropsTable,
  DocText,
  PreviewCode,
} from '@/components/docs/DocPage';
import { Playground } from '@/components/docs/Playground';
import { usePageTranslation } from '@/i18n';

function BasicDemo() {
  const [value, setValue] = useState('sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ');
  return (
    <SensitiveInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter a secret value"
    />
  );
}

function EmptyDemo() {
  const [value, setValue] = useState('');
  return (
    <SensitiveInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type a secret here..."
    />
  );
}

function WithLabelDemo() {
  const [value, setValue] = useState('my-super-secret-password-123');
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label htmlFor="api-key-input">API Key</Label>
      <SensitiveInput
        id="api-key-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your API key"
      />
    </div>
  );
}

function DisabledDemo() {
  return (
    <SensitiveInput
      value="disabled-secret-value"
      disabled
      placeholder="Disabled"
    />
  );
}

export default function SensitiveInputPage() {
  const pt = usePageTranslation('sensitive-input');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'SensitiveInput'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A secure input that masks its value by default and reveals on explicit user action. Supports copy-without-reveal and keyboard-driven state transitions.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { SensitiveInput } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the SensitiveInput props below.</DocText>
        <Playground
          controls={{
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
            placeholder: {
              type: 'text',
              label: 'Placeholder',
              defaultValue: 'Enter a secret value',
            },
          }}
          render={(values) => (
            <SensitiveInput
              key={String(values.disabled)}
              defaultValue="sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ"
              disabled={values.disabled as boolean}
              placeholder={values.placeholder as string}
            />
          )}
          code={(values) =>
            `<SensitiveInput
  value={value}
  onChange={(e) => setValue(e.target.value)}${values.disabled ? '\n  disabled' : ''}
  placeholder="${values.placeholder}"
/>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default (Pre-filled Value)'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'When a value is provided, the component starts in the masked state showing bullet characters. Click or press Enter/Space to reveal the actual value.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`const [value, setValue] = useState('sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ');

<SensitiveInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
        >
          <BasicDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['empty-state']?.title ?? 'Empty State'}>
        <DocText>
          {pt?.sections?.['empty-state']?.texts?.[0] ??
            'When no value is provided, the input renders as a standard text field. Once a value is entered and the component is remounted, it starts in the masked state.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`const [value, setValue] = useState('');

<SensitiveInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type a secret here..."
/>`}
        >
          <EmptyDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'A disabled SensitiveInput is non-interactive with reduced opacity.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<SensitiveInput value="disabled-secret-value" disabled />`}
        >
          <DisabledDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>
          {pt?.sections?.['with-label']?.texts?.[0] ??
            'Compose with the Label component by passing a matching id and htmlFor for accessible labelling.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<div className="flex flex-col gap-1.5 w-full">
  <Label htmlFor="api-key-input">API Key</Label>
  <SensitiveInput
    id="api-key-input"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
</div>`}
        >
          <WithLabelDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['keyboard-navigation']?.title ?? 'Keyboard Navigation'}>
        <DocText>
          {pt?.sections?.['keyboard-navigation']?.texts?.[0] ??
            'SensitiveInput is fully keyboard accessible with the following shortcuts:'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`// Masked state:
// Enter or Space → reveals the value
// Tab → moves focus normally

// Revealed state:
// Escape → re-masks the value

// Hover on mask → shows copy button`}
        >
          <BasicDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['value'] ??
                'Controlled value. When non-empty, the component starts in the masked state.',
            },
            {
              name: 'defaultValue',
              type: 'string',
              default: '-',
              description: pt?.props?.['defaultValue'] ?? 'Uncontrolled default value.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: '-',
              description: pt?.props?.['placeholder'] ?? 'Placeholder text shown in the empty state.',
            },
            {
              name: 'onCopy',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onCopy'] ??
                'Called after the value is copied to clipboard from the masked state.',
            },
            {
              name: 'onReveal',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onReveal'] ??
                'Called when the input transitions from masked to revealed.',
            },
            {
              name: 'onChange',
              type: 'ChangeEventHandler<HTMLInputElement>',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Standard input change handler.',
            },
            {
              name: 'onKeyDown',
              type: 'KeyboardEventHandler<HTMLInputElement>',
              default: '-',
              description:
                pt?.props?.['onKeyDown'] ??
                'Keyboard handler. Escape is intercepted to re-mask; others are forwarded.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the input.',
            },
            {
              name: 'id',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['id'] ??
                'HTML id for the input. Auto-generated if not provided.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
