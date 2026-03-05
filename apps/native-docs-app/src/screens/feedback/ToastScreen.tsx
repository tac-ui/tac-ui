import React from 'react';
import { Text } from 'react-native';
import { useToast, Button, HStack } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';
import { Info, CheckCircle2, AlertTriangle, XCircle } from '@tac-ui/icon-native';

function ToastShowcase() {
  const { toast } = useToast();

  return (
    <>
      <Section title="Import">
        <CodePreview code={`import { useToast, ToastProvider } from '@tac-ui/native';`} />
      </Section>

      <Section title="Basic Example">
        <ShowcaseCard
          code={`const { toast } = useToast();\n\n<Button onPress={() => toast('Event created')}>Show Toast</Button>`}
        >
          <Button onPress={() => toast('Event created')}>Show Toast</Button>
        </ShowcaseCard>
      </Section>

      <Section title="Variants">
        <ShowcaseCard
          code={`<Button onPress={() => toast('Success!\\nYour changes have been saved.', { variant: 'success', icon: <CheckCircle2 size={16} /> })}>\n  Success\n</Button>`}
        >
          <HStack gap="sm" wrap>
            <Button
              variant="outline"
              onPress={() =>
                toast('Operation completed successfully', {
                  variant: 'success',
                  icon: <CheckCircle2 size={16} />,
                })
              }
            >
              Success
            </Button>
            <Button
              variant="outline"
              onPress={() =>
                toast('Invalid input detected', {
                  variant: 'error',
                  icon: <XCircle size={16} />,
                })
              }
            >
              Error
            </Button>
            <Button
              variant="outline"
              onPress={() =>
                toast('Please review the documentation', {
                  variant: 'warning',
                  icon: <AlertTriangle size={16} />,
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onPress={() =>
                toast('A new software update is available', {
                  variant: 'info',
                  icon: <Info size={16} />,
                })
              }
            >
              Info
            </Button>
          </HStack>
        </ShowcaseCard>
      </Section>

      <Section title="With Action">
        <ShowcaseCard
          code={`toast('Message deleted', {\n  action: <Text>Undo</Text>,\n  onAction: () => console.log('Undo pressed'),\n})`}
        >
          <Button
            onPress={() =>
              toast('Message deleted', {
                action: <Text style={{ color: '#fff' }}>Undo</Text>,
                onAction: () => console.log('Undo pressed'),
              })
            }
          >
            Show Toast with Action
          </Button>
        </ShowcaseCard>
      </Section>

      <Section title="Custom Duration">
        <ShowcaseCard
          code={`toast('I will disappear in 2 seconds', { duration: 2000 });\n\n// duration: 0 means it won't auto-dismiss\ntoast('I will stay until closed', { duration: 0 });`}
        >
          <HStack gap="sm">
            <Button variant="secondary" onPress={() => toast('Disappearing fast', { duration: 2000 })}>
              Short (2s)
            </Button>
            <Button variant="secondary" onPress={() => toast('Persistent toast', { duration: 0 })}>
              Persistent
            </Button>
          </HStack>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'message',
              type: 'string',
              default: '—',
              description: 'The main text of the toast.',
            },
            {
              name: 'variant',
              type: "'default' | 'success' | 'error' | 'warning' | 'info'",
              default: "'default'",
              description: 'Semantic style and colored indicator.',
            },
            {
              name: 'duration',
              type: 'number',
              default: '5000',
              description: 'Time in ms before auto-dismiss. Pass 0 to disable.',
            },
            {
              name: 'action',
              type: 'ReactNode',
              default: '—',
              description: 'Custom React element to display as an action button.',
            },
            {
              name: 'onAction',
              type: '() => void',
              default: '—',
              description: 'Callback fired when the action is pressed.',
            },
          ]}
        />
      </Section>
    </>
  );
}

export default function ToastScreen() {
  return (
    <ScreenLayout title="Toast" description="A brief status message positioned to the corner or edge of the screen.">
      <ToastShowcase />
    </ScreenLayout>
  );
}
