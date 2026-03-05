'use client';

import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@tac-ui/web';
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
import { Playground } from '@/components/docs/Playground';

export default function AccordionPage() {
  const pt = usePageTranslation('accordion');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Accordion'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A vertically stacked set of interactive headings that reveal or hide associated content.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@tac-ui/web';`}
        />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Accordion props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['single', 'multiple'],
              defaultValue: 'single',
            },
          }}
          render={(values) => (
            <div className="w-full">
              <Accordion type={values.variant as 'single'} defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
                  <AccordionContent value="item-1">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger value="item-2">Is it styled?</AccordionTrigger>
                  <AccordionContent value="item-2">
                    Yes. It comes with default styles that match the design system.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger value="item-3">Is it animated?</AccordionTrigger>
                  <AccordionContent value="item-3">
                    Yes. It uses spring animations for smooth open and close transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          code={(values) =>
            `<Accordion type="${values.variant}" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
    <AccordionContent value="item-1">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger value="item-2">Is it styled?</AccordionTrigger>
    <AccordionContent value="item-2">Yes. It comes with default styles that match the design system.</AccordionContent>
  </AccordionItem>
</Accordion>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['single']?.title ?? 'Single (one open at a time)'}>
        <DocText>
          {pt?.sections?.['single']?.texts?.[0] ??
            'In single mode only one item can be open at a time; opening a new item collapses the previously open one. Use <code>defaultValue</code> to set the initially open item.'}
        </DocText>
        <Showcase
          code={`<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
    <AccordionContent value="item-1">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger value="item-2">Is it styled?</AccordionTrigger>
    <AccordionContent value="item-2">Yes. It comes with default styles that match the design system.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger value="item-3">Is it animated?</AccordionTrigger>
    <AccordionContent value="item-3">Yes. It uses spring animations for smooth open and close transitions.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full">
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
                <AccordionContent value="item-1">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger value="item-2">Is it styled?</AccordionTrigger>
                <AccordionContent value="item-2">
                  Yes. It comes with default styles that match the design system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger value="item-3">Is it animated?</AccordionTrigger>
                <AccordionContent value="item-3">
                  Yes. It uses spring animations for smooth open and close transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['multiple']?.title ?? 'Multiple (many open at once)'}>
        <DocText>
          {pt?.sections?.['multiple']?.texts?.[0] ??
            'In multiple mode, any number of items can be open simultaneously. Pass an array of values to <code>defaultValue</code> to pre-open multiple items.'}
        </DocText>
        <Showcase
          code={`<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">First item</AccordionTrigger>
    <AccordionContent value="item-1">Content for the first item.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger value="item-2">Second item</AccordionTrigger>
    <AccordionContent value="item-2">Content for the second item.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger value="item-3">Third item</AccordionTrigger>
    <AccordionContent value="item-3">Content for the third item.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full">
            <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
              <AccordionItem value="item-1">
                <AccordionTrigger value="item-1">First item</AccordionTrigger>
                <AccordionContent value="item-1">Content for the first item.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger value="item-2">Second item</AccordionTrigger>
                <AccordionContent value="item-2">Content for the second item.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger value="item-3">Third item</AccordionTrigger>
                <AccordionContent value="item-3">Content for the third item.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['glass']?.title ?? 'Glass'}>
        <DocText>
          {pt?.sections?.['glass']?.texts?.[0] ??
            'The <code>glass</code> prop applies a glassmorphism backdrop blur to the accordion container and each item, suitable for overlaying rich backgrounds.'}
        </DocText>
        <Showcase
          code={`<Accordion type="single" glass defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">What is glassmorphism?</AccordionTrigger>
    <AccordionContent value="item-1">A design style using frosted-glass effects with blur and transparency.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger value="item-2">When should I use it?</AccordionTrigger>
    <AccordionContent value="item-2">Use glass when the accordion sits on a colorful or image background.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full">
            <Accordion type="single" glass defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger value="item-1">What is glassmorphism?</AccordionTrigger>
                <AccordionContent value="item-1">
                  A design style using frosted-glass effects with blur and transparency.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger value="item-2">When should I use it?</AccordionTrigger>
                <AccordionContent value="item-2">
                  Use glass when the accordion sits on a colorful or image background.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-outline']?.title ?? 'Without Outline'}>
        <DocText>
          {pt?.sections?.['without-outline']?.texts?.[0] ??
            'Setting <code>outline={`{false}`}</code> removes the bordered card style and renders items with only a bottom divider, creating a flush list appearance.'}
        </DocText>
        <Showcase
          code={`<Accordion type="single" outline={false} defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">No border card style</AccordionTrigger>
    <AccordionContent value="item-1">Items are separated by a bottom border instead of individual card borders.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger value="item-2">Flush appearance</AccordionTrigger>
    <AccordionContent value="item-2">Use this style when the accordion is embedded in a surface that already has a border.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger value="item-3">Third item</AccordionTrigger>
    <AccordionContent value="item-3">The last item&apos;s bottom border is hidden automatically.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full">
            <Accordion type="single" outline={false} defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger value="item-1">No border card style</AccordionTrigger>
                <AccordionContent value="item-1">
                  Items are separated by a bottom border instead of individual card borders.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger value="item-2">Flush appearance</AccordionTrigger>
                <AccordionContent value="item-2">
                  Use this style when the accordion is embedded in a surface that already has a border.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger value="item-3">Third item</AccordionTrigger>
                <AccordionContent value="item-3">
                  The last item&apos;s bottom border is hidden automatically.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[0] ??
            'Accordion uses a composition pattern. The root manages state; AccordionItem, AccordionTrigger, and AccordionContent all require a matching <code>value</code> prop to wire up open/close behavior.'}
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
              type: 'string | string[]',
              default: '[]',
              description: pt?.props?.['defaultValue'] ?? 'The value(s) of items open by default (uncontrolled).',
            },
            {
              name: 'glass',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['glass'] ?? 'Applies glassmorphism backdrop blur to the container and each item.',
            },
            {
              name: 'outline',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['outline'] ??
                'When true, shows individual card borders. When false, uses a flush bottom-divider style.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
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
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['accordion-item-className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[3] ?? 'AccordionTrigger props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'string',
              default: '-',
              description: pt?.props?.['accordion-trigger-value'] ?? 'The accordion item value this trigger controls.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['accordion-trigger-children'] ?? 'Label text displayed in the trigger button.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['accordion-trigger-className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[4] ?? 'AccordionContent props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['accordion-content-value'] ??
                'The accordion item value that controls visibility of this content.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['accordion-content-children'] ?? 'Content revealed when the accordion item is open.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['accordion-content-className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
