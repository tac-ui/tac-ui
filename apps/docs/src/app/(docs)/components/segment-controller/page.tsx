'use client';

import React, { useState } from 'react';
import { SegmentController } from '@tac-ui/web';
import { Grid3X3, List, LayoutGrid, Bold, Italic, Underline, Strikethrough, Sun, Moon, Monitor } from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

const basicOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const iconOptions = [
  { value: 'grid', label: 'Grid', icon: <Grid3X3 size={14} /> },
  { value: 'list', label: 'List', icon: <List size={14} /> },
  { value: 'board', label: 'Board', icon: <LayoutGrid size={14} /> },
];

const disabledOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly', disabled: true },
];

const collapsibleOptions = [
  { value: 'light', label: '', icon: <Sun size={14} /> },
  { value: 'dark', label: '', icon: <Moon size={14} /> },
  { value: 'system', label: '', icon: <Monitor size={14} /> },
];

const formatOptions = [
  { value: 'bold', label: 'Bold', icon: <Bold size={14} /> },
  { value: 'italic', label: 'Italic', icon: <Italic size={14} /> },
  { value: 'underline', label: 'Underline', icon: <Underline size={14} /> },
  { value: 'strikethrough', label: 'Strike', icon: <Strikethrough size={14} /> },
];

function ControlledExample() {
  const [value, setValue] = useState('all');
  return (
    <div className="flex flex-col gap-2 items-start">
      <SegmentController options={basicOptions} value={value} onChange={setValue} />
      <span className="text-xs text-[var(--muted-foreground)]">Selected: {value}</span>
    </div>
  );
}

function MultiControlledExample() {
  const [value, setValue] = useState<string[]>(['bold']);
  return (
    <div className="flex flex-col gap-2 items-start">
      <SegmentController mode="multi" options={formatOptions} value={value} onChange={setValue} />
      <span className="text-xs text-[var(--muted-foreground)]">Selected: {value.join(', ') || 'none'}</span>
    </div>
  );
}

