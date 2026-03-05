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
import { NativePlayground } from '@/components/docs/NativePlayground';
import { SegmentController } from '@tac-ui/native';
import type { SegmentOption } from '@tac-ui/native';
import { Grid2x2, List, LayoutGrid } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

const basicOptions: SegmentOption[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const iconOptions: SegmentOption[] = [
  { value: 'grid', label: 'Grid', icon: <Grid2x2 size={14} /> },
  { value: 'list', label: 'List', icon: <List size={14} /> },
  { value: 'board', label: 'Board', icon: <LayoutGrid size={14} /> },
];

const disabledOptions: SegmentOption[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly', disabled: true },
];

function ControlledExample() {
  const [value, setValue] = useState('all');
  return <SegmentController options={basicOptions} value={value} onValueChange={setValue} />;
}

export default function NativeSegmentControllerPage() {
  const pt = usePageTranslation('native-segment-controller');

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'SegmentController'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A pill-shaped segmented control with an animated sliding indicator. Supports single-select mode with options objects containing labels, icons, and per-option disabled state.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { SegmentController } from '@tac-ui/native';
import type { SegmentOption } from '@tac-ui/native';`}
        />
      </DocSection>

      <DocSection title="Playground">
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the SegmentController props below.'}
        </DocText>
        <NativePlayground
          controls={{
            size: {
              type: 'select',
              label: 'Size',
              options: ['sm', 'md', 'lg'],
              defaultValue: 'md',
            },
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <SegmentController
              options={[
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              size={values.size as 'sm' | 'md' | 'lg'}
              disabled={values.disabled as boolean}
            />
          )}
          code={(values) =>
            `<SegmentController\n  options={[\n    { value: 'all', label: 'All' },\n    { value: 'active', label: 'Active' },\n    { value: 'inactive', label: 'Inactive' },\n  ]}\n  size="${values.size}"${values.disabled ? '\n  disabled' : ''}\n/>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'A basic single-select segmented control that uses a spring-animated sliding background to indicate the active segment. The first option is selected by default.'}
        </DocText>
        <NativeShowcase
          code={`<SegmentController options={[
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]} />`}
        >
          <SegmentController options={basicOptions} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ??
            'Three size variants — sm, md (default), and lg — adjust the height, padding, and font size of the control.'}
        </DocText>
        <NativeShowcase
          code={`<SegmentController options={options} size="sm" />
<SegmentController options={options} size="md" />
<SegmentController options={options} size="lg" />`}
        >
          <SegmentController options={basicOptions} size="sm" />
          <SegmentController options={basicOptions} size="md" />
          <SegmentController options={basicOptions} size="lg" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>
          {pt?.sections?.['with-icons']?.texts?.[0] ??
            'Pass an icon node in each option to render it inline before the label text.'}
        </DocText>
        <NativeShowcase
          code={`import { Grid2x2, List, LayoutGrid } from '@tac-ui/icon-native';

<SegmentController options={[
  { value: 'grid', label: 'Grid', icon: <Grid2x2 size={14} /> },
  { value: 'list', label: 'List', icon: <List size={14} /> },
  { value: 'board', label: 'Board', icon: <LayoutGrid size={14} /> },
]} />`}
        >
          <SegmentController options={iconOptions} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled-options']?.title ?? 'Disabled Options'}>
        <DocText>
          {pt?.sections?.['disabled-options']?.texts?.[0] ??
            'Individual options can be disabled by setting disabled: true on the option object, rendering them at reduced opacity and blocking interaction.'}
        </DocText>
        <NativeShowcase
          code={`<SegmentController options={[
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly', disabled: true },
]} />`}
        >
          <SegmentController options={disabledOptions} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'The disabled prop disables the entire control, reducing its opacity and blocking all interactions.'}
        </DocText>
        <NativeShowcase code={`<SegmentController options={options} disabled />`}>
          <SegmentController options={basicOptions} disabled />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'In controlled mode, pass value and onValueChange to manage selection state externally — useful for syncing the control with other UI state.'}
        </DocText>
        <NativeShowcase
          code={`const [value, setValue] = useState('all');
<SegmentController options={options} value={value} onValueChange={setValue} />`}
        >
          <ControlledExample />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'options',
              type: 'SegmentOption[]',
              default: '-',
              description:
                pt?.props?.['options'] ??
                'Array of segment options to render. Each option has value, label, optional icon, and optional disabled.',
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
              description: pt?.props?.['onValueChange'] ?? 'Called when selection changes.',
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Size variant affecting height and font size.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['disabled'] ??
                'Disables the entire control, blocking all interaction and reducing opacity.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the root container.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['legacy-api']?.title ?? 'Legacy API (backward compatible)'}</DocText>
        <PropsTable
          data={[
            {
              name: 'items',
              type: 'string[]',
              default: '-',
              description: pt?.props?.['items'] ?? 'Deprecated. Use options instead. Array of segment label strings.',
            },
            {
              name: 'selectedIndex',
              type: 'number',
              default: '0',
              description:
                pt?.props?.['selectedIndex'] ??
                'Deprecated. Use value instead. Index of the currently selected segment.',
            },
            {
              name: 'onSelect',
              type: '(index: number) => void',
              default: '-',
              description:
                pt?.props?.['onSelect'] ??
                'Deprecated. Use onValueChange instead. Called with the index of the pressed segment.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
