'use client';

import React from 'react';
import { User, Settings, CheckCircle, Package, Truck, MapPin } from '@tac-ui/icon';
import { Stepper, Step } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function StepperPage() {
  const pt = usePageTranslation('stepper');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Stepper'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A multi-step progress indicator that guides users through a sequence of steps.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['horizontal']?.title ?? 'Horizontal'}>
        <DocText>{pt?.sections?.['horizontal']?.texts?.[0] ?? 'The default horizontal layout renders step circles connected by animated progress bars, with labels below. Steps before activeStep show a checkmark; the active step is highlighted with a ring.'}</DocText>
        <Showcase code={`<Stepper activeStep={1} orientation="horizontal">
  <Step title="Account" description="Create your account" />
  <Step title="Profile" description="Set up your profile" />
  <Step title="Review" description="Review and confirm" />
</Stepper>`}>
          <div className="w-full">
            <Stepper activeStep={1} orientation="horizontal">
              <Step title="Account" description="Create your account" />
              <Step title="Profile" description="Set up your profile" />
              <Step title="Review" description="Review and confirm" />
            </Stepper>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['vertical']?.title ?? 'Vertical'}>
        <DocText>{pt?.sections?.['vertical']?.texts?.[0] ?? 'In vertical orientation, steps are stacked with a connecting animated line between each step circle. This layout suits narrow containers and order-tracking flows.'}</DocText>
        <Showcase code={`<Stepper activeStep={2} orientation="vertical">
  <Step title="Order placed" description="We have received your order" />
  <Step title="Processing" description="Your order is being prepared" />
  <Step title="Shipped" description="Your order is on the way" />
  <Step title="Delivered" description="Your order has been delivered" />
</Stepper>`}>
          <div className="w-full">
            <Stepper activeStep={2} orientation="vertical">
              <Step title="Order placed" description="We have received your order" />
              <Step title="Processing" description="Your order is being prepared" />
              <Step title="Shipped" description="Your order is on the way" />
              <Step title="Delivered" description="Your order has been delivered" />
            </Stepper>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['center-aligned-labels']?.title ?? 'Center Aligned Labels'}>
        <DocText>{pt?.sections?.['center-aligned-labels']?.texts?.[0] ?? 'Set alignLabels="center" to center all step labels beneath their circles, instead of the default edge alignment where the first label is left-aligned and the last is right-aligned.'}</DocText>
        <Showcase code={`<Stepper activeStep={1} alignLabels="center">
  <Step title="Account" description="Create your account" />
  <Step title="Profile" description="Set up your profile" />
  <Step title="Review" description="Review and confirm" />
</Stepper>`}>
          <div className="w-full">
            <Stepper activeStep={1} alignLabels="center">
              <Step title="Account" description="Create your account" />
              <Step title="Profile" description="Set up your profile" />
              <Step title="Review" description="Review and confirm" />
            </Stepper>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>{pt?.sections?.['with-icons']?.texts?.[0] ?? 'Pass a React node to the icon prop on each Step to replace the default step number with a custom icon. Completed steps always show a checkmark regardless of the icon prop.'}</DocText>
        <Showcase code={`<Stepper activeStep={1} orientation="horizontal">
  <Step title="Account" description="Create your account" icon={<User />} />
  <Step title="Settings" description="Configure preferences" icon={<Settings />} />
  <Step title="Complete" description="All done" icon={<CheckCircle />} />
</Stepper>`}>
          <div className="w-full">
            <Stepper activeStep={1} orientation="horizontal">
              <Step title="Account" description="Create your account" icon={<User />} />
              <Step title="Settings" description="Configure preferences" icon={<Settings />} />
              <Step title="Complete" description="All done" icon={<CheckCircle />} />
            </Stepper>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['vertical-with-icons']?.title ?? 'Vertical with Icons'}>
        <DocText>{pt?.sections?.['vertical-with-icons']?.texts?.[0] ?? 'Icons work with vertical orientation too, useful for timeline or order-tracking flows with semantic icon indicators at each step.'}</DocText>
        <Showcase code={`<Stepper activeStep={2} orientation="vertical">
  <Step title="Order placed" description="We have received your order" icon={<Package />} />
  <Step title="Shipped" description="Your order is on the way" icon={<Truck />} />
  <Step title="Delivered" description="Your order has been delivered" icon={<MapPin />} />
</Stepper>`}>
          <div className="w-full">
            <Stepper activeStep={2} orientation="vertical">
              <Step title="Order placed" description="We have received your order" icon={<Package />} />
              <Step title="Shipped" description="Your order is on the way" icon={<Truck />} />
              <Step title="Delivered" description="Your order has been delivered" icon={<MapPin />} />
            </Stepper>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Stepper props:'}</DocText>
        <PropsTable data={[
          { name: 'activeStep', type: 'number', default: '-', description: pt?.props?.['activeStep'] ?? 'Zero-based index of the currently active step. Steps before this index are shown as completed.' },
          { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: pt?.props?.['orientation'] ?? 'Layout direction of the stepper.' },
          { name: 'alignLabels', type: '"edge" | "center"', default: '"edge"', description: pt?.props?.['alignLabels'] ?? 'Label alignment for horizontal layout. Edge aligns first label left and last label right; center aligns all labels centrally.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['children'] ?? 'One or more Step components.' },
        ]} />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'Step props:'}</DocText>
        <PropsTable data={[
          { name: 'title', type: 'string', default: '-', description: pt?.props?.['title'] ?? 'Step title text displayed below the circle (horizontal) or beside it (vertical).' },
          { name: 'description', type: 'string', default: '-', description: pt?.props?.['description'] ?? 'Optional supporting text displayed below the title.' },
          { name: 'icon', type: 'React.ReactNode', default: '-', description: pt?.props?.['icon'] ?? 'Custom icon displayed in the step circle instead of the step number. Overridden by a checkmark when the step is completed.' },
          { name: 'status', type: '"completed" | "active" | "pending"', default: '-', description: pt?.props?.['status'] ?? 'Override the step\'s visual state. Defaults to auto-detection from activeStep.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
