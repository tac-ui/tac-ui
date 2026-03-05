'use client';

import React, { useState } from 'react';
import { Checkbox } from '@tac-ui/web';
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
import { usePageTranslation } from '@/i18n';
import { Playground } from '@/components/docs/Playground';

function ControlledDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label={checked ? 'Checked' : 'Unchecked'}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

export default function CheckboxPage() {
  const pt = usePageTranslation('checkbox');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Checkbox'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A toggleable input for boolean choices, supporting checked, unchecked, and indeterminate states.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Checkbox } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Checkbox props below.</DocText>
        <Playground
          controls={{
            label: {
              type: 'text',
              label: 'Label',
              defaultValue: 'Accept terms and conditions',
            },
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
          }}
          render={(values) => <Checkbox label={values.label as string} disabled={values.disabled as boolean} />}
          code={(values) => `<Checkbox label="${values.label}"${values.disabled ? ' disabled' : ''} />`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'Uncontrolled checkbox using defaultChecked. The component manages its own state internally.'}
        </DocText>
        <Showcase
          code={`<Checkbox label="Accept terms and conditions" />
<Checkbox label="Pre-checked" defaultChecked />`}
        >
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Pre-checked" defaultChecked />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['indeterminate']?.title ?? 'Indeterminate'}>
        <DocText>
          {pt?.sections?.['indeterminate']?.texts?.[0] ??
            'The indeterminate state represents a partially-selected state, useful for parent checkboxes in a hierarchical selection.'}
        </DocText>
        <Showcase code={`<Checkbox label="Select all (partial)" indeterminate />`}>
          <Checkbox label="Select all (partial)" indeterminate />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Disabled checkboxes are non-interactive and visually dimmed, preserving their current state.'}
        </DocText>
        <Showcase
          code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`}
        >
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Pass checked and onChange to control the checkbox state from a parent component.'}
        </DocText>
        <Showcase
          code={`const [checked, setChecked] = useState(false);

<Checkbox
  label={checked ? 'Checked' : 'Unchecked'}
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
        >
          <ControlledDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['all-states']?.title ?? 'All States'}>
        <DocText>
          {pt?.sections?.['all-states']?.texts?.[0] ??
            'Overview of all four visual states: default, checked, indeterminate, and disabled.'}
        </DocText>
        <Showcase
          code={`<Checkbox label="Default" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />`}
        >
          <Checkbox label="Default" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label text displayed next to the checkbox.',
            },
            {
              name: 'checked',
              type: 'boolean',
              default: '-',
              description:
                pt?.props?.['checked'] ?? 'Controlled checked state. Use with onChange for a controlled input.',
            },
            {
              name: 'defaultChecked',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['defaultChecked'] ?? 'Initial checked state for uncontrolled usage.',
            },
            {
              name: 'indeterminate',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['indeterminate'] ?? 'Renders a dash icon representing a partially-selected state.',
            },
            {
              name: 'filled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['filled'] ?? 'Adds a tinted background to the checkbox label area.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['disabled'] ?? 'Disables the checkbox, making it non-interactive and visually dimmed.',
            },
            {
              name: 'onChange',
              type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Callback fired when the checked state changes.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the label wrapper.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
