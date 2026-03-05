import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function DialogScreen() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <ScreenLayout
      title="Dialog"
      description="A modal overlay that interrupts the user with important content or a decision."
    >
      <Section title="Import">
        <CodePreview
          code={`import {\n  Dialog,\n  DialogHeader,\n  DialogTitle,\n  DialogDescription,\n  DialogFooter,\n} from '@tac-ui/native';`}
        />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`const [open, setOpen] = useState(false);\n\n<Button onPress={() => setOpen(true)}>Open Dialog</Button>\n<Dialog open={open} onClose={() => setOpen(false)}>\n  <DialogHeader>\n    <DialogTitle>Dialog Title</DialogTitle>\n    <DialogDescription>This is a dialog description providing more context.</DialogDescription>\n  </DialogHeader>\n  <DialogFooter>\n    <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>\n    <Button onPress={() => setOpen(false)}>Confirm</Button>\n  </DialogFooter>\n</Dialog>`}
        >
          <Button onPress={() => setOpen(true)}>Open Dialog</Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description providing more context about the action.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onPress={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onPress={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </Dialog>
        </ShowcaseCard>
      </Section>

      <Section title="Confirmation Dialog">
        <ShowcaseCard
          code={`<Dialog open={open} onClose={() => setOpen(false)}>\n  <DialogHeader>\n    <DialogTitle>Delete Item?</DialogTitle>\n    <DialogDescription>This action cannot be undone.</DialogDescription>\n  </DialogHeader>\n  <DialogFooter>\n    <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>\n    <Button variant="destructive" onPress={() => setOpen(false)}>Delete</Button>\n  </DialogFooter>\n</Dialog>`}
        >
          <Button variant="outline" onPress={() => setConfirmOpen(true)}>
            Open Confirmation
          </Button>
          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <DialogHeader>
              <DialogTitle>Delete Item?</DialogTitle>
              <DialogDescription>This action cannot be undone. The item will be permanently removed.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onPress={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onPress={() => setConfirmOpen(false)}>
                Delete
              </Button>
            </DialogFooter>
          </Dialog>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'open',
              type: 'boolean',
              default: '—',
              description: 'Controls whether the dialog is visible.',
            },
            {
              name: 'onClose',
              type: '() => void',
              default: '—',
              description: 'Called when the backdrop is pressed or dialog is closed.',
            },
            {
              name: 'backdrop',
              type: "'opaque' | 'blur' | 'transparent'",
              default: "'opaque'",
              description: 'Visual style of the backdrop overlay.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'Content of the dialog. Use DialogHeader, DialogFooter, etc.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