export default function SegmentControllerPage() {
  const pt = usePageTranslation('segment-controller');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'SegmentController'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A pill-shaped segmented control with an animated sliding indicator. Supports single-select and multi-select modes.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'A basic single-select segmented control that uses a spring-animated sliding background to indicate the active segment. The first option is selected by default.'}</DocText>
        <Showcase code={`<SegmentController options={[
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]} />`}>
          <SegmentController options={basicOptions} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>{pt?.sections?.['sizes']?.texts?.[0] ?? 'Three size variants — sm (h-8), md (h-10), and lg (h-12) — adjust the height, padding, and font size of the control.'}</DocText>
        <Showcase code={`<SegmentController options={options} size="sm" />
<SegmentController options={options} size="md" />
<SegmentController options={options} size="lg" />`}>
          <SegmentController options={basicOptions} size="sm" />
          <SegmentController options={basicOptions} size="md" />
          <SegmentController options={basicOptions} size="lg" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>{pt?.sections?.['with-icons']?.texts?.[0] ?? 'Pass an icon node in each option to render it inline before the label text, sized to 16×16px automatically.'}</DocText>
        <Showcase code={`<SegmentController options={[
  { value: 'grid', label: 'Grid', icon: <Grid3X3 size={14} /> },
  { value: 'list', label: 'List', icon: <List size={14} /> },
  { value: 'board', label: 'Board', icon: <LayoutGrid size={14} /> },
]} />`}>
          <SegmentController options={iconOptions} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['multi-select']?.title ?? 'Multi Select'}>
        <DocText>{pt?.sections?.['multi-select']?.texts?.[0] ?? 'Set mode to multi to allow toggling multiple segments independently. Each active segment shows a checkmark icon with a scale animation.'}</DocText>
        <Showcase code={`<SegmentController mode="multi" options={[
  { value: 'bold', label: 'Bold', icon: <Bold size={14} /> },
  { value: 'italic', label: 'Italic', icon: <Italic size={14} /> },
  { value: 'underline', label: 'Underline', icon: <Underline size={14} /> },
]} defaultValue={['bold', 'italic']} />`}>
          <SegmentController mode="multi" options={formatOptions} defaultValue={['bold', 'italic']} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['multi-select-controlled']?.title ?? 'Multi Select (Controlled)'}>
        <DocText>{pt?.sections?.['multi-select-controlled']?.texts?.[0] ?? 'Multi-select mode also supports controlled usage — pass a string array as value and receive the updated array in onChange.'}</DocText>
        <Showcase code={`const [value, setValue] = useState(['bold']);
<SegmentController mode="multi" options={options} value={value} onChange={setValue} />`}>
          <MultiControlledExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['full-width']?.title ?? 'Full Width'}>
        <DocText>{pt?.sections?.['full-width']?.texts?.[0] ?? 'The fullWidth prop makes each segment flex-grow to fill the available container width equally.'}</DocText>
        <Showcase code={`<SegmentController options={options} fullWidth />`} className="w-full">
          <div className="w-full">
            <SegmentController options={basicOptions} fullWidth />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled-options']?.title ?? 'Disabled Options'}>
        <DocText>{pt?.sections?.['disabled-options']?.texts?.[0] ?? 'Individual options can be disabled by setting disabled: true on the option object, rendering them at reduced opacity and blocking interaction.'}</DocText>
        <Showcase code={`<SegmentController options={[
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly', disabled: true },
]} />`}>
          <SegmentController options={disabledOptions} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'The disabled prop disables the entire control, reducing its opacity to 50% and blocking all pointer and keyboard interactions.'}</DocText>
        <Showcase code={`<SegmentController options={options} disabled />`}>
          <SegmentController options={basicOptions} disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['collapsible']?.title ?? 'Collapsible'}>
        <DocText>{pt?.sections?.['collapsible']?.texts?.[0] ?? 'The collapsible prop shows only the selected option by default. On hover, the control smoothly expands to reveal all options with a spring animation.'}</DocText>
        <Showcase code={`<SegmentController
  options={[
    { value: 'light', label: '', icon: <Sun size={14} /> },
    { value: 'dark', label: '', icon: <Moon size={14} /> },
    { value: 'system', label: '', icon: <Monitor size={14} /> },
  ]}
  collapsible
  size="sm"
/>`}>
          <div className="flex items-center gap-4">
            <SegmentController options={collapsibleOptions} collapsible size="sm" />
            <SegmentController options={basicOptions} collapsible />
            <SegmentController options={iconOptions} collapsible />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>{pt?.sections?.['controlled']?.texts?.[0] ?? 'In controlled mode, pass value and onChange to manage selection state externally — useful for syncing the control with other UI state.'}</DocText>
        <Showcase code={`const [value, setValue] = useState('all');
<SegmentController options={options} value={value} onChange={setValue} />`}>
          <ControlledExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'options', type: 'SegmentOption[]', default: '-', description: pt?.props?.['options'] ?? 'Array of segment options to render. Each option has value, label, optional icon, and optional disabled.' },
          { name: 'mode', type: '"single" | "multi"', default: '"single"', description: pt?.props?.['mode'] ?? 'Selection mode. Single-select uses a sliding indicator; multi-select allows toggling multiple options with check icons.' },
          { name: 'value', type: 'string | string[]', default: '-', description: pt?.props?.['value'] ?? 'Controlled selected value(s). String for single mode, string[] for multi mode.' },
          { name: 'defaultValue', type: 'string | string[]', default: '-', description: pt?.props?.['defaultValue'] ?? 'Initial value(s) for uncontrolled usage. Defaults to the first option in single mode.' },
          { name: 'onChange', type: '(value: string | string[]) => void', default: '-', description: pt?.props?.['onChange'] ?? 'Called when selection changes. Receives string for single mode, string[] for multi mode.' },
          { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: pt?.props?.['size'] ?? 'Size variant affecting height and font size.' },
          { name: 'fullWidth', type: 'boolean', default: 'false', description: pt?.props?.['fullWidth'] ?? 'When true, segments expand equally to fill the container width.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the entire control, blocking all interaction and reducing opacity.' },
          { name: 'collapsible', type: 'boolean', default: 'false', description: pt?.props?.['collapsible'] ?? 'When true, only the selected option is visible; expands on hover to reveal all options.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the root container.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
