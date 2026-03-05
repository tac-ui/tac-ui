'use client';

import React from 'react';
import { CodeBlock } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocSubSection,
  DocText,
  InlineCode,
  PropsTable,
} from '@/components/docs/DocPage';
import type { PropDef } from '@/components/docs/DocPage';

export default function CustomizationPage() {
  const pt = usePageTranslation('customization');

  const colorTokens: PropDef[] = [
    {
      name: '--primary',
      type: 'color',
      default: '#4E657E',
      description: pt?.props?.['--primary'] ?? 'Primary brand color used for buttons, links, and accents.',
    },
    {
      name: '--primary-hover',
      type: 'color',
      default: '#3E5165',
      description: pt?.props?.['--primary-hover'] ?? 'Hover state of the primary color.',
    },
    {
      name: '--primary-foreground',
      type: 'color',
      default: '#FFFFFF',
      description: pt?.props?.['--primary-foreground'] ?? 'Text color on primary backgrounds.',
    },
    {
      name: '--background',
      type: 'color',
      default: '#FFFFFF',
      description: pt?.props?.['--background'] ?? 'Page background color.',
    },
    {
      name: '--foreground',
      type: 'color',
      default: '#0F172A',
      description: pt?.props?.['--foreground'] ?? 'Default text color.',
    },
    {
      name: '--secondary',
      type: 'color',
      default: '#F1F5F9',
      description: pt?.props?.['--secondary'] ?? 'Secondary surface color for subtle backgrounds.',
    },
    {
      name: '--border',
      type: 'color',
      default: '#E2E8F0',
      description: pt?.props?.['--border'] ?? 'Default border color.',
    },
    {
      name: '--muted-foreground',
      type: 'color',
      default: '#64748B',
      description: pt?.props?.['--muted-foreground'] ?? 'Subdued text (descriptions, placeholders).',
    },
    {
      name: '--point',
      type: 'color',
      default: '#96784A',
      description: pt?.props?.['--point'] ?? 'Accent color for highlights and callouts (use sparingly).',
    },
  ];

  const statusTokens: PropDef[] = [
    {
      name: '--success',
      type: 'color',
      default: '#10B981',
      description: pt?.props?.['--success'] ?? 'Success state color.',
    },
    {
      name: '--warning',
      type: 'color',
      default: '#F59E0B',
      description: pt?.props?.['--warning'] ?? 'Warning state color.',
    },
    {
      name: '--error',
      type: 'color',
      default: '#EF4444',
      description: pt?.props?.['--error'] ?? 'Error/destructive state color.',
    },
    {
      name: '--info',
      type: 'color',
      default: '#3B82F6',
      description: pt?.props?.['--info'] ?? 'Informational state color.',
    },
  ];

  const spacingTokens: PropDef[] = [
    {
      name: '--spacing-xs',
      type: 'length',
      default: '0.25rem',
      description: pt?.props?.['--spacing-xs'] ?? '4px - Tight spacing (icon gaps).',
    },
    {
      name: '--spacing-sm',
      type: 'length',
      default: '0.5rem',
      description: pt?.props?.['--spacing-sm'] ?? '8px - Small spacing.',
    },
    {
      name: '--spacing-m',
      type: 'length',
      default: '0.75rem',
      description: pt?.props?.['--spacing-m'] ?? '12px - Medium spacing.',
    },
    {
      name: '--spacing-lg',
      type: 'length',
      default: '1rem',
      description: pt?.props?.['--spacing-lg'] ?? '16px - Large spacing.',
    },
    {
      name: '--spacing-xl',
      type: 'length',
      default: '1.5rem',
      description: pt?.props?.['--spacing-xl'] ?? '24px - Extra large spacing.',
    },
    {
      name: '--spacing-2xl',
      type: 'length',
      default: '2rem',
      description: pt?.props?.['--spacing-2xl'] ?? '32px - Section-level spacing.',
    },
  ];

  const radiusTokens: PropDef[] = [
    {
      name: '--radius-none',
      type: 'length',
      default: '0',
      description: pt?.props?.['--radius-none'] ?? 'No rounding.',
    },
    {
      name: '--radius-sm',
      type: 'length',
      default: '0.25rem',
      description: pt?.props?.['--radius-sm'] ?? 'Subtle rounding (badges, chips).',
    },
    {
      name: '--radius-m',
      type: 'length',
      default: '0.5rem',
      description: pt?.props?.['--radius-m'] ?? 'Default rounding (inputs, buttons).',
    },
    {
      name: '--radius-lg',
      type: 'length',
      default: '0.75rem',
      description: pt?.props?.['--radius-lg'] ?? 'Larger rounding (cards, modals).',
    },
    {
      name: '--radius-xl',
      type: 'length',
      default: '1rem',
      description: pt?.props?.['--radius-xl'] ?? 'Extra large rounding.',
    },
    {
      name: '--radius-pill',
      type: 'length',
      default: '9999px',
      description: pt?.props?.['--radius-pill'] ?? 'Fully rounded (pills, avatars).',
    },
  ];

  const motionTokens: PropDef[] = [
    {
      name: '--duration-instant',
      type: 'time',
      default: '50ms',
      description: pt?.props?.['--duration-instant'] ?? 'Immediate feedback.',
    },
    {
      name: '--duration-fast',
      type: 'time',
      default: '150ms',
      description: pt?.props?.['--duration-fast'] ?? 'Quick transitions (hover, focus).',
    },
    {
      name: '--duration-normal',
      type: 'time',
      default: '250ms',
      description: pt?.props?.['--duration-normal'] ?? 'Standard animations.',
    },
    {
      name: '--duration-slow',
      type: 'time',
      default: '400ms',
      description: pt?.props?.['--duration-slow'] ?? 'Deliberate animations (modals, drawers).',
    },
    {
      name: '--ease-standard',
      type: 'easing',
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      description: pt?.props?.['--ease-standard'] ?? 'Default easing curve.',
    },
    {
      name: '--ease-out',
      type: 'easing',
      default: 'cubic-bezier(0, 0, 0.2, 1)',
      description: pt?.props?.['--ease-out'] ?? 'Deceleration curve (enter animations).',
    },
  ];

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Customization'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Tac UI is fully customizable through CSS custom properties. Override any design token to match your brand identity without modifying the component source code.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['how-it-works']?.title ?? 'How It Works'}>
        <DocText>
          {pt?.sections?.['how-it-works']?.texts?.[0] ?? (
            <>
              All Tac UI components consume design tokens as CSS custom properties (
              <InlineCode>--variable-name</InlineCode>). These are injected at the <InlineCode>:root</InlineCode> level
              by the <InlineCode>TacProvider</InlineCode> and the Tailwind preset. You can override any token by
              re-declaring the variable in your own CSS.
            </>
          )}
        </DocText>
        <DocText>
          {pt?.sections?.['how-it-works']?.texts?.[1] ??
            'Because CSS custom properties follow the cascade, your overrides always win. This means you can customize globally, per-theme, or even per-component.'}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['global-overrides']?.title ?? 'Global Overrides'}>
        <DocText>
          {pt?.sections?.['global-overrides']?.texts?.[0] ?? (
            <>
              The simplest way to customize is to override tokens in your <InlineCode>globals.css</InlineCode> after the
              Tailwind import. Changes apply to both light and dark themes.
            </>
          )}
        </DocText>
        <CodeBlock
          language="css"
          code={`/* globals.css */
@import "tailwindcss";
@config "./tailwind.config.ts";

/* Global token overrides */
:root {
  --primary: #96784A;
  --primary-hover: #84693C;
  --primary-foreground: #FFFFFF;
  --radius-m: 0.75rem;
  --radius-lg: 1rem;
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['per-theme-overrides']?.title ?? 'Per-Theme Overrides'}>
        <DocText>
          {pt?.sections?.['per-theme-overrides']?.texts?.[0] ?? (
            <>
              To customize tokens differently for light and dark modes, use the <InlineCode>data-theme</InlineCode>{' '}
              attribute selectors.
            </>
          )}
        </DocText>
        <CodeBlock
          language="css"
          code={`/* Light mode overrides */
[data-theme="light"] {
  --primary: #2563EB;
  --background: #FAFAFA;
  --border: #D1D5DB;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --primary: #60A5FA;
  --background: #0A0A0A;
  --border: #27272A;
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['per-component-overrides']?.title ?? 'Per-Component Overrides'}>
        <DocText>
          {pt?.sections?.['per-component-overrides']?.texts?.[0] ?? (
            <>
              You can scope token overrides to specific components using wrapper classes or inline styles.
              Component-level tokens (like <InlineCode>--btn-md-height</InlineCode>) let you fine-tune individual
              components.
            </>
          )}
        </DocText>
        <CodeBlock
          language="tsx"
          code={`{/* Override tokens for a specific section */}
<div style={{ '--primary': '#059669', '--primary-hover': '#047857' } as React.CSSProperties}>
  <Button>Green Button</Button>
</div>

{/* Or use a CSS class */}
<div className="brand-section">
  <Button>Branded Button</Button>
</div>`}
        />
        <CodeBlock
          language="css"
          code={`.brand-section {
  --primary: #059669;
  --primary-hover: #047857;
  --radius-m: 9999px; /* pill-shaped buttons */
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['token-reference']?.title ?? 'Token Reference'}>
        <DocSubSection title={pt?.sections?.['token-reference-colors']?.title ?? 'Colors'}>
          <DocText>
            {pt?.sections?.['token-reference-colors']?.texts?.[0] ??
              'Core color tokens that define the overall look of your application.'}
          </DocText>
          <PropsTable data={colorTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-status-colors']?.title ?? 'Status Colors'}>
          <DocText>
            {pt?.sections?.['token-reference-status-colors']?.texts?.[0] ?? (
              <>
                Semantic colors for feedback states. Each has a matching <InlineCode>-bg</InlineCode> and{' '}
                <InlineCode>-foreground</InlineCode> variant.
              </>
            )}
          </DocText>
          <PropsTable data={statusTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-spacing']?.title ?? 'Spacing'}>
          <DocText>
            {pt?.sections?.['token-reference-spacing']?.texts?.[0] ??
              'Consistent spacing scale used for padding, margins, and gaps.'}
          </DocText>
          <PropsTable data={spacingTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-border-radius']?.title ?? 'Border Radius'}>
          <DocText>
            {pt?.sections?.['token-reference-border-radius']?.texts?.[0] ??
              'Rounding scale from sharp to fully rounded.'}
          </DocText>
          <PropsTable data={radiusTokens} />
        </DocSubSection>

        <DocSubSection title={pt?.sections?.['token-reference-motion']?.title ?? 'Motion'}>
          <DocText>
            {pt?.sections?.['token-reference-motion']?.texts?.[0] ??
              'Duration and easing tokens for animations and transitions.'}
          </DocText>
          <PropsTable data={motionTokens} />
        </DocSubSection>
      </DocSection>

      <DocSection title={pt?.sections?.['component-tokens']?.title ?? 'Component Tokens'}>
        <DocText>
          {pt?.sections?.['component-tokens']?.texts?.[0] ?? (
            <>
              In addition to global tokens, each component has its own set of tokens for granular control. These follow
              the pattern <InlineCode>--component-property</InlineCode>.
            </>
          )}
        </DocText>
        <CodeBlock
          language="css"
          code={`/* Button size overrides */
:root {
  --btn-md-height: 2.75rem;    /* taller buttons */
  --btn-md-px: 1.5rem;         /* wider padding */
  --btn-md-font-size: 0.9375rem;
  --btn-md-radius: 0.75rem;
}

/* Input overrides */
:root {
  --input-height: 3rem;
  --input-radius: 0.75rem;
}

/* Card overrides */
:root {
  --card-padding: 1.5rem;
  --card-radius: 1rem;
}

/* Dialog overrides */
:root {
  --dialog-radius: 1.25rem;
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['programmatic-access']?.title ?? 'Programmatic Access'}>
        <DocText>
          {pt?.sections?.['programmatic-access']?.texts?.[0] ?? (
            <>
              You can also access and generate tokens programmatically using the <InlineCode>@tac-ui/tokens</InlineCode>{' '}
              package.
            </>
          )}
        </DocText>
        <CodeBlock
          language="typescript"
          code={`import { semanticTokens, spacing, radius, motion } from '@tac-ui/tokens';
import { generateCSSVariables } from '@tac-ui/tokens/web/css-variables';

// Get all CSS variables for a given mode
const lightVars = generateCSSVariables('light');
const darkVars = generateCSSVariables('dark');

// Access raw token values
console.log(semanticTokens.light.primary); // '#4E657E'
console.log(spacing.lg);                   // 16
console.log(radius.m);                     // 8`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['all-variables-light']?.title ?? 'All Variables \u2014 Light Mode'}>
        <DocText>
          {pt?.sections?.['all-variables-light']?.texts?.[0] ?? (
            <>
              Copy this block into your <InlineCode>globals.css</InlineCode> to override any variable. All values below
              are the built-in light mode defaults.
            </>
          )}
        </DocText>
        <CodeBlock
          language="css"
          code={`/* globals.css — Light mode (all variables) */
:root, [data-theme="light"] {
  /* ── Typography ── */
  --font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-secondary: 'Pretendard', sans-serif;

  /* ── Core Colors ── */
  --background: #FFFFFF;
  --background-subtle: #F8FAFC;
  --foreground: #0F172A;
  --primary: #4E657E;
  --primary-hover: #3E5165;
  --primary-foreground: #FFFFFF;
  --secondary: #F1F5F9;
  --secondary-foreground: #0F172A;
  --tertiary: #E2E8F0;
  --muted: #F1F5F9;
  --muted-foreground: #64748B;
  --card: #FFFFFF;
  --card-foreground: #0F172A;
  --border: #E2E8F0;
  --input: #E2E8F0;
  --point: #96784A;
  --point-hover: #C0B56A;
  --point-foreground: #FFFFFF;

  /* ── Status Colors ── */
  --success: #10B981;
  --success-bg: #D1FAE5;
  --success-foreground: #065F46;
  --warning: #F59E0B;
  --warning-bg: #FEF3C7;
  --warning-foreground: #92400E;
  --error: #EF4444;
  --error-bg: #FEE2E2;
  --error-foreground: #991B1B;
  --info: #3B82F6;
  --info-bg: #DBEAFE;
  --info-foreground: #1E40AF;
  --shadow-color: rgba(0, 0, 0, 0.06);

  /* ── Gray Scale ── */
  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-200: #E2E8F0;
  --gray-300: #CBD5E1;
  --gray-400: #94A3B8;
  --gray-500: #64748B;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1E293B;
  --gray-900: #0F172A;

  /* ── Spacing ── */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-m: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;
  --spacing-2xl: 2rem;

  /* ── Border Radius ── */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-m: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-pill: 9999px;

  /* ── Elevation ── */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-m: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* ── Motion ── */
  --duration-instant: 50ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-complex: 600ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* ── Chart ── */
  --chart-1: #4E657E;
  --chart-2: #96784A;
  --chart-3: #10B981;
  --chart-4: #F59E0B;
  --chart-5: #EF4444;
  --chart-6: #8B5CF6;
  --chart-7: #EC4899;
  --chart-8: #14B8A6;

  /* ── Z-Index ── */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-overlay: 1200;
  --z-modal: 1300;
  --z-popover: 1400;
  --z-tooltip: 1500;
  --z-toast: 1600;
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['all-variables-dark']?.title ?? 'All Variables \u2014 Dark Mode'}>
        <DocText>
          {pt?.sections?.['all-variables-dark']?.texts?.[0] ??
            'Dark mode overrides. Only color-related tokens change between themes \u2014 spacing, radius, motion, and component tokens remain the same.'}
        </DocText>
        <CodeBlock
          language="css"
          code={`/* globals.css — Dark mode (color overrides) */
[data-theme="dark"] {
  /* ── Core Colors ── */
  --background: #09090B;
  --background-subtle: #0F0F12;
  --foreground: #FAFAFA;
  --primary: #8AA3B8;
  --primary-hover: #A0B5C8;
  --primary-foreground: #0E1419;
  --secondary: #27272A;
  --secondary-foreground: #FAFAFA;
  --tertiary: #1C1C1F;
  --muted: #18181B;
  --muted-foreground: #A1A1AA;
  --card: #111113;
  --card-foreground: #FAFAFA;
  --border: #27272A;
  --input: #1C1C1F;
  --point: #E5DCA0;
  --point-hover: #D4BA80;
  --point-foreground: #222222;

  /* ── Status Colors ── */
  --success: #34D399;
  --success-bg: rgba(52, 211, 153, 0.1);
  --success-foreground: #34D399;
  --warning: #FBBF24;
  --warning-bg: rgba(251, 191, 36, 0.1);
  --warning-foreground: #FBBF24;
  --error: #F87171;
  --error-bg: rgba(248, 113, 113, 0.1);
  --error-foreground: #F87171;
  --info: #60A5FA;
  --info-bg: rgba(96, 165, 250, 0.1);
  --info-foreground: #60A5FA;
  --shadow-color: rgba(0, 0, 0, 0.5);

  /* ── Gray Scale ── */
  --gray-50: #18181B;
  --gray-100: #1F1F23;
  --gray-200: #27272A;
  --gray-300: #3F3F46;
  --gray-400: #52525B;
  --gray-500: #71717A;
  --gray-600: #A1A1AA;
  --gray-700: #D4D4D8;
  --gray-800: #E4E4E7;
  --gray-900: #F4F4F5;
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['all-variables-component']?.title ?? 'All Variables \u2014 Component Tokens'}>
        <DocText>
          {pt?.sections?.['all-variables-component']?.texts?.[0] ??
            'Component-level tokens for fine-grained control. These are theme-independent and apply to both light and dark modes.'}
        </DocText>
        <CodeBlock
          language="css"
          code={`/* globals.css — Component tokens (all variables) */
:root {
  /* ── Button ── */
  --btn-sm-height: 2rem;
  --btn-sm-px: 0.75rem;
  --btn-sm-font-size: 0.8125rem;
  --btn-sm-radius: 6px;
  --btn-md-height: 2.5rem;
  --btn-md-px: 1rem;
  --btn-md-font-size: 0.875rem;
  --btn-md-radius: 8px;
  --btn-lg-height: 2.75rem;
  --btn-lg-px: 1.5rem;
  --btn-lg-font-size: 1rem;
  --btn-lg-radius: 8px;
  --btn-icon-size: 16px;

  /* ── Input ── */
  --input-height: 2.5rem;
  --input-px: 0.75rem;
  --input-py: 0.5rem;
  --input-font-size: 0.875rem;
  --input-radius: 8px;
  --input-icon-size: 16px;
  --input-icon-padding: 2.5rem;

  /* ── Card ── */
  --card-padding: 1.5rem;
  --card-gap: 0.75rem;
  --card-radius: 12px;
  --card-title-size: 1rem;
  --card-body-size: 0.875rem;

  /* ── Badge ── */
  --badge-px: 0.625rem;
  --badge-py: 0.125rem;
  --badge-font-size: 0.75rem;
  --badge-radius: 9999px;

  /* ── Checkbox ── */
  --checkbox-size: 18px;
  --checkbox-radius: 4px;
  --checkbox-border-width: 2px;
  --checkbox-icon-size: 12px;
  --checkbox-gap: 0.5rem;
  --checkbox-label-size: 0.875rem;

  /* ── Radio ── */
  --radio-size: 18px;
  --radio-border-width: 2px;
  --radio-checked-border-width: 5px;
  --radio-gap: 0.5rem;
  --radio-label-size: 0.875rem;

  /* ── Switch ── */
  --switch-width: 44px;
  --switch-height: 24px;
  --switch-thumb-size: 20px;
  --switch-thumb-offset: 2px;

  /* ── Chip ── */
  --chip-px: 0.75rem;
  --chip-py: 0.25rem;
  --chip-font-size: 0.8125rem;
  --chip-radius: 9999px;
  --chip-icon-size: 14px;

  /* ── Tabs ── */
  --tab-primary-px: 1rem;
  --tab-primary-py: 0.75rem;
  --tab-primary-font-size: 0.875rem;
  --tab-primary-indicator: 2px;

  /* ── Slider ── */
  --slider-track-height: 6px;
  --slider-thumb-size: 20px;
  --slider-thumb-border: 3px;

  /* ── Tooltip ── */
  --tooltip-delay: 150ms;
  --tooltip-padding: 1rem;
  --tooltip-radius: 0.75rem;
  --tooltip-simple-px: 0.5rem;
  --tooltip-simple-py: 0.375rem;
  --tooltip-simple-font-size: 0.75rem;
  --tooltip-simple-radius: 6px;

  /* ── Avatar ── */
  --avatar-sm: 32px;
  --avatar-md: 40px;
  --avatar-lg: 48px;
  --avatar-xl: 64px;

  /* ── Dialog ── */
  --dialog-width: 400px;
  --dialog-radius: 12px;
  --dialog-title-size: 1.125rem;
  --dialog-desc-size: 0.875rem;

  /* ── Snackbar ── */
  --snackbar-radius: 12px;
  --snackbar-gap: 0.75rem;
  --snackbar-icon-size: 20px;
  --snackbar-message-size: 0.875rem;

  /* ── Progress ── */
  --progress-height: 8px;
  --progress-radius: 9999px;

  /* ── Divider ── */
  --divider-thickness: 1px;
  --divider-thick: 2px;

  /* ── Toggle ── */
  --toggle-size: 40px;
  --toggle-radius: 12px;
  --toggle-icon-size: 18px;
}`}
        />
      </DocSection>
    </DocPage>
  );
}
