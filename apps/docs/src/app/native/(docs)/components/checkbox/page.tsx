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
import { Checkbox } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeCheckboxPage() {
  const pt = usePageTranslation('native-checkbox');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Checkbox'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A toggleable input for boolean choices, supporting checked, unchecked, and indeterminate states.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Checkbox } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Checkbox props below.'}
        </DocText>
        <NativePlayground
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
        <NativeShowcase
          code={`<Checkbox label="Accept terms and conditions" />
<Checkbox label="Pre-checked" defaultChecked />`}
        >
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Pre-checked" defaultChecked />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['indeterminate']?.title ?? 'Indeterminate'}>
        <DocText>
          {pt?.sections?.['indeterminate']?.texts?.[0] ??
            'The indeterminate state represents a partially-selected state, useful for parent checkboxes in a hierarchical selection.'}
        </DocText>
        <NativeShowcase code={`<Checkbox label="Select all (partial)" indeterminate />`}>
          <Checkbox label="Select all (partial)" indeterminate />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Disabled checkboxes are non-interactive and visually dimmed, preserving their current state.'}
        </DocText>
        <NativeShowcase
          code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`}
        >
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Pass checked and onChange to control the checkbox state from a parent component.'}
        </DocText>
        <PreviewCode
          code={`import { useState } from 'react';

function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label={checked ? 'Checked' : 'Unchecked'}
      checked={checked}
      onChange={setChecked}
    />
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['all-states']?.title ?? 'All States'}>
        <DocText>
          {pt?.sections?.['all-states']?.texts?.[0] ??
            'Overview of all four visual states: default, checked, indeterminate, and disabled.'}
        </DocText>
        <NativeShowcase
          code={`<Checkbox label="Default" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />`}
        >
          <Checkbox label="Default" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
        </NativeShowcase>
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
              type: '(checked: boolean) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Callback fired when the checked state changes.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the wrapper container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
