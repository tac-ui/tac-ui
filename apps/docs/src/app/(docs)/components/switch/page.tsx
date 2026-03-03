'use client';

import React, { useState } from 'react';
import { Switch } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

function ControlledDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(val) => setChecked(val)}
    />
  );
}

export default function SwitchPage() {
  const pt = usePageTranslation('switch');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Switch'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A toggle control that switches between on and off states, commonly used for settings and preferences.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'Uncontrolled switch. The component manages its own toggle state; use defaultChecked to set the initial value.'}</DocText>
        <Showcase code={`<Switch />
<Switch defaultChecked />`}>
          <Switch />
          <Switch defaultChecked />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>{pt?.sections?.['with-label']?.texts?.[0] ?? 'Providing a label prop wraps the switch in a row container with the label on the left, suited for settings lists.'}</DocText>
        <Showcase code={`<Switch label="Notifications" />
<Switch label="Dark Mode" defaultChecked />`}>
          <div className="flex flex-col gap-2 w-full">
            <Switch label="Notifications" />
            <Switch label="Dark Mode" defaultChecked />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'Disabled switches are non-interactive, visually dimmed, and desaturated regardless of their current state.'}</DocText>
        <Showcase code={`<Switch disabled />
<Switch defaultChecked disabled />`}>
          <Switch disabled />
          <Switch defaultChecked disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled-with-label']?.title ?? 'Disabled with Label'}>
        <DocText>{pt?.sections?.['disabled-with-label']?.texts?.[0] ?? 'Labeled switches can also be disabled, shown at reduced opacity and with desaturation to indicate non-interactive state.'}</DocText>
        <Showcase code={`<Switch label="Disabled Off" disabled />
<Switch label="Disabled On" defaultChecked disabled />`}>
          <div className="flex flex-col gap-2 w-full">
            <Switch label="Disabled Off" disabled />
            <Switch label="Disabled On" defaultChecked disabled />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>{pt?.sections?.['controlled']?.texts?.[0] ?? 'Pass checked and onChange to fully control the switch state from a parent. The onChange callback receives the new boolean value directly.'}</DocText>
        <Showcase code={`const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onChange={(val) => setChecked(val)}
/>`}>
          <ControlledDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['all-states']?.title ?? 'All States'}>
        <DocText>{pt?.sections?.['all-states']?.texts?.[0] ?? 'Overview of switch states: off, on, disabled off, and disabled on.'}</DocText>
        <Showcase code={`<Switch label="Off" />
<Switch label="On" defaultChecked />
<Switch label="Disabled Off" disabled />
<Switch label="Disabled On" defaultChecked disabled />`}>
          <div className="flex flex-col gap-2 w-full">
            <Switch label="Off" />
            <Switch label="On" defaultChecked />
            <Switch label="Disabled Off" disabled />
            <Switch label="Disabled On" defaultChecked disabled />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'label', type: 'string', default: '-', description: pt?.props?.['label'] ?? 'Label text. When provided, wraps the switch in a labeled row container.' },
          { name: 'checked', type: 'boolean', default: '-', description: pt?.props?.['checked'] ?? 'Controlled checked state. Use with onChange for a controlled component.' },
          { name: 'defaultChecked', type: 'boolean', default: 'false', description: pt?.props?.['defaultChecked'] ?? 'Initial checked state for uncontrolled usage.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the switch, making it non-interactive and visually dimmed.' },
          { name: 'onChange', type: '(checked: boolean) => void', default: '-', description: pt?.props?.['onChange'] ?? 'Callback fired when the toggle state changes. Receives the new boolean value.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names. Applied to the labeled wrapper when label is set, otherwise to the button.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
