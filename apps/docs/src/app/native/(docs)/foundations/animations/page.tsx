'use client';

import React from 'react';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, PreviewCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';

const springPresets = [
  { name: 'snappy', stiffness: 260, damping: 32, mass: 1, desc: 'Standard — layout shifts, morphing' },
  { name: 'gentle', stiffness: 180, damping: 30, mass: 1, desc: 'Smooth — page transitions' },
  { name: 'bouncy', stiffness: 260, damping: 30, mass: 1, desc: 'Playful — confirmations, celebrations' },
  { name: 'magnetic', stiffness: 400, damping: 40, mass: 0.8, desc: 'Snappy — toggles, dropdowns' },
  { name: 'entrance', stiffness: 180, damping: 28, mass: 0.9, desc: 'Arrival — content fade-in' },
  { name: 'light', stiffness: 350, damping: 35, mass: 0.5, desc: 'Nimble — interactive feedback' },
  { name: 'heavy', stiffness: 250, damping: 38, mass: 1.5, desc: 'Weighty — large overlays' },
];

const durations = [
  { name: 'instant', ms: 80, desc: 'Micro feedback' },
  { name: 'fast', ms: 150, desc: 'Hover, focus changes' },
  { name: 'normal', ms: 220, desc: 'Standard transitions' },
  { name: 'slow', ms: 320, desc: 'Larger state changes' },
  { name: 'complex', ms: 450, desc: 'Multi-step animations' },
];

export default function NativeAnimationsPage() {
  const pt = usePageTranslation('native-animations');

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Animations'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Spring physics and duration tokens for React Native. Tac UI uses Animated.spring for organic, physical motion.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['philosophy']?.title ?? 'Philosophy'}>
        <DocText>
          {pt?.sections?.['philosophy']?.texts?.[0] ??
            "Tac UI Native uses spring-based animations through React Native's Animated API. Elements have mass and momentum — they spring into place with natural deceleration. Seven spring presets cover all common use cases."}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['spring-presets']?.title ?? 'Spring Presets'}>
        <DocText>
          {pt?.sections?.['spring-presets']?.texts?.[0] ??
            'Import spring configs from the constants module. Each preset has distinct stiffness, damping, and mass values.'}
        </DocText>
        <PreviewCode
          code={`import { springConfigs } from '@tac-ui/native/constants/motion';

// Use with Animated.spring
Animated.spring(animatedValue, {
  toValue: 1,
  ...springConfigs.snappy,
  useNativeDriver: true,
}).start();`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {springPresets.map((p) => (
            <div
              key={p.name}
              className="flex flex-col gap-2 p-4 rounded-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--background)]"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">springConfigs.{p.name}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{p.desc}</p>
              </div>
              <div className="h-8 relative overflow-hidden rounded-[var(--radius-sm)] bg-[var(--secondary)]/50">
                <div className="absolute inset-y-0 left-0 w-full bg-[var(--point)]/15 rounded-[var(--radius-sm)] flex items-center justify-end pr-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--point)]" />
                </div>
              </div>
              <p className="text-[11px] font-mono text-[var(--muted-foreground)]">
                stiffness: {p.stiffness} · damping: {p.damping} · mass: {p.mass}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['duration-scale']?.title ?? 'Duration Scale'}>
        <DocText>
          {pt?.sections?.['duration-scale']?.texts?.[0] ??
            'Duration constants for non-spring animations (e.g., Animated.timing).'}
        </DocText>
        <div className="flex flex-col gap-2">
          {durations.map((d) => (
            <div key={d.name} className="flex items-center gap-4 py-2">
              <span className="w-20 text-sm font-semibold text-[var(--foreground)]">{d.name}</span>
              <div className="flex-1 h-2 rounded-full bg-[var(--secondary)] overflow-hidden">
                <div className="h-full rounded-full bg-[var(--point)]" style={{ width: `${(d.ms / 450) * 100}%` }} />
              </div>
              <span className="w-12 text-right text-xs font-mono text-[var(--muted-foreground)]">{d.ms}ms</span>
              <span className="w-36 text-xs text-[var(--muted-foreground)]">{d.desc}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['press-feedback']?.title ?? 'Press Feedback'}>
        <DocText>
          {pt?.sections?.['press-feedback']?.texts?.[0] ??
            "All interactive native components include press feedback via Pressable's pressed state. This provides immediate tactile response."}
        </DocText>
        <PreviewCode
          code={`// Standard press pattern used across native components
<Pressable
  onPress={onPress}
  style={({ pressed }) => [
    styles.base,
    pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
  ]}
>
  {children}
</Pressable>

// Components with press feedback:
// Button:    opacity: 0.9, scale: 0.98
// Card:      opacity: 0.97, scale: 0.99
// Chip:      opacity: 0.8, scale: 0.98
// Checkbox:  opacity: 0.8
// Radio:     opacity: 0.8
// Badge:     opacity: 0.8, scale: 0.98
// Tab:       opacity: 0.7`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['animated-components']?.title ?? 'Animated Components'}>
        <DocText>
          {pt?.sections?.['animated-components']?.texts?.[0] ??
            'Several native components use Animated.spring for smooth state transitions.'}
        </DocText>
        <PreviewCode
          code={`// Switch — spring-animated thumb position
// Uses Animated.spring with springConfigs.snappy

// SegmentController — animated selection indicator
// Uses Animated.spring for sliding highlight

// Tabs — animated underline indicator
// Slides between tabs with springConfigs.snappy

// Toggle — rotation animation
// 3D flip between icon states`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['all-configs']?.title ?? 'All Spring Configs'}>
        <DocText>
          {pt?.sections?.['all-configs']?.texts?.[0] ?? 'Complete reference of available spring configurations.'}
        </DocText>
        <PreviewCode
          language="typescript"
          code={`import { springConfigs, duration } from '@tac-ui/native/constants/motion';

// springConfigs
{
  snappy:   { stiffness: 260, damping: 32, mass: 1 },
  gentle:   { stiffness: 180, damping: 30, mass: 1 },
  bouncy:   { stiffness: 260, damping: 30, mass: 1 },
  magnetic: { stiffness: 400, damping: 40, mass: 0.8 },
  entrance: { stiffness: 180, damping: 28, mass: 0.9 },
  light:    { stiffness: 350, damping: 35, mass: 0.5 },
  heavy:    { stiffness: 250, damping: 38, mass: 1.5 },
}

// duration (milliseconds)
{
  instant: 80,
  fast:    150,
  normal:  220,
  slow:    320,
  complex: 450,
}`}
        />
      </DocSection>
    </DocPage>
  );
}
