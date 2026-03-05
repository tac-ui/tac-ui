import React from 'react';
import { View } from 'react-native';
import { Avatar } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function AvatarScreen() {
  return (
    <ScreenLayout
      title="Avatar"
      description="Circular user profile images with fallback initials, status indicators, and multiple sizes."
    >
      <Section title="Import">
        <CodePreview code={`import { Avatar } from '@tac-ui/native';`} />
      </Section>

      <Section title="With Initials">
        <ShowcaseCard code={`<Avatar initials="JH" />`}>
          <Avatar initials="JH" />
        </ShowcaseCard>
      </Section>

      <Section title="Sizes">
        <ShowcaseCard
          code={`<Avatar initials="SM" size="sm" />
<Avatar initials="MD" size="md" />
<Avatar initials="LG" size="lg" />
<Avatar initials="XL" size="xl" />`}
        >
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar initials="SM" size="sm" />
            <Avatar initials="MD" size="md" />
            <Avatar initials="LG" size="lg" />
            <Avatar initials="XL" size="xl" />
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="With Status">
        <ShowcaseCard
          code={`<Avatar initials="ON" size="lg" status="online" />
<Avatar initials="BZ" size="lg" status="busy" />
<Avatar initials="AW" size="lg" status="away" />
<Avatar initials="OF" size="lg" status="offline" />`}
        >
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar initials="ON" size="lg" status="online" />
            <Avatar initials="BZ" size="lg" status="busy" />
            <Avatar initials="AW" size="lg" status="away" />
            <Avatar initials="OF" size="lg" status="offline" />
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Fallback (No Image, No Initials)">
        <ShowcaseCard code={`<Avatar size="md" />`}>
          <Avatar size="md" />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'src',
              type: 'ImageSourcePropType | string',
              default: '—',
              description: 'Image source URI or require() reference.',
            },
            {
              name: 'initials',
              type: 'string',
              default: '—',
              description: 'Text initials shown when no image is available.',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg' | 'xl'",
              default: "'md'",
              description: 'Size of the avatar circle.',
            },
            {
              name: 'status',
              type: "'online' | 'offline' | 'busy' | 'away'",
              default: '—',
              description: 'Status indicator dot shown in the bottom-right corner.',
            },
            {
              name: 'alt',
              type: 'string',
              default: '—',
              description: 'Accessibility label for the image.',
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
