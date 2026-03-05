'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from '@tac-ui/web';
import { Star, Zap, Shield } from '@tac-ui/icon';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  Showcase,
  PropsTable,
  DocText,
  PreviewCode,
} from '@/components/docs/DocPage';
import { Playground } from '@/components/docs/Playground';
import { usePageTranslation } from '@/i18n';

export default function CardPage() {
  const pt = usePageTranslation('card');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Card'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A versatile container for grouping related content with multiple visual variants, interactive hover lift, and subtle 3D tilt.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@tac-ui/web';`}
        />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Card props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['default', 'accent', 'glass', 'flat'],
              defaultValue: 'default',
            },
            label: {
              type: 'text',
              label: 'Title',
              defaultValue: 'Card Title',
            },
          }}
          render={(values) => (
            <Card variant={values.variant as 'default' | 'accent' | 'glass' | 'flat'} className="min-w-[240px]">
              <CardHeader>
                <CardTitle>{values.label as string}</CardTitle>
                <CardDescription>A summary of your current project status.</CardDescription>
              </CardHeader>
              <CardContent>Track progress, manage tasks, and collaborate with your team.</CardContent>
            </Card>
          )}
          code={(values) =>
            `<Card variant="${values.variant}">
  <CardHeader>
    <CardTitle>${values.label}</CardTitle>
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
        <Showcase
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
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>A summary of your current project status.</CardDescription>
              </CardHeader>
              <CardContent>Track progress, manage tasks, and collaborate with your team.</CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Four visual styles are available: default (bordered surface), accent (colored border), glass (backdrop-blur frosted), and flat (no border or shadow).'}
        </DocText>
        <Showcase
          code={`<Card variant="default">...</Card>
<Card variant="accent">...</Card>
<Card variant="glass">...</Card>
<Card variant="flat">...</Card>`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {(['default', 'accent', 'glass', 'flat'] as const).map((v) => (
              <Card key={v} variant={v} className="min-w-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{v.charAt(0).toUpperCase() + v.slice(1)}</CardTitle>
                    <Badge variant="outline">{v}</Badge>
                  </div>
                  <CardDescription>The {v} card variant.</CardDescription>
                </CardHeader>
                <CardContent>Content sits here with proper spacing and typography.</CardContent>
              </Card>
            ))}
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['interactive']?.title ?? 'Interactive'}>
        <DocText>
          {pt?.sections?.['interactive']?.texts?.[0] ??
            'Setting interactive enables a spring-animated hover lift and press scale, making the card behave like a clickable element with keyboard focus support.'}
        </DocText>
        <Showcase
          code={`<Card interactive>
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
    <CardDescription>Hover to see the gentle lift effect.</CardDescription>
  </CardHeader>
</Card>`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <Card interactive>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-[var(--point)]" />
                  <CardTitle>Favorites</CardTitle>
                </div>
                <CardDescription>Your starred items</CardDescription>
              </CardHeader>
              <CardContent>12 items saved</CardContent>
            </Card>
            <Card interactive variant="accent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[var(--point)]" />
                  <CardTitle>Quick Actions</CardTitle>
                </div>
                <CardDescription>Frequently used tools</CardDescription>
              </CardHeader>
              <CardContent>5 actions available</CardContent>
            </Card>
            <Card interactive variant="glass">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[var(--point)]" />
                  <CardTitle>Security</CardTitle>
                </div>
                <CardDescription>Account protection</CardDescription>
              </CardHeader>
              <CardContent>All checks passed</CardContent>
            </Card>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"default" | "accent" | "glass" | "flat"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style of the card.',
            },
            {
              name: 'interactive',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['interactive'] ??
                'Enables hover/active/focus spring interactions with a lift and press animation.',
            },
            {
              name: 'tilt',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['tilt'] ??
                'When true and interactive, applies a subtle cursor-tracking 3D tilt (±3°). Requires interactive.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the card root.',
            },
            {
              name: 'style',
              type: 'React.CSSProperties',
              default: '-',
              description:
                pt?.props?.['style'] ??
                'Inline styles merged with tilt perspective wrapper styles when tilt is enabled.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ??
                'Card content — typically CardHeader, CardContent, and CardFooter sub-components.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
