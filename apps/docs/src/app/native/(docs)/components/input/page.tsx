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
import { Input } from '@tac-ui/native';
import { Search } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

export default function NativeInputPage() {
  const pt = usePageTranslation('native-input');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Input'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            "A single-line text input field with support for labels, helper text, error states, left and right icon slots, and disabled mode. Built on top of React Native's TextInput."}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Input } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Input props below.'}
        </DocText>
        <NativePlayground
          controls={{
            size: {
              type: 'select',
              label: 'Size',
              options: ['sm', 'md', 'lg'],
              defaultValue: 'md',
            },
            placeholder: {
              type: 'text',
              label: 'Placeholder',
              defaultValue: 'Enter text...',
            },
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
            error: {
              type: 'boolean',
              label: 'Error',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <Input
              size={values.size as 'sm' | 'md' | 'lg'}
              placeholder={values.placeholder as string}
              editable={!(values.disabled as boolean)}
              error={values.error as boolean}
              errorMessage={values.error ? 'This field has an error.' : undefined}
            />
          )}
          code={(values) =>
            `<Input${values.size !== 'md' ? ` size="${values.size}"` : ''} placeholder="${values.placeholder}"${values.disabled ? ' editable={false}' : ''}${values.error ? ' error errorMessage="This field has an error."' : ''} />`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ?? 'Three size options control the height and font size of the input.'}
        </DocText>
        <NativeShowcase
          code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />`}
        >
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium (default)" />
          <Input size="lg" placeholder="Large" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The base input renders a full-width styled text field with smooth border transitions on hover and focus.'}
        </DocText>
        <NativeShowcase code={`<Input placeholder="Enter text..." />`}>
          <Input placeholder="Enter text..." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>
          {pt?.sections?.['with-icons']?.texts?.[0] ??
            'Use leftIcon or rightIcon to render an icon inside the input. The icon slot accepts any React node.'}
        </DocText>
        <NativeShowcase
          code={`import { Search } from '@tac-ui/icon-native';

<Input placeholder="Search..." leftIcon={<Search size={16} />} />`}
        >
          <Input placeholder="Search..." leftIcon={<Search size={16} />} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label-and-helper']?.title ?? 'With Label and Helper'}>
        <DocText>
          {pt?.sections?.['with-label-and-helper']?.texts?.[0] ??
            'Pass label to render a text label above the field. helperText appears below when there is no active error.'}
        </DocText>
        <NativeShowcase
          code={`<Input label="Email" placeholder="you@example.com" helperText="We'll never share your email." />`}
        >
          <Input label="Email" placeholder="you@example.com" helperText="We'll never share your email." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>
          {pt?.sections?.['error-state']?.texts?.[0] ??
            'Set error to apply destructive border styling and pass errorMessage to display an error description below the field.'}
        </DocText>
        <NativeShowcase
          code={`<Input label="Username" placeholder="username" error errorMessage="Username is already taken." />`}
        >
          <Input label="Username" placeholder="username" error errorMessage="Username is already taken." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Set editable to false to disable the input. It renders at reduced opacity and ignores all user interaction.'}
        </DocText>
        <NativeShowcase code={`<Input placeholder="Disabled input" editable={false} />`}>
          <Input placeholder="Disabled input" editable={false} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'size',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Controls the height and font size of the input.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label displayed above the input.',
            },
            {
              name: 'helperText',
              type: 'string',
              default: '-',
              description: pt?.props?.['helperText'] ?? 'Helper text displayed below the input when there is no error.',
            },
            {
              name: 'error',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['error'] ?? 'Applies error styling when true.',
            },
            {
              name: 'errorMessage',
              type: 'string',
              default: '-',
              description: pt?.props?.['errorMessage'] ?? 'Error message displayed when error is true.',
            },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['leftIcon'] ?? 'Icon rendered on the left side of the input.',
            },
            {
              name: 'rightIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['rightIcon'] ?? 'Icon rendered on the right side of the input.',
            },
            {
              name: 'editable',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['editable'] ?? 'When false, disables the input and reduces its opacity.',
            },
            {
              name: 'containerStyle',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['containerStyle'] ?? 'Additional styles applied to the outer container View.',
            },
            {
              name: '...TextInputProps',
              type: '-',
              default: '-',
              description: pt?.props?.['TextInputProps'] ?? 'All standard React Native TextInput props are supported.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
