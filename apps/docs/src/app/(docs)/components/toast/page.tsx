'use client';

import React from 'react';
import { useToast, Button } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import type { PageTranslations } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--card)] text-[var(--foreground)] border border-solid border-[var(--border)] shadow-lg',
  success: 'bg-[var(--card)] text-[var(--foreground)] border border-solid border-[var(--success-bg)] shadow-sm',
  error: 'bg-[var(--card)] text-[var(--foreground)] border border-solid border-[var(--error-bg)] shadow-sm',
  warning: 'bg-[var(--card)] text-[var(--foreground)] border border-solid border-[var(--warning-bg)] shadow-sm',
  info: 'bg-[var(--card)] text-[var(--foreground)] border border-solid border-[var(--info-bg)] shadow-sm',
};

const dotColors: Record<string, string> = {
  success: 'bg-[var(--success)]',
  error: 'bg-[var(--error)]',
  warning: 'bg-[var(--warning)]',
  info: 'bg-[var(--info)]',
};

const messages: Record<string, string> = {
  default: 'This is a default toast message.',
  success: 'Your changes have been saved!',
  error: 'Something went wrong. Please try again.',
  warning: 'Your session expires in 5 minutes.',
  info: 'A new update is available.',
};

function ToastPreview({ variant }: { variant: string }) {
  return (
    <div className={`flex items-center gap-3 pl-5 pr-4 py-3.5 min-w-[320px] max-w-[480px] w-auto rounded-[var(--radius-lg)] ${variantStyles[variant]}`}>
      {variant !== 'default' && (
        <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[variant]}`} />
      )}
      <span className="flex-1 text-sm font-medium">{messages[variant]}</span>
      <button className="py-1.5 px-3.5 rounded-[var(--radius-sm)] text-[13px] font-semibold cursor-pointer border-none bg-[var(--secondary)] text-[var(--foreground)]">
        Undo
      </button>
    </div>
  );
}

function ToastExamples({ pt }: { pt: PageTranslations | null }) {
  const { toast } = useToast();

  return (
    <>
      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <Showcase code={`const { toast } = useToast();

// Default
toast('This is a default toast message');

// Success
toast('Your changes have been saved!', { variant: 'success' });

// Error
toast('Something went wrong.', { variant: 'error' });

// Warning
toast('Your session expires in 5 minutes.', { variant: 'warning' });

// Info
toast('A new update is available.', { variant: 'info' });`}>
          <div className="flex flex-col gap-3 w-full">
            <ToastPreview variant="default" />
            <ToastPreview variant="success" />
            <ToastPreview variant="error" />
            <ToastPreview variant="warning" />
            <ToastPreview variant="info" />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['interactive']?.title ?? 'Interactive'}>
        <Showcase code={`const { toast } = useToast();

<Button onClick={() => toast('Saved!', { variant: 'success' })}>
  Show Toast
</Button>`}>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => toast('This is a default toast message')}>Default</Button>
            <Button variant="secondary" onClick={() => toast('Your changes have been saved!', { variant: 'success' })}>Success</Button>
            <Button variant="secondary" onClick={() => toast('Something went wrong.', { variant: 'error' })}>Error</Button>
            <Button variant="secondary" onClick={() => toast('Your session expires in 5 minutes.', { variant: 'warning' })}>Warning</Button>
            <Button variant="secondary" onClick={() => toast('A new update is available.', { variant: 'info' })}>Info</Button>
          </div>
        </Showcase>
      </DocSection>
    </>
  );
}

export default function ToastPage() {
  const pt = usePageTranslation('toast');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Toast'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A brief, auto-dismissing notification displayed at the edge of the screen.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['usage']?.title ?? 'Usage'}>
        <DocText>
          {pt?.sections?.['usage']?.texts?.[0] ?? 'Wrap your app with ToastProvider (already included in the docs layout), then call useToast() to get the toast function.'}
        </DocText>
      </DocSection>

      <ToastExamples pt={pt} />

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Props for the toast() function returned by useToast().'}</DocText>
        <PropsTable data={[
          { name: 'message', type: 'string', default: '-', description: pt?.props?.['message'] ?? 'The text content of the toast notification.' },
          { name: 'options.variant', type: '"default" | "success" | "error" | "warning" | "info"', default: '"default"', description: pt?.props?.['options.variant'] ?? 'Visual style variant of the toast.' },
          { name: 'options.duration', type: 'number', default: '5000', description: pt?.props?.['options.duration'] ?? 'Auto-dismiss delay in milliseconds. Set to 0 to disable auto-dismiss.' },
          { name: 'options.action', type: 'React.ReactNode', default: '-', description: pt?.props?.['options.action'] ?? 'Optional action element rendered to the right of the message.' },
          { name: 'options.icon', type: 'React.ReactNode', default: '-', description: pt?.props?.['options.icon'] ?? 'Optional icon rendered on the left (visible in default variant only).' },
        ]} />
      </DocSection>

      <DocSection title={pt?.sections?.['toast-provider-props']?.title ?? 'ToastProvider Props'}>
        <DocText>{pt?.sections?.['toast-provider-props']?.texts?.[0] ?? 'Props for the ToastProvider component that wraps the application.'}</DocText>
        <PropsTable data={[
          { name: 'position', type: '"top-right" | "top-center" | "bottom-right" | "bottom-center"', default: '"bottom-right"', description: pt?.props?.['position'] ?? 'Screen position where the toast stack is anchored.' },
          { name: 'maxToasts', type: 'number', default: '5', description: pt?.props?.['maxToasts'] ?? 'Maximum number of toasts visible at once. Oldest toasts are trimmed when the limit is exceeded.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['providerChildren'] ?? 'Application content to wrap with the toast context.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
