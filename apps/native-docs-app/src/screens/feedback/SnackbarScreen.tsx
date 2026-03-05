import React, { useState } from 'react';
import { Snackbar, Button } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function SnackbarScreen() {
  const [defaultVisible, setDefaultVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);

  return (
    <ScreenLayout
      title="Snackbar"
      description="Brief messages that appear at the bottom of the screen to provide feedback."
    >
      <Section title="Import">
        <CodePreview code={`import { Snackbar } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`const [visible, setVisible] = useState(false);\n\n<Button onPress={() => setVisible(true)}>Show Snackbar</Button>\n<Snackbar\n  message="Action completed successfully"\n  visible={visible}\n  onDismiss={() => setVisible(false)}\n/>`}
        >
          <Button onPress={() => setDefaultVisible(true)}>Show Snackbar</Button>
          <Snackbar
            message="Action completed successfully"
            visible={defaultVisible}
            onDismiss={() => setDefaultVisible(false)}
          />
        </ShowcaseCard>
      </Section>

      <Section title="Variants">
        <ShowcaseCard
          code={`<Button onPress={() => setVisible(true)} variant="outline">Success</Button>\n<Snackbar\n  variant="success"\n  message="Changes saved successfully!"\n  visible={visible}\n  onDismiss={() => setVisible(false)}\n/>`}
        >
          <Button variant="outline" onPress={() => setSuccessVisible(true)}>
            Show Success
          </Button>
          <Button variant="outline" onPress={() => setErrorVisible(true)}>
            Show Error
          </Button>
          <Button variant="outline" onPress={() => setWarningVisible(true)}>
            Show Warning
          </Button>
          <Snackbar
            variant="success"
            message="Changes saved successfully!"
            visible={successVisible}
            onDismiss={() => setSuccessVisible(false)}
          />
          <Snackbar
            variant="error"
            message="Failed to save. Please try again."
            visible={errorVisible}
            onDismiss={() => setErrorVisible(false)}
          />
          <Snackbar
            variant="warning"
            message="You are running low on storage."
            visible={warningVisible}
            onDismiss={() => setWarningVisible(false)}
          />
        </ShowcaseCard>
      </Section>

      <Section title="With Action">
        <ShowcaseCard
          code={`<Snackbar\n  message="Item deleted"\n  visible={visible}\n  onDismiss={() => setVisible(false)}\n  action={{ label: 'Undo', onPress: () => console.log('undo') }}\n/>`}
        >
          <Button onPress={() => setDefaultVisible(true)}>Show with Action</Button>
          <Snackbar
            message="Item deleted"
            visible={defaultVisible}
            onDismiss={() => setDefaultVisible(false)}
            action={{ label: 'Undo', onPress: () => {} }}
          />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'message',
              type: 'string',
              default: '—',
              description: 'The text message to display in the snackbar.',
            },
            {
              name: 'variant',
              type: "'default' | 'success' | 'error' | 'warning' | 'info'",
              default: "'default'",
              description: 'The visual style variant of the snackbar.',
            },
            {
              name: 'visible',
              type: 'boolean',
              default: 'true',
              description: 'Controls whether the snackbar is visible.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '—',
              description: 'Called when the snackbar is dismissed.',
            },
            {
              name: 'duration',
              type: 'number',
              default: '4000',
              description: 'Duration in ms before auto-dismissing. 0 = no auto-dismiss.',
            },
            {
              name: 'action',
              type: '{ label: string; onPress: () => void }',
              default: '—',
              description: 'Optional action button shown on the right.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
