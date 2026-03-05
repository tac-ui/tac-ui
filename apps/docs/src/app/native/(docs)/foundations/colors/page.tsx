'use client';

import { useEffect, useRef, useState } from 'react';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, PreviewCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return rgb.trim();
  const [, r, g, b] = match;
  return `#${[r, g, b].map((c) => Number(c).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function ColorSwatch({ cssVar, name }: { cssVar: string; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState('');
  useEffect(() => {
    const update = () => {
      if (ref.current) setHex(rgbToHex(getComputedStyle(ref.current).backgroundColor));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
    return () => observer.disconnect();
  }, [cssVar]);
  return (
    <div className="flex flex-col gap-1.5">
      <div
        ref={ref}
        className="w-full h-12 rounded-[var(--radius-m)] border border-solid border-[var(--border)]"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <span className="text-[11px] font-mono text-[var(--muted-foreground)] truncate">{name}</span>
      {hex && <span className="text-[10px] font-mono text-[var(--muted-foreground)]/60 -mt-0.5">{hex}</span>}
    </div>
  );
}

const coreColors = [
  ['--background', 'background'],
  ['--background-subtle', 'bg-subtle'],
  ['--surface', 'surface'],
  ['--foreground', 'foreground'],
  ['--primary', 'primary'],
  ['--primary-hover', 'primary-hover'],
  ['--primary-foreground', 'primary-fg'],
  ['--secondary', 'secondary'],
  ['--secondary-foreground', 'secondary-fg'],
  ['--muted', 'muted'],
  ['--muted-foreground', 'muted-fg'],
  ['--card', 'card'],
  ['--card-foreground', 'card-fg'],
  ['--border', 'border'],
  ['--input', 'input'],
  ['--point', 'point'],
  ['--point-hover', 'point-hover'],
  ['--point-foreground', 'point-fg'],
  ['--point-subtle', 'point-subtle'],
];

const statusColors = [
  ['--success', 'success'],
  ['--success-bg', 'success-bg'],
  ['--success-foreground', 'success-fg'],
  ['--warning', 'warning'],
  ['--warning-bg', 'warning-bg'],
  ['--warning-foreground', 'warning-fg'],
  ['--error', 'error'],
  ['--error-bg', 'error-bg'],
  ['--error-foreground', 'error-fg'],
  ['--info', 'info'],
  ['--info-bg', 'info-bg'],
  ['--info-foreground', 'info-fg'],
];

const grayScale = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

function ColorGrid({ colors }: { colors: string[][] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {colors.map(([cssVar, name]) => (
        <ColorSwatch key={cssVar} cssVar={cssVar} name={name} />
      ))}
    </div>
  );
}

export default function NativeColorsPage() {
  const pt = usePageTranslation('native-colors');

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Colors'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Semantic color tokens for React Native, accessed via useTacNativeTheme(). Tokens are shared with the web platform and adapt between light and dark themes.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['core-colors']?.title ?? 'Core Colors'}>
        <DocText>
          {pt?.sections?.['core-colors']?.texts?.[0] ??
            'Primary surface, text, and accent colors. Access via theme.colors.background, theme.colors.primary, etc.'}
        </DocText>
        <ColorGrid colors={coreColors} />
      </DocSection>

      <DocSection title={pt?.sections?.['status-colors']?.title ?? 'Status Colors'}>
        <DocText>
          {pt?.sections?.['status-colors']?.texts?.[0] ??
            'Semantic colors for success, warning, error, and informational states.'}
        </DocText>
        <ColorGrid colors={statusColors} />
      </DocSection>

      <DocSection title={pt?.sections?.['gray-scale']?.title ?? 'Gray Scale'}>
        <DocText>
          {pt?.sections?.['gray-scale']?.texts?.[0] ??
            'Neutral palette from 50 (lightest) to 900 (darkest). Access via theme.colors.gray50 through theme.colors.gray900.'}
        </DocText>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {grayScale.map((n) => (
            <ColorSwatch key={n} cssVar={`--gray-${n}`} name={n} />
          ))}
        </div>
      </DocSection>

      <DocSection title={pt?.sections?.['usage']?.title ?? 'Usage'}>
        <DocText>
          {pt?.sections?.['usage']?.texts?.[0] ??
            'Access colors through the theme context. All tokens are available as JS values — no CSS variables needed.'}
        </DocText>
        <PreviewCode
          code={`import { useTacNativeTheme } from '@tac-ui/native';

function MyComponent() {
  const { theme } = useTacNativeTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.foreground }}>
        Hello World
      </Text>
      <Text style={{ color: theme.colors.mutedForeground }}>
        Subtle text
      </Text>
    </View>
  );
}`}
        />
        <DocText>
          {pt?.sections?.['usage']?.texts?.[1] ??
            'Native tokens use camelCase names that map directly to CSS variable equivalents.'}
        </DocText>
        <PreviewCode
          language="typescript"
          code={`// CSS variable        → Native theme key
// --background        → theme.colors.background
// --foreground        → theme.colors.foreground
// --primary           → theme.colors.primary
// --muted-foreground  → theme.colors.mutedForeground
// --point             → theme.colors.point
// --success           → theme.colors.success
// --error             → theme.colors.error
// --border            → theme.colors.border
// --gray-500          → theme.colors.gray500`}
        />
      </DocSection>
    </DocPage>
  );
}
