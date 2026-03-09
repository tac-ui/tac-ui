'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Card, CardHeader, CardTitle, CardDescription, CodeBlock } from '@tac-ui/web';
import { Smartphone, Component, Moon, Palette, Layers, LayoutGrid } from '@tac-ui/icon';
import { DocPage, DocSection, DocText } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { usePageTranslation } from '@/i18n';

const featureCardDefs = [
  {
    key: 'tokens',
    icon: Palette,
    href: '/native/getting-started',
    defaultTitle: 'Design Tokens',
    defaultDescription: 'Shared color, spacing, typography, and motion tokens via @tac-ui/tokens/native.',
  },
  {
    key: 'components',
    icon: Component,
    href: '/native/components/button',
    defaultTitle: '20 Components',
    defaultDescription: 'Production-ready React Native components ported from @tac-ui/web.',
  },
  {
    key: 'darkMode',
    icon: Moon,
    href: '/native/getting-started',
    defaultTitle: 'Dark Mode',
    defaultDescription: 'Built-in light, dark, and system themes via TacNativeProvider.',
  },
  {
    key: 'crossPlatform',
    icon: Smartphone,
    href: '/native/getting-started',
    defaultTitle: 'Cross-Platform',
    defaultDescription: 'Consistent design language shared with @tac-ui/web counterparts.',
  },
  {
    key: 'animated',
    icon: Layers,
    href: '/native/components/animated-toggle',
    defaultTitle: 'Animated',
    defaultDescription: 'Spring physics animations via React Native Animated API.',
  },
  {
    key: 'layout',
    icon: LayoutGrid,
    href: '/native/components/stack',
    defaultTitle: 'Layout Primitives',
    defaultDescription: 'Stack and layout utilities for rapid screen scaffolding.',
  },
];

