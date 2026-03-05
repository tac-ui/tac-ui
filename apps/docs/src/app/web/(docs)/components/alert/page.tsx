'use client';

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@tac-ui/web';
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
import { CheckCircle, XCircle, AlertTriangle, Info } from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import { Playground } from '@/components/docs/Playground';

export default function AlertPage() {
  const pt = usePageTranslation('alert');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Alert'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            "Displays a short, important message to attract the user's attention without interrupting their task."}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Alert, AlertTitle, AlertDescription } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Alert props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['default', 'success', 'error', 'warning', 'info', 'glass'],
              defaultValue: 'default',
            },
          }}
          render={(values) => (
            <div className="w-full">
              <Alert variant={values.variant as 'default'} className="w-full">
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>This is an alert with the {values.variant as string} variant.</AlertDescription>
              </Alert>
            </div>
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
        <Showcase
          code={`<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
</Alert>`}
        >
          <Alert className="w-full">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
          </Alert>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Use semantic variants — success, error, warning, info — to communicate the nature of the message. Each variant applies a matching background tint and border color from the design token system.'}
        </DocText>
        <Showcase
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
          <div className="w-full flex flex-col gap-3">
            <Alert variant="success" className="w-full">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            </Alert>
            <Alert variant="error" className="w-full">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
            <Alert variant="warning" className="w-full">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Your session is about to expire in 5 minutes.</AlertDescription>
            </Alert>
            <Alert variant="info" className="w-full">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>A new software update is available for download.</AlertDescription>
            </Alert>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['glass']?.title ?? 'Glass'}>
        <DocText>
          {pt?.sections?.['glass']?.texts?.[0] ??
            'The glass variant applies a frosted-glass backdrop, suitable for alerts rendered over rich backgrounds or images.'}
        </DocText>
        <Showcase
          code={`<Alert variant="glass">
  <AlertTitle>Glassmorphism</AlertTitle>
  <AlertDescription>This alert blends into layered UI surfaces.</AlertDescription>
</Alert>`}
        >
          <Alert variant="glass" className="w-full">
            <AlertTitle>Glassmorphism</AlertTitle>
            <AlertDescription>This alert blends into layered UI surfaces.</AlertDescription>
          </Alert>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icon']?.title ?? 'With Icon'}>
        <DocText>
          {pt?.sections?.['with-icon']?.texts?.[0] ??
            'Pass any React node to the <code>icon</code> prop to display a contextual icon on the left of the alert content. The icon color is automatically matched to the variant.'}
        </DocText>
        <Showcase
          code={`<Alert variant="success" icon={<CheckCircle />}>
  <AlertTitle>Payment confirmed</AlertTitle>
  <AlertDescription>Your payment of $49.00 was processed successfully.</AlertDescription>
</Alert>
<Alert variant="error" icon={<XCircle />}>
  <AlertTitle>Upload failed</AlertTitle>
  <AlertDescription>The file exceeds the 10 MB size limit.</AlertDescription>
</Alert>
<Alert variant="warning" icon={<AlertTriangle />}>
  <AlertTitle>Low storage</AlertTitle>
  <AlertDescription>You have less than 500 MB of storage remaining.</AlertDescription>
</Alert>
<Alert variant="info" icon={<Info />}>
  <AlertTitle>Maintenance window</AlertTitle>
  <AlertDescription>Scheduled maintenance on Sunday from 2–4 AM UTC.</AlertDescription>
</Alert>`}
        >
          <div className="w-full flex flex-col gap-3">
            <Alert variant="success" icon={<CheckCircle />} className="w-full">
              <AlertTitle>Payment confirmed</AlertTitle>
              <AlertDescription>Your payment of $49.00 was processed successfully.</AlertDescription>
            </Alert>
            <Alert variant="error" icon={<XCircle />} className="w-full">
              <AlertTitle>Upload failed</AlertTitle>
              <AlertDescription>The file exceeds the 10 MB size limit.</AlertDescription>
            </Alert>
            <Alert variant="warning" icon={<AlertTriangle />} className="w-full">
              <AlertTitle>Low storage</AlertTitle>
              <AlertDescription>You have less than 500 MB of storage remaining.</AlertDescription>
            </Alert>
            <Alert variant="info" icon={<Info />} className="w-full">
              <AlertTitle>Maintenance window</AlertTitle>
              <AlertDescription>Scheduled maintenance on Sunday from 2–4 AM UTC.</AlertDescription>
            </Alert>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['dismissible']?.title ?? 'Dismissible'}>
        <DocText>
          {pt?.sections?.['dismissible']?.texts?.[0] ??
            'Set <code>dismissible</code> to show a close button. When clicked, the alert animates out and the optional <code>onDismiss</code> callback is called, allowing you to sync dismissal state externally.'}
        </DocText>
        <Showcase
          code={`<Alert variant="info" icon={<Info />} dismissible onDismiss={() => console.log('dismissed')}>
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>Try the new dashboard layout in your account settings.</AlertDescription>
</Alert>
<Alert variant="success" icon={<CheckCircle />} dismissible>
  <AlertTitle>Profile updated</AlertTitle>
  <AlertDescription>Your profile information has been saved.</AlertDescription>
</Alert>`}
        >
          <div className="w-full flex flex-col gap-3">
            <Alert variant="info" icon={<Info />} dismissible className="w-full">
              <AlertTitle>New feature available</AlertTitle>
              <AlertDescription>Try the new dashboard layout in your account settings.</AlertDescription>
            </Alert>
            <Alert variant="success" icon={<CheckCircle />} dismissible className="w-full">
              <AlertTitle>Profile updated</AlertTitle>
              <AlertDescription>Your profile information has been saved.</AlertDescription>
            </Alert>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Alert props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"default" | "success" | "error" | "warning" | "info" | "glass"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the alert.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['icon'] ??
                'Optional icon displayed to the left of the alert content. Icon color is matched to the variant.',
            },
            {
              name: 'dismissible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['dismissible'] ??
                'When true, shows a close button that animates the alert out when clicked.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onDismiss'] ?? 'Called when the dismiss button is clicked, after the animation starts.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ?? 'Content of the alert. Compose with AlertTitle and AlertDescription.',
            },
          ]}
        />
        <DocText>
          {pt?.sections?.['api-reference']?.texts?.[1] ??
            'AlertTitle and AlertDescription accept standard HTML heading/paragraph props and className.'}
        </DocText>
      </DocSection>
    </DocPage>
  );
}
