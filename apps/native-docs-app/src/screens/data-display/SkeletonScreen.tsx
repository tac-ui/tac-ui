import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function SkeletonScreen() {
  return (
    <ScreenLayout
      title="Skeleton"
      description="Placeholder loading states that mimic the shape of content before it loads."
    >
      <Section title="Import">
        <CodePreview code={`import { Skeleton } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default (Rectangle)">
        <ShowcaseCard code={`<Skeleton width="100%" height={20} />`}>
          <Skeleton width="100%" height={20} />
        </ShowcaseCard>
      </Section>

      <Section title="Circle">
        <ShowcaseCard code={`<Skeleton variant="circular" width={48} height={48} />`}>
          <Skeleton variant="circular" width={48} height={48} />
        </ShowcaseCard>
      </Section>

      <Section title="Text Lines">
        <ShowcaseCard code={`<Skeleton variant="text" lines={3} />`}>
          <Skeleton variant="text" lines={3} />
        </ShowcaseCard>
      </Section>

      <Section title="Card-like Layout">
        <ShowcaseCard
          code={`<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Skeleton variant="circular" width={48} height={48} />
  <View style={{ flex: 1, gap: 8 }}>
    <Skeleton width="60%" height={14} />
    <Skeleton width="90%" height={12} />
  </View>
</View>`}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Skeleton variant="circular" width={48} height={48} />
            <View style={{ flex: 1, gap: 8 }}>
              <Skeleton width="60%" height={14} />
              <Skeleton width="90%" height={12} />
            </View>
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Shimmer Animation">
        <ShowcaseCard
          code={`<Skeleton animation="shimmer" width="100%" height={20} />
<Skeleton animation="shimmer" width="75%" height={20} />`}
        >
          <Skeleton animation="shimmer" width="100%" height={20} />
          <Skeleton animation="shimmer" width="75%" height={20} />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: "'rectangular' | 'circular' | 'text'",
              default: "'rectangular'",
              description: 'Shape of the skeleton placeholder.',
            },
            {
              name: 'width',
              type: 'DimensionValue',
              default: '—',
              description: 'Width of the skeleton. Defaults to full width for rectangular.',
            },
            {
              name: 'height',
              type: 'DimensionValue',
              default: '16',
              description: 'Height of the skeleton.',
            },
            {
              name: 'borderRadius',
              type: 'number',
              default: 'auto',
              description: 'Corner radius. Inferred from variant when not set.',
            },
            {
              name: 'animation',
              type: "'pulse' | 'shimmer'",
              default: "'pulse'",
              description: 'Animation style for the loading effect.',
            },
            {
              name: 'lines',
              type: 'number',
              default: '3',
              description: "Number of lines rendered when variant is 'text'.",
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
