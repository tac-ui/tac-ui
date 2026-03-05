'use client';

import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from '@tac-ui/web';
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

function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            Delete Account
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function DialogNoBackdropDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Without Backdrop
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} backdrop={false}>
        <DialogHeader>
          <DialogTitle>No Backdrop</DialogTitle>
          <DialogDescription>
            This dialog has no backdrop overlay. The content behind it remains fully visible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default function DialogPage() {
  const pt = usePageTranslation('dialog');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Dialog'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A modal overlay that requires user interaction before returning to the main content.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@tac-ui/web';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'A standard confirmation dialog with header, description, and footer action buttons. Closes on backdrop click or Escape key.'}
        </DocText>
        <Showcase
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <DialogTitle>Are you absolutely sure?</DialogTitle>
    <DialogDescription>
      This action cannot be undone. This will permanently delete your account
      and remove your data from our servers.
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" onClick={() => setOpen(false)}>Delete Account</Button>
  </DialogFooter>
</Dialog>`}
        >
          <DialogDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-backdrop']?.title ?? 'Without Backdrop'}>
        <DocText>
          {pt?.sections?.['without-backdrop']?.texts?.[0] ??
            'Set backdrop={false} to hide the dark overlay. The dialog still closes on Escape and focus is still trapped.'}
        </DocText>
        <Showcase
          code={`const [open, setOpen] = useState(false);

<Button variant="outline" onClick={() => setOpen(true)}>Open Without Backdrop</Button>
<Dialog open={open} onClose={() => setOpen(false)} backdrop={false}>
  <DialogHeader>
    <DialogTitle>No Backdrop</DialogTitle>
    <DialogDescription>
      This dialog has no backdrop overlay.
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
  </DialogFooter>
</Dialog>`}
        >
          <DialogNoBackdropDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[0] ??
            'Dialog props. Subcomponents (DialogHeader, DialogTitle, DialogDescription, DialogFooter) all accept standard HTML div/heading/paragraph attributes plus className.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'open',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['open'] ?? 'Controls whether the dialog is visible.',
            },
            {
              name: 'onClose',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onClose'] ?? 'Callback fired when the dialog should close (backdrop click or Escape key).',
            },
            {
              name: 'backdrop',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['backdrop'] ?? 'When false, the dark backdrop overlay is hidden.',
            },
            {
              name: 'layoutId',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['layoutId'] ?? 'Optional Framer Motion layoutId for shared layout morphing animations.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ?? 'Compose with DialogHeader, DialogTitle, DialogDescription, DialogFooter.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the dialog panel.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
