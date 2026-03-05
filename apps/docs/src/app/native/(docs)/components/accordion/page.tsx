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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeAccordionPage() {
  const pt = usePageTranslation('native-accordion');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Accordion'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A vertically stacked set of interactive headings that reveal or hide associated content.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@tac-ui/native';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Accordion props below.'}
        </DocText>
        <NativePlayground
          controls={{
            type: { type: 'select', label: 'Type', options: ['single', 'multiple'], defaultValue: 'single' },
          }}
          render={(values) => (
            <Accordion type={values.type as 'single'} defaultValue={['item-1']}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It uses spring animations for smooth open and close transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          code={(values) =>
            `<Accordion type="${values.type}" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
  </AccordionItem>
</Accordion>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['single']?.title ?? 'Single (one open at a time)'}>
        <DocText>
          {pt?.sections?.['single']?.texts?.[0] ??
            'In single mode only one item can be open at a time; opening a new item collapses the previously open one. Use defaultValue to set the initially open item.'}
        </DocText>
        <NativeShowcase
          code={`<Accordion type="single" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>Yes. It uses spring animations for smooth open and close transitions.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" defaultValue={['item-1']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>Yes. It uses spring animations for smooth open and close transitions.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['multiple']?.title ?? 'Multiple (many open at once)'}>
        <DocText>
          {pt?.sections?.['multiple']?.texts?.[0] ??
            'In multiple mode, any number of items can be open simultaneously. Pass an array of values to defaultValue to pre-open multiple items.'}
        </DocText>
        <NativeShowcase
          code={`<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>First item</AccordionTrigger>
    <AccordionContent>Content for the first item.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second item</AccordionTrigger>
    <AccordionContent>Content for the second item.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Third item</AccordionTrigger>
    <AccordionContent>Content for the third item.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>First item</AccordionTrigger>
              <AccordionContent>Content for the first item.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second item</AccordionTrigger>
              <AccordionContent>Content for the second item.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Third item</AccordionTrigger>
              <AccordionContent>Content for the third item.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['glass']?.title ?? 'Glass'}>
        <DocText>
          {pt?.sections?.['glass']?.texts?.[0] ??
            'The glass prop applies a semi-transparent background to the accordion container and each item, suitable for overlaying rich backgrounds.'}
        </DocText>
        <NativeShowcase
          code={`<Accordion type="single" glass defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is glassmorphism?</AccordionTrigger>
    <AccordionContent>A design style using frosted-glass effects with blur and transparency.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>When should I use it?</AccordionTrigger>
    <AccordionContent>Use glass when the accordion sits on a colorful or image background.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" glass defaultValue={['item-1']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is glassmorphism?</AccordionTrigger>
              <AccordionContent>
                A design style using frosted-glass effects with blur and transparency.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>When should I use it?</AccordionTrigger>
              <AccordionContent>Use glass when the accordion sits on a colorful or image background.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-outline']?.title ?? 'Without Outline'}>
        <DocText>
          {pt?.sections?.['without-outline']?.texts?.[0] ??
            'Setting outline removes the bordered card style and renders items with only a bottom divider, creating a flush list appearance.'}
        </DocText>
        <NativeShowcase
          code={`<Accordion type="single" outline defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>No border card style</AccordionTrigger>
    <AccordionContent>Items are separated by a bottom border instead of individual card borders.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Flush appearance</AccordionTrigger>
    <AccordionContent>Use this style when the accordion is embedded in a surface that already has a border.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Third item</AccordionTrigger>
    <AccordionContent>The last item's bottom border is hidden automatically.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" outline defaultValue={['item-1']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>No border card style</AccordionTrigger>
              <AccordionContent>
                Items are separated by a bottom border instead of individual card borders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Flush appearance</AccordionTrigger>
              <AccordionContent>
                Use this style when the accordion is embedded in a surface that already has a border.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Third item</AccordionTrigger>
              <AccordionContent>{"The last item's bottom border is hidden automatically."}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[0] ??
            'Accordion uses a composition pattern. The root manages state; AccordionItem, AccordionTrigger, and AccordionContent all require a matching value prop to wire up open/close behavior.'}
        </DocText>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'Accordion props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'type',
              type: '"single" | "multiple"',
              default: '"single"',
              description: pt?.props?.['type'] ?? 'Whether only one or multiple items can be open at a time.',
            },
            {
              name: 'defaultValue',
              type: 'string[]',
              default: '[]',
              description: pt?.props?.['defaultValue'] ?? 'The value(s) of items open by default (uncontrolled).',
            },
            {
              name: 'glass',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['glass'] ?? 'Applies a semi-transparent background to the container and each item.',
            },
            {
              name: 'outline',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['outline'] ??
                'When true, shows individual card borders. When false, uses a flush bottom-divider style.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the root container.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[2] ?? 'AccordionItem props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['accordion-item-value'] ??
                'Unique identifier for this accordion item; used to control open state.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['accordion-item-style'] ?? 'Additional styles applied to the item container.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[3] ?? 'AccordionTrigger props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['accordion-trigger-children'] ?? 'Label text displayed in the trigger button.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['accordion-trigger-style'] ?? 'Additional styles applied to the trigger.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[4] ?? 'AccordionContent props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['accordion-content-children'] ?? 'Content revealed when the accordion item is open.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description:
                pt?.props?.['accordion-content-style'] ?? 'Additional styles applied to the content container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
