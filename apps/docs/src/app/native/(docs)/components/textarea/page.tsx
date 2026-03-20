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
import { Textarea } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeTextareaPage() {
  const pt = usePageTranslation('native-textarea');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Textarea'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            "A multi-line text input for longer-form content, with optional label and error state. Built on top of React Native's TextInput with multiline enabled."}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Textarea } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Textarea props below.'}
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
              defaultValue: 'Enter your message...',
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
            <Textarea
              size={values.size as 'sm' | 'md' | 'lg'}
              placeholder={values.placeholder as string}
              editable={!(values.disabled as boolean)}
              error={values.error as boolean}
              errorMessage={values.error ? 'This field has an error.' : undefined}
              style={{ width: '100%' }}
            />
          )}
          code={(values) =>
            `<Textarea${values.size !== 'md' ? ` size="${values.size}"` : ''} placeholder="${values.placeholder}"${values.disabled ? ' editable={false}' : ''}${values.error ? ' error errorMessage="This field has an error."' : ''} />`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ??
            'Three size options control the padding, font size, and minimum height of the textarea.'}
        </DocText>
        <NativeShowcase
          code={`<Textarea size="sm" placeholder="Small textarea" />
<Textarea size="md" placeholder="Medium textarea (default)" />
<Textarea size="lg" placeholder="Large textarea" />`}
        >
          <Textarea size="sm" placeholder="Small textarea" style={{ width: '100%' }} />
          <Textarea size="md" placeholder="Medium textarea (default)" style={{ width: '100%' }} />
          <Textarea size="lg" placeholder="Large textarea" style={{ width: '100%' }} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The base textarea renders a resizable multi-line field with the same border transitions as the Input component.'}
        </DocText>
        <NativeShowcase code={`<Textarea placeholder="Enter your message..." />`}>
          <Textarea placeholder="Enter your message..." style={{ width: '100%' }} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>
          {pt?.sections?.['with-label']?.texts?.[0] ??
            'Pass label to render a text label above the textarea. Use rows to control the initial visible height.'}
        </DocText>
        <NativeShowcase code={`<Textarea label="Description" placeholder="Describe your project..." rows={4} />`}>
          <Textarea label="Description" placeholder="Describe your project..." rows={4} style={{ width: '100%' }} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-helper-text']?.title ?? 'With Helper Text'}>
        <DocText>
          {pt?.sections?.['with-helper-text']?.texts?.[0] ??
            'helperText renders a muted hint below the textarea when there is no active error, providing contextual guidance to the user.'}
        </DocText>
        <NativeShowcase
          code={`<Textarea label="Bio" placeholder="Tell us about yourself..." helperText="Maximum 500 characters." />`}
        >
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            helperText="Maximum 500 characters."
            style={{ width: '100%' }}
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>
          {pt?.sections?.['error-state']?.texts?.[0] ??
            'Set error to apply destructive border styling. Pass errorMessage to show an error message below the field.'}
        </DocText>
        <NativeShowcase
          code={`<Textarea label="Bio" placeholder="Tell us about yourself" error errorMessage="Bio must be at least 20 characters." />`}
        >
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself"
            error
            errorMessage="Bio must be at least 20 characters."
            style={{ width: '100%' }}
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Set editable to false to disable the textarea. It renders at reduced opacity and ignores all user interaction.'}
        </DocText>
        <NativeShowcase code={`<Textarea placeholder="Disabled textarea" editable={false} />`}>
          <Textarea placeholder="Disabled textarea" editable={false} style={{ width: '100%' }} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'size',
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Controls the padding, font size, and minimum height.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label displayed above the textarea.',
            },
            {
              name: 'helperText',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['helperText'] ?? 'Helper text displayed below the textarea when there is no error.',
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
              name: 'rows',
              type: 'number',
              default: '4',
              description: pt?.props?.['rows'] ?? 'Minimum number of text rows (controls the minimum height).',
            },
            {
              name: 'editable',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['editable'] ?? 'When false, disables the textarea and reduces its opacity.',
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
