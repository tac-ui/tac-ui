import React from 'react';
import { Indicator } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function IndicatorScreen() {
  return (
    <ScreenLayout title="Indicator" description="Indeterminate loading indicators in linear and circular styles.">
      <Section title="Import">
        <CodePreview code={`import { Indicator } from '@tac-ui/native';`} />
      </Section>

      <Section title="Linear (Default)">
        <ShowcaseCard code={`<Indicator variant="linear" />`}>
          <Indicator variant="linear" />
        </ShowcaseCard>
      </Section>

      <Section title="Circular">
        <ShowcaseCard code={`<Indicator variant="circular" />`}>
          <Indicator variant="circular" />
        </ShowcaseCard>
      </Section>

      <Section title="Custom Color">
        <ShowcaseCard
          code={`<Indicator variant="linear" color="#f97316" />
<Indicator variant="circular" color="#8b5cf6" />`}
        >
          <Indicator variant="linear" color="#f97316" />
          <Indicator variant="circular" color="#8b5cf6" />
        </ShowcaseCard>
      </Section>

      <Section title="Custom Size (Circular)">
        <ShowcaseCard
          code={`<Indicator variant="circular" size={24} />
<Indicator variant="circular" size={40} />
<Indicator variant="circular" size={64} />`}
        >
          <Indicator variant="circular" size={24} />
          <Indicator variant="circular" size={40} />
          <Indicator variant="circular" size={64} />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: "'linear' | 'circular'",
              default: "'linear'",
              description: 'Visual style of the indicator.',
            },
            {
              name: 'size',
              type: 'number',
              default: '32',
              description: 'Diameter of the circular indicator in dp.',
            },
            {
              name: 'color',
              type: 'string',
              default: 'theme.colors.point',
              description: 'Color of the animated bar or ring.',
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
