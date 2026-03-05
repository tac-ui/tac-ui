import React from 'react';
import { Progress } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function ProgressScreen() {
  return (
    <ScreenLayout
      title="Progress"
      description="Visual indicator for task completion, loading states, or any measurable value."
    >
      <Section title="Import">
        <CodePreview code={`import { Progress } from '@tac-ui/native';`} />
      </Section>

      <Section title="Linear — Different Values">
        <ShowcaseCard
          code={`<Progress value={25} />
<Progress value={50} />
<Progress value={75} />`}
        >
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
        </ShowcaseCard>
      </Section>

      <Section title="With Label">
        <ShowcaseCard
          code={`<Progress value={65} showLabel />
<Progress value={40} showLabel />`}
        >
          <Progress value={65} showLabel />
          <Progress value={40} showLabel />
        </ShowcaseCard>
      </Section>

      <Section title="Sizes">
        <ShowcaseCard
          code={`<Progress value={60} barSize="sm" />
<Progress value={60} barSize="md" />
<Progress value={60} barSize="lg" />`}
        >
          <Progress value={60} barSize="sm" />
          <Progress value={60} barSize="md" />
          <Progress value={60} barSize="lg" />
        </ShowcaseCard>
      </Section>

      <Section title="Circular">
        <ShowcaseCard
          code={`<Progress variant="circular" value={70} showLabel />
<Progress variant="circular" value={40} size={80} showLabel />`}
        >
          <Progress variant="circular" value={70} showLabel />
          <Progress variant="circular" value={40} size={80} showLabel />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'number',
              default: '0',
              description: 'Current progress value.',
            },
            {
              name: 'max',
              type: 'number',
              default: '100',
              description: 'Maximum value used to calculate percentage.',
            },
            {
              name: 'variant',
              type: "'linear' | 'circular'",
              default: "'linear'",
              description: 'Display style — horizontal bar or circular ring.',
            },
            {
              name: 'size',
              type: 'number',
              default: '64',
              description: 'Diameter in pixels for the circular variant.',
            },
            {
              name: 'barSize',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Height of the linear progress bar.',
            },
            {
              name: 'showLabel',
              type: 'boolean',
              default: 'false',
              description: 'When true, renders a percentage label.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
