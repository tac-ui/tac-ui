'use client';

import React, { useState } from 'react';
import { Snackbar, Button } from '@tac-ui/web';
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
  default: 'This is a default snackbar message.',
  success: 'Item has been saved successfully.',
  error: 'Failed to delete item. Please try again.',
  warning: 'Storage is almost full.',
  info: 'New version available. Refresh to update.',
};

function SnackbarPreview({ variant }: { variant: string }) {
  return (
    <div
      className={`flex items-center gap-3 pl-5 pr-4 py-3.5 min-w-[320px] max-w-[560px] w-auto rounded-[var(--radius-lg)] ${variantStyles[variant]}`}
    >
      {variant !== 'default' && <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[variant]}`} />}
      <span className="flex-1 text-sm font-medium">{messages[variant]}</span>
    </div>
  );
}

function SnackbarDemo({ variant }: { variant: 'default' | 'success' | 'error' | 'warning' | 'info' }) {
  const [open, setOpen] = useState(false);
  const label = variant.charAt(0).toUpperCase() + variant.slice(1);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Show {label}
      </Button>
      <Snackbar open={open} variant={variant} onClose={() => setOpen(false)} autoHideDuration={3000}>
        {messages[variant]}
      </Snackbar>
    </>
  );
}

function SnackbarActionDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Show with Action
      </Button>
      <Snackbar
        open={open}
        variant="default"
        onClose={() => setOpen(false)}
        autoHideDuration={5000}
        action="Undo"
        onAction={() => {
          setOpen(false);
        }}
      >
        Item moved to trash.
      </Snackbar>
    </>
  );
}

export default function SnackbarPage() {
  const pt = usePageTranslation('snackbar');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Snackbar'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'Brief messages about app processes displayed at the bottom of the screen.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Snackbar } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Snackbar props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['default', 'success', 'error', 'warning', 'info'],
              defaultValue: 'default',
            },
            message: {
              type: 'text',
              label: 'Message',
              defaultValue: 'This is a snackbar message.',
            },
          }}
          render={(values) => {
            const variant = values.variant as 'default' | 'success' | 'error' | 'warning' | 'info';
            const dotColorMap: Record<string, string> = {
              success: 'bg-[var(--success)]',
              error: 'bg-[var(--error)]',
              warning: 'bg-[var(--warning)]',
              info: 'bg-[var(--info)]',
            };
            const borderColorMap: Record<string, string> = {
              default: 'border-[var(--border)]',
              success: 'border-[var(--success-bg)]',
              error: 'border-[var(--error-bg)]',
              warning: 'border-[var(--warning-bg)]',
              info: 'border-[var(--info-bg)]',
            };
            return (
              <div
                className={`flex items-center gap-3 pl-5 pr-4 py-3.5 min-w-[320px] max-w-[560px] w-auto rounded-[var(--radius-lg)] bg-[var(--card)] text-[var(--foreground)] border border-solid ${borderColorMap[variant]} shadow-sm`}
              >
                {variant !== 'default' && <span className={`w-2 h-2 rounded-full shrink-0 ${dotColorMap[variant]}`} />}
                <span className="flex-1 text-sm font-medium">{values.message as string}</span>
              </div>
            );
          }}
          code={(values) =>
            `<Snackbar
  open={open}
  variant="${values.variant}"
  onClose={() => setOpen(false)}
  autoHideDuration={3000}
>
  ${values.message}
</Snackbar>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Five semantic variants communicate the nature of the notification: default, success, error, warning, and info. Non-default variants show a colored dot indicator.'}
        </DocText>
        <Showcase
          code={`<Snackbar open={open} variant="default" onClose={handleClose}>
  Message text
</Snackbar>

// Available variants: default, success, error, warning, info`}
        >
          <div className="flex flex-col gap-3 w-full">
            <SnackbarPreview variant="default" />
            <SnackbarPreview variant="success" />
            <SnackbarPreview variant="error" />
            <SnackbarPreview variant="warning" />
            <SnackbarPreview variant="info" />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['interactive']?.title ?? 'Interactive'}>
        <DocText>
          {pt?.sections?.['interactive']?.texts?.[0] ??
            'Trigger each variant to see the animated entrance and auto-dismiss behavior after 3 seconds.'}
        </DocText>
        <Showcase
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Show Snackbar</Button>
<Snackbar
  open={open}
  variant="success"
  onClose={() => setOpen(false)}
  autoHideDuration={3000}
>
  Item has been saved successfully.
</Snackbar>`}
        >
          <div className="flex flex-wrap gap-2">
            <SnackbarDemo variant="default" />
            <SnackbarDemo variant="success" />
            <SnackbarDemo variant="error" />
            <SnackbarDemo variant="warning" />
            <SnackbarDemo variant="info" />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-action']?.title ?? 'With Action'}>
        <DocText>
          {pt?.sections?.['with-action']?.texts?.[0] ??
            'Pass an action label and onAction callback to render an inline action button alongside the message.'}
        </DocText>
        <Showcase
          code={`<Snackbar
  open={open}
  onClose={() => setOpen(false)}
  action="Undo"
  onAction={() => handleUndo()}
>
  Item moved to trash.
</Snackbar>`}
        >
          <SnackbarActionDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'open',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['open'] ?? 'Controls whether the snackbar is visible.',
            },
            {
              name: 'variant',
              type: '"default" | "success" | "error" | "warning" | "info"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the snackbar.',
            },
            {
              name: 'onClose',
              type: '() => void',
              default: '-',
              description: pt?.props?.['onClose'] ?? 'Callback fired when the snackbar requests to be closed.',
            },
            {
              name: 'autoHideDuration',
              type: 'number',
              default: '5000',
              description:
                pt?.props?.['autoHideDuration'] ?? 'Duration in milliseconds before auto-hide. Set to 0 to disable.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['icon'] ?? 'Optional icon shown on the left (only visible in the default variant).',
            },
            {
              name: 'action',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['action'] ?? 'Action button label rendered to the right of the message.',
            },
            {
              name: 'onAction',
              type: '() => void',
              default: '-',
              description: pt?.props?.['onAction'] ?? 'Callback fired when the action button is clicked.',
            },
            {
              name: 'closeLabel',
              type: 'string',
              default: '"Close"',
              description: pt?.props?.['closeLabel'] ?? 'Accessible label for the close button.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
