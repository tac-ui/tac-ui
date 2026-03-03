'use client';

import React, { useState } from 'react';
import { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, Button } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

function DrawerDemo({ side }: { side: 'left' | 'right' | 'top' | 'bottom' }) {
  const [open, setOpen] = useState(false);
  const label = side.charAt(0).toUpperCase() + side.slice(1);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open {label}
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} side={side}>
        <DrawerHeader>
          <DrawerTitle>{label} Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the {side}. Place navigation, filters, or any secondary content here.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-[var(--muted-foreground)]">Drawer body content goes here.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

function DrawerNoBackdropDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open Without Backdrop</Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="right" backdrop={false}>
        <DrawerHeader>
          <DrawerTitle>No Backdrop</DrawerTitle>
          <DrawerDescription>This drawer renders without a backdrop overlay.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-[var(--muted-foreground)]">Content remains visible behind this drawer.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

function DrawerWithContentDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Settings</Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="right">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Manage your account preferences and notification settings.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-[var(--foreground)]">Display Name</p>
              <p className="text-sm text-[var(--muted-foreground)]">John Doe</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-[var(--foreground)]">Email</p>
              <p className="text-sm text-[var(--muted-foreground)]">john@example.com</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-[var(--foreground)]">Role</p>
              <p className="text-sm text-[var(--muted-foreground)]">Administrator</p>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Discard</Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

export default function DrawerPage() {
  const pt = usePageTranslation('drawer');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Drawer'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A panel that slides in from the edge of the screen, used for navigation or supplementary content.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['sides']?.title ?? 'Sides'}>
        <DocText>{pt?.sections?.['sides']?.texts?.[0] ?? 'The drawer can slide in from any of the four edges using the side prop. Left and right drawers are fixed-width (360px); top and bottom drawers span the full width with a max-height of 80vh.'}</DocText>
        <Showcase code={`const [open, setOpen] = useState(false);

<Button onClick={() => { setSide('left'); setOpen(true); }}>Open Left</Button>
<Button onClick={() => { setSide('right'); setOpen(true); }}>Open Right</Button>
<Button onClick={() => { setSide('top'); setOpen(true); }}>Open Top</Button>
<Button onClick={() => { setSide('bottom'); setOpen(true); }}>Open Bottom</Button>

<Drawer open={open} onClose={() => setOpen(false)} side={side}>
  <DrawerHeader>
    <DrawerTitle>Drawer Title</DrawerTitle>
    <DrawerDescription>Drawer description text.</DrawerDescription>
  </DrawerHeader>
  <DrawerBody>
    <p>Drawer body content goes here.</p>
  </DrawerBody>
  <DrawerFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Save Changes</Button>
  </DrawerFooter>
</Drawer>`}>
          <DrawerDemo side="left" />
          <DrawerDemo side="right" />
          <DrawerDemo side="top" />
          <DrawerDemo side="bottom" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-backdrop']?.title ?? 'Without Backdrop'}>
        <DocText>{pt?.sections?.['without-backdrop']?.texts?.[0] ?? 'Set backdrop={false} to remove the dark overlay. The drawer still closes on Escape key press and traps focus while open.'}</DocText>
        <Showcase code={`const [open, setOpen] = useState(false);

<Button variant="outline" onClick={() => setOpen(true)}>Open Without Backdrop</Button>
<Drawer open={open} onClose={() => setOpen(false)} side="right" backdrop={false}>
  <DrawerHeader>
    <DrawerTitle>No Backdrop</DrawerTitle>
    <DrawerDescription>This drawer renders without a backdrop overlay.</DrawerDescription>
  </DrawerHeader>
  <DrawerBody>
    <p>Content remains visible behind this drawer.</p>
  </DrawerBody>
  <DrawerFooter>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DrawerFooter>
</Drawer>`}>
          <DrawerNoBackdropDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-content']?.title ?? 'With Content'}>
        <DocText>{pt?.sections?.['with-content']?.texts?.[0] ?? 'DrawerBody scrolls independently when content overflows, while DrawerHeader and DrawerFooter remain fixed in place.'}</DocText>
        <Showcase code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Settings</Button>
<Drawer open={open} onClose={() => setOpen(false)} side="right">
  <DrawerHeader>
    <DrawerTitle>Settings</DrawerTitle>
    <DrawerDescription>Manage your account preferences.</DrawerDescription>
  </DrawerHeader>
  <DrawerBody>
    {/* scrollable content */}
  </DrawerBody>
  <DrawerFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Discard</Button>
    <Button onClick={() => setOpen(false)}>Save</Button>
  </DrawerFooter>
</Drawer>`}>
          <DrawerWithContentDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Drawer props. Sub-components (DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter) all accept standard HTML attributes and className.'}</DocText>
        <PropsTable data={[
          { name: 'open', type: 'boolean', default: 'false', description: pt?.props?.['open'] ?? 'Controls whether the drawer is visible.' },
          { name: 'onClose', type: '() => void', default: '-', description: pt?.props?.['onClose'] ?? 'Callback fired when the drawer should close (backdrop click or Escape key).' },
          { name: 'side', type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: pt?.props?.['side'] ?? 'Edge of the screen the drawer slides in from.' },
          { name: 'backdrop', type: 'boolean', default: 'true', description: pt?.props?.['backdrop'] ?? 'When false, the dark backdrop overlay is hidden.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['children'] ?? 'Compose with DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the drawer panel.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
