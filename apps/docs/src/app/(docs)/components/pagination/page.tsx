'use client';

import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationEllipsis, PaginationPrevious, PaginationNext } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

export default function PaginationPage() {
  const pt = usePageTranslation('pagination');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Pagination'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Navigation controls for moving through pages of content.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'Compose PaginationPrevious, PaginationItem, and PaginationNext inside a PaginationContent to build a standard page control. Set active on the current page item to highlight it.'}</DocText>
        <Showcase code={`<Pagination>
  <PaginationContent>
    <PaginationPrevious />
    <PaginationItem>1</PaginationItem>
    <PaginationItem active>2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationItem>4</PaginationItem>
    <PaginationItem>5</PaginationItem>
    <PaginationNext />
  </PaginationContent>
</Pagination>`}>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious />
              <PaginationItem>1</PaginationItem>
              <PaginationItem active>2</PaginationItem>
              <PaginationItem>3</PaginationItem>
              <PaginationItem>4</PaginationItem>
              <PaginationItem>5</PaginationItem>
              <PaginationNext />
            </PaginationContent>
          </Pagination>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-ellipsis']?.title ?? 'With Ellipsis'}>
        <DocText>{pt?.sections?.['with-ellipsis']?.texts?.[0] ?? 'Use PaginationEllipsis to collapse hidden page ranges when the total page count is large. Place ellipsis items between the boundary pages and the surrounding visible pages.'}</DocText>
        <Showcase code={`<Pagination>
  <PaginationContent>
    <PaginationPrevious />
    <PaginationItem>1</PaginationItem>
    <PaginationEllipsis />
    <PaginationItem>4</PaginationItem>
    <PaginationItem active>5</PaginationItem>
    <PaginationItem>6</PaginationItem>
    <PaginationEllipsis />
    <PaginationItem>10</PaginationItem>
    <PaginationNext />
  </PaginationContent>
</Pagination>`}>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious />
              <PaginationItem>1</PaginationItem>
              <PaginationEllipsis />
              <PaginationItem>4</PaginationItem>
              <PaginationItem active>5</PaginationItem>
              <PaginationItem>6</PaginationItem>
              <PaginationEllipsis />
              <PaginationItem>10</PaginationItem>
              <PaginationNext />
            </PaginationContent>
          </Pagination>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['glass']?.title ?? 'Glass'}>
        <DocText>{pt?.sections?.['glass']?.texts?.[0] ?? 'Set glass on PaginationContent to wrap the control group in a frosted-glass container, suitable for overlaying image or gradient backgrounds.'}</DocText>
        <Showcase code={`<Pagination>
  <PaginationContent glass>
    <PaginationPrevious />
    <PaginationItem>1</PaginationItem>
    <PaginationItem active>2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationNext />
  </PaginationContent>
</Pagination>`}>
          <Pagination>
            <PaginationContent glass>
              <PaginationPrevious />
              <PaginationItem>1</PaginationItem>
              <PaginationItem active>2</PaginationItem>
              <PaginationItem>3</PaginationItem>
              <PaginationNext />
            </PaginationContent>
          </Pagination>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Pagination props:'}</DocText>
        <PropsTable data={[
          { name: 'label', type: 'string', default: '"Pagination"', description: pt?.props?.['label'] ?? 'Accessible label for the pagination nav element, used by screen readers.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names.' },
        ]} />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[1] ?? 'PaginationContent props:'}</DocText>
        <PropsTable data={[
          { name: 'glass', type: 'boolean', default: 'false', description: pt?.props?.['glass'] ?? 'Applies glassmorphism styling to the pagination container.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names.' },
        ]} />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[2] ?? 'PaginationItem props:'}</DocText>
        <PropsTable data={[
          { name: 'active', type: 'boolean', default: 'false', description: pt?.props?.['active'] ?? 'Highlights this item as the currently active page with a point-colored background.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the page button, reducing opacity and blocking interaction.' },
          { name: 'children', type: 'React.ReactNode', default: '-', description: pt?.props?.['children'] ?? 'Page number or label rendered inside the button.' },
        ]} />
        <DocText>{pt?.sections?.['api-reference']?.texts?.[3] ?? 'PaginationEllipsis renders a collapsed indicator (...) for hidden page ranges and accepts no required props.'}</DocText>
      </DocSection>
    </DocPage>
  );
}
