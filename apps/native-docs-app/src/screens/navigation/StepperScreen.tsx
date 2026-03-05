import React, { useState } from 'react';
import { Stepper, Step, Button, HStack } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function StepperScreen() {
  const [activeStep, setActiveStep] = useState(1);
  const [completedStep, setCompletedStep] = useState(2);

  return (
    <ScreenLayout
      title="Stepper"
      description="A multi-step progress indicator that guides users through a sequential workflow."
    >
      <Section title="Import">
        <CodePreview code={`import { Stepper, Step } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`const [activeStep, setActiveStep] = useState(1);\n\n<Stepper activeStep={activeStep}>\n  <Step title="Account" description="Create your account" />\n  <Step title="Profile" description="Set up your profile" />\n  <Step title="Review" description="Confirm details" />\n</Stepper>\n<Button onPress={() => setActiveStep(s => Math.min(s + 1, 3))}>Next</Button>`}
        >
          <Stepper activeStep={activeStep}>
            <Step title="Account" description="Create your account" />
            <Step title="Profile" description="Set up your profile" />
            <Step title="Review" description="Confirm details" />
          </Stepper>
          <HStack gap="sm" justify="center">
            <Button variant="outline" onPress={() => setActiveStep((s) => Math.max(s - 1, 0))}>
              Back
            </Button>
            <Button onPress={() => setActiveStep((s) => Math.min(s + 1, 3))}>Next</Button>
          </HStack>
        </ShowcaseCard>
      </Section>

      <Section title="Vertical Layout">
        <ShowcaseCard
          code={`<Stepper activeStep={1} orientation="vertical">\n  <Step title="Order Placed" description="We received your order" />\n  <Step title="Processing" description="Preparing your items" />\n  <Step title="Shipped" description="On the way to you" />\n  <Step title="Delivered" description="Package arrived" />\n</Stepper>`}
        >
          <Stepper activeStep={2} orientation="vertical">
            <Step title="Order Placed" description="We received your order" />
            <Step title="Processing" description="Preparing your items" />
            <Step title="Shipped" description="On the way to you" />
            <Step title="Delivered" description="Package arrived" />
          </Stepper>
        </ShowcaseCard>
      </Section>

      <Section title="Completed State">
        <ShowcaseCard
          code={`<Stepper activeStep={3}>\n  <Step title="Done" />\n  <Step title="Done" />\n  <Step title="Done" />\n</Stepper>`}
        >
          <Stepper activeStep={completedStep}>
            <Step title="Account" description="Completed" />
            <Step title="Profile" description="Completed" />
            <Step title="Review" description="All done!" />
          </Stepper>
          <HStack gap="sm" justify="center">
            <Button variant="outline" onPress={() => setCompletedStep((s) => Math.max(s - 1, 0))}>
              Reset
            </Button>
            <Button onPress={() => setCompletedStep((s) => Math.min(s + 1, 3))}>Complete</Button>
          </HStack>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'activeStep',
              type: 'number',
              default: '0',
              description: 'Index of the currently active step (0-based).',
            },
            {
              name: 'orientation',
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: 'Layout direction of the stepper.',
            },
            {
              name: 'title (Step)',
              type: 'string',
              default: '—',
              description: 'Label text displayed for the step.',
            },
            {
              name: 'description (Step)',
              type: 'string',
              default: '—',
              description: 'Optional secondary text below the step title.',
            },
            {
              name: 'icon (Step)',
              type: 'React.ReactNode',
              default: '—',
              description: 'Custom icon displayed instead of the step number.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
