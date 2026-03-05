'use client';

import React from 'react';
import { User, Settings, Bell } from '@tac-ui/icon-native';
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
import { Tabs, TabsList, TabTrigger, TabContent } from '@tac-ui/native';
import type { TabVariant } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeTabsPage() {
  const pt = usePageTranslation('native-tabs');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Tabs'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'Organizes content into multiple panels, allowing users to switch between views.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Tabs, TabsList, TabTrigger, TabContent } from '@tac-ui/native';
import type { TabVariant } from '@tac-ui/native';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>{pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Tabs props below.'}</DocText>
        <NativePlayground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['underline', 'pill', 'outline'],
              defaultValue: 'underline',
            },
          }}
          render={(values) => (
            <Tabs defaultValue="tab1" variant={values.variant as TabVariant} style={{ width: '100%' }}>
              <TabsList>
                <TabTrigger value="tab1">Account</TabTrigger>
                <TabTrigger value="tab2">Password</TabTrigger>
                <TabTrigger value="tab3">Settings</TabTrigger>
              </TabsList>
              <TabContent value="tab1">
                <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Account settings content.</div>
              </TabContent>
              <TabContent value="tab2">
                <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Password settings content.</div>
              </TabContent>
              <TabContent value="tab3">
                <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>General settings content.</div>
              </TabContent>
            </Tabs>
          )}
          code={(values) =>
            `<Tabs defaultValue="tab1" variant="${values.variant}">\n  <TabsList>\n    <TabTrigger value="tab1">Account</TabTrigger>\n    <TabTrigger value="tab2">Password</TabTrigger>\n    <TabTrigger value="tab3">Settings</TabTrigger>\n  </TabsList>\n  <TabContent value="tab1"><Text>Account settings content.</Text></TabContent>\n  <TabContent value="tab2"><Text>Password settings content.</Text></TabContent>\n  <TabContent value="tab3"><Text>General settings content.</Text></TabContent>\n</Tabs>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['underline']?.title ?? 'Underline'}>
        <DocText>
          {pt?.sections?.['underline']?.texts?.[0] ??
            'The default underline variant renders tabs with a bottom border and an animated indicator that slides between active tabs. Use this for content-heavy pages where tabs span the full width.'}
        </DocText>
        <NativeShowcase
          code={`<Tabs defaultValue="tab1" variant="underline">
  <TabsList>
    <TabTrigger value="tab1">Account</TabTrigger>
    <TabTrigger value="tab2">Password</TabTrigger>
    <TabTrigger value="tab3">Settings</TabTrigger>
  </TabsList>
  <TabContent value="tab1">
    <Text>Account settings content.</Text>
  </TabContent>
  <TabContent value="tab2">
    <Text>Password settings content.</Text>
  </TabContent>
  <TabContent value="tab3">
    <Text>General settings content.</Text>
  </TabContent>
</Tabs>`}
        >
          <Tabs defaultValue="tab1" variant="underline" style={{ width: '100%' }}>
            <TabsList>
              <TabTrigger value="tab1">Account</TabTrigger>
              <TabTrigger value="tab2">Password</TabTrigger>
              <TabTrigger value="tab3">Settings</TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Account settings content.</div>
            </TabContent>
            <TabContent value="tab2">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Password settings content.</div>
            </TabContent>
            <TabContent value="tab3">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>General settings content.</div>
            </TabContent>
          </Tabs>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['pill']?.title ?? 'Pill'}>
        <DocText>
          {pt?.sections?.['pill']?.texts?.[0] ??
            'The pill variant wraps the tab list in a secondary-colored container and uses a filled pill indicator. Use this for compact, inline tab groups.'}
        </DocText>
        <NativeShowcase
          code={`<Tabs defaultValue="tab1" variant="pill">
  <TabsList>
    <TabTrigger value="tab1">Account</TabTrigger>
    <TabTrigger value="tab2">Password</TabTrigger>
    <TabTrigger value="tab3">Settings</TabTrigger>
  </TabsList>
  <TabContent value="tab1">
    <Text>Account settings content.</Text>
  </TabContent>
  <TabContent value="tab2">
    <Text>Password settings content.</Text>
  </TabContent>
  <TabContent value="tab3">
    <Text>General settings content.</Text>
  </TabContent>
</Tabs>`}
        >
          <Tabs defaultValue="tab1" variant="pill" style={{ width: '100%' }}>
            <TabsList>
              <TabTrigger value="tab1">Account</TabTrigger>
              <TabTrigger value="tab2">Password</TabTrigger>
              <TabTrigger value="tab3">Settings</TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Account settings content.</div>
            </TabContent>
            <TabContent value="tab2">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Password settings content.</div>
            </TabContent>
            <TabContent value="tab3">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>General settings content.</div>
            </TabContent>
          </Tabs>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['outline']?.title ?? 'Outline'}>
        <DocText>
          {pt?.sections?.['outline']?.texts?.[0] ??
            'The outline variant renders the tab list as a bordered control group. The active tab is highlighted with a filled background.'}
        </DocText>
        <NativeShowcase
          code={`<Tabs defaultValue="tab1" variant="outline">
  <TabsList>
    <TabTrigger value="tab1">Account</TabTrigger>
    <TabTrigger value="tab2">Password</TabTrigger>
    <TabTrigger value="tab3">Settings</TabTrigger>
  </TabsList>
  <TabContent value="tab1">
    <Text>Account settings content.</Text>
  </TabContent>
  <TabContent value="tab2">
    <Text>Password settings content.</Text>
  </TabContent>
  <TabContent value="tab3">
    <Text>General settings content.</Text>
  </TabContent>
</Tabs>`}
        >
          <Tabs defaultValue="tab1" variant="outline" style={{ width: '100%' }}>
            <TabsList>
              <TabTrigger value="tab1">Account</TabTrigger>
              <TabTrigger value="tab2">Password</TabTrigger>
              <TabTrigger value="tab3">Settings</TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Account settings content.</div>
            </TabContent>
            <TabContent value="tab2">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Password settings content.</div>
            </TabContent>
            <TabContent value="tab3">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>General settings content.</div>
            </TabContent>
          </Tabs>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['icon']?.title ?? 'Icon'}>
        <DocText>
          {pt?.sections?.['icon']?.texts?.[0] ??
            'Pass an icon prop to TabTrigger to display an icon alongside the tab label. Icons are rendered at 16x16 and respect the active/inactive color.'}
        </DocText>
        <NativeShowcase
          code={`import { User, Settings, Bell } from '@tac-ui/icon-native';

<Tabs defaultValue="tab1" variant="underline">
  <TabsList>
    <TabTrigger value="tab1" icon={<User size={16} />}>Account</TabTrigger>
    <TabTrigger value="tab2" icon={<Settings size={16} />}>Settings</TabTrigger>
    <TabTrigger value="tab3" icon={<Bell size={16} />}>Notifications</TabTrigger>
  </TabsList>
  <TabContent value="tab1"><Text>Account settings content.</Text></TabContent>
  <TabContent value="tab2"><Text>General settings content.</Text></TabContent>
  <TabContent value="tab3"><Text>Notification preferences content.</Text></TabContent>
</Tabs>`}
        >
          <Tabs defaultValue="tab1" variant="underline" style={{ width: '100%' }}>
            <TabsList>
              <TabTrigger value="tab1" icon={<User size={16} />}>
                Account
              </TabTrigger>
              <TabTrigger value="tab2" icon={<Settings size={16} />}>
                Settings
              </TabTrigger>
              <TabTrigger value="tab3" icon={<Bell size={16} />}>
                Notifications
              </TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Account settings content.</div>
            </TabContent>
            <TabContent value="tab2">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>General settings content.</div>
            </TabContent>
            <TabContent value="tab3">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Notification preferences content.</div>
            </TabContent>
          </Tabs>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Pass value and onValueChange to control the active tab externally. Useful for programmatic navigation or syncing tabs with other state.'}
        </DocText>
        <PreviewCode
          code={`const [activeTab, setActiveTab] = React.useState('tab1');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabTrigger value="tab1">Account</TabTrigger>
    <TabTrigger value="tab2">Password</TabTrigger>
    <TabTrigger value="tab3">Settings</TabTrigger>
  </TabsList>
  <TabContent value="tab1">
    <Text>Account settings content.</Text>
  </TabContent>
  <TabContent value="tab2">
    <Text>Password settings content.</Text>
  </TabContent>
  <TabContent value="tab3">
    <Text>General settings content.</Text>
  </TabContent>
</Tabs>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['scrollable-tabs']?.title ?? 'Scrollable Tabs'}>
        <DocText>
          {pt?.sections?.['scrollable-tabs']?.texts?.[0] ??
            'TabsList uses a horizontal ScrollView, so it handles overflow automatically when there are many tabs.'}
        </DocText>
        <NativeShowcase
          code={`<Tabs defaultValue="tab1">
  <TabsList>
    <TabTrigger value="tab1">Monday</TabTrigger>
    <TabTrigger value="tab2">Tuesday</TabTrigger>
    <TabTrigger value="tab3">Wednesday</TabTrigger>
    <TabTrigger value="tab4">Thursday</TabTrigger>
    <TabTrigger value="tab5">Friday</TabTrigger>
  </TabsList>
  <TabContent value="tab1"><Text>Monday schedule</Text></TabContent>
  <TabContent value="tab2"><Text>Tuesday schedule</Text></TabContent>
  <TabContent value="tab3"><Text>Wednesday schedule</Text></TabContent>
  <TabContent value="tab4"><Text>Thursday schedule</Text></TabContent>
  <TabContent value="tab5"><Text>Friday schedule</Text></TabContent>
</Tabs>`}
        >
          <Tabs defaultValue="tab1" style={{ width: '100%' }}>
            <TabsList>
              <TabTrigger value="tab1">Monday</TabTrigger>
              <TabTrigger value="tab2">Tuesday</TabTrigger>
              <TabTrigger value="tab3">Wednesday</TabTrigger>
              <TabTrigger value="tab4">Thursday</TabTrigger>
              <TabTrigger value="tab5">Friday</TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Monday schedule</div>
            </TabContent>
            <TabContent value="tab2">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Tuesday schedule</div>
            </TabContent>
            <TabContent value="tab3">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Wednesday schedule</div>
            </TabContent>
            <TabContent value="tab4">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Thursday schedule</div>
            </TabContent>
            <TabContent value="tab5">
              <div style={{ padding: 12, color: 'var(--muted-foreground)' }}>Friday schedule</div>
            </TabContent>
          </Tabs>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Tabs props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"underline" | "pill" | "outline"',
              default: '"underline"',
              description: pt?.props?.['tabs-variant'] ?? 'Visual style of the tab list indicator.',
            },
            {
              name: 'defaultValue',
              type: 'string',
              default: '""',
              description:
                pt?.props?.['tabs-defaultValue'] ?? 'The tab value selected by default in uncontrolled mode.',
            },
            {
              name: 'value',
              type: 'string',
              default: '-',
              description: pt?.props?.['tabs-value'] ?? 'The controlled active tab value.',
            },
            {
              name: 'onValueChange',
              type: '(value: string) => void',
              default: '-',
              description:
                pt?.props?.['tabs-onValueChange'] ??
                'Called when the active tab changes. Use with value for controlled mode.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['tabs-style'] ?? 'Additional styles applied to the root View.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['tabs-children'] ?? 'Compose with TabsList and TabContent.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'TabTrigger props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['tabtrigger-value'] ?? 'The value this trigger activates; must match a TabContent value.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['tabtrigger-icon'] ?? 'Icon element displayed alongside the tab label.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['tabtrigger-children'] ?? 'Tab label text.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['tabtrigger-style'] ?? 'Additional styles applied to the trigger Pressable.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[2] ?? 'TabContent props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['tabcontent-value'] ??
                'The value that activates this content panel; must match a TabTrigger value.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['tabcontent-children'] ?? 'Content rendered when this tab is active.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['tabcontent-style'] ?? 'Additional styles applied to the content View.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
