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
import { Dropdown, DropdownItem, DropdownTitle, DropdownDivider, Button } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeDropdownPage() {
  const pt = usePageTranslation('native-dropdown');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Dropdown'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A floating menu that appears when triggered, used for contextual actions and navigation.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Dropdown, DropdownTitle, DropdownDivider, DropdownItem } from '@tac-ui/native';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['basic-menu']?.title ?? 'Basic Menu'}>
        <DocText>
          {pt?.sections?.['basic-menu']?.texts?.[0] ??
            'Tap the trigger to open a floating menu. Items are pressable and support an onPress handler.'}
        </DocText>
        <NativeShowcase
          code={`<Dropdown trigger={<Button variant="outline">Open Menu</Button>}>
  <DropdownItem onPress={() => {}}>Profile</DropdownItem>
  <DropdownItem onPress={() => {}}>Settings</DropdownItem>
  <DropdownItem onPress={() => {}}>Help</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Open Menu</Button>}>
            <DropdownItem onPress={() => {}}>Profile</DropdownItem>
            <DropdownItem onPress={() => {}}>Settings</DropdownItem>
            <DropdownItem onPress={() => {}}>Help</DropdownItem>
          </Dropdown>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-title-and-divider']?.title ?? 'With Title and Divider'}>
        <DocText>
          {pt?.sections?.['with-title-and-divider']?.texts?.[0] ??
            'Use DropdownTitle to label a group of items and DropdownDivider to visually separate sections.'}
        </DocText>
        <NativeShowcase
          code={`<Dropdown trigger={<Button variant="outline">Account</Button>}>
  <DropdownTitle>My Account</DropdownTitle>
  <DropdownItem onPress={() => {}}>Profile</DropdownItem>
  <DropdownItem onPress={() => {}}>Settings</DropdownItem>
  <DropdownDivider />
  <DropdownItem onPress={() => {}}>Sign Out</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Account</Button>}>
            <DropdownTitle>My Account</DropdownTitle>
            <DropdownItem onPress={() => {}}>Profile</DropdownItem>
            <DropdownItem onPress={() => {}}>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onPress={() => {}}>Sign Out</DropdownItem>
          </Dropdown>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-destructive-item']?.title ?? 'With Destructive Item'}>
        <DocText>
          {pt?.sections?.['with-destructive-item']?.texts?.[0] ??
            'Pass destructive to a DropdownItem to render it in error colors, signaling a dangerous or irreversible action.'}
        </DocText>
        <NativeShowcase
          code={`<Dropdown trigger={<Button variant="outline">Options</Button>}>
  <DropdownItem onPress={() => {}}>Edit</DropdownItem>
  <DropdownItem onPress={() => {}}>Duplicate</DropdownItem>
  <DropdownDivider />
  <DropdownItem destructive onPress={() => {}}>Delete</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Options</Button>}>
            <DropdownItem onPress={() => {}}>Edit</DropdownItem>
            <DropdownItem onPress={() => {}}>Duplicate</DropdownItem>
            <DropdownDivider />
            <DropdownItem destructive onPress={() => {}}>
              Delete
            </DropdownItem>
          </Dropdown>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['alignment']?.title ?? 'Alignment'}>
        <DocText>
          {pt?.sections?.['alignment']?.texts?.[0] ??
            'Control which edge of the menu aligns to the trigger using the align prop.'}
        </DocText>
        <NativeShowcase
          code={`<Dropdown trigger={<Button variant="outline">Start</Button>} align="start">
  <DropdownItem onPress={() => {}}>Item A</DropdownItem>
  <DropdownItem onPress={() => {}}>Item B</DropdownItem>
</Dropdown>
<Dropdown trigger={<Button variant="outline">Center</Button>} align="center">
  <DropdownItem onPress={() => {}}>Item A</DropdownItem>
  <DropdownItem onPress={() => {}}>Item B</DropdownItem>
</Dropdown>
<Dropdown trigger={<Button variant="outline">End</Button>} align="end">
  <DropdownItem onPress={() => {}}>Item A</DropdownItem>
  <DropdownItem onPress={() => {}}>Item B</DropdownItem>
</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Start</Button>} align="start">
            <DropdownItem onPress={() => {}}>Item A</DropdownItem>
            <DropdownItem onPress={() => {}}>Item B</DropdownItem>
          </Dropdown>
          <Dropdown trigger={<Button variant="outline">Center</Button>} align="center">
            <DropdownItem onPress={() => {}}>Item A</DropdownItem>
            <DropdownItem onPress={() => {}}>Item B</DropdownItem>
          </Dropdown>
          <Dropdown trigger={<Button variant="outline">End</Button>} align="end">
            <DropdownItem onPress={() => {}}>Item A</DropdownItem>
            <DropdownItem onPress={() => {}}>Item B</DropdownItem>
          </Dropdown>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled-open-state']?.title ?? 'Controlled Open State'}>
        <DocText>
          {pt?.sections?.['controlled-open-state']?.texts?.[0] ??
            'Pass open and onOpenChange to control the dropdown programmatically from outside the component.'}
        </DocText>
        <PreviewCode
          code={`const [open, setOpen] = useState(false);

<Button onPress={() => setOpen(true)}>Open Externally</Button>
<Dropdown
  open={open}
  onOpenChange={setOpen}
  trigger={<Button variant="outline">Controlled</Button>}
>
  <DropdownItem onPress={() => setOpen(false)}>Close</DropdownItem>
</Dropdown>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'trigger',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['trigger'] ?? 'The element that opens the dropdown when pressed.',
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
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'DropdownItem props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'onPress',
              type: '() => void',
              default: '-',
              description: pt?.props?.['DropdownItem-onPress'] ?? 'Called when the item is pressed.',
            },
            {
              name: 'destructive',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DropdownItem-destructive'] ??
                'Renders the item in error colors to signal a dangerous action.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DropdownItem-disabled'] ??
                'Prevents interaction and renders the item with reduced opacity.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DropdownItem-children'] ?? 'Item label content.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'DropdownTitle props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DropdownTitle'] ?? 'Section title label in the dropdown.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[2] ?? 'DropdownDivider props:'}</DocText>
        <PropsTable
          data={[
            {
              name: '-',
              type: '-',
              default: '-',
              description:
                pt?.props?.['DropdownDivider'] ?? 'A horizontal divider between menu sections. Accepts no props.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
