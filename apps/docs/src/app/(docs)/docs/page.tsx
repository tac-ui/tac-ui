'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Card, CardHeader, CardTitle, CardDescription, CodeBlock } from '@tac-ui/web';
import { Palette, Component, Moon, Accessibility, BarChart3, LayoutGrid } from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocSection, DocText } from '@/components/docs/DocPage';

const featureCards = [
  { key: 'designTokens', icon: Palette, title: 'Design Tokens', description: 'Shared color, spacing, typography, and motion tokens across platforms.', href: '/foundations/colors' },
  { key: 'components', icon: Component, title: '40+ Components', description: 'Production-ready React components with full TypeScript support.', href: '/components/button' },
  { key: 'darkMode', icon: Moon, title: 'Dark Mode', description: 'Built-in light and dark themes via CSS custom properties.', href: '/foundations/colors' },
  { key: 'accessibility', icon: Accessibility, title: 'Accessibility', description: 'Focus trapping, keyboard navigation, and ARIA attributes built in.', href: '/components/dialog' },
  { key: 'charts', icon: BarChart3, title: 'Charts', description: 'Pure SVG chart components that consume your design tokens.', href: '/components/chart' },
  { key: 'layoutSystem', icon: LayoutGrid, title: 'Layout System', description: '9 pre-composed page layout patterns for rapid scaffolding.', href: '/components/layout' },
];

export default function IntroductionPage() {
  const pt = usePageTranslation('index');

  return (
    <DocPage>
      {/* ── Header ── */}
      <div className="relative flex flex-col gap-3 py-4">
        <div className="relative flex items-center gap-2">
          <Badge variant="outline">v0.1.0</Badge>
          <Badge variant="secondary">Open Source</Badge>
        </div>
        <h1 className="relative text-3xl font-bold tracking-tight leading-tight m-0 text-[var(--foreground)]">
          Tac UI
        </h1>
        <p className="relative text-base text-[var(--muted-foreground)] leading-relaxed m-0 max-w-[560px]">
          {pt?.description ?? 'A cross-platform design system built with shared tokens, React components, and comprehensive theming. Ship consistent, minimal, and structural UIs faster.'}
        </p>
      </div>

      {/* ── Brand Identity ── */}
      <DocSection title={pt?.sections?.brandIdentity?.title ?? 'Brand Identity'}>
        <DocText>
          {pt?.sections?.brandIdentity?.texts?.[0] ?? 'Tac UI is a precision instrument — clean, structural, and strictly modern minimalist. Every surface has purpose, every edge is definitive, and every interaction asserts physical, tactile weight.'}
        </DocText>

        {/* Design Philosophy */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">{pt?.sections?.designPhilosophy?.title ?? `Design Philosophy: "Clean & Modern Minimalist"`}</h3>
        <DocText>
          {pt?.sections?.designPhilosophy?.texts?.[0] ?? 'Moving away from distracting glows and convoluted overlays, Tac UI embraces crisp borders and high-contrast typography. Focus states fit tightly (`ring-offset-0`), and surfaces are grounded with pure solids or subtle structural shadows instead of excessive glassmorphism.'}
        </DocText>

        {/* Layout Structuring */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">{pt?.sections?.pristineArchitecture?.title ?? 'Pristine Architecture'}</h3>
        <DocText>
          {pt?.sections?.pristineArchitecture?.texts?.[0] ?? 'Components utilize distinct 1px solid structural borders (`var(--border)`) seamlessly wrapping standard standard element variants. This establishes an unapologetically sharp, technical UI built for productivity without cognitive noise.'}
        </DocText>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 text-xs font-mono">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-base)] p-3 shadow-sm">
            <span className="text-[var(--muted-foreground)]">focus-visible</span>
            <div className="text-sm text-[var(--foreground)] mt-1 font-semibold">ring-offset-0</div>
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
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">{pt?.sections?.typographyHierarchy?.title ?? 'Typography & Hierarchy'}</h3>
        <DocText>
          {pt?.sections?.typographyHierarchy?.texts?.[0] ?? 'We rely heavily on precise typographic metrics. Headings utilize tight tracking (`tracking-tight`), while subtexts and descriptions embrace strict leading limits (`leading-tight`) to ensure clean rectangle bounding constraints around elements.'}
        </DocText>

        {/* Motion */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">{pt?.sections?.motionSpring?.title ?? 'Motion: Spring Physics'}</h3>
        <DocText>
          {pt?.sections?.motionSpring?.texts?.[0] ?? 'UI elements have mass and momentum. Interactive buttons scale securely down on press. Heavy overlays like modals enter quickly with structured deceleration.'}
        </DocText>

        {/* Accessibility */}
        <h3 className="text-base font-semibold text-[var(--foreground)] mt-6 mb-2">{pt?.sections?.a11y?.title ?? 'Accessibility'}</h3>
        <DocText>
          {pt?.sections?.a11y?.texts?.[0] ?? 'Consistent semantic tokens mapping right into strictly compliant CSS variables ensures WCAG AA text visibility. Zero-gap focus rings (`ring-[var(--point)]`) visibly lock onto elements upon keyboard iteration.'}
        </DocText>
      </DocSection>

      {/* ── Features ── */}
      <DocSection title={pt?.sections?.features?.title ?? 'Features'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featureCards.map((card) => {
            const Icon = card.icon;
            const feature = pt?.sections?.features?.items?.[card.key];
            return (
              <Link key={card.key} href={card.href} className="no-underline group">
                <Card className="h-full border-[var(--border)] group-hover:border-[var(--primary)]/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-[var(--primary)]" />
                      </div>
                      <CardTitle className="text-sm">{feature?.title ?? card.title}</CardTitle>
                    </div>
                    <CardDescription>{feature?.description ?? card.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </DocSection>

      {/* ── Quick Start ── */}
      <DocSection title={pt?.sections?.quickStart?.title ?? 'Quick Start'}>
        <DocText>{pt?.sections?.quickStart?.description ?? 'Install the packages and wrap your app with the provider.'}</DocText>
        <CodeBlock language="bash" code={`# Install
npm install @tac-ui/web @tac-ui/tokens

# or with pnpm
pnpm add @tac-ui/web @tac-ui/tokens`} />
      </DocSection>

      {/* ── Usage ── */}
      <DocSection title={pt?.sections?.usage?.title ?? 'Usage'}>
        <DocText>{pt?.sections?.usage?.description ?? 'Import components and use them with full TypeScript IntelliSense.'}</DocText>
        <CodeBlock language="tsx" code={`import { TacProvider, Button } from '@tac-ui/web';

export default function App() {
  return (
    <TacProvider>
      <Button variant="primary">Click me</Button>
    </TacProvider>
  );
}`} />
      </DocSection>
    </DocPage>
  );
}
