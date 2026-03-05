import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Chip } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

export default function ChipScreen() {
  const [selected, setSelected] = useState(false);
  const [chips, setChips] = useState(['React', 'TypeScript', 'Native']);

  return (
    <ScreenLayout
      title="Chip"
      description="Compact interactive elements for filtering, input tags, and category selection."
    >
      <Section title="Import">
        <CodePreview code={`import { Chip } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default">
        <ShowcaseCard code={`<Chip>Default</Chip>`}>
          <Chip>Default</Chip>
        </ShowcaseCard>
      </Section>

      <Section title="Variants">
        <ShowcaseCard
          code={`<Chip variant="filter">Filter</Chip>
<Chip variant="assist">Assist</Chip>
<Chip variant="suggestion">Suggestion</Chip>
<Chip variant="input">Input</Chip>
<Chip variant="glass">Glass</Chip>`}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Chip variant="filter">Filter</Chip>
            <Chip variant="assist">Assist</Chip>
            <Chip variant="suggestion">Suggestion</Chip>
            <Chip variant="input">Input</Chip>
            <Chip variant="glass">Glass</Chip>
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Interactive (Selected State)">
        <ShowcaseCard
          code={`const [selected, setSelected] = useState(false);
<Chip
  variant="filter"
  selected={selected}
  onPress={() => setSelected(!selected)}
>
  {selected ? 'Selected' : 'Press me'}
</Chip>`}
        >
          <Chip variant="filter" selected={selected} onPress={() => setSelected(!selected)}>
            {selected ? 'Selected' : 'Press me'}
          </Chip>
        </ShowcaseCard>
      </Section>

      <Section title="With Delete (onDismiss)">
        <ShowcaseCard
          code={`const [chips, setChips] = useState(['React', 'TypeScript', 'Native']);
{chips.map(chip => (
  <Chip
    key={chip}
    variant="input"
    onDismiss={() => setChips(prev => prev.filter(c => c !== chip))}
  >
    {chip}
  </Chip>
))}`}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {chips.map((chip) => (
              <Chip key={chip} variant="input" onDismiss={() => setChips((prev) => prev.filter((c) => c !== chip))}>
                {chip}
              </Chip>
            ))}
          </View>
        </ShowcaseCard>
      </Section>

      <Section title="Disabled">
        <ShowcaseCard code={`<Chip variant="filter" disabled>Disabled</Chip>`}>
          <Chip variant="filter" disabled>
            Disabled
          </Chip>
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'variant',
              type: "'filter' | 'assist' | 'suggestion' | 'input' | 'glass'",
              default: "'filter'",
              description: 'Visual style variant of the chip.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'Label content rendered inside the chip.',
            },
            {
              name: 'selected',
              type: 'boolean',
              default: 'false',
              description: 'Whether the chip is in a selected/active state.',
            },
            {
              name: 'onPress',
              type: '() => void',
              default: '—',
              description: 'Callback fired when the chip is pressed.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '—',
              description: 'When provided, renders an X button to dismiss the chip.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Reduces opacity and disables all press interactions.',
            },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '—',
              description: 'Icon node rendered to the left of the label.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
