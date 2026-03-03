'use client';

import React from 'react';
import { VStack, HStack } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

const Box = () => <div className="w-12 h-12 rounded-[var(--radius-m)] bg-[var(--primary)]" />;
const SmallBox = () => <div className="w-10 h-10 rounded-[var(--radius-m)] bg-[var(--primary)]" />;

export default function StackPage() {
  const pt = usePageTranslation('stack');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Stack'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Layout primitives for arranging children in a vertical or horizontal stack with consistent spacing.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['vstack-gap-variants']?.title ?? 'VStack — Gap Variants'}>
        <DocText>{pt?.sections?.['vstack-gap-variants']?.texts?.[0] ?? 'VStack arranges children in a column. The gap prop maps to the design-token spacing scale (none, xs, sm, md, lg, xl, 2xl).'}</DocText>
        <Showcase code={`<VStack gap="sm">
  <div className="w-12 h-12 rounded-[var(--radius-m)] bg-[var(--primary)]" />
  <div className="w-12 h-12 rounded-[var(--radius-m)] bg-[var(--primary)]" />
  <div className="w-12 h-12 rounded-[var(--radius-m)] bg-[var(--primary)]" />
</VStack>

<VStack gap="md">...</VStack>

<VStack gap="xl">...</VStack>`}>
          <div className="flex gap-12 items-start">
            <VStack gap="sm">
              <Box /><Box /><Box />
            </VStack>
            <VStack gap="md">
              <Box /><Box /><Box />
            </VStack>
            <VStack gap="xl">
              <Box /><Box /><Box />
            </VStack>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['hstack-align-and-justify']?.title ?? 'HStack — Align and Justify'}>
        <DocText>{pt?.sections?.['hstack-align-and-justify']?.texts?.[0] ?? 'HStack arranges children in a row. Use align to control cross-axis positioning and justify to distribute items along the main axis.'}</DocText>
        <Showcase code={`<HStack gap="md" align="center" justify="start">
  <div className="w-10 h-10 ..." />
  <div className="w-10 h-16 ..." />
  <div className="w-10 h-8 ..." />
</HStack>

<HStack gap="md" align="center" justify="between">
  <div className="w-10 h-10 ..." />
  <div className="w-10 h-10 ..." />
  <div className="w-10 h-10 ..." />
</HStack>`}>
          <div className="w-full flex flex-col gap-4">
            <HStack gap="md" align="center" justify="start" className="w-full border border-dashed border-[var(--border)] p-3 rounded-[var(--radius-m)]">
              <div className="w-10 h-10 rounded-[var(--radius-m)] bg-[var(--primary)]" />
              <div className="w-10 h-16 rounded-[var(--radius-m)] bg-[var(--primary)] opacity-70" />
              <div className="w-10 h-8 rounded-[var(--radius-m)] bg-[var(--primary)] opacity-40" />
            </HStack>
            <HStack gap="md" align="center" justify="between" className="w-full border border-dashed border-[var(--border)] p-3 rounded-[var(--radius-m)]">
              <SmallBox /><SmallBox /><SmallBox />
            </HStack>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['hstack-wrap']?.title ?? 'HStack — Wrap'}>
        <DocText>{pt?.sections?.['hstack-wrap']?.texts?.[0] ?? 'Set wrap to allow children to flow onto multiple lines when the container is too narrow to fit them in a single row.'}</DocText>
        <Showcase code={`<HStack gap="sm" wrap>
  {Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className="w-12 h-12 rounded-[var(--radius-m)] bg-[var(--primary)]" />
  ))}
</HStack>`}>
          <div className="w-full">
            <HStack gap="sm" wrap>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-[var(--radius-m)] bg-[var(--primary)]" style={{ opacity: 0.3 + i * 0.07 }} />
              ))}
            </HStack>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'gap', type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"', description: pt?.props?.['gap'] ?? 'Spacing between child elements using the design-token scale.' },
          { name: 'align', type: '"start" | "center" | "end" | "stretch" | "baseline"', default: 'VStack: "stretch" / HStack: "center"', description: pt?.props?.['align'] ?? 'Cross-axis alignment of children (align-items).' },
          { name: 'justify', type: '"start" | "center" | "end" | "between" | "around" | "evenly"', default: '"start"', description: pt?.props?.['justify'] ?? 'Main-axis distribution of children (justify-content).' },
          { name: 'wrap', type: 'boolean', default: 'false', description: pt?.props?.['wrap'] ?? 'Whether children wrap onto multiple lines.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['children'] ?? 'Elements to stack.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
