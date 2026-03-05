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
import { DatePicker } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

function ControlledExample() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return <DatePicker label="Event Date" value={date} onChange={setDate} />;
}

export default function NativeDatePickerPage() {
  const pt = usePageTranslation('native-date-picker');
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'DatePicker'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A calendar-based date selector with a modal panel. Supports date-only, date+time, and month-only modes with min/max range constraints.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { DatePicker } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The base picker renders a trigger button that opens a calendar modal. Tapping a day commits the selection and closes the panel.'}
        </DocText>
        <NativeShowcase code={`<DatePicker />`}>
          <DatePicker />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>
          {pt?.sections?.['with-label']?.texts?.[0] ?? 'Use label to render an associated label above the trigger.'}
        </DocText>
        <NativeShowcase code={`<DatePicker label="Start Date" />`}>
          <DatePicker label="Start Date" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['datetime-mode']?.title ?? 'DateTime Mode'}>
        <DocText>
          {pt?.sections?.['datetime-mode']?.texts?.[0] ??
            'Set mode="datetime" to extend the panel with inline hour and minute inputs below the calendar grid. The panel stays open after selecting a day so the user can adjust the time.'}
        </DocText>
        <NativeShowcase code={`<DatePicker mode="datetime" label="Appointment" />`}>
          <DatePicker mode="datetime" label="Appointment" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['month-mode']?.title ?? 'Month Mode'}>
        <DocText>
          {pt?.sections?.['month-mode']?.texts?.[0] ??
            'Set mode="month" to display a 3×4 month grid instead of a day calendar. Navigation arrows move by year and the value is set to the first day of the selected month.'}
        </DocText>
        <NativeShowcase code={`<DatePicker mode="month" label="Billing Period" />`}>
          <DatePicker mode="month" label="Billing Period" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['min-max-date']?.title ?? 'Min / Max Date'}>
        <DocText>
          {pt?.sections?.['min-max-date']?.texts?.[0] ??
            'Use minDate and maxDate to constrain the selectable range. Days outside the range are rendered at reduced opacity and cannot be tapped.'}
        </DocText>
        <NativeShowcase
          code={`<DatePicker
  label="Date Range"
  minDate={new Date(2026, 1, 1)}
  maxDate={new Date(2026, 3, 0)}
/>`}
        >
          <DatePicker label="Date Range" minDate={minDate} maxDate={maxDate} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error']?.title ?? 'Error'}>
        <DocText>
          {pt?.sections?.['error']?.texts?.[0] ??
            'Set error to highlight the trigger border in the error color. Combine with errorMessage to display validation feedback below the trigger.'}
        </DocText>
        <NativeShowcase code={`<DatePicker label="Start Date" error errorMessage="Please select a valid date." />`}>
          <DatePicker label="Start Date" error errorMessage="Please select a valid date." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'When disabled is true the trigger is non-interactive and the calendar panel will not open.'}
        </DocText>
        <NativeShowcase code={`<DatePicker label="Disabled" disabled />`}>
          <DatePicker label="Disabled" disabled />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled-date']?.title ?? 'Controlled (Date)'}>
        <DocText>
          {pt?.sections?.['controlled-date']?.texts?.[0] ??
            'Use the value and onChange props for controlled usage. The component syncs its calendar view to the controlled value whenever it changes externally.'}
        </DocText>
        <NativeShowcase
          code={`const [date, setDate] = useState<Date | undefined>(undefined);
<DatePicker label="Event Date" value={date} onChange={setDate} />`}
        >
          <ControlledExample />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'mode',
              type: '"date" | "datetime" | "month"',
              default: '"date"',
              description: pt?.props?.['mode'] ?? 'Picker mode: date-only, date+time, or month-only.',
            },
            {
              name: 'value',
              type: 'Date',
              default: '-',
              description: pt?.props?.['value'] ?? 'Controlled selected date.',
            },
            {
              name: 'onChange',
              type: '(date: Date) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Called when a date is selected.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label text displayed above the trigger.',
            },
            {
              name: 'minDate',
              type: 'Date',
              default: '-',
              description: pt?.props?.['minDate'] ?? 'Earliest selectable date.',
            },
            {
              name: 'maxDate',
              type: 'Date',
              default: '-',
              description: pt?.props?.['maxDate'] ?? 'Latest selectable date.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the date picker.',
            },
            {
              name: 'error',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['error'] ?? 'When true, shows the trigger border in error color.',
            },
            {
              name: 'errorMessage',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['errorMessage'] ?? 'Error message displayed below the trigger when error is true.',
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
