'use client';

import React from 'react';
import Link from 'next/link';
import { CodeBlock } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, InlineCode } from '@/components/docs/DocPage';

export default function GettingStartedPage() {
  const pt = usePageTranslation('getting-started');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Installation'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Get up and running with Tac UI in your React project.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['install']?.title ?? '1. Install packages'}>
        <DocText>{pt?.sections?.['install']?.texts?.[0] ?? 'Tac UI is published as a monorepo with separate token and component packages.'}</DocText>
        <CodeBlock language="bash" code={`pnpm add @tac-ui/web @tac-ui/tokens`} />
      </DocSection>

      <DocSection title={pt?.sections?.['tailwind']?.title ?? '2. Configure Tailwind CSS'}>
        <DocText>
          {pt?.sections?.['tailwind']?.texts?.[0] ?? 'Tac UI uses Tailwind CSS v4. Import the theme CSS generated from design tokens in your main stylesheet.'}
        </DocText>
        <CodeBlock language="css" code={`/* globals.css */\n@import "tailwindcss";\n@config "./tailwind.config.ts";`} />
        <DocText>{pt?.sections?.['tailwind']?.texts?.[1] ?? 'In your Tailwind config, use the Tac UI preset:'}</DocText>
        <CodeBlock language="typescript" code={`// tailwind.config.ts\nimport { tacPreset, generateThemeCSS } from '@tac-ui/web/tailwind';\n\nexport default {\n  presets: [tacPreset],\n  plugins: [\n    { handler: ({ addBase }) => addBase({}) }, // theme CSS injected via preset\n  ],\n};`} />
      </DocSection>

      <DocSection title={pt?.sections?.['provider']?.title ?? '3. Add the Provider'}>
        <DocText>
          {pt?.sections?.['provider']?.texts?.[0] ?? <>Wrap your application root with <InlineCode>TacProvider</InlineCode> to enable theming and CSS variable injection.</>}
        </DocText>
        <CodeBlock language="tsx" code={`import { TacProvider } from '@tac-ui/web';\n\nexport default function App({ children }) {\n  return (\n    <TacProvider defaultMode="system">\n      {children}\n    </TacProvider>\n  );\n}`} />
      </DocSection>

      <DocSection title={pt?.sections?.['usage']?.title ?? '4. Use Components'}>
        <DocText>
          {pt?.sections?.['usage']?.texts?.[0] ?? <>Import and use any component. All components support <InlineCode>ref</InlineCode> forwarding,{' '}<InlineCode>className</InlineCode> overrides via <InlineCode>tailwind-merge</InlineCode>, and full TypeScript type inference.</>}
        </DocText>
        <CodeBlock language="tsx" code={`import { Button, Input, Card, CardHeader, CardTitle } from '@tac-ui/web';\n\nexport function LoginForm() {\n  return (\n    <Card className="w-[400px]">\n      <CardHeader>\n        <CardTitle>Sign In</CardTitle>\n      </CardHeader>\n      <div className="p-6 space-y-4">\n        <Input label="Email" placeholder="you@example.com" />\n        <Input label="Password" type="password" />\n        <Button className="w-full">Sign In</Button>\n      </div>\n    </Card>\n  );\n}`} />
      </DocSection>

      <DocSection title={pt?.sections?.['customize']?.title ?? '5. Customize Design Tokens'}>
        <DocText>
          {pt?.sections?.['customize']?.texts?.[0] ?? <>All visual styles in Tac UI are driven by CSS custom properties (design tokens). You can override any token to match your brand without modifying the source.</>}
          {' '}
          {!pt?.sections?.['customize']?.texts?.[0] && (
            <>
              See the{' '}
              <Link href="/foundations/customization" className="text-[var(--primary)] hover:underline">
                Customization guide
              </Link>{' '}
              for the full list of available tokens and advanced techniques.
            </>
          )}
        </DocText>
        <CodeBlock language="css" code={`/* Override tokens in your globals.css */\n:root {\n  --primary: #96784A;        /* warm amber instead of blue fusion */\n  --primary-hover: #84693C;\n  --radius-m: 0.75rem;       /* rounder corners */\n}`} />
      </DocSection>

      <DocSection title={pt?.sections?.['structure']?.title ?? 'Project Structure'}>
        <DocText>{pt?.sections?.['structure']?.texts?.[0] ?? 'The monorepo is organized into three packages:'}</DocText>
        <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
          <div className="bg-[var(--muted)] text-[var(--foreground)] p-4 font-mono text-[13px] leading-relaxed">
            <p className="m-0">@tac-ui/shared   <span className="text-[var(--muted-foreground)]"># Shared types (ThemeMode, etc.)</span></p>
            <p className="m-0">@tac-ui/tokens   <span className="text-[var(--muted-foreground)]"># Design tokens + CSS variable generator</span></p>
            <p className="m-0">@tac-ui/web      <span className="text-[var(--muted-foreground)]"># React components + Tailwind preset</span></p>
          </div>
        </div>
      </DocSection>
    </DocPage>
  );
}
