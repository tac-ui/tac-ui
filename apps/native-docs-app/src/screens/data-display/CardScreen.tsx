import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function CardScreen() {
  return (
    <ScreenLayout title="Card" description="Flexible surface container for grouping related content and actions.">
      <Section title="Import">
        <CodePreview
          code={`import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
} from '@tac-ui/native';`}
        />
      </Section>

      <Section title="Default Card">
        <ShowcaseCard
          code={`<Card>
  <CardHeader>
    <CardTitle>Project Overview</CardTitle>
    <CardDescription>A summary of your current project status.</CardDescription>
  </CardHeader>
  <CardContent>
    <CardDescription>Track progress, manage tasks, and collaborate with your team.</CardDescription>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Details</Button>
  </CardFooter>
</Card>`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>A summary of your current project status.</CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>Track progress, manage tasks, and collaborate with your team.</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </CardFooter>
          </Card>
        </ShowcaseCard>
      </Section>

      <Section title="Accent Variant">
        <ShowcaseCard
          code={`<Card variant="accent">
  <CardHeader>
    <CardTitle>Accent Card</CardTitle>
    <CardDescription>Highlighted with the primary accent color border.</CardDescription>
  </CardHeader>
</Card>`}
        >
          <Card variant="accent">
            <CardHeader>
              <CardTitle>Accent Card</CardTitle>
              <CardDescription>Highlighted with the primary accent color border.</CardDescription>
            </CardHeader>
          </Card>
        </ShowcaseCard>
      </Section>

      <Section title="Flat Variant">
        <ShowcaseCard
          code={`<Card variant="flat">
  <CardHeader>
    <CardTitle>Flat Card</CardTitle>
    <CardDescription>Uses the surface color without borders or shadows.</CardDescription>
  </CardHeader>
</Card>`}
        >
          <Card variant="flat">
            <CardHeader>
              <CardTitle>Flat Card</CardTitle>
              <CardDescription>Uses the surface color without borders or shadows.</CardDescription>
            </CardHeader>
          </Card>
        </ShowcaseCard>
      </Section>

      <Section title="Glass Variant">
        <ShowcaseCard
          code={`<Card variant="glass">
  <CardHeader>
    <CardTitle>Glass Card</CardTitle>
    <CardDescription>Semi-transparent frosted glass appearance.</CardDescription>
  </CardHeader>
</Card>`}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>Semi-transparent frosted glass appearance.</CardDescription>
            </CardHeader>
          </Card>
        </ShowcaseCard>
      </Section>

      <Section title="Interactive Card">
        <ShowcaseCard
          code={`<Card interactive onPress={() => {}}>
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
    <CardDescription>Tap to see the press effect.</CardDescription>
  </CardHeader>
</Card>`}
        >
          <Card interactive onPress={() => {}}>
            <CardHeader>
              <CardTitle>Clickable Card</CardTitle>
              <CardDescription>Tap to see the press effect.</CardDescription>
            </CardHeader>
          </Card>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference — Card">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: "'default' | 'accent' | 'flat' | 'glass'",
              default: "'default'",
              description: 'Visual style of the card surface.',
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
              description: 'Callback fired when the card is pressed.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'Card sub-components: Header, Content, Footer, etc.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
