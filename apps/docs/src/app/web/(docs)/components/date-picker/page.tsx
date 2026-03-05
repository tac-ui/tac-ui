'use client';

import React, { useState } from 'react';
import { DatePicker } from '@tac-ui/web';
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

function ControlledExample() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex flex-col gap-2 items-start">
      <DatePicker label="Event Date" value={date} onChange={setDate} />
      <span className="text-xs text-[var(--muted-foreground)]">
        Selected: {date ? date.toLocaleDateString() : 'None'}
      </span>
    </div>
  );
}

function ControlledDateTimeExample() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex flex-col gap-2 items-start">
      <DatePicker
        mode="datetime"
        label="Appointment"
        value={date}
        onChange={setDate}
        placeholder="Select date & time"
      />
      <span className="text-xs text-[var(--muted-foreground)]">Selected: {date ? date.toLocaleString() : 'None'}</span>
    </div>
  );
}

function ControlledMonthExample() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex flex-col gap-2 items-start">
      <DatePicker mode="month" label="Billing Period" value={date} onChange={setDate} placeholder="Select month" />
      <span className="text-xs text-[var(--muted-foreground)]">
        Selected: {date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` : 'None'}
      </span>
    </div>
  );
}

function DefaultDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker placeholder="Select date" value={date} onChange={setDate} />;
}

function LabelDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      label="Start Date"
      placeholder="Pick a date"
      helperText="Choose the project start date."
      value={date}
      onChange={setDate}
    />
  );
}

function DateTimeDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker mode="datetime" label="Appointment" placeholder="Select date & time" value={date} onChange={setDate} />
  );
}

function DateTime12HourDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      mode="datetime"
      label="Meeting"
      use24Hour={false}
      minuteStep={15}
      placeholder="Select date & time"
      value={date}
      onChange={setDate}
    />
  );
}

function MonthDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker mode="month" label="Billing Period" placeholder="Select month" value={date} onChange={setDate} />;
}

function MinMaxDemo({ minDate, maxDate }: { minDate: Date; maxDate: Date }) {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      label="Date Range"
      placeholder="Select date"
      minDate={minDate}
      maxDate={maxDate}
      value={date}
      onChange={setDate}
    />
  );
}

function ErrorDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      label="Due Date"
      placeholder="Select date"
      error
      errorMessage="Please select a valid date."
      value={date}
      onChange={setDate}
    />
  );
}

function CustomFormatDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      label="Custom Format"
      formatDate={(d) => d.toLocaleDateString('ko-KR')}
      value={date}
      onChange={setDate}
    />
  );
}

export default function DatePickerPage() {
  const pt = usePageTranslation('date-picker');
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'DatePicker'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A calendar-based date selector with a dropdown panel. Supports date-only, date+time, and month-only modes with min/max range constraints.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { DatePicker } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The base picker renders a trigger button that opens an animated calendar dropdown. Clicking a day commits the selection and closes the panel.'}
        </DocText>
        <Showcase code={`<DatePicker placeholder="Select date" />`} className="items-start">
          <DefaultDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>
          {pt?.sections?.['with-label']?.texts?.[0] ??
            'Use <code>label</code> to render an associated label above the trigger and <code>helperText</code> to add a contextual hint below it.'}
        </DocText>
        <Showcase
          code={`<DatePicker label="Start Date" placeholder="Pick a date" helperText="Choose the project start date." />`}
          className="items-start"
        >
          <LabelDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['datetime-mode']?.title ?? 'DateTime Mode'}>
        <DocText>
          {pt?.sections?.['datetime-mode']?.texts?.[0] ??
            'Set <code>mode="datetime"</code> to extend the panel with inline hour and minute inputs below the calendar grid. The panel stays open after selecting a day so the user can adjust the time before pressing Done.'}
        </DocText>
        <Showcase
          code={`<DatePicker mode="datetime" label="Appointment" placeholder="Select date & time" />`}
          className="items-start"
        >
          <DateTimeDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['datetime-12hour']?.title ?? 'DateTime (12-hour)'}>
        <DocText>
          {pt?.sections?.['datetime-12hour']?.texts?.[0] ??
            'Pass <code>use24Hour={false}</code> to switch the time input to 12-hour format with an AM/PM toggle. Use <code>minuteStep</code> to snap minutes to a fixed interval.'}
        </DocText>
        <Showcase
          code={`<DatePicker mode="datetime" label="Meeting" use24Hour={false} minuteStep={15} placeholder="Select date & time" />`}
          className="items-start"
        >
          <DateTime12HourDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['month-mode']?.title ?? 'Month Mode'}>
        <DocText>
          {pt?.sections?.['month-mode']?.texts?.[0] ??
            'Set <code>mode="month"</code> to display a 3×4 month grid instead of a day calendar. Navigation arrows move by year and the value is set to the first day of the selected month.'}
        </DocText>
        <Showcase
          code={`<DatePicker mode="month" label="Billing Period" placeholder="Select month" />`}
          className="items-start"
        >
          <MonthDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['min-max-date']?.title ?? 'Min / Max Date'}>
        <DocText>
          {pt?.sections?.['min-max-date']?.texts?.[0] ??
            'Use <code>minDate</code> and <code>maxDate</code> to constrain the selectable range. Days outside the range are rendered at reduced opacity and cannot be clicked.'}
        </DocText>
        <Showcase
          code={`<DatePicker
  label="Date Range"
  placeholder="Select date"
  minDate={new Date(2026, 1, 1)}
  maxDate={new Date(2026, 3, 0)}
/>`}
          className="items-start"
        >
          <MinMaxDemo minDate={minDate} maxDate={maxDate} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>
          {pt?.sections?.['error-state']?.texts?.[0] ??
            'Set <code>error</code> to apply destructive border styling and pass <code>errorMessage</code> to display a validation message below the trigger.'}
        </DocText>
        <Showcase
          code={`<DatePicker label="Due Date" placeholder="Select date" error errorMessage="Please select a valid date." />`}
          className="items-start"
        >
          <ErrorDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'When <code>disabled</code> is true the trigger is non-interactive and the calendar panel will not open.'}
        </DocText>
        <Showcase code={`<DatePicker placeholder="Disabled" disabled />`} className="items-start">
          <DatePicker placeholder="Disabled" disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-format']?.title ?? 'Custom Format'}>
        <DocText>
          {pt?.sections?.['custom-format']?.texts?.[0] ??
            'Pass a <code>formatDate</code> function to override how the selected date is displayed in the trigger button. The function receives a <code>Date</code> and must return a string.'}
        </DocText>
        <Showcase
          code={`<DatePicker
  label="Custom Format"
  formatDate={(d) => d.toLocaleDateString('ko-KR')}
/>`}
          className="items-start"
        >
          <CustomFormatDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled-date']?.title ?? 'Controlled (Date)'}>
        <DocText>
          {pt?.sections?.['controlled-date']?.texts?.[0] ??
            'Use the <code>value</code> and <code>onChange</code> props for controlled usage. The component syncs its calendar view to the controlled value whenever it changes externally.'}
        </DocText>
        <Showcase
          code={`const [date, setDate] = useState<Date | null>(null);
<DatePicker label="Event Date" value={date} onChange={setDate} />`}
          className="items-start"
        >
          <ControlledExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled-datetime']?.title ?? 'Controlled (DateTime)'}>
        <DocText>
          {pt?.sections?.['controlled-datetime']?.texts?.[0] ??
            'In datetime mode the <code>onChange</code> callback fires both when a day is selected and when the time inputs are adjusted, always passing a fully-resolved <code>Date</code>.'}
        </DocText>
        <Showcase
          code={`const [date, setDate] = useState<Date | null>(null);
<DatePicker mode="datetime" label="Appointment" value={date} onChange={setDate} />`}
          className="items-start"
        >
          <ControlledDateTimeExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled-month']?.title ?? 'Controlled (Month)'}>
        <DocText>
          {pt?.sections?.['controlled-month']?.texts?.[0] ??
            'In month mode the <code>onChange</code> callback fires with the first day of the selected month, making it straightforward to derive year and month values from the result.'}
        </DocText>
        <Showcase
          code={`const [date, setDate] = useState<Date | null>(null);
<DatePicker mode="month" label="Billing Period" value={date} onChange={setDate} />`}
          className="items-start"
        >
          <ControlledMonthExample />
        </Showcase>
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
              type: 'Date | null',
              default: '-',
              description: pt?.props?.['value'] ?? 'Controlled selected date.',
            },
            {
              name: 'onChange',
              type: '(date: Date | null) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Called when a date is selected.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label text displayed above the input.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: '"Select date"',
              description: pt?.props?.['placeholder'] ?? 'Placeholder text when no date is selected.',
            },
            {
              name: 'helperText',
              type: 'string',
              default: '-',
              description: pt?.props?.['helperText'] ?? 'Helper text displayed below the input.',
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
              name: 'formatDate',
              type: '(date: Date) => string',
              default: 'Mode-aware',
              description: pt?.props?.['formatDate'] ?? 'Custom date format display function.',
            },
            {
              name: 'id',
              type: 'string',
              default: '-',
              description: pt?.props?.['id'] ?? 'ID attribute for the trigger button; auto-generated if omitted.',
            },
            {
              name: 'use24Hour',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['use24Hour'] ?? 'Uses 24-hour format for time (datetime mode).',
            },
            {
              name: 'minuteStep',
              type: 'number',
              default: '1',
              description: pt?.props?.['minuteStep'] ?? 'Minute step interval for time picker.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
