'use client';

import React, { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Button } from '@tac-ui/web';
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

function ModalDemo({ size, backdrop = true }: { size?: 'sm' | 'md' | 'lg' | 'xl'; backdrop?: boolean }) {
  const [open, setOpen] = useState(false);
  const label = size ? size.toUpperCase() : !backdrop ? 'No Backdrop' : 'Default';

  return (
    <>
      <Button variant={size ? 'outline' : 'primary'} onClick={() => setOpen(true)}>
        Open {label} Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} size={size} backdrop={backdrop}>
        <ModalHeader>
          <ModalTitle>{label} Modal</ModalTitle>
          <ModalDescription>
            This is a {label.toLowerCase()} modal dialog. The modal handles focus trapping, Escape key to close, and
            outside click dismissal.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default function ModalPage() {
  const pt = usePageTranslation('modal');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Modal'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A highly accessible, animated overlay for displaying detailed content, critical alerts, or complex forms.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@tac-ui/web';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default-usage']?.title ?? 'Default Usage'}>
        <DocText>
          {pt?.sections?.['default-usage']?.texts?.[0] ??
            'A standard modal with a blurred backdrop, smooth entrance animation, and built-in focus trapping.'}
        </DocText>
        <Showcase
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Default Modal</Button>
<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>
    <ModalTitle>Action Required</ModalTitle>
    <ModalDescription>
      Are you sure you want to proceed? This action cannot be undone.
    </ModalDescription>
  </ModalHeader>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Confirm</Button>
  </ModalFooter>
</Modal>`}
        >
          <ModalDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['sizes']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes']?.texts?.[0] ??
            'Modals are responsive and provide maximum width presets to handle various content sizes.'}
        </DocText>
        <Showcase
          code={`<Modal open={open} onClose={handleClose} size="sm">...</Modal>
<Modal open={open} onClose={handleClose} size="md">...</Modal>
<Modal open={open} onClose={handleClose} size="lg">...</Modal>
<Modal open={open} onClose={handleClose} size="xl">...</Modal>`}
        >
          <div className="flex flex-wrap gap-3">
            <ModalDemo size="sm" />
            <ModalDemo size="md" />
            <ModalDemo size="lg" />
            <ModalDemo size="xl" />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-backdrop']?.title ?? 'Without Backdrop'}>
        <DocText>
          {pt?.sections?.['without-backdrop']?.texts?.[0] ??
            'You can disable the backdrop overlay if you want to keep the background visible without an overlay tint, though focus is still trapped.'}
        </DocText>
        <Showcase code={`<Modal open={open} onClose={handleClose} backdrop={false}>...</Modal>`}>
          <ModalDemo backdrop={false} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'open',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['open'] ?? 'Controls whether the modal is visible in the DOM.',
            },
            {
              name: 'onClose',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onClose'] ??
                'Callback fired when the modal requests to be closed (via Escape or backdrop click).',
            },
            {
              name: 'size',
              type: '"sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Maximum width of the modal panel.',
            },
            {
              name: 'backdrop',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['backdrop'] ?? 'When false, the dark blurred backdrop overlay is hidden.',
            },
            {
              name: 'layoutId',
              type: 'string',
              default: '-',
              description: pt?.props?.['layoutId'] ?? 'Optional Framer Motion layoutId for shared element transition.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ??
                'Modal content to render. Recommended to construct with ModalHeader, ModalTitle, ModalDescription, and ModalFooter.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
