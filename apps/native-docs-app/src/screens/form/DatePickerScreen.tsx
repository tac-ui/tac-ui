import React, { useState } from 'react';
import { DatePicker } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function DatePickerScreen() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(new Date());
  const [withLabel, setWithLabel] = useState<Date | undefined>(undefined);

  return (
    <ScreenLayout title="DatePicker" description="A date selection input with calendar picker.">
      <Section title="Import">
        <CodePreview code={`import { DatePicker } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default" description="Basic date picker.">
        <ShowcaseCard
          code={`const [date, setDate] = useState(new Date());

<DatePicker value={date} onChange={setDate} />`}
        >
          <DatePicker value={date} onChange={setDate} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label" description="DatePicker with a visible label.">
        <ShowcaseCard
          code={`<DatePicker
  label="Birth Date"
  value={date}
  onChange={setDate}
/>`}
        >
          <DatePicker label="Birth Date" value={withLabel} onChange={setWithLabel} />
        </ShowcaseCard>
      </Section>

      <Section title="DateTime Mode" description="Allows selecting both date and time.">
        <ShowcaseCard
          code={`<DatePicker
  label="Appointment"
  mode="datetime"
  value={date}
  onChange={setDate}
/>`}
        >
          <DatePicker label="Appointment" mode="datetime" value={dateTime} onChange={setDateTime} />
        </ShowcaseCard>
      </Section>

      <Section title="Month Mode" description="Allows selecting only a month and year.">
        <ShowcaseCard
          code={`<DatePicker
  label="Report Month"
  mode="month"
  value={date}
  onChange={setDate}
/>`}
        >
          <DatePicker label="Report Month" mode="month" value={month} onChange={setMonth} />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled date picker prevents interaction.">
        <ShowcaseCard code={`<DatePicker label="Locked Date" value={new Date()} onChange={() => {}} disabled />`}>
          <DatePicker label="Locked Date" value={new Date()} onChange={() => {}} disabled />
        </ShowcaseCard>
      </Section>

      <Section title="Error State" description="Shows an error when date is invalid or required.">
        <ShowcaseCard
          code={`<DatePicker
  label="Due Date"
  error
  errorMessage="Please select a valid date."
  value={undefined}
  onChange={setDate}
/>`}
        >
          <DatePicker
            label="Due Date"
            error
            errorMessage="Please select a valid date."
            value={undefined}
            onChange={setDate}
          />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            { name: 'value', type: 'Date | undefined', default: '-', description: 'Currently selected date.' },
            {
              name: 'onChange',
              type: '(date: Date) => void',
              default: '-',
              description: 'Callback fired when date changes.',
            },
            { name: 'label', type: 'string', default: '-', description: 'Label displayed above the date picker.' },
            {
              name: 'mode',
              type: '"date" | "datetime" | "month"',
              default: '"date"',
              description: 'Selection mode for the picker.',
            },
            { name: 'minDate', type: 'Date', default: '-', description: 'Earliest selectable date.' },
            { name: 'maxDate', type: 'Date', default: '-', description: 'Latest selectable date.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the date picker when true.' },
            { name: 'error', type: 'boolean', default: 'false', description: 'Shows error styling when true.' },
            {
              name: 'errorMessage',
              type: 'string',
              default: '-',
              description: 'Error message displayed below picker.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
