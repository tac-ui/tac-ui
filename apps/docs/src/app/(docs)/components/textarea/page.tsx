'use client';

import React from 'react';
import { Textarea } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function TextareaPage() {
  const pt = usePageTranslation('textarea');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Textarea'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A multi-line text input for longer-form content, with optional label and error state.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'The base textarea renders a resizable multi-line field with the same border and shadow transitions as the Input component.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Textarea placeholder="Enter your message..." />`}>
          <Textarea placeholder="Enter your message..." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>{pt?.sections?.['with-label']?.texts?.[0] ?? 'Pass label to render an associated <label> element above the textarea. Use rows to control the initial visible height.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Textarea label="Description" placeholder="Describe your project..." rows={4} />`}>
          <Textarea label="Description" placeholder="Describe your project..." rows={4} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-helper-text']?.title ?? 'With Helper Text'}>
        <DocText>{pt?.sections?.['with-helper-text']?.texts?.[0] ?? 'helperText renders a muted hint below the textarea when there is no active error, providing contextual guidance to the user.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Textarea label="Bio" placeholder="Tell us about yourself..." helperText="Maximum 500 characters." />`}>
          <Textarea label="Bio" placeholder="Tell us about yourself..." helperText="Maximum 500 characters." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>{pt?.sections?.['error-state']?.texts?.[0] ?? 'Set error to apply destructive border styling. Pass errorMessage to show an accessible error message below the field.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Textarea label="Bio" placeholder="Tell us about yourself" error errorMessage="Bio must be at least 20 characters." />`}>
          <Textarea label="Bio" placeholder="Tell us about yourself" error errorMessage="Bio must be at least 20 characters." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'The native disabled attribute reduces opacity and blocks all pointer interactions including resize.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Textarea placeholder="Disabled textarea" disabled />`}>
          <Textarea placeholder="Disabled textarea" disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'label', type: 'string', default: '-', description: pt?.props?.['label'] ?? 'Label displayed above the textarea.' },
          { name: 'placeholder', type: 'string', default: '-', description: pt?.props?.['placeholder'] ?? 'Placeholder text shown when empty.' },
          { name: 'helperText', type: 'string', default: '-', description: pt?.props?.['helperText'] ?? 'Helper text displayed below the textarea when there is no error.' },
          { name: 'error', type: 'boolean', default: 'false', description: pt?.props?.['error'] ?? 'Applies error styling when true.' },
          { name: 'errorMessage', type: 'string', default: '-', description: pt?.props?.['errorMessage'] ?? 'Error message displayed when error is true.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the textarea when true.' },
          { name: 'rows', type: 'number', default: '-', description: pt?.props?.['rows'] ?? 'Number of visible text rows (sets initial height).' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
