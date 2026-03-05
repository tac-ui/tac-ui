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
import { Alert, AlertTitle, AlertDescription } from '@tac-ui/native';
import { CheckCircle, XCircle, AlertTriangle, Info } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

export default function NativeAlertPage() {
  const pt = usePageTranslation('native-alert');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Alert'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            "Displays a short, important message to attract the user's attention without interrupting their task."}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Alert, AlertTitle, AlertDescription } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Alert props below.'}
        </DocText>
        <NativePlayground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['default', 'success', 'error', 'warning', 'info'],
              defaultValue: 'default',
            },
          }}
          render={(values) => (
            <Alert variant={values.variant as 'default'}>
              <AlertTitle>Alert Title</AlertTitle>
              <AlertDescription>{`This is an alert with the ${values.variant} variant.`}</AlertDescription>
            </Alert>
          )}
          code={(values) =>
            `<Alert variant="${values.variant}">
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>This is an alert with the ${values.variant} variant.</AlertDescription>
</Alert>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The default alert uses neutral surface colors and is suitable for general informational messages.'}
        </DocText>
        <NativeShowcase
          code={`<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
</Alert>`}
        >
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
          </Alert>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Use semantic variants — success, error, warning, info — to communicate the nature of the message. Each variant applies a matching background tint and border color from the design token system.'}
        </DocText>
        <NativeShowcase
          code={`<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>
<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>
<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Your session is about to expire in 5 minutes.</AlertDescription>
</Alert>
<Alert variant="info">
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>A new software update is available for download.</AlertDescription>
</Alert>`}
        >
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Your session is about to expire in 5 minutes.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>A new software update is available for download.</AlertDescription>
          </Alert>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icon']?.title ?? 'With Icon'}>
        <DocText>
          {pt?.sections?.['with-icon']?.texts?.[0] ??
            'Pass any React node to the icon prop to display a contextual icon on the left of the alert content.'}
        </DocText>
        <NativeShowcase
          code={`import { CheckCircle, XCircle, AlertTriangle, Info } from '@tac-ui/icon-native';

<Alert variant="success" icon={<CheckCircle size={18} />}>
  <AlertTitle>Payment confirmed</AlertTitle>
  <AlertDescription>Your payment of $49.00 was processed successfully.</AlertDescription>
</Alert>
<Alert variant="error" icon={<XCircle size={18} />}>
  <AlertTitle>Upload failed</AlertTitle>
  <AlertDescription>The file exceeds the 10 MB size limit.</AlertDescription>
</Alert>
<Alert variant="warning" icon={<AlertTriangle size={18} />}>
  <AlertTitle>Low storage</AlertTitle>
  <AlertDescription>You have less than 500 MB of storage remaining.</AlertDescription>
</Alert>
<Alert variant="info" icon={<Info size={18} />}>
  <AlertTitle>Maintenance window</AlertTitle>
  <AlertDescription>Scheduled maintenance on Sunday from 2–4 AM UTC.</AlertDescription>
</Alert>`}
        >
          <Alert variant="success" icon={<CheckCircle size={18} />}>
            <AlertTitle>Payment confirmed</AlertTitle>
            <AlertDescription>Your payment of $49.00 was processed successfully.</AlertDescription>
          </Alert>
          <Alert variant="error" icon={<XCircle size={18} />}>
            <AlertTitle>Upload failed</AlertTitle>
            <AlertDescription>The file exceeds the 10 MB size limit.</AlertDescription>
          </Alert>
          <Alert variant="warning" icon={<AlertTriangle size={18} />}>
            <AlertTitle>Low storage</AlertTitle>
            <AlertDescription>You have less than 500 MB of storage remaining.</AlertDescription>
          </Alert>
          <Alert variant="info" icon={<Info size={18} />}>
            <AlertTitle>Maintenance window</AlertTitle>
            <AlertDescription>Scheduled maintenance on Sunday from 2–4 AM UTC.</AlertDescription>
          </Alert>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['dismissible']?.title ?? 'Dismissible'}>
        <DocText>
          {pt?.sections?.['dismissible']?.texts?.[0] ??
            'Set dismissible to show a close button. When pressed, the alert animates out and the optional onDismiss callback is called, allowing you to sync dismissal state externally.'}
        </DocText>
        <NativeShowcase
          code={`<Alert variant="info" icon={<Info size={18} />} dismissible onDismiss={() => console.log('dismissed')}>
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>Try the new dashboard layout in your account settings.</AlertDescription>
</Alert>
<Alert variant="success" icon={<CheckCircle size={18} />} dismissible>
  <AlertTitle>Profile updated</AlertTitle>
  <AlertDescription>Your profile information has been saved.</AlertDescription>
</Alert>`}
        >
          <Alert variant="info" icon={<Info size={18} />} dismissible onDismiss={() => {}}>
            <AlertTitle>New feature available</AlertTitle>
            <AlertDescription>Try the new dashboard layout in your account settings.</AlertDescription>
          </Alert>
          <Alert variant="success" icon={<CheckCircle size={18} />} dismissible onDismiss={() => {}}>
            <AlertTitle>Profile updated</AlertTitle>
            <AlertDescription>Your profile information has been saved.</AlertDescription>
          </Alert>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Alert props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"default" | "success" | "error" | "warning" | "info"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the alert.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['icon'] ?? 'Optional icon displayed to the left of the alert content.',
            },
            {
              name: 'dismissible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['dismissible'] ??
                'When true, shows a close button that animates the alert out when pressed.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onDismiss'] ?? 'Called when the dismiss button is pressed, after the animation starts.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ?? 'Content of the alert. Compose with AlertTitle and AlertDescription.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the alert container.',
            },
          ]}
        />
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[1] ??
            'AlertTitle and AlertDescription accept children and style props.'}
        </DocText>
      </DocSection>
    </DocPage>
  );
}
