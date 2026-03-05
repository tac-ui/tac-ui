'use client';

import React from 'react';
import { usePageTranslation } from '@/i18n';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocSubSection,
  DocText,
  PreviewCode,
  InlineCode,
  PropsTable,
} from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import type { PropDef } from '@/components/docs/DocPage';

export default function NativeCustomizationPage() {
  const pt = usePageTranslation('native-customization');

  const colorTokens: PropDef[] = [
    { name: 'background', type: 'string', default: '#FFFFFF', description: 'Page background color.' },
    { name: 'foreground', type: 'string', default: '#0F172A', description: 'Default text color.' },
    {
      name: 'primary',
      type: 'string',
      default: '#4E657E',
      description: 'Primary brand color for buttons and accents.',
    },
    { name: 'primaryHover', type: 'string', default: '#3E5165', description: 'Hover state of the primary color.' },
    {
      name: 'primaryForeground',
      type: 'string',
      default: '#FFFFFF',
      description: 'Text color on primary backgrounds.',
    },
    {
      name: 'secondary',
      type: 'string',
      default: '#F1F5F9',
      description: 'Secondary surface color for subtle backgrounds.',
    },
    { name: 'border', type: 'string', default: '#E2E8F0', description: 'Default border color.' },
    {
      name: 'mutedForeground',
      type: 'string',
      default: '#64748B',
      description: 'Subdued text (descriptions, placeholders).',
    },
    { name: 'point', type: 'string', default: '#96784A', description: 'Accent color for highlights and callouts.' },
  ];

  const statusColorTokens: PropDef[] = [
    { name: 'success', type: 'string', default: '#10B981', description: 'Success state color.' },
    { name: 'successBg', type: 'string', default: '#D1FAE5', description: 'Success background color.' },
    {
      name: 'successForeground',
      type: 'string',
      default: '#065F46',
      description: 'Text color on success backgrounds.',
    },
    { name: 'warning', type: 'string', default: '#F59E0B', description: 'Warning state color.' },
    { name: 'warningBg', type: 'string', default: '#FEF3C7', description: 'Warning background color.' },
    {
      name: 'warningForeground',
      type: 'string',
      default: '#92400E',
      description: 'Text color on warning backgrounds.',
    },
    { name: 'error', type: 'string', default: '#EF4444', description: 'Error/destructive state color.' },
    { name: 'errorBg', type: 'string', default: '#FEE2E2', description: 'Error background color.' },
    { name: 'errorForeground', type: 'string', default: '#991B1B', description: 'Text color on error backgrounds.' },
    { name: 'info', type: 'string', default: '#3B82F6', description: 'Informational state color.' },
    { name: 'infoBg', type: 'string', default: '#DBEAFE', description: 'Info background color.' },
    { name: 'infoForeground', type: 'string', default: '#1E40AF', description: 'Text color on info backgrounds.' },
  ];

  const spacingTokens: PropDef[] = [
    { name: 'xs', type: 'number', default: '4', description: '4pt — Tight spacing (icon gaps).' },
    { name: 'sm', type: 'number', default: '8', description: '8pt — Small spacing.' },
    { name: 'md', type: 'number', default: '12', description: '12pt — Medium spacing.' },
    { name: 'lg', type: 'number', default: '16', description: '16pt — Large spacing.' },
    { name: 'xl', type: 'number', default: '24', description: '24pt — Extra large spacing.' },
    { name: '2xl', type: 'number', default: '32', description: '32pt — Section-level spacing.' },
  ];

  const radiusTokens: PropDef[] = [
    { name: 'none', type: 'number', default: '0', description: 'No rounding.' },
    { name: 'sm', type: 'number', default: '4', description: '4pt — Subtle rounding (badges, chips).' },
    { name: 'm', type: 'number', default: '8', description: '8pt — Default rounding (inputs, buttons).' },
    { name: 'lg', type: 'number', default: '12', description: '12pt — Larger rounding (cards).' },
    { name: 'xl', type: 'number', default: '16', description: '16pt — Extra large rounding.' },
    { name: 'pill', type: 'number', default: '9999', description: '9999pt — Fully rounded (pills, avatars).' },
  ];

  const motionTokens: PropDef[] = [
    { name: 'duration.instant', type: 'number', default: '50', description: '50ms — Immediate feedback.' },
    { name: 'duration.fast', type: 'number', default: '150', description: '150ms — Quick transitions (hover, focus).' },
    { name: 'duration.normal', type: 'number', default: '250', description: '250ms — Standard animations.' },
    {
      name: 'duration.slow',
      type: 'number',
      default: '400',
      description: '400ms — Deliberate animations (modals, drawers).',
    },
    { name: 'duration.complex', type: 'number', default: '600', description: '600ms — Complex multi-step animations.' },
    {
      name: 'easing.standard',
      type: 'string',
      default: 'bezier(0.4, 0, 0.2, 1)',
      description: 'Default easing curve.',
    },
    {
      name: 'easing.easeOut',
      type: 'string',
      default: 'bezier(0, 0, 0.2, 1)',
      description: 'Deceleration curve (enter animations).',
    },
    {
      name: 'spring.default',
      type: 'object',
      default: '{ damping: 20, stiffness: 300 }',
      description: 'Default spring config for Animated API.',
    },
    {
      name: 'spring.bouncy',
      type: 'object',
      default: '{ damping: 12, stiffness: 400 }',
      description: 'Bouncy spring for playful interactions.',
    },
  ];

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Customization'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Customize native theme tokens by providing overrides to TacNativeProvider. All components consume tokens from the theme context via useTacNativeTheme().'}
        </DocDescription>
      </div>

      {/* 1. How It Works */}
      <DocSection title={pt?.sections?.['how-it-works']?.title ?? 'How It Works'}>
        <DocText>
          {pt?.sections?.['how-it-works']?.texts?.[0] ?? (
            <>
              All Tac UI Native components consume design tokens via <InlineCode>useTacNativeTheme()</InlineCode>.
              Tokens are provided through <InlineCode>TacNativeProvider</InlineCode> and built from{' '}
              <InlineCode>@tac-ui/tokens</InlineCode>. You can override colors, spacing, border radius, motion, and more
              at the provider level.
            </>
          )}
        </DocText>
        <DocText>
          {pt?.sections?.['how-it-works']?.texts?.[1] ?? (
            <>
              Wrap your app in <InlineCode>TacNativeProvider</InlineCode> once. The default theme is built automatically
              from the tokens package. Use the <InlineCode>theme</InlineCode> prop to pass overrides — they are
              deep-merged with the defaults so you only specify what you want to change. Use{' '}
              <InlineCode>useTacNativeTheme()</InlineCode> anywhere in the tree to access the active theme object and
              switch modes.
            </>
          )}
        </DocText>
        <PreviewCode
          code={`import { TacNativeProvider, useTacNativeTheme } from '@tac-ui/native';

// Wrap once at the app root
export default function App() {
  return (
    <TacNativeProvider defaultMode="system">
      <YourApp />
    </TacNativeProvider>
  );
}

// Access theme and mode controls anywhere in the tree
function ThemeToggle() {
  const { mode, toggleMode, theme } = useTacNativeTheme();
  return (
    <Button onPress={toggleMode}>
      {mode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
    </Button>
  );
}`}
        />
      </DocSection>

      {/* 2. Theme Overrides */}
      <DocSection title={pt?.sections?.['theme-overrides']?.title ?? 'Theme Overrides'}>
        <DocText>
          {pt?.sections?.['theme-overrides']?.texts?.[0] ?? (
            <>
              The simplest way to customize is to pass a <InlineCode>theme</InlineCode> prop to{' '}
              <InlineCode>TacNativeProvider</InlineCode>. The override object is deep-merged with the default theme, so
              only the values you specify are changed — all other tokens remain at their defaults.
            </>
          )}
        </DocText>
        <PreviewCode
          code={`import { TacNativeProvider } from '@tac-ui/native';

export default function App() {
  return (
    <TacNativeProvider
      theme={{
        colors: {
          primary: '#059669',
          primaryHover: '#047857',
          primaryForeground: '#FFFFFF',
        },
        radius: {
          m: 16,
          lg: 20,
        },
      }}
    >
      <YourApp />
    </TacNativeProvider>
  );
}`}
        />
      </DocSection>

      {/* 3. Per-Mode Overrides */}
      <DocSection title={pt?.sections?.['per-mode-overrides']?.title ?? 'Per-Mode Overrides'}>
        <DocText>
          {pt?.sections?.['per-mode-overrides']?.texts?.[0] ?? (
            <>
              To customize tokens differently for light and dark modes, use the <InlineCode>lightTheme</InlineCode> and{' '}
              <InlineCode>darkTheme</InlineCode> props on <InlineCode>TacNativeProvider</InlineCode>. These are merged
              on top of the base <InlineCode>theme</InlineCode> overrides for the matching mode.
            </>
          )}
        </DocText>
        <PreviewCode
          code={`import { TacNativeProvider } from '@tac-ui/native';

export default function App() {
  return (
    <TacNativeProvider
      defaultMode="system"
      lightTheme={{
        colors: {
          primary: '#2563EB',
          background: '#FAFAFA',
          border: '#D1D5DB',
        },
      }}
      darkTheme={{
        colors: {
          primary: '#60A5FA',
          background: '#0A0A0A',
          border: '#27272A',
        },
      }}
    >
      <YourApp />
    </TacNativeProvider>
  );
}`}
        />
      </DocSection>

      {/* 4. Per-Component Overrides */}
      <DocSection title={pt?.sections?.['per-component-overrides']?.title ?? 'Per-Component Overrides'}>
        <DocText>
          {pt?.sections?.['per-component-overrides']?.texts?.[0] ?? (
            <>
              Every Tac UI Native component accepts a <InlineCode>style</InlineCode> prop for local overrides. For
              structural customization (padding, border radius, etc.) you can override the style directly. For color
              overrides that should follow the theme, use the component&apos;s dedicated style props.
            </>
          )}
        </DocText>
        <PreviewCode
          code={`import { Button, Card } from '@tac-ui/native';
import { useTacNativeTheme } from '@tac-ui/native';

function Example() {
  const { theme } = useTacNativeTheme();

  return (
    <>
      {/* Direct style override on a component */}
      <Button
        style={{
          borderRadius: 999,
          backgroundColor: '#059669',
        }}
      >
        Custom Button
      </Button>

      {/* Use theme tokens for consistency */}
      <Card
        style={{
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
          backgroundColor: theme.colors.card,
        }}
      >
        <Text style={{ color: theme.colors.foreground }}>
          Card with theme tokens
        </Text>
      </Card>
    </>
  );
}`}
        />
      </DocSection>

      {/* 5. Token Reference */}
      <DocSection title={pt?.sections?.['token-reference']?.title ?? 'Token Reference'}>
        <DocSubSection title={pt?.sections?.['token-reference-colors']?.title ?? 'Colors'}>
          <DocText>
            {pt?.sections?.['token-reference-colors']?.texts?.[0] ?? 'Core color tokens available via theme.colors.*'}
          </DocText>
          <PropsTable data={colorTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-status-colors']?.title ?? 'Status Colors'}>
          <DocText>
            {pt?.sections?.['token-reference-status-colors']?.texts?.[0] ??
              'Semantic colors for feedback states. Each has matching Bg and Foreground variants accessible via theme.colors.*'}
          </DocText>
          <PropsTable data={statusColorTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-spacing']?.title ?? 'Spacing'}>
          <DocText>
            {pt?.sections?.['token-reference-spacing']?.texts?.[0] ??
              'Spacing tokens available via theme.spacing.* (values in points).'}
          </DocText>
          <PropsTable data={spacingTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-border-radius']?.title ?? 'Border Radius'}>
          <DocText>
            {pt?.sections?.['token-reference-border-radius']?.texts?.[0] ??
              'Rounding scale from sharp to fully rounded. Available via theme.radius.* (values in points).'}
          </DocText>
          <PropsTable data={radiusTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-motion']?.title ?? 'Motion'}>
          <DocText>
            {pt?.sections?.['token-reference-motion']?.texts?.[0] ??
              'Duration and spring config tokens for animations. Available via theme.motion.*'}
          </DocText>
          <PropsTable data={motionTokens} />
        </DocSubSection>
      </DocSection>

      {/* 6. Programmatic Access */}
      <DocSection title={pt?.sections?.['programmatic-access']?.title ?? 'Programmatic Access'}>
        <DocText>
          {pt?.sections?.['programmatic-access']?.texts?.[0] ?? (
            <>
              You can also access and generate tokens programmatically by importing directly from the{' '}
              <InlineCode>@tac-ui/tokens</InlineCode> package. This is useful for building custom theme objects or
              computing derived values at runtime.
            </>
          )}
        </DocText>
        <PreviewCode
          language="typescript"
          code={`import { semanticTokens, spacing, radius, motion } from '@tac-ui/tokens';
import { buildNativeTheme } from '@tac-ui/tokens/native';

// Access raw semantic token values
console.log(semanticTokens.light.primary);   // '#4E657E'
console.log(semanticTokens.dark.primary);    // '#8AA3B8'

// Access structural tokens
console.log(spacing.lg);                     // 16
console.log(radius.m);                       // 8
console.log(motion.duration.normal);         // 250

// Build a complete native theme object from tokens
const customTheme = buildNativeTheme({
  colors: { primary: '#059669' },
});`}
        />
      </DocSection>

      {/* 7. Full Theme Structure */}
      <DocSection title={pt?.sections?.['theme-structure']?.title ?? 'Full Theme Structure'}>
        <DocText>
          {pt?.sections?.['theme-structure']?.texts?.[0] ??
            'Complete reference of the theme object returned by useTacNativeTheme(). All values below are the built-in light mode defaults.'}
        </DocText>
        <PreviewCode
          language="typescript"
          code={`// theme object returned by useTacNativeTheme()
{
  mode: 'light' | 'dark',
  colors: {
    // Core
    background: '#FFFFFF',
    backgroundSubtle: '#F8FAFC',
    surface: '#FFFFFF',
    foreground: '#0F172A',
    primary: '#4E657E',
    primaryHover: '#3E5165',
    primaryForeground: '#FFFFFF',
    secondary: '#F1F5F9',
    secondaryForeground: '#0F172A',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    border: '#E2E8F0',
    input: '#E2E8F0',
    point: '#96784A',
    pointHover: '#C0B56A',
    pointForeground: '#FFFFFF',
    pointSubtle: '#F5F0E8',
    // Status
    success: '#10B981',
    successBg: '#D1FAE5',
    successForeground: '#065F46',
    warning: '#F59E0B',
    warningBg: '#FEF3C7',
    warningForeground: '#92400E',
    error: '#EF4444',
    errorBg: '#FEE2E2',
    errorForeground: '#991B1B',
    info: '#3B82F6',
    infoBg: '#DBEAFE',
    infoForeground: '#1E40AF',
    // Gray scale
    gray50: '#F8FAFC',
    // ...gray100 through gray900
  },
  typography: {
    fontFamily: { primary: 'System', secondary: 'System' },
    display: { lg: { fontSize, lineHeight }, md: { fontSize, lineHeight } },
    heading: { h1, h2, h3, h4 },
    body: { lg, md, sm },
    caption: { md, sm },
    fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' },
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, '2xl': 32 },
  radius: { none: 0, sm: 4, m: 8, lg: 12, xl: 16, pill: 9999 },
  elevation: {
    sm: { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation },
    m:  { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation },
    lg: { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation },
  },
  motion: {
    duration: { instant: 50, fast: 150, normal: 250, slow: 400, complex: 600 },
    easing: { standard, easeIn, easeOut, easeInOut, bounce, spring, elastic },
    spring: {
      default:  { damping: 20, stiffness: 300 },
      bouncy:   { damping: 12, stiffness: 400 },
      slow:     { damping: 30, stiffness: 200 },
    },
  },
}`}
        />
      </DocSection>
    </DocPage>
  );
}
