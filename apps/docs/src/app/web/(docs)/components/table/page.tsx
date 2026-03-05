'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Badge,
} from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
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

const invoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: '$1,250.00', date: 'Jan 12, 2025', status: 'Paid' as const },
  { id: 'INV-002', client: 'Globex Inc', amount: '$850.00', date: 'Jan 18, 2025', status: 'Pending' as const },
  { id: 'INV-003', client: 'Initech', amount: '$3,400.00', date: 'Jan 22, 2025', status: 'Failed' as const },
  { id: 'INV-004', client: 'Umbrella Ltd', amount: '$620.00', date: 'Feb 01, 2025', status: 'Paid' as const },
  { id: 'INV-005', client: 'Hooli', amount: '$2,100.00', date: 'Feb 05, 2025', status: 'Pending' as const },
];

const statusVariant = {
  Paid: 'success',
  Pending: 'warning',
  Failed: 'error',
} as const;

const users = [
  { name: 'Alice Martin', role: 'Engineer', email: 'alice@example.com' },
  { name: 'Bob Chen', role: 'Designer', email: 'bob@example.com' },
  { name: 'Carol White', role: 'Product', email: 'carol@example.com' },
  { name: 'David Kim', role: 'Engineer', email: 'david@example.com' },
];

export default function TablePage() {
  const pt = usePageTranslation('table');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Table'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A composable table component for displaying structured tabular data.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from '@tac-ui/web';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['basic']?.title ?? 'Basic'}>
        <DocText>
          {pt?.sections?.['basic']?.texts?.[0] ??
            'A minimal table using TableHeader, TableBody, TableRow, TableHead, and TableCell. Rows gain a hover highlight by default.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch p-0 overflow-hidden"
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Martin</TableCell>
      <TableCell>Engineer</TableCell>
      <TableCell>alice@example.com</TableCell>
    </TableRow>
    {/* ...more rows */}
  </TableBody>
</Table>`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{u.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['invoice-example']?.title ?? 'Invoice Example'}>
        <DocText>
          {pt?.sections?.['invoice-example']?.texts?.[0] ??
            'A complete table with header, body, footer for totals, a caption, and status badges — demonstrating all subcomponents together.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch p-0 overflow-hidden"
          code={`<Table>
  <TableCaption>Recent invoices — Q1 2025</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Acme Corp</TableCell>
      <TableCell>Jan 12, 2025</TableCell>
      <TableCell><Badge variant="success">Paid</Badge></TableCell>
      <TableCell className="text-right">$1,250.00</TableCell>
    </TableRow>
    {/* ...more rows */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={4}>Total</TableCell>
      <TableCell className="text-right">$8,220.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        >
          <Table>
            <TableCaption>Recent invoices — Q1 2025</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell>{inv.client}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{inv.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[inv.status]}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="font-semibold pb-1">
                  Total
                </TableCell>
                <TableCell className="text-right font-semibold">$8,220.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-caption']?.title ?? 'With Caption'}>
        <DocText>
          {pt?.sections?.['with-caption']?.texts?.[0] ??
            'TableCaption renders an accessible caption below the table, useful for labeling the data context.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch p-0 overflow-hidden"
          code={`<Table>
  <TableCaption>Team members — Engineering</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Martin</TableCell>
      <TableCell>Engineer</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <Table>
            <TableCaption>Team members — Engineering</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 2).map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[0] ??
            'All subcomponents accept standard HTML element attributes (className, style, etc.) and forward their ref to the underlying DOM element.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'Table',
              type: 'React.HTMLAttributes<HTMLTableElement>',
              default: '-',
              description: pt?.props?.['Table'] ?? 'Root table element wrapped in a horizontally-scrollable container.',
            },
            {
              name: 'TableHeader',
              type: 'React.HTMLAttributes<HTMLTableSectionElement>',
              default: '-',
              description:
                pt?.props?.['TableHeader'] ??
                'Renders <thead>. Applies a subtle background and border-bottom to its rows.',
            },
            {
              name: 'TableBody',
              type: 'React.HTMLAttributes<HTMLTableSectionElement>',
              default: '-',
              description:
                pt?.props?.['TableBody'] ?? 'Renders <tbody>. Removes the border from the last row automatically.',
            },
            {
              name: 'TableFooter',
              type: 'React.HTMLAttributes<HTMLTableSectionElement>',
              default: '-',
              description:
                pt?.props?.['TableFooter'] ??
                'Renders <tfoot> with a top border and secondary background for totals or summaries.',
            },
            {
              name: 'TableRow',
              type: 'React.HTMLAttributes<HTMLTableRowElement>',
              default: '-',
              description:
                pt?.props?.['TableRow'] ??
                'Renders <tr> with hover highlight. Applies selected styling when data-state="selected".',
            },
            {
              name: 'TableHead',
              type: 'React.ThHTMLAttributes<HTMLTableCellElement>',
              default: '-',
              description:
                pt?.props?.['TableHead'] ??
                'Renders <th scope="col"> with muted foreground text and medium font weight.',
            },
            {
              name: 'TableCell',
              type: 'React.TdHTMLAttributes<HTMLTableCellElement>',
              default: '-',
              description:
                pt?.props?.['TableCell'] ?? 'Renders <td> with standard padding and middle vertical alignment.',
            },
            {
              name: 'TableCaption',
              type: 'React.HTMLAttributes<HTMLTableCaptionElement>',
              default: '-',
              description:
                pt?.props?.['TableCaption'] ?? 'Renders <caption> positioned below the table in muted foreground text.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
