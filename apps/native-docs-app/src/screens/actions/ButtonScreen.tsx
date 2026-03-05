import React from 'react';
import { Button } from '@tac-ui/native';
import { Rocket, Send } from '@tac-ui/icon-native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function ButtonScreen() {
  return (
    <ScreenLayout title="Button" description="Triggers an action or event when pressed.">
      <Section title="Import">
        <CodePreview code={`import { Button } from '@tac-ui/native';`} />
      </Section>

      <Section title="Variants" description="Button supports multiple visual variants.">
        <ShowcaseCard
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="point">Point</Button>
<Button variant="destructive">Destructive</Button>`}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="point">Point</Button>
          <Button variant="destructive">Destructive</Button>
        </ShowcaseCard>
      </Section>

      <Section title="Sizes" description="Three available size options.">
        <ShowcaseCard
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ShowcaseCard>
      </Section>

      <Section title="With Icon" description="Buttons can include a leading icon.">
        <ShowcaseCard
          code={`import { Rocket, Send } from '@tac-ui/icon-native';

<Button leftIcon={<Rocket size={16} />}>Get Started</Button>
<Button variant="outline" rightIcon={<Send size={16} />}>Submit</Button>
<Button variant="secondary" iconOnly leftIcon={<Rocket size={16} />} />`}
        >
          <Button leftIcon={<Rocket size={16} />}>Get Started</Button>
          <Button variant="outline" rightIcon={<Send size={16} />}>
            Submit
          </Button>
          <Button variant="secondary" iconOnly leftIcon={<Rocket size={16} />} />
        </ShowcaseCard>
      </Section>

      <Section title="Disabled" description="Disabled state prevents user interaction.">
        <ShowcaseCard
          code={`<Button disabled>Default</Button>
<Button variant="outline" disabled>Outline</Button>`}
        >
          <Button disabled>Default</Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"primary" | "secondary" | "outline" | "ghost" | "point" | "destructive"',
              default: '"primary"',
              description: 'Visual style variant of the button.',
            },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the button.' },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '-',
              description: 'Icon element displayed before the label.',
            },
            {
              name: 'rightIcon',
              type: 'React.ReactNode',
              default: '-',
              description: 'Icon element displayed after the label.',
            },
            {
              name: 'iconOnly',
              type: 'boolean',
              default: 'false',
              description: 'Makes the button square for icon-only use.',
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button when true.' },
            {
              name: 'onPress',
              type: '() => void',
              default: '-',
              description: 'Callback fired when the button is pressed.',
            },
            { name: 'children', type: 'React.ReactNode', default: '-', description: 'Button label content.' },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
