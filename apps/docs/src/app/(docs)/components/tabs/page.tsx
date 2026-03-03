'use client';

import React from 'react';
import { User, Settings, Bell } from '@tac-ui/icon';
import { Tabs, TabsList, TabTrigger, TabContent } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function TabsPage() {
  const pt = usePageTranslation('tabs');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Tabs'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Organizes content into multiple panels, allowing users to switch between views.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['underline']?.title ?? 'Underline'}>
        <DocText>{pt?.sections?.['underline']?.texts?.[0] ?? 'The default underline variant renders tabs with a bottom border and an animated indicator that slides between active tabs. Use this for content-heavy pages where tabs span the full width.'}</DocText>
        <Showcase code={`<Tabs defaultValue="tab1" variant="underline">
  <TabsList>
    <TabTrigger value="tab1">Account</TabTrigger>
    <TabTrigger value="tab2">Password</TabTrigger>
    <TabTrigger value="tab3">Settings</TabTrigger>
  </TabsList>
  <TabContent value="tab1">Account settings content.</TabContent>
  <TabContent value="tab2">Password settings content.</TabContent>
  <TabContent value="tab3">General settings content.</TabContent>
</Tabs>`}>
          <Tabs defaultValue="tab1" variant="underline">
            <TabsList>
              <TabTrigger value="tab1">Account</TabTrigger>
              <TabTrigger value="tab2">Password</TabTrigger>
              <TabTrigger value="tab3">Settings</TabTrigger>
            </TabsList>
            <TabContent value="tab1">Account settings content.</TabContent>
            <TabContent value="tab2">Password settings content.</TabContent>
            <TabContent value="tab3">General settings content.</TabContent>
          </Tabs>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['pill']?.title ?? 'Pill'}>
        <DocText>{pt?.sections?.['pill']?.texts?.[0] ?? 'The pill variant wraps the tab list in a secondary-colored container and uses a filled pill indicator. Use this for compact, inline tab groups.'}</DocText>
        <Showcase code={`<Tabs defaultValue="tab1" variant="pill">
  <TabsList>
    <TabTrigger value="tab1">Account</TabTrigger>
    <TabTrigger value="tab2">Password</TabTrigger>
    <TabTrigger value="tab3">Settings</TabTrigger>
  </TabsList>
  <TabContent value="tab1">Account settings content.</TabContent>
  <TabContent value="tab2">Password settings content.</TabContent>
  <TabContent value="tab3">General settings content.</TabContent>
</Tabs>`}>
          <Tabs defaultValue="tab1" variant="pill">
            <TabsList>
              <TabTrigger value="tab1">Account</TabTrigger>
              <TabTrigger value="tab2">Password</TabTrigger>
              <TabTrigger value="tab3">Settings</TabTrigger>
            </TabsList>
            <TabContent value="tab1">Account settings content.</TabContent>
            <TabContent value="tab2">Password settings content.</TabContent>
            <TabContent value="tab3">General settings content.</TabContent>
          </Tabs>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['outline']?.title ?? 'Outline'}>
        <DocText>{pt?.sections?.['outline']?.texts?.[0] ?? 'The outline variant renders the tab list as a bordered control group. The active tab is highlighted with a filled background and uses an animated color transition via Framer Motion layout.'}</DocText>
        <Showcase code={`<Tabs defaultValue="tab1" variant="outline">
  <TabsList>
    <TabTrigger value="tab1">Account</TabTrigger>
    <TabTrigger value="tab2">Password</TabTrigger>
    <TabTrigger value="tab3">Settings</TabTrigger>
  </TabsList>
  <TabContent value="tab1">Account settings content.</TabContent>
  <TabContent value="tab2">Password settings content.</TabContent>
  <TabContent value="tab3">General settings content.</TabContent>
</Tabs>`}>
          <Tabs defaultValue="tab1" variant="outline">
            <TabsList>
              <TabTrigger value="tab1">Account</TabTrigger>
              <TabTrigger value="tab2">Password</TabTrigger>
              <TabTrigger value="tab3">Settings</TabTrigger>
            </TabsList>
            <TabContent value="tab1">Account settings content.</TabContent>
            <TabContent value="tab2">Password settings content.</TabContent>
            <TabContent value="tab3">General settings content.</TabContent>
          </Tabs>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['icon']?.title ?? 'Icon'}>
        <DocText>{pt?.sections?.['icon']?.texts?.[0] ?? 'The icon variant renders icon-only tabs by default, expanding the active tab to reveal its label with a spring animation. Pass an icon node via the icon prop on each TabTrigger.'}</DocText>
        <Showcase code={`<Tabs defaultValue="tab1" variant="icon">
  <TabsList>
    <TabTrigger value="tab1" icon={<User />}>Account</TabTrigger>
    <TabTrigger value="tab2" icon={<Settings />}>Settings</TabTrigger>
    <TabTrigger value="tab3" icon={<Bell />}>Notifications</TabTrigger>
  </TabsList>
  <TabContent value="tab1">Account settings content.</TabContent>
  <TabContent value="tab2">General settings content.</TabContent>
  <TabContent value="tab3">Notification preferences content.</TabContent>
</Tabs>`}>
          <Tabs defaultValue="tab1" variant="icon">
            <TabsList>
              <TabTrigger value="tab1" icon={<User />}>Account</TabTrigger>
              <TabTrigger value="tab2" icon={<Settings />}>Settings</TabTrigger>
              <TabTrigger value="tab3" icon={<Bell />}>Notifications</TabTrigger>
            </TabsList>
            <TabContent value="tab1">Account settings content.</TabContent>
            <TabContent value="tab2">General settings content.</TabContent>
            <TabContent value="tab3">Notification preferences content.</TabContent>
          </Tabs>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Tabs props:'}</DocText>
        <PropsTable data={[
          { name: 'variant', type: '"underline" | "pill" | "outline" | "icon"', default: '"underline"', description: pt?.props?.['variant'] ?? 'Visual style variant of the tab list.' },
          { name: 'defaultValue', type: 'string', default: '-', description: pt?.props?.['defaultValue'] ?? 'The tab value open by default in uncontrolled mode.' },
          { name: 'value', type: 'string', default: '-', description: pt?.props?.['value'] ?? 'The controlled active tab value.' },
          { name: 'onValueChange', type: '(value: string) => void', default: '-', description: pt?.props?.['onValueChange'] ?? 'Called when the active tab changes. Use with value for controlled mode.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['children'] ?? 'Compose with TabsList, TabTrigger, and TabContent.' },
        ]} />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'TabTrigger props:'}</DocText>
        <PropsTable data={[
          { name: 'value', type: 'string', default: '-', description: pt?.props?.['tabTriggerValue'] ?? 'The value this trigger activates; must match a TabContent value.' },
          { name: 'icon', type: 'React.ReactNode', default: '-', description: pt?.props?.['tabTriggerIcon'] ?? 'Icon element to display (used with icon variant; shown collapsed on inactive tabs).' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['tabTriggerChildren'] ?? 'Tab label text.' },
        ]} />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[2] ?? 'TabContent props:'}</DocText>
        <PropsTable data={[
          { name: 'value', type: 'string', default: '-', description: pt?.props?.['tabContentValue'] ?? 'The value that activates this content panel; must match a TabTrigger value.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['tabContentChildren'] ?? 'Content rendered when this tab is active.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['tabContentClassName'] ?? 'Additional CSS class names.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
