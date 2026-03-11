'use client';

import React from 'react';
import { Grid, GridItem } from '@tac-ui/web';
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
import { Playground } from '@/components/docs/Playground';

const PlaceholderItem = ({ label = 'Item' }: { label?: string }) => (
  <div className="bg-[var(--secondary)] rounded-[var(--radius-m)] p-4 text-center text-sm text-[var(--muted-foreground)]">
    {label}
  </div>
);

export default function GridPage() {
  const pt = usePageTranslation('grid');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Grid'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'Responsive grid layout with predefined column presets and configurable gap sizes.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Grid, GridItem } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Grid props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['2up', 'side-by-side', '2-1', '1-2', '1-3up', '3up', '4up', '6up', '1-2-4up'],
              defaultValue: '3up',
            },
            gap: {
              type: 'select',
              label: 'Gap',
              options: ['none', 'sm', 'md', 'lg'],
              defaultValue: 'md',
            },
          }}
          render={(values) => (
            <Grid
              variant={values.variant as '2up' | 'side-by-side' | '2-1' | '1-2' | '1-3up' | '3up' | '4up' | '6up' | '1-2-4up'}
              gap={values.gap as 'none' | 'sm' | 'md' | 'lg'}
            >
              <GridItem><PlaceholderItem label="Item 1" /></GridItem>
              <GridItem><PlaceholderItem label="Item 2" /></GridItem>
              <GridItem><PlaceholderItem label="Item 3" /></GridItem>
              <GridItem><PlaceholderItem label="Item 4" /></GridItem>
            </Grid>
          )}
          code={(values) =>
            `<Grid variant="${values.variant}" gap="${values.gap}">
  <GridItem><div>Item 1</div></GridItem>
  <GridItem><div>Item 2</div></GridItem>
  <GridItem><div>Item 3</div></GridItem>
  <GridItem><div>Item 4</div></GridItem>
</Grid>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['2up']?.title ?? '2-Up'}>
        <DocText>
          {pt?.sections?.['2up']?.texts?.[0] ??
            'Two equal columns. Stacks to a single column on small screens.'}
        </DocText>
        <Showcase
          code={`<Grid variant="2up" gap="md">
  <GridItem><div>Item 1</div></GridItem>
  <GridItem><div>Item 2</div></GridItem>
</Grid>`}
        >
          <Grid variant="2up" gap="md">
            <GridItem><PlaceholderItem label="Item 1" /></GridItem>
            <GridItem><PlaceholderItem label="Item 2" /></GridItem>
          </Grid>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['2-1']?.title ?? '2-1'}>
        <DocText>
          {pt?.sections?.['2-1']?.texts?.[0] ??
            'Three-column grid where the first item spans two columns, creating a wide-left layout.'}
        </DocText>
        <Showcase
          code={`<Grid variant="2-1" gap="md">
  <GridItem><div>Wide Item</div></GridItem>
  <GridItem><div>Item 2</div></GridItem>
</Grid>`}
        >
          <Grid variant="2-1" gap="md">
            <GridItem><PlaceholderItem label="Wide Item" /></GridItem>
            <GridItem><PlaceholderItem label="Item 2" /></GridItem>
          </Grid>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['1-2']?.title ?? '1-2'}>
        <DocText>
          {pt?.sections?.['1-2']?.texts?.[0] ??
            'Three-column grid where the last item spans two columns, creating a wide-right layout.'}
        </DocText>
        <Showcase
          code={`<Grid variant="1-2" gap="md">
  <GridItem><div>Item 1</div></GridItem>
  <GridItem><div>Wide Item</div></GridItem>
</Grid>`}
        >
          <Grid variant="1-2" gap="md">
            <GridItem><PlaceholderItem label="Item 1" /></GridItem>
            <GridItem><PlaceholderItem label="Wide Item" /></GridItem>
          </Grid>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['3up']?.title ?? '3-Up'}>
        <DocText>
          {pt?.sections?.['3up']?.texts?.[0] ??
            'Three equal columns. Responsive: 1 column on mobile, 2 on tablet, 3 on desktop.'}
        </DocText>
        <Showcase
          code={`<Grid variant="3up" gap="md">
  <GridItem><div>Item 1</div></GridItem>
  <GridItem><div>Item 2</div></GridItem>
  <GridItem><div>Item 3</div></GridItem>
</Grid>`}
        >
          <Grid variant="3up" gap="md">
            <GridItem><PlaceholderItem label="Item 1" /></GridItem>
            <GridItem><PlaceholderItem label="Item 2" /></GridItem>
            <GridItem><PlaceholderItem label="Item 3" /></GridItem>
          </Grid>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['4up']?.title ?? '4-Up'}>
        <DocText>
          {pt?.sections?.['4up']?.texts?.[0] ??
            'Four equal columns. Responsive: 1 column on mobile, 2 on tablet, 4 on large screens.'}
        </DocText>
        <Showcase
          code={`<Grid variant="4up" gap="md">
  <GridItem><div>Item 1</div></GridItem>
  <GridItem><div>Item 2</div></GridItem>
  <GridItem><div>Item 3</div></GridItem>
  <GridItem><div>Item 4</div></GridItem>
</Grid>`}
        >
          <Grid variant="4up" gap="md">
            <GridItem><PlaceholderItem label="Item 1" /></GridItem>
            <GridItem><PlaceholderItem label="Item 2" /></GridItem>
            <GridItem><PlaceholderItem label="Item 3" /></GridItem>
            <GridItem><PlaceholderItem label="Item 4" /></GridItem>
          </Grid>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['6up']?.title ?? '6-Up'}>
        <DocText>
          {pt?.sections?.['6up']?.texts?.[0] ??
            'Six equal columns. Responsive: 2 columns on mobile, 3 on tablet, 6 on large screens.'}
        </DocText>
        <Showcase
          code={`<Grid variant="6up" gap="md">
  <GridItem><div>1</div></GridItem>
  <GridItem><div>2</div></GridItem>
  <GridItem><div>3</div></GridItem>
  <GridItem><div>4</div></GridItem>
  <GridItem><div>5</div></GridItem>
  <GridItem><div>6</div></GridItem>
</Grid>`}
        >
          <Grid variant="6up" gap="md">
            <GridItem><PlaceholderItem label="1" /></GridItem>
            <GridItem><PlaceholderItem label="2" /></GridItem>
            <GridItem><PlaceholderItem label="3" /></GridItem>
            <GridItem><PlaceholderItem label="4" /></GridItem>
            <GridItem><PlaceholderItem label="5" /></GridItem>
            <GridItem><PlaceholderItem label="6" /></GridItem>
          </Grid>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['gap-sizes']?.title ?? 'Gap Sizes'}>
        <DocText>
          {pt?.sections?.['gap-sizes']?.texts?.[0] ??
            'Control spacing between cells with the gap prop. Supports none, sm, md, and lg.'}
        </DocText>
        <Showcase
          code={`<Grid variant="3up" gap="none">...</Grid>
<Grid variant="3up" gap="sm">...</Grid>
<Grid variant="3up" gap="md">...</Grid>
<Grid variant="3up" gap="lg">...</Grid>`}
        >
          <div className="flex flex-col gap-6 w-full">
            {(['none', 'sm', 'md', 'lg'] as const).map((gap) => (
              <div key={gap}>
                <p className="text-xs text-[var(--muted-foreground)] mb-2">gap="{gap}"</p>
                <Grid variant="3up" gap={gap}>
                  <GridItem><PlaceholderItem label="A" /></GridItem>
                  <GridItem><PlaceholderItem label="B" /></GridItem>
                  <GridItem><PlaceholderItem label="C" /></GridItem>
                </Grid>
              </div>
            ))}
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Grid props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"2up" | "side-by-side" | "2-1" | "1-2" | "1-3up" | "3up" | "4up" | "6up" | "1-2-4up"',
              default: '"2up"',
              description: pt?.props?.['variant'] ?? 'Layout preset that defines the column structure.',
            },
            {
              name: 'gap',
              type: '"none" | "sm" | "md" | "lg"',
              default: '"md"',
              description: pt?.props?.['gap'] ?? 'Gap size between grid cells.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'Grid cell items, typically GridItem components.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'GridItem props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'span',
              type: 'number',
              default: '-',
              description: pt?.props?.['span'] ?? 'Number of columns this item should span.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['gridItemClassName'] ?? 'Additional CSS class names.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['gridItemChildren'] ?? 'Content rendered inside the grid cell.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
