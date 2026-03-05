import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@tac-ui/native';
import { CheckCircle, XCircle, AlertTriangle, Info } from '@tac-ui/icon-native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function AlertScreen() {
  return (
    <ScreenLayout title="Alert" description="Displays a callout for user attention with contextual feedback messages.">
      <Section title="Import">
        <CodePreview code={`import { Alert, AlertTitle, AlertDescription } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`<Alert>\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>This is a default alert message.</AlertDescription>\n</Alert>`}
        >
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>
        </ShowcaseCard>
      </Section>

      <Section title="Variants">
        <ShowcaseCard
          code={`<Alert variant="success">\n  <AlertTitle>Success</AlertTitle>\n  <AlertDescription>Your changes have been saved.</AlertDescription>\n</Alert>\n\n<Alert variant="error">\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>Something went wrong. Please try again.</AlertDescription>\n</Alert>\n\n<Alert variant="warning">\n  <AlertTitle>Warning</AlertTitle>\n  <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>\n</Alert>\n\n<Alert variant="info">\n  <AlertTitle>Info</AlertTitle>\n  <AlertDescription>A new version is available.</AlertDescription>\n</Alert>`}
        >
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>A new version is available.</AlertDescription>
          </Alert>
        </ShowcaseCard>
      </Section>

      <Section title="With Icon">
        <ShowcaseCard
          code={`import { CheckCircle, XCircle, AlertTriangle, Info } from '@tac-ui/icon-native';\n\n<Alert variant="success" icon={<CheckCircle size={18} color="currentColor" />}>\n  <AlertTitle>Success</AlertTitle>\n  <AlertDescription>Operation completed successfully.</AlertDescription>\n</Alert>`}
        >
          <Alert variant="success" icon={<CheckCircle size={18} color="#22c55e" />}>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Operation completed successfully.</AlertDescription>
          </Alert>
          <Alert variant="error" icon={<XCircle size={18} color="#ef4444" />}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to connect to the server.</AlertDescription>
          </Alert>
          <Alert variant="warning" icon={<AlertTriangle size={18} color="#f59e0b" />}>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Disk space is running low.</AlertDescription>
          </Alert>
          <Alert variant="info" icon={<Info size={18} color="#3b82f6" />}>
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>2 updates are available.</AlertDescription>
          </Alert>
        </ShowcaseCard>
      </Section>

      <Section title="Dismissible">
        <ShowcaseCard
          code={`<Alert dismissible onDismiss={() => console.log('dismissed')}>\n  <AlertTitle>Dismissible Alert</AlertTitle>\n  <AlertDescription>Tap the X to dismiss this alert.</AlertDescription>\n</Alert>`}
        >
          <Alert dismissible onDismiss={() => {}}>
            <AlertTitle>Dismissible Alert</AlertTitle>
            <AlertDescription>Tap the X to dismiss this alert.</AlertDescription>
          </Alert>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: "'default' | 'success' | 'error' | 'warning' | 'info'",
              default: "'default'",
              description: 'The visual style variant of the alert.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '—',
              description: 'Icon element displayed on the left side of the alert.',
            },
            {
              name: 'dismissible',
              type: 'boolean',
              default: 'false',
              description: 'When true, shows a close button to dismiss the alert.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '—',
              description: 'Called when the dismiss button is pressed.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'Content of the alert. Use AlertTitle and AlertDescription.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
