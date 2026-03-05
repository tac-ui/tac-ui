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
import '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeDialogPage() {
  const pt = usePageTranslation('native-dialog');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Dialog'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A modal overlay that requires user interaction before returning to the main content.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@tac-ui/native';`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'A standard confirmation dialog with header, description, and footer action buttons. Closes on backdrop press.'}
        </DocText>
        <NativeShowcase
          code={`const [open, setOpen] = useState(false);

<Button onPress={() => setOpen(true)}>Open Dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <DialogTitle>Are you absolutely sure?</DialogTitle>
    <DialogDescription>
      This action cannot be undone. This will permanently delete your account
      and remove your data from our servers.
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" onPress={() => setOpen(false)}>Delete Account</Button>
  </DialogFooter>
</Dialog>`}
        >
          <DocText>Dialog is an overlay component. Trigger it by controlling the open prop with state.</DocText>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-backdrop']?.title ?? 'Without Backdrop'}>
        <DocText>
          {pt?.sections?.['without-backdrop']?.texts?.[0] ??
            'Set backdrop="transparent" to hide the overlay. The dialog still closes on outside press and focus remains trapped.'}
        </DocText>
        <PreviewCode
          code={`const [open, setOpen] = useState(false);

<Button variant="outline" onPress={() => setOpen(true)}>Open Without Backdrop</Button>
<Dialog open={open} onClose={() => setOpen(false)} backdrop="transparent">
  <DialogHeader>
    <DialogTitle>No Backdrop</DialogTitle>
    <DialogDescription>
      This dialog has no backdrop overlay.
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline" onPress={() => setOpen(false)}>Close</Button>
  </DialogFooter>
</Dialog>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[0] ??
            'Dialog props. Subcomponents (DialogHeader, DialogTitle, DialogDescription, DialogFooter) all accept standard ViewProps and children.'}
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
                pt?.props?.['onClose'] ?? 'Called when the backdrop is pressed or the dialog requests close.',
            },
            {
              name: 'backdrop',
              type: '"opaque" | "blur" | "transparent"',
              default: '"opaque"',
              description: pt?.props?.['backdrop'] ?? 'Visual style of the backdrop behind the dialog.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ?? 'Compose with DialogHeader, DialogTitle, DialogDescription, DialogFooter.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'Sub-components:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'DialogHeader',
              type: 'ViewProps',
              default: '-',
              description:
                pt?.props?.['DialogHeader'] ?? 'Container for title and description with centered alignment.',
            },
            {
              name: 'DialogTitle',
              type: 'ViewProps & { children }',
              default: '-',
              description: pt?.props?.['DialogTitle'] ?? 'Semibold centered title text.',
            },
            {
              name: 'DialogDescription',
              type: 'ViewProps & { children }',
              default: '-',
              description: pt?.props?.['DialogDescription'] ?? 'Muted centered description text.',
            },
            {
              name: 'DialogFooter',
              type: 'ViewProps',
              default: '-',
              description: pt?.props?.['DialogFooter'] ?? 'Action row with right-aligned buttons and top border.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
