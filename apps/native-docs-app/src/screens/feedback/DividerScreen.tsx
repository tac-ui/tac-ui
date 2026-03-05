import React from 'react';
import { View, Text } from 'react-native';
import { Divider, useTacNativeTheme } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

function DividerShowcase() {
  const { theme } = useTacNativeTheme();
  return (
    <>
      <Section title="Import">
        <CodePreview code={`import { Divider } from '@tac-ui/native';`} />
      </Section>

      <Section title="Horizontal (Default)">
        <ShowcaseCard code={`<Divider />`}>
          <Text style={{ color: theme.colors.foreground, fontSize: 14 }}>Above the divider</Text>
          <Divider />
          <Text style={{ color: theme.colors.foreground, fontSize: 14 }}>Below the divider</Text>
        </ShowcaseCard>
      </Section>

      <Section title="Vertical">
        <ShowcaseCard
          code={`<View style={{ flexDirection: 'row', height: 40, alignItems: 'center', gap: 12 }}>\n  <Text>Left</Text>\n  <Divider orientation="vertical" />\n  <Text>Right</Text>\n</View>`}
        >
          <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', gap: 12 }}>
            <Text style={{ color: theme.colors.foreground, fontSize: 14 }}>Left</Text>
            <Divider orientation="vertical" />
            <Text style={{ color: theme.colors.foreground, fontSize: 14 }}>Right</Text>
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Variants">
        <ShowcaseCard
          code={`<Divider variant="full" />\n<Divider variant="inset" />\n<Divider variant="thick" />\n<Divider variant="withLabel" label="OR" />`}
        >
          <Text style={{ color: theme.colors.mutedForeground, fontSize: 12 }}>full</Text>
          <Divider variant="full" />
          <Text style={{ color: theme.colors.mutedForeground, fontSize: 12 }}>inset</Text>
          <Divider variant="inset" />
          <Text style={{ color: theme.colors.mutedForeground, fontSize: 12 }}>thick</Text>
          <Divider variant="thick" />
          <Text style={{ color: theme.colors.mutedForeground, fontSize: 12 }}>withLabel</Text>
          <Divider variant="withLabel" label="OR" />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'orientation',
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: 'Direction of the divider line.',
            },
            {
              name: 'variant',
              type: "'full' | 'inset' | 'thick' | 'withLabel'",
              default: "'full'",
              description: 'Visual style variant of the divider.',
            },
            {
              name: 'label',
              type: 'string',
              default: '—',
              description: "Label text shown in the center (only used with variant='withLabel').",
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '—',
              description: 'Additional styles applied to the divider container.',
            },
          ]}
        />
      </Section>
    </>
  );
}

export default function DividerScreen() {
  return (
    <ScreenLayout title="Divider" description="A visual separator between sections of content.">
      <DividerShowcase />
    </ScreenLayout>
  );
}
