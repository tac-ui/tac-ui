'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, Toggle } from '@tac-ui/web';
import { Play, RotateCcw, Sun, Moon } from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocText,
  InlineCode,
  Showcase,
} from '@/components/docs/DocPage';

/* ─── Spring Presets ─── */
const tacSpringPresets = [
  { name: 'default', stiffness: 260, damping: 34, mass: 1, desc: 'Standard — layout shifts, morphing' },
  { name: 'light', stiffness: 260, damping: 34, mass: 0.5, desc: 'Nimble — tilt, interactive feedback' },
  { name: 'heavy', stiffness: 220, damping: 32, mass: 1.5, desc: 'Weighty — overlays, large panels' },
  { name: 'magnetic', stiffness: 340, damping: 38, mass: 0.8, desc: 'Snappy — dropdowns, toggles' },
  { name: 'entrance', stiffness: 180, damping: 28, mass: 1.2, desc: 'Gentle arrival — page content' },
];

function SpringDemo({ preset }: { preset: (typeof tacSpringPresets)[0] }) {
  const [key, setKey] = useState(0);
  const spring = { type: 'spring' as const, stiffness: preset.stiffness, damping: preset.damping, mass: preset.mass };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--background)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">tacSpring.{preset.name}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{preset.desc}</p>
        </div>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border-none bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)] cursor-pointer transition-colors"
          aria-label="Replay"
        >
          <RotateCcw size={13} />
        </button>
      </div>
      <div className="h-10 relative overflow-hidden rounded-[var(--radius-sm)] bg-[var(--secondary)]/50">
        <motion.div
          key={key}
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={spring}
          className="absolute inset-y-0 left-0 w-full bg-[var(--point)]/15 rounded-[var(--radius-sm)] flex items-center justify-end pr-3"
        >
          <div className="w-3 h-3 rounded-full bg-[var(--point)]" />
        </motion.div>
      </div>
      <p className="text-[11px] font-mono text-[var(--muted-foreground)]">
        stiffness: {preset.stiffness} · damping: {preset.damping} · mass: {preset.mass}
      </p>
    </div>
  );
}

/* ─── Easing Curves ─── */
const easings = [
  { name: 'standard', value: 'cubic-bezier(0.22, 1, 0.36, 1)', desc: 'Default — slight overshoot' },
  { name: 'bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'Playful — toggles, confirmations' },
  { name: 'spring', value: 'cubic-bezier(0.22, 1.2, 0.36, 1)', desc: 'Stronger overshoot' },
  { name: 'elastic', value: 'cubic-bezier(0.68, -0.2, 0.265, 1.2)', desc: 'Rubber-band snap' },
  { name: 'easeOut', value: 'cubic-bezier(0, 0.55, 0.45, 1)', desc: 'Gentle deceleration' },
];

function EasingDemo({ easing }: { easing: (typeof easings)[0] }) {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col gap-2 p-4 rounded-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--background)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--foreground)]">{easing.name}</p>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border-none bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)] cursor-pointer transition-colors"
          aria-label="Replay"
        >
          <Play size={12} />
        </button>
      </div>
      <div className="h-8 relative overflow-hidden rounded-[var(--radius-sm)] bg-[var(--secondary)]/50">
        <div
          key={key}
          className="absolute inset-y-0 left-0 w-full rounded-[var(--radius-sm)] bg-[var(--point)]/15 flex items-center justify-end pr-2"
          style={{
            animation: `slide-in 600ms ${easing.value} forwards`,
            transform: 'translateX(-100%)',
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--point)]" />
        </div>
      </div>
      <p className="text-[11px] text-[var(--muted-foreground)]">{easing.desc}</p>
      <p className="text-[10px] font-mono text-[var(--muted-foreground)]">{easing.value}</p>
    </div>
  );
}

/* ─── Motion Variants ─── */
const springDefault = { type: 'spring' as const, stiffness: 260, damping: 34, mass: 1 };
const springMagnetic = { type: 'spring' as const, stiffness: 340, damping: 38, mass: 0.8 };
const springEntrance = { type: 'spring' as const, stiffness: 180, damping: 28, mass: 1.2 };
const springHeavy = { type: 'spring' as const, stiffness: 220, damping: 32, mass: 1.5 };
const springLight = { type: 'spring' as const, stiffness: 260, damping: 34, mass: 0.5 };

