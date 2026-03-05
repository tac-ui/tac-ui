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
import { Switch } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeSwitchPage() {
  const pt = usePageTranslation('native-switch');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Switch'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A toggle control that switches between on and off states, commonly used for settings and preferences.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Switch } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Switch props below.'}
        </DocText>
        <NativePlayground
          controls={{
            label: {
              type: 'text',
              label: 'Label',
              defaultValue: 'Enable notifications',
            },
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
          }}
          render={(values) => <Switch label={values.label as string} disabled={values.disabled as boolean} />}
          code={(values) => `<Switch label="${values.label}"${values.disabled ? ' disabled' : ''} />`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'Uncontrolled switch. The component manages its own toggle state; use defaultChecked to set the initial value.'}
        </DocText>
        <NativeShowcase
          code={`<Switch />
<Switch defaultChecked />`}
        >
          <Switch />
          <Switch defaultChecked />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>
          {pt?.sections?.['with-label']?.texts?.[0] ??
            'Providing a label prop wraps the switch in a row container with the label on the left, suited for settings lists.'}
        </DocText>
        <NativeShowcase
          code={`<Switch label="Notifications" />
<Switch label="Dark Mode" defaultChecked />`}
        >
          <Switch label="Notifications" />
          <Switch label="Dark Mode" defaultChecked />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'Disabled switches are non-interactive and visually dimmed regardless of their current state.'}
        </DocText>
        <NativeShowcase
          code={`<Switch disabled />
<Switch defaultChecked disabled />`}
        >
          <Switch disabled />
          <Switch defaultChecked disabled />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled-with-label']?.title ?? 'Disabled with Label'}>
        <DocText>
          {pt?.sections?.['disabled-with-label']?.texts?.[0] ??
            'Labeled switches can also be disabled, shown at reduced opacity to indicate a non-interactive state.'}
        </DocText>
        <NativeShowcase
          code={`<Switch label="Disabled Off" disabled />
<Switch label="Disabled On" defaultChecked disabled />`}
        >
          <Switch label="Disabled Off" disabled />
          <Switch label="Disabled On" defaultChecked disabled />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Pass checked and onChange to fully control the switch state from a parent. The onChange callback receives the new boolean value directly.'}
        </DocText>
        <PreviewCode
          code={`const [checked, setChecked] = React.useState(false);

<Switch
  checked={checked}
  onChange={(val) => setChecked(val)}
/>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['all-states']?.title ?? 'All States'}>
        <DocText>
          {pt?.sections?.['all-states']?.texts?.[0] ??
            'Overview of switch states: off, on, disabled off, and disabled on.'}
        </DocText>
        <NativeShowcase
          code={`<Switch label="Off" />
<Switch label="On" defaultChecked />
<Switch label="Disabled Off" disabled />
<Switch label="Disabled On" defaultChecked disabled />`}
        >
          <Switch label="Off" />
          <Switch label="On" defaultChecked />
          <Switch label="Disabled Off" disabled />
          <Switch label="Disabled On" defaultChecked disabled />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'label',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['label'] ?? 'Label text. When provided, wraps the switch in a labeled row container.',
            },
            {
              name: 'checked',
              type: 'boolean',
              default: '-',
              description:
                pt?.props?.['checked'] ?? 'Controlled checked state. Use with onChange for a controlled component.',
            },
            {
              name: 'defaultChecked',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['defaultChecked'] ?? 'Initial checked state for uncontrolled usage.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['disabled'] ?? 'Disables the switch, making it non-interactive and visually dimmed.',
            },
            {
              name: 'onChange',
              type: '(checked: boolean) => void',
              default: '-',
              description:
                pt?.props?.['onChange'] ??
                'Callback fired when the toggle state changes. Receives the new boolean value.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the root container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
