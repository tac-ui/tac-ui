'use client';

import React from 'react';
import { Divider } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function DividerPage() {
  const pt = usePageTranslation('divider');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Divider'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A visual separator used to divide content sections or list items.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['full']?.title ?? 'Full'}>
        <DocText>{pt?.sections?.['full']?.texts?.[0] ?? 'The default variant spans the full width of its container as a 1px horizontal rule.'}</DocText>
        <Showcase code={`<Divider />`}>
          <div className="w-full">
            <Divider />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['inset']?.title ?? 'Inset'}>
        <DocText>{pt?.sections?.['inset']?.texts?.[0] ?? 'The inset variant adds horizontal margins on both sides, commonly used inside list items or cards.'}</DocText>
        <Showcase code={`<Divider variant="inset" />`}>
          <div className="w-full">
            <Divider variant="inset" />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['thick']?.title ?? 'Thick'}>
        <DocText>{pt?.sections?.['thick']?.texts?.[0] ?? 'The thick variant renders a 2px rule for stronger visual separation between major sections.'}</DocText>
        <Showcase code={`<Divider variant="thick" />`}>
          <div className="w-full">
            <Divider variant="thick" />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>{pt?.sections?.['with-label']?.texts?.[0] ?? 'Pass a label string to render centered text between two rule lines, useful for separating form sections or login options.'}</DocText>
        <Showcase code={`<Divider label="OR" />`}>
          <div className="w-full">
            <Divider label="OR" />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'variant', type: '"full" | "inset" | "thick" | "withLabel"', default: '"full"', description: pt?.props?.['variant'] ?? 'Visual style variant of the divider.' },
          { name: 'label', type: 'string', default: '-', description: pt?.props?.['label'] ?? 'Text label rendered in the center of the divider; implies withLabel layout.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
