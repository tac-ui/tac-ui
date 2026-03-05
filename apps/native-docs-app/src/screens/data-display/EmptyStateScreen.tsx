import React from 'react';
import { EmptyState, Button } from '@tac-ui/native';
import { Inbox } from '@tac-ui/icon-native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function EmptyStateScreen() {
  return (
    <ScreenLayout
      title="EmptyState"
      description="Placeholder UI shown when there is no content to display, with optional icon and action."
    >
      <Section title="Import">
        <CodePreview code={`import { EmptyState } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`<EmptyState
  title="No results found"
  description="Try adjusting your search or filter to find what you're looking for."
/>`}
        >
          <EmptyState
            title="No results found"
            description="Try adjusting your search or filter to find what you're looking for."
          />
        </ShowcaseCard>
      </Section>

      <Section title="With Icon">
        <ShowcaseCard
          code={`import { Inbox } from '@tac-ui/icon-native';

<EmptyState
  icon={<Inbox size={40} color="#6b7280" />}
  title="Your inbox is empty"
  description="Messages you receive will appear here."
/>`}
        >
          <EmptyState
            icon={<Inbox size={40} color="#6b7280" />}
            title="Your inbox is empty"
            description="Messages you receive will appear here."
          />
        </ShowcaseCard>
      </Section>

      <Section title="With Action Button">
        <ShowcaseCard
          code={`<EmptyState
  icon={<Inbox size={40} color="#6b7280" />}
  title="No items yet"
  description="Get started by creating your first item."
  action={
    <Button variant="primary" onPress={() => {}}>
      Create Item
    </Button>
  }
/>`}
        >
          <EmptyState
            icon={<Inbox size={40} color="#6b7280" />}
            title="No items yet"
            description="Get started by creating your first item."
            action={
              <Button variant="primary" onPress={() => {}}>
                Create Item
              </Button>
            }
          />
        </ShowcaseCard>
      </Section>

      <Section title="Animated Visibility">
        <ShowcaseCard
          code={`<EmptyState
  visible={true}
  title="Visible State"
  description="Animates in and out when the visible prop changes."
/>`}
        >
          <EmptyState
            visible={true}
            title="Visible State"
            description="Animates in and out when the visible prop changes."
          />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'title',
              type: 'string',
              default: '—',
              description: 'Primary heading text of the empty state.',
            },
            {
              name: 'description',
              type: 'string',
              default: '—',
              description: 'Secondary supporting text below the title.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '—',
              description: 'Icon or illustration rendered above the title.',
            },
            {
              name: 'action',
              type: 'React.ReactNode',
              default: '—',
              description: 'Action element (e.g. Button) rendered below the description.',
            },
            {
              name: 'visible',
              type: 'boolean',
              default: 'true',
              description: 'Controls visibility with entrance/exit animations.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '—',
              description: 'Additional styles applied to the container.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
