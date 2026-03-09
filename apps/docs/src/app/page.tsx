'use client';

import React, { useSyncExternalStore, useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Header,
  Footer,
  VStack,
  HStack,
  Badge,
  useTacTheme,
  SegmentController,
  CodeBlock,
  Input,
  Switch,
  Slider,
  Chip,
  Avatar,
  Progress,
  Checkbox,
  Tabs,
  TabsList,
  TabTrigger,
  TabContent,
} from '@tac-ui/web';
import {
  TacLogo,
  Sun,
  Moon,
  Monitor,
  Globe,
  Github,
  Zap,
  Sparkles,
  Layers,
  ArrowRight,
  Package,
  Paintbrush,
  LayoutGrid,
  Accessibility,
  Smartphone,
  Monitor as DesktopIcon,
  Copy,
  Check,
} from '@tac-ui/icon';
import { useTranslation, usePageTranslation } from '@/i18n';
import type { Locale } from '@/i18n/config';

const emptySubscribe = () => () => {};

const localeOptions = [
  { value: 'en', label: 'EN', icon: <Globe size={12} /> },
  { value: 'ko', label: 'KO', icon: <Globe size={12} /> },
];

const themeOptions = [
  { value: 'light', label: '', icon: <Sun size={14} /> },
  { value: 'dark', label: '', icon: <Moon size={14} /> },
  { value: 'system', label: '', icon: <Monitor size={14} /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

/* ─── Header ─── */

function LandingHeader() {
  const { preference, setPreference } = useTacTheme();
  const { locale, setLocale } = useTranslation();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleThemeChange = useCallback(
    (v: string) => setPreference(v as 'light' | 'dark' | 'system'),
    [setPreference],
  );
  const handleLocaleChange = useCallback((v: string) => setLocale(v as Locale), [setLocale]);

  return (
    <Header
      sticky
      bordered={scrolled}
      className={`h-14 px-4 lg:px-6 transition-all duration-300 ${
        scrolled ? 'bg-[var(--background)]/80 backdrop-blur-xl' : 'bg-transparent border-transparent'
      }`}
    >
      <Link href="/" className="flex items-center gap-2 no-underline hover:opacity-80 transition-opacity">
        <TacLogo size={22} className="shrink-0" />
        <span className="text-sm font-semibold text-[var(--foreground)]">Tac UI</span>
      </Link>
      <div className="flex items-center gap-2 ml-auto">
        <Link href="/web/docs" className="no-underline">
          <Button variant="ghost" size="sm">
            Web
          </Button>
        </Link>
        <Link href="/native/docs" className="no-underline">
          <Button variant="ghost" size="sm">
            Native
          </Button>
        </Link>
        <a href="https://github.com/tac-ui/tac-ui" target="_blank" rel="noopener noreferrer" className="no-underline">
          <Button variant="ghost" size="sm" iconOnly aria-label="GitHub">
            <Github size={16} />
          </Button>
        </a>
        {mounted && (
          <div className="hidden sm:flex items-center gap-1.5">
            <SegmentController options={localeOptions} value={locale} onChange={handleLocaleChange} size="sm" />
            <SegmentController
              options={themeOptions}
              value={preference}
              onChange={handleThemeChange}
              size="sm"
              collapsible
            />
          </div>
        )}
      </div>
    </Header>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  const pt = usePageTranslation('landing');
  const hero = pt?.sections?.['hero'];
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('pnpm add @tac-ui/web @tac-ui/tokens @tac-ui/icon');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="relative isolate overflow-hidden px-6 min-h-[calc(100vh-56px)] flex items-center justify-center pb-16">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        className="mx-auto max-w-[800px] text-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 mb-8">
          <Badge variant="outline">v1.0.2</Badge>
          <Badge variant="secondary">Open Source</Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[var(--foreground)] leading-[1.08]"
        >
          {hero?.texts?.[0] ?? 'Interfaces that'} <span className="text-[var(--point)]">breathe</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-[640px] mx-auto"
        >
          {hero?.description ??
            'A design system where code breathes. Spring physics, sequential illumination, and glassmorphic depth — crafted for interfaces that feel alive.'}
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/web/docs" className="no-underline">
            <Button size="lg">
              {hero?.texts?.[1] ?? 'Get Started'}
              <ArrowRight size={16} />
            </Button>
          </Link>
          <a href="https://github.com/tac-ui/tac-ui" target="_blank" rel="noopener noreferrer" className="no-underline">
            <Button variant="outline" size="lg">
              <Github size={16} />
              {hero?.texts?.[2] ?? 'GitHub'}
            </Button>
          </a>
        </motion.div>

        {/* Install command */}
        <motion.div variants={fadeUp} custom={4} className="mt-8">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--secondary)]/60 border border-solid border-[var(--border)] text-sm font-mono text-[var(--muted-foreground)] hover:border-[var(--gray-400)] transition-colors cursor-pointer"
          >
            <span>pnpm add @tac-ui/web</span>
            {copied ? <Check size={14} className="text-[var(--success)]" /> : <Copy size={14} className="opacity-50" />}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Stats ─── */

const statIcons = [
  <Package size={18} key="pkg" />,
  <Paintbrush size={18} key="paint" />,
  <LayoutGrid size={18} key="layout" />,
  <Accessibility size={18} key="a11y" />,
];
const statKeys = ['components', 'tokens', 'layouts', 'a11y'] as const;

function StatsSection() {
  const pt = usePageTranslation('landing');
  const stats = pt?.sections?.['stats']?.items;

  return (
    <section className="px-6 py-14 border-y border-solid border-[var(--border)]">
      <motion.div
        className="mx-auto max-w-[960px] grid grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {statKeys.map((key, i) => {
          const item = (stats as Record<string, { value?: string; label?: string }> | undefined)?.[key];
          return (
            <motion.div key={key} variants={fadeUp} custom={i} className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--point-subtle)] text-[var(--point)] flex items-center justify-center">
                {statIcons[i]}
              </div>
              <span className="text-2xl font-bold text-[var(--foreground)] tabular-nums">{item?.value ?? '—'}</span>
              <span className="text-xs text-[var(--muted-foreground)]">{item?.label ?? key}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ─── Platform Cards ─── */

function PlatformSection() {
  const pt = usePageTranslation('landing');

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1024px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              One system, every platform
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)] text-base max-w-[480px] mx-auto">
              Shared tokens, consistent APIs, and the same design language across web and mobile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={scaleIn} custom={1}>
              <Link href="/web/docs" className="no-underline group block h-full">
                <Card className="h-full border-[var(--border)] group-hover:border-[var(--point)]/30 transition-all group-hover:shadow-[0_8px_30px_-12px_var(--point-subtle)]">
                  <CardHeader className="gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--point-subtle)] text-[var(--point)] flex items-center justify-center">
                        <DesktopIcon size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">@tac-ui/web</CardTitle>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                          React · Tailwind CSS · Framer Motion
                        </p>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      39+ accessible components with CSS custom properties, spring animations, and glassmorphic effects.
                      Built for Next.js and any React project.
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <Chip>Buttons</Chip>
                      <Chip>Forms</Chip>
                      <Chip>Charts</Chip>
                      <Chip>Layouts</Chip>
                      <Chip>Overlays</Chip>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={scaleIn} custom={2}>
              <Link href="/native/docs" className="no-underline group block h-full">
                <Card className="h-full border-[var(--border)] group-hover:border-[var(--point)]/30 transition-all group-hover:shadow-[0_8px_30px_-12px_var(--point-subtle)]">
                  <CardHeader className="gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--point-subtle)] text-[var(--point)] flex items-center justify-center">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">@tac-ui/native</CardTitle>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                          React Native · Animated API · Expo
                        </p>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      35+ components with the same design tokens and API surface. Spring physics via React Native
                      Animated, theme context, and full dark mode.
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <Chip>iOS</Chip>
                      <Chip>Android</Chip>
                      <Chip>Expo</Chip>
                      <Chip>Dark Mode</Chip>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Features ─── */

function FeaturesSection() {
  const pt = usePageTranslation('landing');
  const features = pt?.sections?.['features']?.items;

  const featureData = [
    {
      key: 'fluidMotion',
      icon: <Zap size={20} />,
      fallbackTitle: 'Fluid Motion',
      fallbackDesc:
        'Spring physics with mass and momentum. No mechanical easing — every element arrives with organic deceleration.',
    },
    {
      key: 'sequentialIllumination',
      icon: <Sparkles size={20} />,
      fallbackTitle: 'Sequential Illumination',
      fallbackDesc:
        'Border glows that track and accelerate. Light sweeps across surfaces, creating depth hierarchy through motion.',
    },
    {
      key: 'glassmorphismDepth',
      icon: <Layers size={20} />,
      fallbackTitle: 'Glassmorphism Depth',
      fallbackDesc:
        'Translucent layers with backdrop blur create spatial depth. Elements float at different altitudes.',
    },
  ];

  return (
    <section className="px-6 py-20 lg:py-28 bg-[var(--background-subtle)]">
      <div className="mx-auto max-w-[1024px]">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {featureData.map((f, i) => {
            const item = features?.[f.key as keyof typeof features] as
              | { title?: string; description?: string }
              | undefined;
            return (
              <motion.div key={f.key} variants={fadeUp} custom={i}>
                <Card className="h-full bg-[var(--background)] border-[var(--border)]">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--point-subtle)] text-[var(--point)] flex items-center justify-center mb-3">
                      {f.icon}
                    </div>
                    <CardTitle className="text-base">{item?.title ?? f.fallbackTitle}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {item?.description ?? f.fallbackDesc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Quick Start ─── */

function QuickStartSection() {
  const pt = usePageTranslation('landing');
  const qs = pt?.sections?.['quickstart'];

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[720px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              {qs?.title ?? 'Quick Start'}
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)] text-base">
              {qs?.description ?? 'Get up and running in seconds.'}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}>
            <Tabs defaultValue="web">
              <TabsList className="mb-4">
                <TabTrigger value="web">Web</TabTrigger>
                <TabTrigger value="native">Native</TabTrigger>
              </TabsList>

              <TabContent value="web">
                <div className="space-y-3">
                  <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
                    <div className="px-4 py-2 bg-[var(--secondary)]/50 border-b border-solid border-[var(--border)]">
                      <span className="text-xs font-medium text-[var(--muted-foreground)]">Install</span>
                    </div>
                    <div className="[&_pre]:!rounded-none [&_pre]:!border-none [&_pre]:!m-0">
                      <CodeBlock code="pnpm add @tac-ui/web @tac-ui/tokens @tac-ui/icon" language="bash" />
                    </div>
                  </div>
                  <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
                    <div className="px-4 py-2 bg-[var(--secondary)]/50 border-b border-solid border-[var(--border)]">
                      <span className="text-xs font-medium text-[var(--muted-foreground)]">App.tsx</span>
                    </div>
                    <div className="[&_pre]:!rounded-none [&_pre]:!border-none [&_pre]:!m-0">
                      <CodeBlock
                        code={`import { TacProvider, Button } from '@tac-ui/web';

export default function App() {
  return (
    <TacProvider>
      <Button>Hello Tac UI</Button>
    </TacProvider>
  );
}`}
                        language="tsx"
                      />
                    </div>
                  </div>
                </div>
              </TabContent>

              <TabContent value="native">
                <div className="space-y-3">
                  <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
                    <div className="px-4 py-2 bg-[var(--secondary)]/50 border-b border-solid border-[var(--border)]">
                      <span className="text-xs font-medium text-[var(--muted-foreground)]">Install</span>
                    </div>
                    <div className="[&_pre]:!rounded-none [&_pre]:!border-none [&_pre]:!m-0">
                      <CodeBlock code="pnpm add @tac-ui/native @tac-ui/tokens @tac-ui/icon-native" language="bash" />
                    </div>
                  </div>
                  <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
                    <div className="px-4 py-2 bg-[var(--secondary)]/50 border-b border-solid border-[var(--border)]">
                      <span className="text-xs font-medium text-[var(--muted-foreground)]">App.tsx</span>
                    </div>
                    <div className="[&_pre]:!rounded-none [&_pre]:!border-none [&_pre]:!m-0">
                      <CodeBlock
                        code={`import { TacNativeProvider, Button } from '@tac-ui/native';

export default function App() {
  return (
    <TacNativeProvider>
      <Button onPress={() => console.log('pressed')}>
        Hello Native
      </Button>
    </TacNativeProvider>
  );
}`}
                        language="tsx"
                      />
                    </div>
                  </div>
                </div>
              </TabContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Component Showcase ─── */

function ShowcaseSection() {
  const pt = usePageTranslation('landing');
  const showcase = pt?.sections?.['showcase'];

  return (
    <section className="px-6 py-20 lg:py-28 bg-[var(--background-subtle)]">
      <div className="mx-auto max-w-[896px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              {showcase?.title ?? 'Built for developers'}
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)] text-base">
              {showcase?.description ?? '39+ accessible components, ready to compose.'}
            </p>
          </motion.div>

          <motion.div variants={scaleIn} custom={1}>
            <Card className="overflow-hidden bg-[var(--background)] border-[var(--border)]">
              <div className="p-6 sm:p-8 min-w-0">
                <VStack gap="lg">
                  {/* Buttons */}
                  <VStack gap="sm">
                    <span className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest">
                      Buttons
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">Primary</Button>
                      <Button size="sm" variant="secondary">
                        Secondary
                      </Button>
                      <Button size="sm" variant="outline">
                        Outline
                      </Button>
                      <Button size="sm" variant="ghost">
                        Ghost
                      </Button>
                      <Button size="sm" variant="point">
                        Point
                      </Button>
                    </div>
                  </VStack>

                  {/* Form */}
                  <VStack gap="sm">
                    <span className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest">
                      Form Controls
                    </span>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Input placeholder="Type something..." className="w-full max-w-[200px] min-w-[140px]" />
                      <Switch defaultChecked />
                      <Checkbox defaultChecked label="Accept" />
                      <Slider defaultValue={65} className="w-full max-w-[120px] min-w-[80px]" />
                    </div>
                  </VStack>

                  {/* Display */}
                  <VStack gap="sm">
                    <span className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest">
                      Data Display
                    </span>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge>New</Badge>
                      <Badge variant="outline">v1.0.2</Badge>
                      <Badge variant="secondary">Beta</Badge>
                      <Chip>React</Chip>
                      <Chip>TypeScript</Chip>
                      <Chip>Tailwind</Chip>
                      <Avatar initials="TU" size="sm" />
                    </div>
                  </VStack>

                  {/* Feedback */}
                  <VStack gap="sm">
                    <span className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest">
                      Feedback
                    </span>
                    <Progress value={72} className="w-full max-w-[300px]" />
                  </VStack>
                </VStack>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */

function CtaSection() {
  const pt = usePageTranslation('landing');
  const cta = pt?.sections?.['cta'];

  return (
    <section className="px-6 py-24 lg:py-32">
      <motion.div
        className="mx-auto max-w-[640px] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight"
        >
          {cta?.title ?? 'Ready to build?'}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mt-4 text-[var(--muted-foreground)] text-base leading-relaxed"
        >
          {cta?.description ??
            "Start using Tac UI in your next project. It's free, open source, and built for production."}
        </motion.p>
        <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/web/docs" className="no-underline">
            <Button size="lg">
              {cta?.texts?.[0] ?? 'Read the Docs'}
              <ArrowRight size={16} />
            </Button>
          </Link>
          <a href="https://github.com/tac-ui/tac-ui" target="_blank" rel="noopener noreferrer" className="no-underline">
            <Button variant="outline" size="lg">
              <Github size={16} />
              {cta?.texts?.[1] ?? 'View on GitHub'}
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Footer ─── */

function LandingFooter() {
  const pt = usePageTranslation('landing');
  const footer = pt?.sections?.['footer'];

  return (
    <Footer bordered className="px-6 py-10 bg-[var(--background)]">
      <div className="mx-auto max-w-[1024px] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
          <TacLogo size={16} className="shrink-0" />
          <span className="text-sm">{footer?.description ?? 'Open Source Design System'}</span>
        </div>
        <p className="text-xs text-[var(--muted-foreground)]">
          {footer?.texts?.[1] ?? '\u00a9 2026 Tac UI. All rights reserved.'}
        </p>
      </div>
    </Footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LandingHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <PlatformSection />
        <FeaturesSection />
        <QuickStartSection />
        <ShowcaseSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
