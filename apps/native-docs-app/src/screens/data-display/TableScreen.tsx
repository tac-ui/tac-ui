import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

const tableData = [
  { name: 'Alice Johnson', status: 'Active', amount: '$1,200.00' },
  { name: 'Bob Smith', status: 'Pending', amount: '$480.50' },
  { name: 'Carol White', status: 'Inactive', amount: '$3,750.00' },
];

const statusVariant = (status: string) => {
  if (status === 'Active') return 'success' as const;
  if (status === 'Pending') return 'warning' as const;
  return 'secondary' as const;
};

export default function TableScreen() {
  return (
    <ScreenLayout title="Table" description="Structured data display with horizontally scrollable rows and columns.">
      <Section title="Import">
        <CodePreview
          code={`import {
  Table, TableHeader, TableBody,
  TableRow, TableHead, TableCell,
} from '@tac-ui/native';`}
        />
      </Section>

      <Section title="Basic Table">
        <ShowcaseCard
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>$1,200.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob Smith</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>$480.50</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Carol White</TableCell>
      <TableCell>Inactive</TableCell>
      <TableCell>$3,750.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead width={140}>Name</TableHead>
                <TableHead width={100}>Status</TableHead>
                <TableHead width={100}>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell width={140}>{row.name}</TableCell>
                  <TableCell width={100}>
                    <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                  </TableCell>
                  <TableCell width={100}>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference — Table">
        <PropsTable
          data={[
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'TableHeader and TableBody components.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '—',
              description: 'Additional styles applied to the scroll container.',
            },
          ]}
        />
      </Section>

      <Section title="API Reference — TableRow">
        <PropsTable
          data={[
            {
              name: 'selected',
              type: 'boolean',
              default: 'false',
              description: 'Highlights the row with the muted background color.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'TableHead or TableCell components.',
            },
          ]}
        />
      </Section>

      <Section title="API Reference — TableHead / TableCell">
        <PropsTable
          data={[
            {
              name: 'width',
              type: 'number',
              default: '—',
              description: 'Fixed column width. Uses flex: 1 when omitted.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'Content rendered inside the cell.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
