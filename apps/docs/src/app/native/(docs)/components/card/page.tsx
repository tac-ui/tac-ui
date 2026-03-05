'use client';

import React from 'react';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeCardPage() {
  const pt = usePageTranslation('native-card');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Card'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A versatile container for grouping related content with multiple visual variants and optional press interaction.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@tac-ui/native';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>{pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Card props below.'}</DocText>
        <NativePlayground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['default', 'accent', 'flat'],
              defaultValue: 'default',
            },
            interactive: {
              type: 'boolean',
              label: 'Interactive',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <Card variant={values.variant as 'default'} interactive={values.interactive as boolean}>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>A summary of your current project status.</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          )}
          code={(values) =>
            `<Card variant="${values.variant}"${values.interactive ? ' interactive' : ''}>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>A summary of your current project status.</CardDescription>
  </CardHeader>
  <CardContent>Track progress, manage tasks, and collaborate with your team.</CardContent>
</Card>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The default card variant uses a bordered surface with a subtle shadow, composed with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter sub-components.'}
        </DocText>
        <NativeShowcase
          code={`<Card>
  <CardHeader>
    <CardTitle>Project Overview</CardTitle>
    <CardDescription>A summary of your current project status.</CardDescription>
  </CardHeader>
  <CardContent>Track progress, manage tasks, and collaborate with your team.</CardContent>
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
            <CardFooter>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </CardFooter>
          </Card>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Three visual styles are available: default (bordered surface with shadow), accent (colored border), and flat (no border or shadow).'}
        </DocText>
        <NativeShowcase
          code={`<Card variant="default">
  <CardHeader>
    <CardTitle>Default</CardTitle>
    <CardDescription>The default card variant.</CardDescription>
  </CardHeader>
</Card>
<Card variant="accent">
  <CardHeader>
    <CardTitle>Accent</CardTitle>
    <CardDescription>The accent card variant.</CardDescription>
  </CardHeader>
</Card>
<Card variant="flat">
  <CardHeader>
    <CardTitle>Flat</CardTitle>
    <CardDescription>The flat card variant.</CardDescription>
  </CardHeader>
</Card>`}
        >
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>The default card variant.</CardDescription>
            </CardHeader>
          </Card>
          <Card variant="accent">
            <CardHeader>
              <CardTitle>Accent</CardTitle>
              <CardDescription>The accent card variant.</CardDescription>
            </CardHeader>
          </Card>
          <Card variant="flat">
            <CardHeader>
              <CardTitle>Flat</CardTitle>
              <CardDescription>The flat card variant.</CardDescription>
            </CardHeader>
          </Card>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['pressable-card']?.title ?? 'Interactive'}>
        <DocText>
          {pt?.sections?.['pressable-card']?.texts?.[0] ??
            'Setting interactive enables a press scale animation, making the card behave like a tappable element.'}
        </DocText>
        <NativeShowcase
          code={`<Card interactive onPress={() => console.log('card pressed')}>
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
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"default" | "accent" | "flat"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style of the card.',
            },
            {
              name: 'interactive',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['interactive'] ??
                'Enables press scale animation. Automatically enabled when onPress is provided.',
            },
            {
              name: 'onPress',
              type: '() => void',
              default: '-',
              description: pt?.props?.['onPress'] ?? 'Press handler. Implicitly enables interactive mode when set.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ??
                'Card content — typically CardHeader, CardContent, and CardFooter sub-components.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the card container.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sub-component-api-reference']?.title ?? 'Sub-component API Reference'}>
        <PropsTable
          data={[
            {
              name: 'CardHeader',
              type: 'ViewProps',
              default: '-',
              description:
                pt?.props?.['CardHeader'] ?? 'Vertical container with a small gap for CardTitle and CardDescription.',
            },
            {
              name: 'CardTitle',
              type: 'ViewProps & { children }',
              default: '-',
              description:
                pt?.props?.['CardTitle'] ?? 'Renders a semibold title. Strings are auto-wrapped in a Text component.',
            },
            {
              name: 'CardDescription',
              type: 'ViewProps & { children }',
              default: '-',
              description: pt?.props?.['CardDescription'] ?? 'Renders muted descriptive text below the title.',
            },
            {
              name: 'CardContent',
              type: 'ViewProps',
              default: '-',
              description: pt?.props?.['CardContent'] ?? 'Unstyled container for the main card body content.',
            },
            {
              name: 'CardFooter',
              type: 'ViewProps',
              default: '-',
              description:
                pt?.props?.['CardFooter'] ?? 'Horizontal row container for action buttons and footer elements.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
