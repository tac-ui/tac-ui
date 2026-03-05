import React from 'react';
import { Dropdown, DropdownItem, DropdownTitle, DropdownDivider, Button } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function DropdownScreen() {
  return (
    <ScreenLayout title="Dropdown" description="A floating menu that appears when a trigger element is pressed.">
      <Section title="Import">
        <CodePreview
          code={`import {\n  Dropdown,\n  DropdownItem,\n  DropdownTitle,\n  DropdownDivider,\n} from '@tac-ui/native';`}
        />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`<Dropdown trigger={<Button>Open Menu</Button>}>\n  <DropdownItem onPress={() => console.log('Edit')}>Edit</DropdownItem>\n  <DropdownItem onPress={() => console.log('Duplicate')}>Duplicate</DropdownItem>\n  <DropdownItem onPress={() => console.log('Archive')}>Archive</DropdownItem>\n</Dropdown>`}
        >
          <Dropdown trigger={<Button>Open Menu</Button>}>
            <DropdownItem onPress={() => {}}>Edit</DropdownItem>
            <DropdownItem onPress={() => {}}>Duplicate</DropdownItem>
            <DropdownItem onPress={() => {}}>Archive</DropdownItem>
          </Dropdown>
        </ShowcaseCard>
      </Section>

      <Section title="With Title and Divider">
        <ShowcaseCard
          code={`<Dropdown trigger={<Button variant="outline">Options</Button>}>\n  <DropdownTitle>Actions</DropdownTitle>\n  <DropdownItem onPress={() => {}}>Edit Profile</DropdownItem>\n  <DropdownItem onPress={() => {}}>View Activity</DropdownItem>\n  <DropdownDivider />\n  <DropdownTitle>Danger Zone</DropdownTitle>\n  <DropdownItem onPress={() => {}} destructive>Delete Account</DropdownItem>\n</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="outline">Options</Button>}>
            <DropdownTitle>Actions</DropdownTitle>
            <DropdownItem onPress={() => {}}>Edit Profile</DropdownItem>
            <DropdownItem onPress={() => {}}>View Activity</DropdownItem>
            <DropdownDivider />
            <DropdownTitle>Danger Zone</DropdownTitle>
            <DropdownItem onPress={() => {}} destructive>
              Delete Account
            </DropdownItem>
          </Dropdown>
        </ShowcaseCard>
      </Section>

      <Section title="With Disabled Item">
        <ShowcaseCard
          code={`<Dropdown trigger={<Button variant="ghost">More</Button>}>\n  <DropdownItem onPress={() => {}}>Share</DropdownItem>\n  <DropdownItem disabled>Export (unavailable)</DropdownItem>\n  <DropdownDivider />\n  <DropdownItem onPress={() => {}} destructive>Remove</DropdownItem>\n</Dropdown>`}
        >
          <Dropdown trigger={<Button variant="ghost">More</Button>}>
            <DropdownItem onPress={() => {}}>Share</DropdownItem>
            <DropdownItem disabled>Export (unavailable)</DropdownItem>
            <DropdownDivider />
            <DropdownItem onPress={() => {}} destructive>
              Remove
            </DropdownItem>
          </Dropdown>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'trigger',
              type: 'React.ReactNode',
              default: '—',
              description: 'Element that opens the dropdown when pressed.',
            },
            {
              name: 'open',
              type: 'boolean',
              default: '—',
              description: 'Controlled open state of the dropdown.',
            },
            {
              name: 'onOpenChange',
              type: '(open: boolean) => void',
              default: '—',
              description: 'Called when the open state should change.',
            },
            {
              name: 'align',
              type: "'start' | 'center' | 'end'",
              default: "'start'",
              description: 'Horizontal alignment of the menu relative to the trigger.',
            },
            {
              name: 'onPress (DropdownItem)',
              type: '() => void',
              default: '—',
              description: 'Called when the item is pressed.',
            },
            {
              name: 'destructive (DropdownItem)',
              type: 'boolean',
              default: 'false',
              description: 'Renders the item in an error/destructive color.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
