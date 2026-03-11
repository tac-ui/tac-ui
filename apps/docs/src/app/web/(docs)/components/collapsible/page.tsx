'use client';

import React, { useState } from 'react';
import { Collapsible } from '@tac-ui/web';
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
import { usePageTranslation } from '@/i18n';

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="self-start px-3 py-1.5 text-sm rounded-[var(--radius-m)] bg-[var(--primary)] text-[var(--primary-foreground)] border-none cursor-pointer"
      >
        {open ? 'Close' : 'Open'} externally
      </button>
      <Collapsible label="Controlled panel" open={open} onOpenChange={setOpen}>
        This panel is controlled by external state. Use the button above or click the trigger to toggle.
      </Collapsible>
    </div>
  );
}

export default function CollapsiblePage() {
  const pt = usePageTranslation('collapsible');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Collapsible'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A single disclosure panel that expands and collapses with smooth animation. Supports both controlled and uncontrolled modes.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Collapsible } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Collapsible props below.</DocText>
        <Playground
          controls={{
            defaultOpen: {
              type: 'boolean',
              label: 'Default Open',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <div className="w-full" key={String(values.defaultOpen)}>
              <Collapsible label="Click to expand" defaultOpen={values.defaultOpen as boolean}>
                This is the collapsible content. It animates smoothly when expanding and collapsing.
              </Collapsible>
            </div>
          )}
          code={(values) =>
            `<Collapsible label="Click to expand"${values.defaultOpen ? ' defaultOpen' : ''}>
  This is the collapsible content.
</Collapsible>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'A basic collapsible panel starts closed and reveals content when the trigger is clicked.'}
        </DocText>
        <Showcase
          code={`<Collapsible label="Show details">
  Here are some additional details that were previously hidden.
</Collapsible>`}
        >
          <div className="w-full">
            <Collapsible label="Show details">
              Here are some additional details that were previously hidden.
            </Collapsible>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['default-open']?.title ?? 'Default Open'}>
        <DocText>
          {pt?.sections?.['default-open']?.texts?.[0] ??
            'Set defaultOpen to start the panel in an expanded state.'}
        </DocText>
        <Showcase
          code={`<Collapsible label="Already expanded" defaultOpen>
  This content is visible by default.
</Collapsible>`}
        >
          <div className="w-full">
            <Collapsible label="Already expanded" defaultOpen>
              This content is visible by default.
            </Collapsible>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Pass open and onOpenChange to control the panel from external state.'}
        </DocText>
        <Showcase
          code={`const [open, setOpen] = useState(false);

<Collapsible label="Controlled panel" open={open} onOpenChange={setOpen}>
  This panel is controlled by external state.
</Collapsible>`}
        >
          <ControlledDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['nested']?.title ?? 'Nested'}>
        <DocText>
          {pt?.sections?.['nested']?.texts?.[0] ??
            'Collapsible panels can be nested to create hierarchical disclosure patterns.'}
        </DocText>
        <Showcase
          code={`<Collapsible label="Outer panel" defaultOpen>
  Outer content
  <Collapsible label="Inner panel">
    Inner content
  </Collapsible>
</Collapsible>`}
        >
          <div className="w-full">
            <Collapsible label="Outer panel" defaultOpen>
              <div className="flex flex-col gap-2">
                <span>Outer content visible here.</span>
                <Collapsible label="Inner panel">
                  This is nested content inside the outer panel.
                </Collapsible>
              </div>
            </Collapsible>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['vs-accordion']?.title ?? 'Collapsible vs Accordion'}>
        <DocText>
          {pt?.sections?.['vs-accordion']?.texts?.[0] ??
            'Use Collapsible for a single independent disclosure panel. Use Accordion when you have multiple related sections where expanding one should optionally collapse others.'}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'label',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['label'] ?? 'The label displayed in the trigger button.',
            },
            {
              name: 'open',
              type: 'boolean',
              default: '-',
              description: pt?.props?.['open'] ?? 'Controlled open state.',
            },
            {
              name: 'onOpenChange',
              type: '(open: boolean) => void',
              default: '-',
              description: pt?.props?.['onOpenChange'] ?? 'Called when the open state changes.',
            },
            {
              name: 'defaultOpen',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['defaultOpen'] ?? 'Initial open state for uncontrolled mode.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'Content revealed when the panel is open.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
