'use client';

import React from 'react';
import Link from 'next/link';
import { CodeBlock } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, InlineCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';

export default function NativeGettingStartedPage() {
  const pt = usePageTranslation('native-getting-started');

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Installation'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'Get up and running with Tac UI Native in your React Native or Expo project.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['install']?.title ?? '1. Install packages'}>
        <DocText>
          {pt?.sections?.['install']?.texts?.[0] ??
            'Install the core native package along with the shared tokens and icon packages.'}
        </DocText>
        <CodeBlock language="bash" code={`pnpm add @tac-ui/native @tac-ui/tokens @tac-ui/icon-native`} />
        <DocText>
          {pt?.sections?.['install']?.texts?.[1] ?? (
            <>
              Icons are provided by <InlineCode>@tac-ui/icon-native</InlineCode>, a React Native SVG port of the icon
              set used in <InlineCode>@tac-ui/web</InlineCode>. Pass any icon as a child or prop where components accept{' '}
              <InlineCode>React.ReactNode</InlineCode>.
            </>
          )}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['peer-dependencies']?.title ?? '2. Peer dependencies'}>
        <DocText>
          {pt?.sections?.['peer-dependencies']?.texts?.[0] ??
            'Tac UI Native requires the following peer dependencies. Most are already present in standard React Native / Expo projects.'}
        </DocText>
        <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
          <div className="bg-[var(--muted)] text-[var(--foreground)] p-4 font-mono text-[13px] leading-relaxed">
            <p className="m-0 font-semibold text-[var(--foreground)]">Required</p>
            <p className="m-0 mt-1">
              react <span className="text-[var(--muted-foreground)]">&gt;=18.0.0</span>
            </p>
            <p className="m-0">
              react-native <span className="text-[var(--muted-foreground)]">&gt;=0.73.0</span>
            </p>
            <p className="m-0">
              react-native-svg <span className="text-[var(--muted-foreground)]">&gt;=13.0.0 (for icons)</span>
            </p>
            <p className="m-0 mt-3 font-semibold text-[var(--foreground)]">Optional</p>
            <p className="m-0 mt-1">
              react-native-reanimated{' '}
              <span className="text-[var(--muted-foreground)]">&gt;=3.0.0 (for animations)</span>
            </p>
          </div>
        </div>
        <DocText>
          {pt?.sections?.['peer-dependencies']?.texts?.[1] ?? (
            <>
              If you are using Expo, install <InlineCode>react-native-svg</InlineCode> via:
            </>
          )}
        </DocText>
        <CodeBlock language="bash" code={`npx expo install react-native-svg react-native-reanimated`} />
        <DocText>
          {pt?.sections?.['peer-dependencies']?.texts?.[2] ?? (
            <>
              Then follow the{' '}
              <a
                href="https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                react-native-reanimated setup guide
              </a>{' '}
              to add the Babel plugin.
            </>
          )}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['provider']?.title ?? '3. Add the Provider'}>
        <DocText>
          {pt?.sections?.['provider']?.texts?.[0] ?? (
            <>
              Wrap your application root with <InlineCode>TacNativeProvider</InlineCode> to enable theming. It injects
              the active theme tokens into a React context consumed by all child components.
            </>
          )}
        </DocText>
        <CodeBlock
          language="tsx"
          code={`import { TacNativeProvider } from '@tac-ui/native';

export default function App() {
  return (
    <TacNativeProvider defaultMode="system">
      {/* your screens here */}
    </TacNativeProvider>
  );
}`}
        />
        <DocText>
          {pt?.sections?.['provider']?.texts?.[1] ?? (
            <>
              The <InlineCode>defaultMode</InlineCode> prop accepts <InlineCode>&quot;light&quot;</InlineCode>,{' '}
              <InlineCode>&quot;dark&quot;</InlineCode>, or <InlineCode>&quot;system&quot;</InlineCode>. When set to{' '}
              <InlineCode>&quot;system&quot;</InlineCode>, the provider follows the device color scheme automatically
              via <InlineCode>useColorScheme</InlineCode>.
            </>
          )}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['usage']?.title ?? '4. Use Components'}>
        <DocText>
          {pt?.sections?.['usage']?.texts?.[0] ?? (
            <>
              Import components directly from <InlineCode>@tac-ui/native</InlineCode>. All components accept a{' '}
              <InlineCode>style</InlineCode> prop for local overrides and forward refs where applicable.
            </>
          )}
        </DocText>
        <CodeBlock
          language="tsx"
          code={`import { View } from 'react-native';
import { Button, Input, Card } from '@tac-ui/native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Card>
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" secureTextEntry />
        <Button variant="primary" onPress={() => {}}>
          Sign In
        </Button>
      </Card>
    </View>
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['customize']?.title ?? '5. Customize Design Tokens'}>
        <DocText>
          {pt?.sections?.['customize']?.texts?.[0] ?? (
            <>
              Pass a <InlineCode>theme</InlineCode> prop to <InlineCode>TacNativeProvider</InlineCode> to override any
              token. The theme object is deeply merged with the default tokens, so you only need to specify the values
              you want to change.
            </>
          )}{' '}
          {!pt?.sections?.['customize']?.texts?.[0] && (
            <>
              See the{' '}
              <Link href="/native/foundations/customization" className="text-[var(--primary)] hover:underline">
                Customization guide
              </Link>{' '}
              for the full token reference (token names are shared across web and native).
            </>
          )}
        </DocText>
        <CodeBlock
          language="tsx"
          code={`import { TacNativeProvider } from '@tac-ui/native';

const brandTheme = {
  light: {
    primary: '#96784A',       // warm amber
    primaryHover: '#84693C',
    radiusMd: 12,             // rounder corners (px)
  },
  dark: {
    primary: '#B89462',
    primaryHover: '#96784A',
  },
};

export default function App() {
  return (
    <TacNativeProvider defaultMode="system" theme={brandTheme}>
      {/* your screens */}
    </TacNativeProvider>
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['structure']?.title ?? 'Project Structure'}>
        <DocText>
          {pt?.sections?.['structure']?.texts?.[0] ?? 'The monorepo packages consumed by native projects:'}
        </DocText>
        <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
          <div className="bg-[var(--muted)] text-[var(--foreground)] p-4 font-mono text-[13px] leading-relaxed">
            <p className="m-0">
              @tac-ui/shared <span className="text-[var(--muted-foreground)]"># Shared types (ThemeMode, etc.)</span>
            </p>
            <p className="m-0">
              @tac-ui/tokens{' '}
              <span className="text-[var(--muted-foreground)]"># Design tokens (web CSS + native JS output)</span>
            </p>
            <p className="m-0">
              @tac-ui/icon-native{' '}
              <span className="text-[var(--muted-foreground)]"># SVG icon set for React Native</span>
            </p>
            <p className="m-0">
              @tac-ui/native{' '}
              <span className="text-[var(--muted-foreground)]"># React Native components + TacNativeProvider</span>
            </p>
          </div>
        </div>
      </DocSection>
    </DocPage>
  );
}