export default function NativeIntroPage() {
  const pt = usePageTranslation('native-docs');
  return (
    <DocPage navGroups={nativeNavGroups}>
      {/* ── Header ── */}
      <div className="relative flex flex-col gap-3 py-4">
        <div className="relative flex items-center gap-2">
          <Badge variant="outline">v1.0.2</Badge>
          <Badge variant="secondary">React Native</Badge>
        </div>
        <h1 className="relative text-3xl font-bold tracking-tight leading-tight m-0 text-[var(--foreground)]">
          {pt?.title ?? 'Tac UI Native'}
        </h1>
        <p className="relative text-base text-[var(--muted-foreground)] leading-relaxed m-0 max-w-[560px]">
          {pt?.description ??
            'The React Native component library for Tac UI. 20 components with the same design language, tokens, and API surface — built for iOS, Android, and Expo.'}
        </p>
      </div>

      {/* ── Brand Identity ── */}
      <DocSection title={pt?.sections?.brandIdentity?.title ?? 'Brand Identity'}>
        <DocText>
          {pt?.sections?.brandIdentity?.texts?.[0] ??
            'Tac UI Native is the mobile expression of the Tac design system — clean, structural, and strictly modern minimalist. Every surface has purpose, every edge is definitive, and every interaction asserts physical, tactile weight through spring physics.'}
        </DocText>

        {/* Design Philosophy */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">
          {pt?.sections?.designPhilosophy?.title ?? `Design Philosophy: "Clean & Modern Minimalist"`}
        </h3>
        <DocText>
          {pt?.sections?.designPhilosophy?.texts?.[0] ??
            'Native components embrace crisp borders and high-contrast typography, mirroring the web counterparts. Focus states are tight, surfaces are grounded with pure solids or subtle structural shadows, and every visual decision is shared through the token system.'}
        </DocText>

        {/* Platform Architecture */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">
          {pt?.sections?.pristineArchitecture?.title ?? 'Platform Architecture'}
        </h3>
        <DocText>
          {pt?.sections?.pristineArchitecture?.texts?.[0] ??
            'Components use theme-driven StyleSheet values consumed from TacNativeProvider. Structural borders, consistent spacing, and semantic colors are resolved at runtime from the shared token definitions — ensuring visual parity with web without platform compromise.'}
        </DocText>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 text-xs font-mono">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-base)] p-3 shadow-sm">
            <span className="text-[var(--muted-foreground)]">styling</span>
            <div className="text-sm text-[var(--foreground)] mt-1 font-semibold">theme context</div>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-base)] p-3 shadow-sm">
            <span className="text-[var(--muted-foreground)]">borders</span>
            <div className="text-sm text-[var(--foreground)] mt-1 font-semibold">1px solid structural</div>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-base)] p-3 shadow-sm">
            <span className="text-[var(--muted-foreground)]">motion</span>
            <div className="text-sm text-[var(--foreground)] mt-1 font-semibold">snappy spring scaling</div>
          </div>
        </div>

        {/* Typography */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">
          {pt?.sections?.typographyHierarchy?.title ?? 'Typography & Hierarchy'}
        </h3>
        <DocText>
          {pt?.sections?.typographyHierarchy?.texts?.[0] ??
            'Typography tokens define font sizes, weights, and line heights shared across platforms. Native components consume these values from the theme context, ensuring consistent typographic hierarchy between web and mobile.'}
        </DocText>

        {/* Motion */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">
          {pt?.sections?.motionSpring?.title ?? 'Motion: Spring Physics'}
        </h3>
        <DocText>
          {pt?.sections?.motionSpring?.texts?.[0] ??
            'UI elements have mass and momentum. Buttons scale down on press with spring physics, alerts slide in with magnetic deceleration, and toggles animate with snappy spring configs — all using the React Native Animated API.'}
        </DocText>

        {/* Accessibility */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">
          {pt?.sections?.a11y?.title ?? 'Accessibility'}
        </h3>
        <DocText>
          {pt?.sections?.a11y?.texts?.[0] ??
            'Components include proper accessibilityRole, accessibilityState, and accessibilityLabel props. Disabled states reduce opacity and block interactions consistently. Screen reader support is built into every interactive component.'}
        </DocText>
      </DocSection>

      {/* ── Features ── */}
      <DocSection title={pt?.sections?.features?.title ?? 'Features'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featureCardDefs.map((def) => {
            const Icon = def.icon;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const featureCards = (pt as any)?.featureCards;
            const cardTitle = featureCards?.[def.key]?.title ?? def.defaultTitle;
            const cardDescription = featureCards?.[def.key]?.description ?? def.defaultDescription;
            return (
              <Link key={def.key} href={def.href} className="no-underline group">
                <Card className="h-full border-[var(--border)] group-hover:border-[var(--primary)]/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-[var(--primary)]" />
                      </div>
                      <CardTitle className="text-sm">{cardTitle}</CardTitle>
                    </div>
                    <CardDescription>{cardDescription}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </DocSection>

      {/* ── Quick Start ── */}
      <DocSection title={pt?.sections?.quickStart?.title ?? 'Quick Start'}>
        <DocText>
          {pt?.sections?.quickStart?.description ?? 'Install the packages and wrap your app with the provider.'}
        </DocText>
        <CodeBlock
          language="bash"
          code={`# Install
npm install @tac-ui/native @tac-ui/tokens @tac-ui/icon-native

# or with pnpm
pnpm add @tac-ui/native @tac-ui/tokens @tac-ui/icon-native`}
        />
      </DocSection>

      {/* ── Usage ── */}
      <DocSection title={pt?.sections?.usage?.title ?? 'Usage'}>
        <DocText>
          {pt?.sections?.usage?.description ?? 'Import components and use them with full TypeScript IntelliSense.'}
        </DocText>
        <CodeBlock
          language="tsx"
          code={`import { TacNativeProvider, Button } from '@tac-ui/native';

export default function App() {
  return (
    <TacNativeProvider defaultMode="system">
      <Button variant="primary" onPress={() => console.log('pressed')}>
        Hello Native
      </Button>
    </TacNativeProvider>
  );
}`}
        />
      </DocSection>
    </DocPage>
  );
}
