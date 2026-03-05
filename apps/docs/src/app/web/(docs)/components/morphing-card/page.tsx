'use client';

import React from 'react';
import { MorphingCard, CardTitle, CardDescription, Badge, Button } from '@tac-ui/web';
import { Zap } from '@tac-ui/icon';
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
import { usePageTranslation } from '@/i18n';

export default function MorphingCardPage() {
  const pt = usePageTranslation('morphing-card');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'MorphingCard'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A glass-morphic card that smoothly morphs between a compact preview and an expanded detail view using Framer Motion layout animations.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { MorphingCard } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'Click the card to expand it into a full-screen overlay with detail content. Press Escape or click the backdrop to collapse.'}
        </DocText>
        <Showcase
          code={`<MorphingCard
  layoutId="demo"
  preview={
    <div>
      <CardTitle>Project Alpha</CardTitle>
      <CardDescription>A brief overview of the project.</CardDescription>
    </div>
  }
  detail={
    <div className="space-y-3">
      <CardTitle>Project Alpha</CardTitle>
      <CardDescription>
        Project Alpha is a next-generation platform designed
        to streamline team collaboration and project tracking.
      </CardDescription>
      <div className="flex gap-2">
        <Badge variant="secondary">In Progress</Badge>
        <Badge variant="outline">v2.1</Badge>
      </div>
    </div>
  }
/>`}
        >
          <MorphingCard
            layoutId="demo-default"
            preview={
              <div>
                <CardTitle>Project Alpha</CardTitle>
                <CardDescription>A brief overview of the project.</CardDescription>
              </div>
            }
            detail={
              <div className="space-y-3">
                <CardTitle>Project Alpha</CardTitle>
                <CardDescription>
                  Project Alpha is a next-generation platform designed to streamline team collaboration and project
                  tracking.
                </CardDescription>
                <div className="flex gap-2">
                  <Badge variant="secondary">In Progress</Badge>
                  <Badge variant="outline">v2.1</Badge>
                </div>
              </div>
            }
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-actions']?.title ?? 'With Actions'}>
        <DocText>
          {pt?.sections?.['with-actions']?.texts?.[0] ??
            'The expanded detail view can contain interactive elements like buttons. Clicking them does not collapse the card.'}
        </DocText>
        <Showcase
          code={`<MorphingCard
  layoutId="actions"
  preview={
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
        <Zap size={18} className="text-[var(--primary-foreground)]" />
      </div>
      <div>
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>Get started in seconds.</CardDescription>
      </div>
    </div>
  }
  detail={
    <div className="space-y-4">
      <CardTitle>Quick Start Guide</CardTitle>
      <CardDescription>
        Follow these steps to set up your environment
        and deploy your first application.
      </CardDescription>
      <div className="flex gap-2">
        <Button size="sm">Get Started</Button>
        <Button size="sm" variant="outline">Learn More</Button>
      </div>
    </div>
  }
/>`}
        >
          <MorphingCard
            layoutId="demo-actions"
            preview={
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <Zap size={18} className="text-[var(--primary-foreground)]" />
                </div>
                <div>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>Get started in seconds.</CardDescription>
                </div>
              </div>
            }
            detail={
              <div className="space-y-4">
                <CardTitle>Quick Start Guide</CardTitle>
                <CardDescription>
                  Follow these steps to set up your environment and deploy your first application.
                </CardDescription>
                <div className="flex gap-2">
                  <Button size="sm">Get Started</Button>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            }
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Pass expanded and onExpandedChange to control the card state externally. Useful for programmatic open/close or syncing with other UI state.'}
        </DocText>
        <PreviewCode
          code={`const [open, setOpen] = React.useState(false);

<MorphingCard
  layoutId="controlled"
  expanded={open}
  onExpandedChange={setOpen}
  preview={<CardTitle>Controlled Card</CardTitle>}
  detail={<CardDescription>This card is controlled externally.</CardDescription>}
/>
<Button onClick={() => setOpen(true)}>Open Card</Button>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'layoutId',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['layoutId'] ?? 'Unique ID for Framer Motion layout morphing synchronization. Required.',
            },
            {
              name: 'expanded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['expanded'] ??
                'Whether the card is in expanded state. Use with onExpandedChange for controlled mode.',
            },
            {
              name: 'onExpandedChange',
              type: '(expanded: boolean) => void',
              default: '-',
              description: pt?.props?.['onExpandedChange'] ?? 'Called when the expansion state changes.',
            },
            {
              name: 'preview',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['preview'] ?? 'Content shown in the compact (collapsed) state.',
            },
            {
              name: 'detail',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['detail'] ?? 'Content shown in the expanded overlay state.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'Fallback content used when preview or detail is not provided.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS classes applied to the card container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