const variantDemos = [
  {
    name: 'defaultSpring',
    desc: 'Standard spring — layout shifts, morphing',
    variants: {
      hidden: { opacity: 0, y: 8, transition: springDefault },
      visible: { opacity: 1, y: 0, transition: springDefault },
    },
  },
  {
    name: 'dropdownMotionVariants',
    desc: 'Select, Combobox, Dropdown panels',
    variants: {
      hidden: { opacity: 0, scale: 0.96, y: -4, transition: springMagnetic },
      visible: { opacity: 1, scale: 1, y: 0, transition: springMagnetic },
    },
  },
  {
    name: 'panelVariants',
    desc: 'Modal, Dialog, Popover overlays',
    variants: {
      hidden: { opacity: 0, scale: 0.97, filter: 'blur(4px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: springHeavy },
    },
  },
  {
    name: 'blurFadeVariants',
    desc: 'Alert, EmptyState, Toast entrance',
    variants: {
      hidden: { opacity: 0, filter: 'blur(4px)', y: 6 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: springEntrance },
    },
  },
  {
    name: 'feedbackVariants',
    desc: 'Toast/Snackbar notification entry',
    variants: {
      hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springMagnetic },
    },
  },
];

function VariantDemo({ demo }: { demo: (typeof variantDemos)[0] }) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--background)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">{demo.name}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{demo.desc}</p>
        </div>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border-none bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)] cursor-pointer transition-colors"
          aria-label="Toggle"
        >
          <RotateCcw size={13} />
        </button>
      </div>
      <div className="h-14 flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--secondary)]/30">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key="demo"
              variants={demo.variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="px-6 py-2 bg-[var(--surface)] rounded-[var(--radius-md)] border border-solid border-[var(--border)] text-sm font-medium text-[var(--foreground)] shadow-sm"
            >
              {demo.name.replace('Variants', '').replace('MotionVariants', '')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Interactive Hover Demo ─── */
function HoverDemo() {
  return (
    <div className="flex gap-4 items-center">
      <motion.div
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97, y: 0 }}
        transition={springLight}
        className="px-6 py-3 bg-[var(--surface)] rounded-[var(--radius-md)] border border-solid border-[var(--border)] text-sm font-medium text-[var(--foreground)] cursor-pointer shadow-sm"
      >
        interactiveHover
      </motion.div>
      <motion.div
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={springLight}
        className="px-6 py-3 bg-[var(--surface)] rounded-[var(--radius-md)] border border-solid border-[var(--border)] text-sm font-medium text-[var(--foreground)] cursor-pointer shadow-sm"
      >
        subtleHover
      </motion.div>
      <motion.div
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={springLight}
        className="px-6 py-3 bg-[var(--surface)] rounded-[var(--radius-md)] border border-solid border-[var(--border)] text-sm font-medium text-[var(--foreground)] cursor-pointer shadow-sm"
      >
        microHover
      </motion.div>
    </div>
  );
}

/* ─── Toggle Demo ─── */
function ToggleDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Toggle checked={checked} onChange={setChecked} iconOn={<Moon />} iconOff={<Sun />} aria-label="Toggle theme" />
      <span className="text-sm text-[var(--muted-foreground)]">{checked ? 'On' : 'Off'}</span>
    </div>
  );
}

/* ─── Spotlight Demo ─── */
function SpotlightDemo() {
  return (
    <Card interactive className="w-full">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--muted-foreground)]">Hover to see spring-animated lift and press effects.</p>
      </CardContent>
    </Card>
  );
}

/* ─── Duration Scale ─── */
const durations = [
  { name: 'instant', ms: 80, desc: 'Micro feedback' },
  { name: 'fast', ms: 150, desc: 'Hover, focus' },
  { name: 'normal', ms: 220, desc: 'Standard transitions' },
  { name: 'slow', ms: 320, desc: 'Larger state changes' },
  { name: 'complex', ms: 450, desc: 'Multi-step, layout shifts' },
];

