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
import { NativePlayground } from '@/components/docs/NativePlayground';
import { VStack, HStack } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeStackPage() {
  const pt = usePageTranslation('native-stack');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Stack'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Layout primitives for arranging children in a vertical or horizontal stack with consistent spacing.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { VStack, HStack } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the VStack and HStack props below.'}
        </DocText>
        <NativePlayground
          controls={{
            direction: {
              type: 'select',
              label: 'Direction',
              options: ['vertical', 'horizontal'],
              defaultValue: 'vertical',
            },
            gap: {
              type: 'select',
              label: 'Gap',
              options: ['xs', 'sm', 'md', 'lg', 'xl'],
              defaultValue: 'md',
            },
            align: {
              type: 'select',
              label: 'Align',
              options: ['start', 'center', 'end', 'stretch'],
              defaultValue: 'center',
            },
          }}
          render={(values) => {
            const gap = values.gap as 'xs' | 'sm' | 'md' | 'lg' | 'xl';
            const align = values.align as 'start' | 'center' | 'end' | 'stretch';
            const boxes = [1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'var(--gray-300)',
                  borderRadius: 8,
                }}
              />
            ));
            if (values.direction === 'horizontal') {
              return (
                <HStack gap={gap} align={align}>
                  {boxes}
                </HStack>
              );
            }
            return (
              <VStack gap={gap} align={align}>
                {boxes}
              </VStack>
            );
          }}
          code={(values) => {
            const tag = values.direction === 'horizontal' ? 'HStack' : 'VStack';
            return `<${tag} gap="${values.gap}" align="${values.align}">\n  <View style={{ width: 48, height: 48 }} />\n  <View style={{ width: 48, height: 48 }} />\n  <View style={{ width: 48, height: 48 }} />\n</${tag}>`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['vstack-gap-variants']?.title ?? 'VStack — Gap Variants'}>
        <DocText>
          {pt?.sections?.['vstack-gap-variants']?.texts?.[0] ??
            'VStack arranges children in a column. The gap prop maps to the design-token spacing scale (none, xs, sm, md, lg, xl, 2xl).'}
        </DocText>
        <NativeShowcase
          code={`<VStack gap="sm">
  <View style={{ height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
  <View style={{ height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
  <View style={{ height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
</VStack>

<VStack gap="md">...</VStack>

<VStack gap="xl">...</VStack>`}
        >
          <div className="flex gap-12 items-start">
            <VStack gap="sm">
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
            </VStack>
            <VStack gap="md">
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
            </VStack>
            <VStack gap="xl">
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 48, width: 60, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
            </VStack>
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['hstack-align-and-justify']?.title ?? 'HStack — Align and Justify'}>
        <DocText>
          {pt?.sections?.['hstack-align-and-justify']?.texts?.[0] ??
            'HStack arranges children in a row. Use align to control cross-axis positioning and justify to distribute items along the main axis.'}
        </DocText>
        <NativeShowcase
          code={`{/* Centered vertically, aligned start */}
<HStack gap="md" align="center" justify="start">
  <View style={{ width: 40, height: 40 }} />
  <View style={{ width: 40, height: 64 }} />
  <View style={{ width: 40, height: 32 }} />
</HStack>

{/* Space between items */}
<HStack gap="md" align="center" justify="between">
  <View style={{ width: 40, height: 40 }} />
  <View style={{ width: 40, height: 40 }} />
  <View style={{ width: 40, height: 40 }} />
</HStack>`}
        >
          <div className="flex flex-col gap-4 w-full">
            <HStack
              gap="md"
              align="center"
              justify="start"
              style={{
                width: '100%',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: 'var(--border)',
                padding: 12,
                borderRadius: 8,
              }}
            >
              <div style={{ width: 40, height: 40, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div
                style={{ width: 40, height: 64, backgroundColor: 'var(--gray-300)', borderRadius: 8, opacity: 0.8 }}
              />
              <div
                style={{ width: 40, height: 32, backgroundColor: 'var(--gray-300)', borderRadius: 8, opacity: 0.6 }}
              />
            </HStack>
            <HStack
              gap="md"
              align="center"
              justify="between"
              style={{
                width: '100%',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: 'var(--border)',
                padding: 12,
                borderRadius: 8,
              }}
            >
              <div style={{ height: 40, width: 40, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 40, width: 40, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
              <div style={{ height: 40, width: 40, backgroundColor: 'var(--gray-300)', borderRadius: 8 }} />
            </HStack>
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['hstack-wrap']?.title ?? 'HStack — Wrap'}>
        <DocText>
          {pt?.sections?.['hstack-wrap']?.texts?.[0] ??
            'Set wrap to allow children to flow onto multiple lines when the container is too narrow to fit them in a single row.'}
        </DocText>
        <NativeShowcase
          code={`<HStack gap="sm" wrap>
  {Array.from({ length: 10 }).map((_, i) => (
    <View key={i} style={{ width: 48, height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
  ))}
</HStack>`}
        >
          <div className="w-full">
            <HStack gap="sm" wrap>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'var(--gray-300)',
                    borderRadius: 8,
                    opacity: 0.5 + i * 0.05,
                  }}
                />
              ))}
            </HStack>
          </div>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'gap',
              type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
              default: '"md"',
              description: pt?.props?.['gap'] ?? 'Spacing between child elements using the design-token scale.',
            },
            {
              name: 'align',
              type: '"start" | "center" | "end" | "stretch" | "baseline"',
              default: 'VStack: "stretch" / HStack: "center"',
              description: pt?.props?.['align'] ?? 'Cross-axis alignment of children (alignItems).',
            },
            {
              name: 'justify',
              type: '"start" | "center" | "end" | "between" | "around" | "evenly"',
              default: '"start"',
              description: pt?.props?.['justify'] ?? 'Main-axis distribution of children (justifyContent).',
            },
            {
              name: 'wrap',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['wrap'] ?? 'Whether children wrap onto multiple lines.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the container View.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
