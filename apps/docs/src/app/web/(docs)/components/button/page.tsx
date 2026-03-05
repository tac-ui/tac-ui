'use client';

import React from 'react';
import { Button } from '@tac-ui/web';
import { Rocket, Send } from '@tac-ui/icon';
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

export default function ButtonPage() {
  const pt = usePageTranslation('button');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Button'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A highly interactive element used to trigger actions, supporting multiple modern visual variants, sizes, and micro-animations.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Button } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Button props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['primary', 'secondary', 'outline', 'ghost', 'point', 'destructive'],
              defaultValue: 'primary',
            },
            size: {
              type: 'select',
              label: 'Size',
              options: ['sm', 'md', 'lg'],
              defaultValue: 'md',
            },
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
            label: {
              type: 'text',
              label: 'Label',
              defaultValue: 'Button',
            },
          }}
          render={(values) => (
            <Button
              variant={values.variant as 'primary'}
              size={values.size as 'sm'}
              disabled={values.disabled as boolean}
            >
              {values.label as string}
            </Button>
          )}
          code={(values) =>
            `<Button variant="${values.variant}" size="${values.size}"${values.disabled ? ' disabled' : ''}>${values.label}</Button>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Buttons come in several refined variants to establish clear visual hierarchy in the UI.'}
        </DocText>
        <Showcase
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="point">Point</Button>
<Button variant="destructive">Destructive</Button>`}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="point">Point</Button>
          <Button variant="destructive">Destructive</Button>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ?? 'Buttons support three responsive sizes to fit various layouts.'}
        </DocText>
        <Showcase
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>
          {pt?.sections?.['with-icons']?.texts?.[0] ?? 'Enhance button context with leading or trailing icons.'}
        </DocText>
        <Showcase
          code={`import { Rocket, Send } from '@tac-ui/icon';

<Button leftIcon={<Rocket />}>Get Started</Button>
<Button variant="outline" rightIcon={<Send />}>Submit</Button>
<Button variant="secondary" iconOnly><Rocket /></Button>`}
        >
          <Button leftIcon={<Rocket size={16} />}>Get Started</Button>
          <Button variant="outline" rightIcon={<Send size={16} />}>
            Submit
          </Button>
          <Button variant="secondary" iconOnly>
            <Rocket size={16} />
          </Button>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ?? 'Disabled buttons are reduced in opacity and non-interactive.'}
        </DocText>
        <Showcase
          code={`<Button disabled>Disabled Primary</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`}
        >
          <Button disabled>Disabled Primary</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"primary" | "secondary" | "outline" | "ghost" | "point" | "destructive"',
              default: '"primary"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the button.',
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Size of the button.',
            },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['leftIcon'] ?? 'Icon rendered to the left of the button label.',
            },
            {
              name: 'rightIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['rightIcon'] ?? 'Icon rendered to the right of the button label.',
            },
            {
              name: 'iconOnly',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['iconOnly'] ?? 'Removes padding to properly center a single icon.',
            },
            {
              name: 'tilt',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['tilt'] ?? 'When true, applies a cursor-tracking 3D micro-tilt on hover.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the button when true.',
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
