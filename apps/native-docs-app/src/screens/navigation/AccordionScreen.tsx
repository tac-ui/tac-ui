import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function AccordionScreen() {
  return (
    <ScreenLayout
      title="Accordion"
      description="Vertically stacked interactive sections that expand to reveal content."
    >
      <Section title="Import">
        <CodePreview
          code={`import {\n  Accordion,\n  AccordionItem,\n  AccordionTrigger,\n  AccordionContent,\n} from '@tac-ui/native';`}
        />
      </Section>

      <Section
        title="Single Mode"
        description="In single mode only one item can be open at a time; opening a new item collapses the previously open one. Use defaultValue to set the initially open item."
      >
        <ShowcaseCard
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
        </ShowcaseCard>
      </Section>

      <Section
        title="Multiple Mode"
        description="In multiple mode, any number of items can be open simultaneously. Pass an array of values to defaultValue to pre-open multiple items."
      >
        <ShowcaseCard
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
        </ShowcaseCard>
      </Section>

      <Section
        title="Glass Variant"
        description="The glass prop applies a semi-transparent background to the accordion container and each item, suitable for overlaying rich backgrounds."
      >
        <ShowcaseCard
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
        </ShowcaseCard>
      </Section>

      <Section
        title="Without Outline"
        description="Setting outline removes the bordered card style and renders items with only a bottom divider, creating a flush list appearance."
      >
        <ShowcaseCard
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
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'type',
              type: "'single' | 'multiple'",
              default: "'single'",
              description: 'Whether only one or multiple items can be open at a time.',
            },
            {
              name: 'defaultValue',
              type: 'string[]',
              default: '[]',
              description: 'The value(s) of items open by default (uncontrolled).',
            },
            {
              name: 'glass',
              type: 'boolean',
              default: 'false',
              description: 'Applies a semi-transparent background to the container and each item.',
            },
            {
              name: 'outline',
              type: 'boolean',
              default: 'false',
              description: 'When true, shows individual card borders. When false, uses a flush bottom-divider style.',
            },
            {
              name: 'value (AccordionItem)',
              type: 'string',
              default: '—',
              description: 'Unique identifier for this accordion item; used to control open state.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