export default function AnimationsPage() {
  const pt = usePageTranslation('animations');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Animations'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Motion tokens, spring physics, and interaction hooks that give Tac UI its organic, physical feel.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['philosophy']?.title ?? 'Philosophy'}>
        <DocText>
          {pt?.sections?.['philosophy']?.texts?.[0] ?? (
            <>
              Tac UI uses spring-based animations inspired by Dia Browser. Elements have mass and momentum — they spring
              into place with natural deceleration rather than sliding mechanically. The system is built on Framer
              Motion springs with five mass-differentiated presets called <InlineCode>tacSpring</InlineCode>.
            </>
          )}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['spring-presets']?.title ?? 'Spring Presets'}>
        <DocText>
          {pt?.sections?.['spring-presets']?.texts?.[0] ?? (
            <>
              Import via <InlineCode>{"import { tacSpring } from '@tac-ui/tokens'"}</InlineCode>. Each preset varies in
              mass, creating distinct physical characters.
            </>
          )}
        </DocText>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tacSpringPresets.map((p) => (
            <SpringDemo key={p.name} preset={p} />
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['duration-scale']?.title ?? 'Duration Scale'}>
        <DocText>
          {pt?.sections?.['duration-scale']?.texts?.[0] ?? (
            <>
              CSS transition durations for non-spring animations. Access via <InlineCode>motion.duration</InlineCode>.
            </>
          )}
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

      <DocSection title={pt?.sections?.['easing-curves']?.title ?? 'Easing Curves'}>
        <DocText>
          {pt?.sections?.['easing-curves']?.texts?.[0] ?? (
            <>
              CSS easing functions for transitions. Access via <InlineCode>motion.easing</InlineCode>.
            </>
          )}
        </DocText>
        <style>{`@keyframes slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {easings.map((e) => (
            <EasingDemo key={e.name} easing={e} />
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['motion-variants']?.title ?? 'Motion Variants'}>
        <DocText>
          {pt?.sections?.['motion-variants']?.texts?.[0] ?? (
            <>
              Pre-built Framer Motion variant objects for common animation patterns. Import from{' '}
              <InlineCode>@tac-ui/web</InlineCode> internal constants.
            </>
          )}
        </DocText>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {variantDemos.map((d) => (
            <VariantDemo key={d.name} demo={d} />
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['interactive-hover']?.title ?? 'Interactive Hover'}>
        <DocText>
          {pt?.sections?.['interactive-hover']?.texts?.[0] ??
            'Spring-based hover and tap effects for interactive elements. Click or hover to feel the physics.'}
        </DocText>
        <Showcase
          code={`// interactiveHover — buttons, cards, pagination
whileHover={{ scale: 1.02, y: -1 }}
whileTap={{ scale: 0.97, y: 0 }}

// subtleHover — navigation, breadcrumbs
whileHover={{ y: -1 }}
whileTap={{ scale: 0.98 }}

// microHover — table rows, avatars
whileHover={{ y: -1 }}
whileTap={{ scale: 0.98 }}`}
        >
          <HoverDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['animated-toggle']?.title ?? 'Toggle'}>
        <DocText>
          {pt?.sections?.['animated-toggle']?.texts?.[0] ?? (
            <>
              A button that swaps icons with a rotation animation. Uses <InlineCode>tacSpring.light</InlineCode> for
              snappy icon transitions.
            </>
          )}
        </DocText>
        <Showcase
          code={`<Toggle
  checked={checked}
  onChange={setChecked}
  iconOn={<Moon />}
  iconOff={<Sun />}
/>`}
        >
          <ToggleDemo />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['interaction-hooks']?.title ?? 'Interaction Hooks'}>
        <DocText>
          {pt?.sections?.['interaction-hooks']?.texts?.[0] ?? (
            <>
              Hooks for cursor-tracking effects. These power the Card component{"'"}s interactive features and can be
              used independently.
            </>
          )}
        </DocText>
        <div className="w-full">
          <SpotlightDemo />
        </div>
      </DocSection>
    </DocPage>
  );
}
