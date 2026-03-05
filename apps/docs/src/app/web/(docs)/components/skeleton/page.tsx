'use client';

import React from 'react';
import { Skeleton, HStack } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
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

export default function SkeletonPage() {
  const pt = usePageTranslation('skeleton');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Skeleton'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A loading placeholder that mimics content layout while data is being fetched.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Skeleton } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Skeleton props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['rectangular', 'circular', 'text'],
              defaultValue: 'rectangular',
            },
            animation: {
              type: 'select',
              label: 'Animation',
              options: ['shimmer', 'pulse'],
              defaultValue: 'shimmer',
            },
          }}
          render={(values) => {
            const variant = values.variant as 'rectangular' | 'circular' | 'text';
            const animation = values.animation as 'shimmer' | 'pulse';
            if (variant === 'circular') {
              return <Skeleton variant={variant} animation={animation} width={56} height={56} />;
            }
            if (variant === 'text') {
              return (
                <div className="w-full">
                  <Skeleton variant={variant} animation={animation} lines={3} />
                </div>
              );
            }
            return <Skeleton variant={variant} animation={animation} width="100%" height={80} />;
          }}
          code={(values) => {
            const variant = values.variant;
            const animation = values.animation;
            if (variant === 'circular') {
              return `<Skeleton variant="${variant}" animation="${animation}" width={56} height={56} />`;
            }
            if (variant === 'text') {
              return `<Skeleton variant="${variant}" animation="${animation}" lines={3} />`;
            }
            return `<Skeleton variant="${variant}" animation="${animation}" width="100%" height={80} />`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['text']?.title ?? 'Text'}>
        <DocText>{pt?.sections?.['text']?.texts?.[0] ?? 'Multiple stacked lines simulating a text block.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Skeleton variant="text" lines={3} />`}>
          <div className="w-full">
            <Skeleton variant="text" lines={3} />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['rectangular']?.title ?? 'Rectangular'}>
        <DocText>
          {pt?.sections?.['rectangular']?.texts?.[0] ?? 'Rectangle placeholder for images, cards, or blocks.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Skeleton variant="rectangular" width="100%" height={120} />`}
        >
          <Skeleton variant="rectangular" width="100%" height={120} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['circular']?.title ?? 'Circular'}>
        <DocText>
          {pt?.sections?.['circular']?.texts?.[0] ?? 'Circle placeholder typically used for avatars or icons.'}
        </DocText>
        <Showcase
          code={`<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="circular" width={56} height={56} />
<Skeleton variant="circular" width={72} height={72} />`}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={56} height={56} />
          <Skeleton variant="circular" width={72} height={72} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['animation']?.title ?? 'Animation'}>
        <DocText>
          {pt?.sections?.['animation']?.texts?.[0] ??
            'Choose between a sweeping shimmer highlight or a subtle pulse fade.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<Skeleton animation="shimmer" width="100%" height={48} />
<Skeleton animation="pulse" width="100%" height={48} />`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-[var(--muted-foreground)]">shimmer</span>
              <Skeleton animation="shimmer" width="100%" height={48} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-[var(--muted-foreground)]">pulse</span>
              <Skeleton animation="pulse" width="100%" height={48} />
            </div>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['card-composition']?.title ?? 'Card Composition'}>
        <DocText>
          {pt?.sections?.['card-composition']?.texts?.[0] ??
            'Combine skeletons to simulate a card with an avatar and text.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch"
          code={`<HStack gap="md" align="start">
  <Skeleton variant="circular" width={48} height={48} />
  <div className="flex flex-col gap-2 flex-1">
    <Skeleton variant="rectangular" width="40%" height={14} />
    <Skeleton variant="text" lines={2} />
  </div>
</HStack>`}
        >
          <HStack gap="md" align="start" className="w-full">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton variant="rectangular" width="40%" height={14} />
              <Skeleton variant="text" lines={2} />
            </div>
          </HStack>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"rectangular" | "circular" | "text"',
              default: '"rectangular"',
              description: pt?.props?.['variant'] ?? 'Shape of the skeleton placeholder.',
            },
            {
              name: 'animation',
              type: '"shimmer" | "pulse"',
              default: '"shimmer"',
              description:
                pt?.props?.['animation'] ?? 'Animation style. Shimmer sweeps a highlight, pulse fades opacity.',
            },
            {
              name: 'width',
              type: 'string | number',
              default: '-',
              description: pt?.props?.['width'] ?? 'Width of the skeleton. Accepts CSS string or pixel number.',
            },
            {
              name: 'height',
              type: 'string | number',
              default: '-',
              description: pt?.props?.['height'] ?? 'Height of the skeleton. Accepts CSS string or pixel number.',
            },
            {
              name: 'lines',
              type: 'number',
              default: '3',
              description: pt?.props?.['lines'] ?? 'Number of lines rendered when variant is "text".',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
