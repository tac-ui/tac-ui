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
import { Button } from '@tac-ui/native';
import { Rocket, Send } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

export default function NativeButtonPage() {
  const pt = usePageTranslation('native-button');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Button'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A pressable element used to trigger actions in React Native, supporting multiple visual variants, sizes, and icon placements.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Button } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Button props below.'}
        </DocText>
        <NativePlayground
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
        <NativeShowcase
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
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ?? 'Buttons support three responsive sizes to fit various layouts.'}
        </DocText>
        <NativeShowcase
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>
          {pt?.sections?.['with-icons']?.texts?.[0] ?? 'Enhance button context with leading or trailing icons.'}
        </DocText>
        <NativeShowcase
          code={`import { Rocket, Send } from '@tac-ui/icon-native';

<Button leftIcon={<Rocket size={16} />}>Get Started</Button>
<Button variant="outline" rightIcon={<Send size={16} />}>Submit</Button>
<Button variant="secondary" iconOnly leftIcon={<Rocket size={16} />} />`}
        >
          <Button leftIcon={<Rocket size={16} />}>Get Started</Button>
          <Button variant="outline" rightIcon={<Send size={16} />}>
            Submit
          </Button>
          <Button variant="secondary" iconOnly leftIcon={<Rocket size={16} />} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ?? 'Disabled buttons are reduced in opacity and non-interactive.'}
        </DocText>
        <NativeShowcase
          code={`<Button disabled>Disabled Primary</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`}
        >
          <Button disabled>Disabled Primary</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </NativeShowcase>
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
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the button when true.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the container.',
            },
            {
              name: 'onPress',
              type: '() => void',
              default: '-',
              description: pt?.props?.['onPress'] ?? 'Callback fired when the button is pressed.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ??
                'Button label content. Strings are automatically wrapped in a styled Text component.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
