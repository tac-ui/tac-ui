'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis } from '@tac-ui/web';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';
import { usePageTranslation } from '@/i18n';

export default function BreadcrumbPage() {
  const pt = usePageTranslation('breadcrumb');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Breadcrumb'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Shows the user\'s current location within the application\'s navigation hierarchy.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['simple']?.title ?? 'Simple'}>
        <DocText>{pt?.sections?.['simple']?.texts?.[0] ?? 'Compose BreadcrumbList, BreadcrumbItem, BreadcrumbLink, and BreadcrumbSeparator to build a basic breadcrumb trail. The separator renders a chevron icon by default and can be replaced with any node.'}</DocText>
        <Showcase code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem current>
      <BreadcrumbLink>Button</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem current>
                <BreadcrumbLink>Button</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-current-item']?.title ?? 'With Current Item'}>
        <DocText>{pt?.sections?.['with-current-item']?.texts?.[0] ?? 'Set <code>current</code> on a BreadcrumbItem to mark it as the active page. This applies bold foreground styling and adds <code>aria-current="page"</code> for accessibility.'}</DocText>
        <Showcase code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem current>
      <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem current>
                <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-ellipsis']?.title ?? 'With Ellipsis'}>
        <DocText>{pt?.sections?.['with-ellipsis']?.texts?.[0] ?? 'Use BreadcrumbEllipsis to collapse intermediate path segments when the trail is too long to display in full. Place it between separators at the position where items are hidden.'}</DocText>
        <Showcase code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem current>
      <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem current>
                <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Breadcrumb uses a composition pattern. Build it using the sub-components listed below.'}</DocText>
        <PropsTable data={[
          { name: 'BreadcrumbItem.current', type: 'boolean', default: 'false', description: pt?.props?.['BreadcrumbItem.current'] ?? 'Marks this item as the current page, applying active styles and aria-current="page".' },
          { name: 'BreadcrumbItem.children', type: 'React.ReactNode', default: '-', description: pt?.props?.['BreadcrumbItem.children'] ?? 'Content of the breadcrumb item (link, ellipsis, or plain text).' },
          { name: 'BreadcrumbLink.href', type: 'string', default: '-', description: pt?.props?.['BreadcrumbLink.href'] ?? 'URL for the breadcrumb link. Omit for the current (last) item.' },
          { name: 'BreadcrumbSeparator.children', type: 'React.ReactNode', default: '-', description: pt?.props?.['BreadcrumbSeparator.children'] ?? 'Custom separator content. Defaults to a chevron SVG icon.' },
          { name: 'BreadcrumbEllipsis', type: '-', default: '-', description: pt?.props?.['BreadcrumbEllipsis'] ?? 'Renders a collapsed indicator (...) for hidden intermediate items.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
