import React from 'react';
import { Text } from 'react-native';
import { Tabs, TabsList, TabTrigger, TabContent, useTacNativeTheme } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

function TabContentText({ children }: { children: string }) {
  const { theme } = useTacNativeTheme();
  return <Text style={{ color: theme.colors.mutedForeground, fontSize: 14, lineHeight: 20 }}>{children}</Text>;
}

export default function TabsScreen() {
  return (
    <ScreenLayout title="Tabs" description="Organizes content into multiple panels with a tabbed navigation interface.">
      <Section title="Import">
        <CodePreview code={`import { Tabs, TabsList, TabTrigger, TabContent } from '@tac-ui/native';`} />
      </Section>

      <Section title="Underline (Default)">
        <ShowcaseCard
          code={`<Tabs defaultValue="tab1">\n  <TabsList>\n    <TabTrigger value="tab1">Overview</TabTrigger>\n    <TabTrigger value="tab2">Details</TabTrigger>\n    <TabTrigger value="tab3">Settings</TabTrigger>\n  </TabsList>\n  <TabContent value="tab1">\n    <Text>Overview content</Text>\n  </TabContent>\n  <TabContent value="tab2">\n    <Text>Details content</Text>\n  </TabContent>\n  <TabContent value="tab3">\n    <Text>Settings content</Text>\n  </TabContent>\n</Tabs>`}
        >
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabTrigger value="tab1">Overview</TabTrigger>
              <TabTrigger value="tab2">Details</TabTrigger>
              <TabTrigger value="tab3">Settings</TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <TabContentText>Overview: Your account summary and recent activity.</TabContentText>
            </TabContent>
            <TabContent value="tab2">
              <TabContentText>Details: In-depth information about your account.</TabContentText>
            </TabContent>
            <TabContent value="tab3">
              <TabContentText>Settings: Manage your preferences and notifications.</TabContentText>
            </TabContent>
          </Tabs>
        </ShowcaseCard>
      </Section>

      <Section title="Pill Variant">
        <ShowcaseCard
          code={`<Tabs defaultValue="tab1" variant="pill">\n  <TabsList>\n    <TabTrigger value="tab1">Photos</TabTrigger>\n    <TabTrigger value="tab2">Videos</TabTrigger>\n    <TabTrigger value="tab3">Files</TabTrigger>\n  </TabsList>\n  ...\n</Tabs>`}
        >
          <Tabs defaultValue="tab1" variant="pill">
            <TabsList>
              <TabTrigger value="tab1">Photos</TabTrigger>
              <TabTrigger value="tab2">Videos</TabTrigger>
              <TabTrigger value="tab3">Files</TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <TabContentText>Browse your photo library.</TabContentText>
            </TabContent>
            <TabContent value="tab2">
              <TabContentText>Watch your saved videos.</TabContentText>
            </TabContent>
            <TabContent value="tab3">
              <TabContentText>Access your documents and files.</TabContentText>
            </TabContent>
          </Tabs>
        </ShowcaseCard>
      </Section>

      <Section title="Outline Variant">
        <ShowcaseCard
          code={`<Tabs defaultValue="tab1" variant="outline">\n  <TabsList>\n    <TabTrigger value="tab1">All</TabTrigger>\n    <TabTrigger value="tab2">Active</TabTrigger>\n    <TabTrigger value="tab3">Archived</TabTrigger>\n  </TabsList>\n  ...\n</Tabs>`}
        >
          <Tabs defaultValue="tab1" variant="outline">
            <TabsList>
              <TabTrigger value="tab1">All</TabTrigger>
              <TabTrigger value="tab2">Active</TabTrigger>
              <TabTrigger value="tab3">Archived</TabTrigger>
            </TabsList>
            <TabContent value="tab1">
              <TabContentText>All items across every status.</TabContentText>
            </TabContent>
            <TabContent value="tab2">
              <TabContentText>Currently active items only.</TabContentText>
            </TabContent>
            <TabContent value="tab3">
              <TabContentText>Previously archived items.</TabContentText>
            </TabContent>
          </Tabs>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: "'underline' | 'pill' | 'outline'",
              default: "'underline'",
              description: 'Visual style of the tab list.',
            },
            {
              name: 'defaultValue',
              type: 'string',
              default: "''",
              description: 'The value of the tab selected by default.',
            },
            {
              name: 'value',
              type: 'string',
              default: '—',
              description: 'Controlled active tab value.',
            },
            {
              name: 'onValueChange',
              type: '(value: string) => void',
              default: '—',
              description: 'Called when the active tab changes.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'TabsList and TabContent components.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
