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
import { Snackbar } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeSnackbarPage() {
  const pt = usePageTranslation('native-snackbar');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Snackbar'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'Brief messages about app processes displayed at the bottom of the screen.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Snackbar } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Snackbar props below.'}
        </DocText>
        <NativePlayground
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
          render={(values) => (
            <Snackbar
              variant={values.variant as 'default' | 'success' | 'error' | 'warning' | 'info'}
              message={values.message as string}
              visible
              duration={0}
            />
          )}
          code={(values) =>
            `<Snackbar\n  variant="${values.variant}"\n  message="${values.message}"\n  visible\n  onDismiss={() => setVisible(false)}\n/>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Five semantic variants communicate the nature of the notification: default, success, error, warning, and info. Non-default variants show a colored dot indicator.'}
        </DocText>
        <NativeShowcase
          code={`<Snackbar variant="default" message="Default notification." visible />
<Snackbar variant="success" message="Item has been saved successfully." visible />
<Snackbar variant="error" message="Failed to delete item. Please try again." visible />
<Snackbar variant="warning" message="Storage is almost full." visible />
<Snackbar variant="info" message="New version available. Refresh to update." visible />`}
        >
          <Snackbar variant="default" message="Default notification." visible duration={0} />
          <Snackbar variant="success" message="Item has been saved successfully." visible duration={0} />
          <Snackbar variant="error" message="Failed to delete item. Please try again." visible duration={0} />
          <Snackbar variant="warning" message="Storage is almost full." visible duration={0} />
          <Snackbar variant="info" message="New version available. Refresh to update." visible duration={0} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['interactive']?.title ?? 'Interactive'}>
        <DocText>
          {pt?.sections?.['interactive']?.texts?.[0] ??
            'Toggle the visible prop to trigger the spring entrance and fade exit animations. Use a Pressable or Button to show the snackbar on demand.'}
        </DocText>
        <PreviewCode
          code={`const [visible, setVisible] = React.useState(false);

<Pressable onPress={() => setVisible(true)}>
  <Text>Show Snackbar</Text>
</Pressable>

<Snackbar
  variant="success"
  message="Item has been saved successfully."
  visible={visible}
  duration={3000}
  onDismiss={() => setVisible(false)}
/>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['with-action']?.title ?? 'With Action'}>
        <DocText>
          {pt?.sections?.['with-action']?.texts?.[0] ??
            'Pass an action label and onPress handler to render an inline action button alongside the message.'}
        </DocText>
        <NativeShowcase
          code={`<Snackbar
  message="Item moved to trash."
  variant="default"
  visible
  action={{ label: 'Undo', onPress: () => console.log('Undo pressed') }}
/>`}
        >
          <Snackbar
            message="Item moved to trash."
            variant="default"
            visible
            duration={0}
            action={{ label: 'Undo', onPress: () => {} }}
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icon']?.title ?? 'With Icon'}>
        <DocText>
          {pt?.sections?.['with-icon']?.texts?.[0] ??
            'Pass an icon node to render it before the message text. Use any React Native compatible icon component.'}
        </DocText>
        <PreviewCode
          code={`import { CheckCircle } from '@tac-ui/icon-native';

<Snackbar
  variant="success"
  message="Profile updated successfully."
  icon={<CheckCircle size={16} color="green" />}
  visible
/>`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['dismissible']?.title ?? 'Dismissible'}>
        <DocText>
          {pt?.sections?.['dismissible']?.texts?.[0] ??
            'Set dismissible along with an onDismiss handler to render a close button at the trailing edge of the snackbar.'}
        </DocText>
        <NativeShowcase
          code={`<Snackbar
  message="This can be manually dismissed."
  visible
  dismissible
  onDismiss={() => console.log('dismissed')}
/>`}
        >
          <Snackbar message="This can be manually dismissed." visible duration={0} dismissible onDismiss={() => {}} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'message',
              type: 'string',
              default: '-',
              description: pt?.props?.['message'] ?? 'The notification text displayed in the snackbar.',
            },
            {
              name: 'variant',
              type: '"default" | "success" | "error" | "warning" | "info"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the snackbar.',
            },
            {
              name: 'visible',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['visible'] ?? 'Controls visibility. Animates in on true, out on false.',
            },
            {
              name: 'duration',
              type: 'number',
              default: '4000',
              description:
                pt?.props?.['duration'] ?? 'Auto-dismiss delay in milliseconds. Set to 0 to disable auto-dismiss.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onDismiss'] ??
                'Called after the auto-dismiss duration elapses or when the dismiss button is pressed.',
            },
            {
              name: 'action',
              type: '{ label: string; onPress: () => void }',
              default: '-',
              description: pt?.props?.['action'] ?? 'Action button rendered to the right of the message.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['icon'] ?? 'Optional icon node rendered before the message.',
            },
            {
              name: 'dismissible',
              type: 'boolean',
              default: '-',
              description:
                pt?.props?.['dismissible'] ??
                'When true, renders a close button at the trailing edge. Requires onDismiss to function.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the animated container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
