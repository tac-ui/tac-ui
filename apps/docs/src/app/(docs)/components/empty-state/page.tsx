'use client';

import React, { useState } from 'react';
import { EmptyState, Button } from '@tac-ui/web';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

const FolderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

function VisibilityExample() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex flex-col gap-4 w-full items-start">
      <Button size="sm" variant="outline" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Hide' : 'Show'} Empty State
      </Button>
      <EmptyState
        visible={visible}
        icon={<SearchIcon />}
        title="No results found"
        description="Try adjusting your search or filters to find what you're looking for."
        action={<Button size="sm" variant="outline">Clear filters</Button>}
      />
    </div>
  );
}

export default function EmptyStatePage() {
  const pt = usePageTranslation('empty-state');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Empty State'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A standardized placeholder screen displayed when there is no data to show.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['with-icon-and-action']?.title ?? 'With Icon and Action'}>
        <DocText>{pt?.sections?.['with-icon-and-action']?.texts?.[0] ?? 'Full empty state with icon, title, description, and a call-to-action button — the icon is centered inside a blurred circular container.'}</DocText>
        <Showcase
          code={`<EmptyState
  icon={<FolderIcon />}
  title="No files found"
  description="Upload your first file to get started. Supported formats include PDF, PNG, and JPEG."
  action={<Button size="sm">Upload File</Button>}
/>`}
        >
          <EmptyState
            icon={<FolderIcon />}
            title="No files found"
            description="Upload your first file to get started. Supported formats include PDF, PNG, and JPEG."
            action={<Button size="sm">Upload File</Button>}
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['minimal']?.title ?? 'Minimal'}>
        <DocText>{pt?.sections?.['minimal']?.texts?.[0] ?? 'Simple empty state with just a title and description — no icon or action — suitable for compact list placeholders.'}</DocText>
        <Showcase
          code={`<EmptyState
  title="Nothing here yet"
  description="Check back later or adjust your filters."
/>`}
        >
          <EmptyState
            title="Nothing here yet"
            description="Check back later or adjust your filters."
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['visibility-toggle']?.title ?? 'Visibility Toggle'}>
        <DocText>{pt?.sections?.['visibility-toggle']?.texts?.[0] ?? 'The visible prop controls whether the component is rendered. When set to false, the component animates out using the dismiss animation before unmounting.'}</DocText>
        <Showcase
          code={`const [visible, setVisible] = useState(true);

<Button onClick={() => setVisible(v => !v)}>
  Toggle Empty State
</Button>

<EmptyState
  visible={visible}
  icon={<SearchIcon />}
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button size="sm" variant="outline">Clear filters</Button>}
/>`}
        >
          <VisibilityExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'title',
              type: 'string',
              default: '-',
              description: pt?.props?.['title'] ?? 'Primary heading text. Required.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['icon'] ?? 'Optional icon or illustration displayed above the title inside a blurred circular container.',
            },
            {
              name: 'description',
              type: 'string',
              default: '-',
              description: pt?.props?.['description'] ?? 'Optional descriptive text below the title.',
            },
            {
              name: 'action',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['action'] ?? 'Optional action button(s) rendered below the description.',
            },
            {
              name: 'visible',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['visible'] ?? 'When false, the component animates out using dismissVariants before unmounting via AnimatePresence.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the inner container div.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
