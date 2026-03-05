'use client';

import React, { useState } from 'react';
import { Dropdown, DropdownTitle, DropdownDivider, DropdownItem, DropdownSearch, Button } from '@tac-ui/web';
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

export default function DropdownPage() {
  const [open, setOpen] = useState(false);
  const pt = usePageTranslation('dropdown');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Dropdown'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A floating menu that appears when triggered, used for contextual actions and navigation.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Dropdown, DropdownTitle, DropdownDivider, DropdownItem, DropdownSearch } from '@tac-ui/web';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['basic-menu']?.title ?? 'Basic Menu'}>
        <DocText>
          {pt?.sections?.['basic-menu']?.texts?.[0] ??
            'Click the trigger to open a floating menu. Supports keyboard navigation with Arrow keys, Home, End, Enter, and Escape.'}
        </DocText>
        <Showcase
          code={`<Dropdown trigger={<Button variant="outline">Open Menu</Button>}>
  <DropdownItem>Profile</DropdownItem>
  <DropdownItem>Settings</DropdownItem>
  <DropdownItem>Help</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Open Menu</Button>}>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Help</DropdownItem>
          </Dropdown>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-title-and-divider']?.title ?? 'With Title and Divider'}>
        <DocText>
          {pt?.sections?.['with-title-and-divider']?.texts?.[0] ??
            'Use DropdownTitle to label a group of items and DropdownDivider to visually separate sections.'}
        </DocText>
        <Showcase
          code={`<Dropdown trigger={<Button variant="outline">Account</Button>}>
  <DropdownTitle>My Account</DropdownTitle>
  <DropdownItem>Profile</DropdownItem>
  <DropdownItem>Settings</DropdownItem>
  <DropdownDivider />
  <DropdownItem>Sign Out</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Account</Button>}>
            <DropdownTitle>My Account</DropdownTitle>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign Out</DropdownItem>
          </Dropdown>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-destructive-item']?.title ?? 'With Destructive Item'}>
        <DocText>
          {pt?.sections?.['with-destructive-item']?.texts?.[0] ??
            'Pass destructive to a DropdownItem to render it in error colors, signaling a dangerous or irreversible action.'}
        </DocText>
        <Showcase
          code={`<Dropdown trigger={<Button variant="outline">Options</Button>}>
  <DropdownItem>Edit</DropdownItem>
  <DropdownItem>Duplicate</DropdownItem>
  <DropdownDivider />
  <DropdownItem destructive>Delete</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Options</Button>}>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
            <DropdownDivider />
            <DropdownItem destructive>Delete</DropdownItem>
          </Dropdown>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['alignment']?.title ?? 'Alignment'}>
        <DocText>
          {pt?.sections?.['alignment']?.texts?.[0] ??
            'Control which edge of the menu aligns to the trigger using the align prop.'}
        </DocText>
        <Showcase
          code={`<Dropdown trigger={<Button variant="outline">Start</Button>} align="start">
  <DropdownItem>Item A</DropdownItem>
  <DropdownItem>Item B</DropdownItem>
</Dropdown>
<Dropdown trigger={<Button variant="outline">Center</Button>} align="center">
  <DropdownItem>Item A</DropdownItem>
  <DropdownItem>Item B</DropdownItem>
</Dropdown>
<Dropdown trigger={<Button variant="outline">End</Button>} align="end">
  <DropdownItem>Item A</DropdownItem>
  <DropdownItem>Item B</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Start</Button>} align="start">
            <DropdownItem>Item A</DropdownItem>
            <DropdownItem>Item B</DropdownItem>
          </Dropdown>
          <Dropdown trigger={<Button variant="outline">Center</Button>} align="center">
            <DropdownItem>Item A</DropdownItem>
            <DropdownItem>Item B</DropdownItem>
          </Dropdown>
          <Dropdown trigger={<Button variant="outline">End</Button>} align="end">
            <DropdownItem>Item A</DropdownItem>
            <DropdownItem>Item B</DropdownItem>
          </Dropdown>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled-open-state']?.title ?? 'Controlled Open State'}>
        <DocText>
          {pt?.sections?.['controlled-open-state']?.texts?.[0] ??
            'Pass open and onOpenChange to control the dropdown programmatically from outside the component.'}
        </DocText>
        <Showcase
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Externally</Button>
<Dropdown
  open={open}
  onOpenChange={setOpen}
  trigger={<Button variant="outline">Controlled</Button>}
>
  <DropdownItem onClick={() => setOpen(false)}>Close</DropdownItem>
</Dropdown>`}
        >
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Open Externally
          </Button>
          <Dropdown open={open} onOpenChange={setOpen} trigger={<Button variant="outline">Controlled</Button>}>
            <DropdownItem onClick={() => setOpen(false)}>Close</DropdownItem>
            <DropdownItem>Another Item</DropdownItem>
          </Dropdown>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-search']?.title ?? 'With Search'}>
        <DocText>
          {pt?.sections?.['with-search']?.texts?.[0] ??
            'Add DropdownSearch at the top of the menu to let users filter a long list of items.'}
        </DocText>
        <Showcase
          code={`<Dropdown trigger={<Button variant="outline">Search Menu</Button>}>
  <DropdownSearch placeholder="Search..." />
  <DropdownItem>Dashboard</DropdownItem>
  <DropdownItem>Analytics</DropdownItem>
  <DropdownItem>Settings</DropdownItem>
  <DropdownItem>Help</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Search Menu</Button>}>
            <DropdownSearch placeholder="Search..." />
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Analytics</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Help</DropdownItem>
          </Dropdown>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'trigger',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['trigger'] ?? 'The element that opens the dropdown when clicked.',
            },
            {
              name: 'open',
              type: 'boolean',
              default: '-',
              description: pt?.props?.['open'] ?? 'Controlled open state; omit to use uncontrolled mode.',
            },
            {
              name: 'onOpenChange',
              type: '(open: boolean) => void',
              default: '-',
              description: pt?.props?.['onOpenChange'] ?? 'Called when the open state changes.',
            },
            {
              name: 'align',
              type: '"start" | "center" | "end"',
              default: '"start"',
              description: pt?.props?.['align'] ?? 'Horizontal alignment of the menu relative to the trigger.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'Dropdown items and sections.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
