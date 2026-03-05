import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VStack, HStack, useTacNativeTheme } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

function ColorBox({
  color,
  label,
  width,
  height,
  opacity,
}: {
  color?: string;
  label?: string;
  width?: number;
  height?: number;
  opacity?: number;
}) {
  const { theme } = useTacNativeTheme();
  return (
    <View
      style={[
        {
          width: width || 48,
          height: height || 48,
          backgroundColor: color || theme.colors.secondary,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        opacity !== undefined && { opacity },
      ]}
    >
      {label ? <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>{label}</Text> : null}
    </View>
  );
}

function StackShowcase() {
  const { theme } = useTacNativeTheme();

  return (
    <>
      <Section title="Import">
        <CodePreview code={`import { VStack, HStack } from '@tac-ui/native';`} />
      </Section>

      <Section title="Playground">
        <Text style={{ color: theme.colors.mutedForeground, fontSize: 14, marginBottom: 16 }}>
          Interactively configure the VStack and HStack props below.
        </Text>
        <ShowcaseCard
          code={`<HStack gap="md" align="center">\n  <View style={{ width: 48, height: 48 }} />\n  <View style={{ width: 48, height: 48 }} />\n  <View style={{ width: 48, height: 48 }} />\n</HStack>`}
        >
          <HStack gap="md" align="center">
            <ColorBox opacity={0.6} />
            <ColorBox opacity={0.8} />
            <ColorBox opacity={1.0} />
          </HStack>
        </ShowcaseCard>
      </Section>

      <Section title="VStack — Gap Variants">
        <Text style={{ color: theme.colors.mutedForeground, fontSize: 14, marginBottom: 16 }}>
          VStack arranges children in a column. The gap prop maps to the design-token spacing scale (none, xs, sm, md,
          lg, xl, 2xl).
        </Text>
        <ShowcaseCard
          code={`<VStack gap="sm">
  <View style={{ height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
  <View style={{ height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
  <View style={{ height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
</VStack>

<VStack gap="md">...</VStack>

<VStack gap="xl">...</VStack>`}
        >
          <HStack gap="xl" align="start" justify="start">
            <VStack gap="sm">
              <ColorBox width={60} />
              <ColorBox width={60} />
              <ColorBox width={60} />
            </VStack>
            <VStack gap="md">
              <ColorBox width={60} />
              <ColorBox width={60} />
              <ColorBox width={60} />
            </VStack>
            <VStack gap="xl">
              <ColorBox width={60} />
              <ColorBox width={60} />
              <ColorBox width={60} />
            </VStack>
          </HStack>
        </ShowcaseCard>
      </Section>

      <Section title="HStack — Align and Justify">
        <Text style={{ color: theme.colors.mutedForeground, fontSize: 14, marginBottom: 16 }}>
          HStack arranges children in a row. Use align to control cross-axis positioning and justify to distribute items
          along the main axis.
        </Text>
        <ShowcaseCard
          code={`{/* Centered vertically, aligned start */}
<HStack gap="md" align="center" justify="start">
  <View style={{ width: 40, height: 40 }} />
  <View style={{ width: 40, height: 64 }} />
  <View style={{ width: 40, height: 32 }} />
</HStack>

{/* Space between items */}
<HStack gap="md" align="center" justify="between">
  <View style={{ width: 40, height: 40 }} />
  <View style={{ width: 40, height: 40 }} />
  <View style={{ width: 40, height: 40 }} />
</HStack>`}
        >
          <VStack gap="lg" style={{ width: '100%' }}>
            <HStack
              gap="md"
              align="center"
              justify="start"
              style={[styles.dashedBox, { borderColor: theme.colors.border }]}
            >
              <ColorBox width={40} height={40} />
              <ColorBox width={40} height={64} opacity={0.7} />
              <ColorBox width={40} height={32} opacity={0.4} />
            </HStack>
            <HStack
              gap="md"
              align="center"
              justify="between"
              style={[styles.dashedBox, { borderColor: theme.colors.border }]}
            >
              <ColorBox width={40} height={40} />
              <ColorBox width={40} height={40} />
              <ColorBox width={40} height={40} />
            </HStack>
          </VStack>
        </ShowcaseCard>
      </Section>

      <Section title="HStack — Wrap">
        <Text style={{ color: theme.colors.mutedForeground, fontSize: 14, marginBottom: 16 }}>
          Set wrap to allow children to flow onto multiple lines when the container is too narrow to fit them in a
          single row.
        </Text>
        <ShowcaseCard
          code={`<HStack gap="sm" wrap>
  {Array.from({ length: 10 }).map((_, i) => (
    <View key={i} style={{ width: 48, height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
  ))}
</HStack>`}
        >
          <HStack gap="sm" wrap style={{ width: '100%' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <ColorBox key={i} width={48} height={48} opacity={0.3 + i * 0.07} />
            ))}
          </HStack>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'gap',
              type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
              default: "'md'",
              description: 'Spacing between child elements using the design-token scale.',
            },
            {
              name: 'align',
              type: "'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'",
              default: "'stretch' (VStack) / 'center' (HStack)",
              description: 'Cross-axis alignment of children (alignItems).',
            },
            {
              name: 'justify',
              type: "'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'",
              default: "'flex-start'",
              description: 'Main-axis distribution of children (justifyContent).',
            },
            {
              name: 'wrap',
              type: 'boolean',
              default: 'false',
              description: 'Whether children wrap onto multiple lines.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '—',
              description: 'Additional React Native style applied to the container View.',
            },
          ]}
        />
      </Section>
    </>
  );
}

const styles = StyleSheet.create({
  dashedBox: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 12,
    borderRadius: 8,
  },
});

export default function StackScreen() {
  return (
    <ScreenLayout
      title="Stack"
      description="Layout primitives for arranging children in a vertical or horizontal stack with consistent spacing."
    >
      <StackShowcase />
    </ScreenLayout>
  );
}
