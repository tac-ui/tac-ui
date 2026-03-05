import React from 'react';
import { View } from 'react-native';
import { Badge } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function BadgeScreen() {
  return (
    <ScreenLayout title="Badge" description="Small status indicators used to label, categorize, or annotate content.">
      <Section title="Import">
        <CodePreview code={`import { Badge } from '@tac-ui/native';`} />
      </Section>

      <Section title="Variants">
        <ShowcaseCard
          code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>`}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Text Content">
        <ShowcaseCard
          code={`<Badge variant="default">Badge</Badge>
<Badge variant="info">New</Badge>
<Badge variant="destructive" count={99} />`}
        >
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Badge variant="default">Badge</Badge>
            <Badge variant="info">New</Badge>
            <Badge variant="destructive" count={99} />
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Interactive">
        <ShowcaseCard
          code={`<Badge variant="default" interactive onPress={() => {}}>
  Click me
</Badge>`}
        >
          <Badge variant="default" interactive onPress={() => {}}>
            Click me
          </Badge>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: "'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info'",
              default: "'default'",
              description: 'Visual style variant of the badge.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'Content rendered inside the badge.',
            },
            {
              name: 'count',
              type: 'number',
              default: '—',
              description: 'Numeric count to display. Animates on change.',
            },
            {
              name: 'interactive',
              type: 'boolean',
              default: 'false',
              description: 'Enables press interactions with scale animation.',
            },
            {
              name: 'onPress',
              type: '() => void',
              default: '—',
              description: 'Callback fired when the badge is pressed.',
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
