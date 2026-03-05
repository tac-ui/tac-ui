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
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeTablePage() {
  const pt = usePageTranslation('native-table');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Table'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A composable table component for displaying structured tabular data.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from '@tac-ui/native';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['basic']?.title ?? 'Basic'}>
        <DocText>
          {pt?.sections?.['basic']?.texts?.[0] ??
            'A minimal table using TableHeader, TableBody, TableRow, TableHead, and TableCell. Rows gain a hover highlight by default.'}
        </DocText>
        <NativeShowcase
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
              <TableRow>
                <TableCell>Alice Martin</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>alice@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Chen</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell>bob@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carol White</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>carol@example.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['invoice-example']?.title ?? 'Invoice Example'}>
        <DocText>
          {pt?.sections?.['invoice-example']?.texts?.[0] ??
            'A complete table with header, body, footer for totals, and a caption — demonstrating all subcomponents together.'}
        </DocText>
        <NativeShowcase
          code={`<Table>
  <TableCaption>Recent invoices — Q1 2025</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Acme Corp</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$1,250.00</TableCell>
    </TableRow>
    {/* ...more rows */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>$8,220.00</TableCell>
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
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>INV-001</TableCell>
                <TableCell>Acme Corp</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>$1,250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV-002</TableCell>
                <TableCell>Globex Inc</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>$850.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV-003</TableCell>
                <TableCell>Initech</TableCell>
                <TableCell>Failed</TableCell>
                <TableCell>$3,400.00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>$8,220.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-caption']?.title ?? 'With Caption'}>
        <DocText>
          {pt?.sections?.['with-caption']?.texts?.[0] ??
            'TableCaption renders an accessible caption below the table, useful for labeling the data context.'}
        </DocText>
        <NativeShowcase
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
              <TableRow>
                <TableCell>Alice Martin</TableCell>
                <TableCell>Engineer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Chen</TableCell>
                <TableCell>Designer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['selected-rows']?.title ?? 'Selected Rows'}>
        <DocText>
          {pt?.sections?.['selected-rows']?.texts?.[0] ??
            'Use the selected prop on TableRow to highlight specific rows.'}
        </DocText>
        <NativeShowcase
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow selected>
      <TableCell>Alice Martin</TableCell>
      <TableCell>alice@example.com</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob Chen</TableCell>
      <TableCell>bob@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow selected>
                <TableCell>Alice Martin</TableCell>
                <TableCell>alice@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Chen</TableCell>
                <TableCell>bob@example.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[0] ??
            'All subcomponents accept standard React Native ViewProps and forward their ref to the underlying View.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'Table',
              type: 'ScrollView wrapper',
              default: '-',
              description: pt?.props?.['Table'] ?? 'Root table element wrapped in a horizontally-scrollable container.',
            },
            {
              name: 'TableHeader',
              type: 'View',
              default: '-',
              description: pt?.props?.['TableHeader'] ?? 'Header section with muted background and border-bottom.',
            },
            {
              name: 'TableBody',
              type: 'View',
              default: '-',
              description: pt?.props?.['TableBody'] ?? 'Body section containing data rows.',
            },
            {
              name: 'TableFooter',
              type: 'View',
              default: '-',
              description:
                pt?.props?.['TableFooter'] ??
                'Footer section with muted background and top border for totals or summaries.',
            },
            {
              name: 'TableRow',
              type: 'View',
              default: '-',
              description: pt?.props?.['TableRow'] ?? 'A single row. Accepts selected prop for highlight styling.',
            },
            {
              name: 'TableHead',
              type: 'View',
              default: '-',
              description:
                pt?.props?.['TableHead'] ??
                'Header cell with muted foreground text and medium font weight. Accepts width prop.',
            },
            {
              name: 'TableCell',
              type: 'View',
              default: '-',
              description: pt?.props?.['TableCell'] ?? 'Data cell with standard padding. Accepts width prop.',
            },
            {
              name: 'TableCaption',
              type: 'View',
              default: '-',
              description: pt?.props?.['TableCaption'] ?? 'Caption text rendered below the table in muted foreground.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
