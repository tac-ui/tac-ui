'use client';

import React from 'react';
import { Link } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  Showcase,
  PropsTable,
  DocText,
  PreviewCode,
} from '@/components/docs/DocPage';
import { Playground } from '@/components/docs/Playground';

export default function LinkPage() {
  const pt = usePageTranslation('link');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Link'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'Styled anchor element with variant styles and optional external link support.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Link } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Link props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['inline', 'plain', 'current'],
              defaultValue: 'inline',
            },
            external: {
              type: 'boolean',
              label: 'External',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <Link
              href="#"
              variant={values.variant as 'inline' | 'plain' | 'current'}
              external={values.external as boolean}
            >
              Visit Documentation
            </Link>
          )}
          code={(values) =>
            `<Link href="#" variant="${values.variant}"${values.external ? ' external' : ''}>
  Visit Documentation
</Link>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['inline']?.title ?? 'Inline'}>
        <DocText>
          {pt?.sections?.['inline']?.texts?.[0] ??
            'The default inline variant renders a colored underlined link. Use within body text to provide contextual navigation.'}
        </DocText>
        <Showcase
          code={`<p>
  Read the <Link href="#">full documentation</Link> for more details.
</p>`}
        >
          <p className="text-[var(--foreground)]">
            Read the <Link href="#">full documentation</Link> for more details.
          </p>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['plain']?.title ?? 'Plain'}>
        <DocText>
          {pt?.sections?.['plain']?.texts?.[0] ??
            'The plain variant shows no underline and uses the foreground color, switching to the accent color on hover. Use for navigation items or subtle links.'}
        </DocText>
        <Showcase
          code={`<Link href="#" variant="plain">Go to settings</Link>`}
        >
          <Link href="#" variant="plain">Go to settings</Link>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['current']?.title ?? 'Current'}>
        <DocText>
          {pt?.sections?.['current']?.texts?.[0] ??
            'The current variant marks the active or current page link. It is styled in the accent color with medium weight and is not interactive (pointer-events-none).'}
        </DocText>
        <Showcase
          code={`<nav className="flex gap-4">
  <Link href="#" variant="plain">Home</Link>
  <Link href="#" variant="current">About</Link>
  <Link href="#" variant="plain">Contact</Link>
</nav>`}
        >
          <nav className="flex gap-4">
            <Link href="#" variant="plain">Home</Link>
            <Link href="#" variant="current">About</Link>
            <Link href="#" variant="plain">Contact</Link>
          </nav>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['external']?.title ?? 'External Link'}>
        <DocText>
          {pt?.sections?.['external']?.texts?.[0] ??
            'Pass the external prop to open the link in a new tab. An external link icon is automatically appended to signal that the destination is outside the current site.'}
        </DocText>
        <Showcase
          code={`<Link href="https://example.com" external>
  Visit Example.com
</Link>`}
        >
          <Link href="https://example.com" external>
            Visit Example.com
          </Link>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"inline" | "plain" | "current"',
              default: '"inline"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the link.',
            },
            {
              name: 'external',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['external'] ??
                'When true, opens in a new tab and appends an external link icon.',
            },
            {
              name: 'href',
              type: 'string',
              default: '-',
              description: pt?.props?.['href'] ?? 'The URL the link points to.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'Link label content.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
