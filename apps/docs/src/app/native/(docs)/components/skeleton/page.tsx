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
import { Skeleton } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeSkeletonPage() {
  const pt = usePageTranslation('native-skeleton');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Skeleton'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A loading placeholder that mimics content layout while data is being fetched.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Skeleton } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Skeleton props below.'}
        </DocText>
        <NativePlayground
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
              defaultValue: 'pulse',
            },
          }}
          render={(values) => {
            const variant = values.variant as 'rectangular' | 'circular' | 'text';
            const animation = values.animation as 'shimmer' | 'pulse';
            if (variant === 'circular') {
              return <Skeleton variant={variant} animation={animation} width={56} height={56} />;
            }
            if (variant === 'text') {
              return <Skeleton variant={variant} animation={animation} lines={3} />;
            }
            return <Skeleton variant={variant} animation={animation} width={200} height={80} />;
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
            return `<Skeleton variant="${variant}" animation="${animation}" width={200} height={80} />`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['text']?.title ?? 'Text'}>
        <DocText>{pt?.sections?.['text']?.texts?.[0] ?? 'Multiple stacked lines simulating a text block.'}</DocText>
        <NativeShowcase code={`<Skeleton variant="text" lines={3} />`}>
          <Skeleton variant="text" lines={3} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['rectangular']?.title ?? 'Rectangular'}>
        <DocText>
          {pt?.sections?.['rectangular']?.texts?.[0] ?? 'Rectangle placeholder for images, cards, or blocks.'}
        </DocText>
        <NativeShowcase code={`<Skeleton variant="rectangular" width="100%" height={120} />`}>
          <Skeleton variant="rectangular" width="100%" height={120} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['circular']?.title ?? 'Circular'}>
        <DocText>
          {pt?.sections?.['circular']?.texts?.[0] ?? 'Circle placeholder typically used for avatars or icons.'}
        </DocText>
        <NativeShowcase
          code={`<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="circular" width={56} height={56} />
<Skeleton variant="circular" width={72} height={72} />`}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={56} height={56} />
          <Skeleton variant="circular" width={72} height={72} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['animation']?.title ?? 'Animation'}>
        <DocText>
          {pt?.sections?.['animation']?.texts?.[0] ??
            'Choose between a sweeping shimmer highlight or a subtle pulse fade.'}
        </DocText>
        <NativeShowcase
          code={`{/* Shimmer */}
<Skeleton animation="shimmer" width={200} height={48} />

{/* Pulse */}
<Skeleton animation="pulse" width={200} height={48} />`}
        >
          <Skeleton animation="shimmer" width={200} height={48} />
          <Skeleton animation="pulse" width={200} height={48} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['card-composition']?.title ?? 'Card Composition'}>
        <DocText>
          {pt?.sections?.['card-composition']?.texts?.[0] ??
            'Combine skeletons to simulate a card with an avatar and text.'}
        </DocText>
        <NativeShowcase
          code={`<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
  <Skeleton variant="circular" width={48} height={48} />
  <View style={{ gap: 8, flex: 1 }}>
    <Skeleton variant="rectangular" width="40%" height={14} />
    <Skeleton variant="text" lines={2} />
  </View>
</View>`}
        >
          <div className="flex items-center gap-3 w-full">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton variant="rectangular" width="40%" height={14} />
              <Skeleton variant="text" lines={2} />
            </div>
          </div>
        </NativeShowcase>
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
              default: '"pulse"',
              description:
                pt?.props?.['animation'] ?? 'Animation style. Shimmer sweeps a highlight, pulse fades opacity.',
            },
            {
              name: 'width',
              type: 'number | string',
              default: '-',
              description: pt?.props?.['width'] ?? 'Width of the skeleton. Accepts dp numbers or percentage strings.',
            },
            {
              name: 'height',
              type: 'number | string',
              default: '16',
              description: pt?.props?.['height'] ?? 'Height of the skeleton.',
            },
            {
              name: 'lines',
              type: 'number',
              default: '3',
              description: pt?.props?.['lines'] ?? 'Number of lines rendered when variant is "text".',
            },
            {
              name: 'borderRadius',
              type: 'number',
              default: '-',
              description: pt?.props?.['borderRadius'] ?? 'Custom border radius. Overrides the variant default radius.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the animated container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
