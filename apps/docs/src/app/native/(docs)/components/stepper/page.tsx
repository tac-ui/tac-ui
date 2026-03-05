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
import { Stepper, Step } from '@tac-ui/native';
import { User, Settings, CheckCircle, Package, Truck, MapPin } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

export default function NativeStepperPage() {
  const pt = usePageTranslation('native-stepper');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Stepper'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A multi-step progress indicator that guides users through a sequence of steps.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Stepper, Step } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Stepper props below.'}
        </DocText>
        <NativePlayground
          controls={{
            currentStep: {
              type: 'select',
              label: 'Current Step',
              options: ['0', '1', '2', '3'],
              defaultValue: '1',
            },
            orientation: {
              type: 'select',
              label: 'Orientation',
              options: ['horizontal', 'vertical'],
              defaultValue: 'horizontal',
            },
          }}
          render={(values) => (
            <Stepper
              activeStep={Number(values.currentStep)}
              orientation={values.orientation as 'horizontal' | 'vertical'}
            >
              <Step title="Account" description="Create your account" />
              <Step title="Profile" description="Set up your profile" />
              <Step title="Review" description="Review and confirm" />
              <Step title="Done" description="All finished" />
            </Stepper>
          )}
          code={(values) =>
            `<Stepper activeStep={${values.currentStep}} orientation="${values.orientation}">\n  <Step title="Account" description="Create your account" />\n  <Step title="Profile" description="Set up your profile" />\n  <Step title="Review" description="Review and confirm" />\n  <Step title="Done" description="All finished" />\n</Stepper>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['horizontal']?.title ?? 'Horizontal'}>
        <DocText>
          {pt?.sections?.['horizontal']?.texts?.[0] ??
            'The default horizontal layout renders step circles connected by animated progress bars, with labels below. Steps before activeStep show a checkmark; the active step is highlighted with a ring.'}
        </DocText>
        <NativeShowcase
          code={`<Stepper activeStep={1} orientation="horizontal">
  <Step title="Account" description="Create your account" />
  <Step title="Profile" description="Set up your profile" />
  <Step title="Review" description="Review and confirm" />
</Stepper>`}
        >
          <Stepper activeStep={1} orientation="horizontal">
            <Step title="Account" description="Create your account" />
            <Step title="Profile" description="Set up your profile" />
            <Step title="Review" description="Review and confirm" />
          </Stepper>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['vertical']?.title ?? 'Vertical'}>
        <DocText>
          {pt?.sections?.['vertical']?.texts?.[0] ??
            'In vertical orientation, steps are stacked with a connecting animated line between each step circle. This layout suits narrow containers and order-tracking flows.'}
        </DocText>
        <NativeShowcase
          code={`<Stepper activeStep={2} orientation="vertical">
  <Step title="Order placed" description="We have received your order" />
  <Step title="Processing" description="Your order is being prepared" />
  <Step title="Shipped" description="Your order is on the way" />
  <Step title="Delivered" description="Your order has been delivered" />
</Stepper>`}
        >
          <Stepper activeStep={2} orientation="vertical">
            <Step title="Order placed" description="We have received your order" />
            <Step title="Processing" description="Your order is being prepared" />
            <Step title="Shipped" description="Your order is on the way" />
            <Step title="Delivered" description="Your order has been delivered" />
          </Stepper>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['center-aligned-labels']?.title ?? 'Center Aligned Labels'}>
        <DocText>
          {pt?.sections?.['center-aligned-labels']?.texts?.[0] ??
            'Set alignLabels="center" to center all step labels beneath their circles, instead of the default edge alignment where the first label is left-aligned and the last is right-aligned.'}
        </DocText>
        <NativeShowcase
          code={`<Stepper activeStep={1} alignLabels="center">
  <Step title="Account" description="Create your account" />
  <Step title="Profile" description="Set up your profile" />
  <Step title="Review" description="Review and confirm" />
</Stepper>`}
        >
          <Stepper activeStep={1} alignLabels="center">
            <Step title="Account" description="Create your account" />
            <Step title="Profile" description="Set up your profile" />
            <Step title="Review" description="Review and confirm" />
          </Stepper>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>
          {pt?.sections?.['with-icons']?.texts?.[0] ??
            'Pass a React node to the icon prop on each Step to replace the default step number with a custom icon. Completed steps always show a checkmark regardless of the icon prop.'}
        </DocText>
        <NativeShowcase
          code={`import { User, Settings, CheckCircle } from '@tac-ui/icon-native';

<Stepper activeStep={1} orientation="horizontal">
  <Step title="Account" description="Create your account" icon={<User size={14} />} />
  <Step title="Settings" description="Configure preferences" icon={<Settings size={14} />} />
  <Step title="Complete" description="All done" icon={<CheckCircle size={14} />} />
</Stepper>`}
        >
          <Stepper activeStep={1} orientation="horizontal">
            <Step title="Account" description="Create your account" icon={<User size={14} />} />
            <Step title="Settings" description="Configure preferences" icon={<Settings size={14} />} />
            <Step title="Complete" description="All done" icon={<CheckCircle size={14} />} />
          </Stepper>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['vertical-with-icons']?.title ?? 'Vertical with Icons'}>
        <DocText>
          {pt?.sections?.['vertical-with-icons']?.texts?.[0] ??
            'Icons work with vertical orientation too, useful for timeline or order-tracking flows with semantic icon indicators at each step.'}
        </DocText>
        <NativeShowcase
          code={`import { Package, Truck, MapPin } from '@tac-ui/icon-native';

<Stepper activeStep={2} orientation="vertical">
  <Step title="Order placed" description="We have received your order" icon={<Package size={14} />} />
  <Step title="Shipped" description="Your order is on the way" icon={<Truck size={14} />} />
  <Step title="Delivered" description="Your order has been delivered" icon={<MapPin size={14} />} />
</Stepper>`}
        >
          <Stepper activeStep={2} orientation="vertical">
            <Step title="Order placed" description="We have received your order" icon={<Package size={14} />} />
            <Step title="Shipped" description="Your order is on the way" icon={<Truck size={14} />} />
            <Step title="Delivered" description="Your order has been delivered" icon={<MapPin size={14} />} />
          </Stepper>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Stepper props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'activeStep',
              type: 'number',
              default: '0',
              description:
                pt?.props?.['activeStep'] ??
                'Zero-based index of the currently active step. Steps before this index are shown as completed.',
            },
            {
              name: 'orientation',
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: pt?.props?.['orientation'] ?? 'Layout direction of the stepper.',
            },
            {
              name: 'alignLabels',
              type: '"edge" | "center"',
              default: '"edge"',
              description:
                pt?.props?.['alignLabels'] ??
                'Label alignment for horizontal layout. Edge aligns first label left and last label right; center aligns all labels centrally.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the root container View.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'One or more Step components.',
            },
          ]}
        />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'Step props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'title',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['step-title'] ??
                'Step title text displayed below the circle (horizontal) or beside it (vertical).',
            },
            {
              name: 'description',
              type: 'string',
              default: '-',
              description: pt?.props?.['step-description'] ?? 'Optional supporting text displayed below the title.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['step-icon'] ??
                'Custom icon displayed in the step circle instead of the step number. Overridden by a checkmark when the step is completed.',
            },
            {
              name: 'status',
              type: '"completed" | "active" | "pending"',
              default: '-',
              description:
                pt?.props?.['step-status'] ??
                "Override the step's visual state. Defaults to auto-detection from activeStep.",
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
