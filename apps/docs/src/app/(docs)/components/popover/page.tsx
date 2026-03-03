'use client';

import React from 'react';
import { Popover, PopoverHeader, PopoverBody, PopoverFooter, Button } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function PopoverPage() {
  const pt = usePageTranslation('popover');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Popover'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A floating panel anchored to a trigger element, used for richer content than a tooltip.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['basic-popover']?.title ?? 'Basic Popover'}>
        <DocText>{pt?.sections?.['basic-popover']?.texts?.[0] ?? 'Click the trigger to open a floating panel. The popover closes on outside click or Escape key.'}</DocText>
        <Showcase code={`<Popover trigger={<Button variant="outline">Open Popover</Button>}>
  <PopoverBody>
    <p>This is a simple popover with some content.</p>
  </PopoverBody>
</Popover>`}>
          <Popover trigger={<Button variant="outline">Open Popover</Button>}>
            <PopoverBody>
              <p>This is a simple popover with some content.</p>
            </PopoverBody>
          </Popover>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-header-body-and-footer']?.title ?? 'With Header, Body and Footer'}>
        <DocText>{pt?.sections?.['with-header-body-and-footer']?.texts?.[0] ?? 'Use PopoverHeader, PopoverBody, and PopoverFooter to compose a structured layout with built-in border separators.'}</DocText>
        <Showcase code={`<Popover trigger={<Button variant="outline">Details</Button>}>
  <PopoverHeader>Popover Title</PopoverHeader>
  <PopoverBody>This popover has a structured layout with header, body, and footer sections.</PopoverBody>
  <PopoverFooter>
    <Button size="sm">Confirm</Button>
  </PopoverFooter>
</Popover>`}>
          <Popover trigger={<Button variant="outline">Details</Button>}>
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>This popover has a structured layout with header, body, and footer sections.</PopoverBody>
            <PopoverFooter>
              <Button size="sm">Confirm</Button>
            </PopoverFooter>
          </Popover>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['different-sides']?.title ?? 'Different Sides'}>
        <DocText>{pt?.sections?.['different-sides']?.texts?.[0] ?? 'Use the side prop to control which side of the trigger the panel appears on: top, bottom, left, or right.'}</DocText>
        <Showcase code={`<Popover trigger={<Button variant="outline">Top</Button>} side="top">
  <PopoverBody><p>Appears above</p></PopoverBody>
</Popover>
<Popover trigger={<Button variant="outline">Bottom</Button>} side="bottom">
  <PopoverBody><p>Appears below</p></PopoverBody>
</Popover>
<Popover trigger={<Button variant="outline">Left</Button>} side="left">
  <PopoverBody><p>Appears left</p></PopoverBody>
</Popover>
<Popover trigger={<Button variant="outline">Right</Button>} side="right">
  <PopoverBody><p>Appears right</p></PopoverBody>
</Popover>`}>
          <Popover trigger={<Button variant="outline">Top</Button>} side="top">
            <PopoverBody className="p-2">
              <p>Appears above</p>
            </PopoverBody>
          </Popover>
          <Popover trigger={<Button variant="outline">Bottom</Button>} side="bottom">
            <PopoverBody className="p-2">
              <p>Appears below</p>
            </PopoverBody>
          </Popover>
          <Popover trigger={<Button variant="outline">Left</Button>} side="left">
            <PopoverBody className="p-2">
              <p>Appears left</p>
            </PopoverBody>
          </Popover>
          <Popover trigger={<Button variant="outline">Right</Button>} side="right">
            <PopoverBody className="p-2">
              <p>Appears right</p>
            </PopoverBody>
          </Popover>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['no-padding']?.title ?? 'No Padding (Menu Style)'}>
        <DocText>{pt?.sections?.['no-padding']?.texts?.[0] ?? 'Override PopoverBody padding with className="p-0" to render flush menu-style content inside the panel.'}</DocText>
        <Showcase code={`<Popover trigger={<Button variant="outline">Menu</Button>}>
  <PopoverBody className="p-0">
    <div className="flex flex-col py-1">
      <button className="px-4 py-2 text-left text-sm hover:bg-[var(--interactive-hover)] ...">Option 1</button>
      <button className="...">Option 2</button>
      <button className="...">Option 3</button>
    </div>
  </PopoverBody>
</Popover>`}>
          <Popover trigger={<Button variant="outline">Menu</Button>}>
            <PopoverBody className="p-0">
              <div className="flex flex-col py-1">
                <button className="px-4 py-2 text-left text-sm bg-transparent border-none cursor-pointer text-[var(--foreground)] hover:bg-[var(--interactive-hover)] transition-colors">Option 1</button>
                <button className="px-4 py-2 text-left text-sm bg-transparent border-none cursor-pointer text-[var(--foreground)] hover:bg-[var(--interactive-hover)] transition-colors">Option 2</button>
                <button className="px-4 py-2 text-left text-sm bg-transparent border-none cursor-pointer text-[var(--foreground)] hover:bg-[var(--interactive-hover)] transition-colors">Option 3</button>
              </div>
            </PopoverBody>
          </Popover>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'trigger', type: 'React.ReactNode', default: '-', description: pt?.props?.['trigger'] ?? 'The element that toggles the popover open/closed when clicked.' },
          { name: 'open', type: 'boolean', default: '-', description: pt?.props?.['open'] ?? 'Controlled open state; omit to use uncontrolled mode.' },
          { name: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: pt?.props?.['onOpenChange'] ?? 'Called when the open state changes.' },
          { name: 'side', type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: pt?.props?.['side'] ?? 'Side on which the panel appears relative to the trigger.' },
          { name: 'align', type: '"start" | "center" | "end"', default: '"center"', description: pt?.props?.['align'] ?? 'Alignment of the panel along the perpendicular axis.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['children'] ?? 'Content rendered inside the popover panel.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
