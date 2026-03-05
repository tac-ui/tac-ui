'use client';

import React from 'react';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocText,
  PreviewCode,
  PropsTable,
} from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { NativeShowcase } from '@/components/docs/NativeShowcase';
import { NativePlayground } from '@/components/docs/NativePlayground';
import { EmptyState, Button } from '@tac-ui/native';
import { Inbox } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

export default function NativeEmptyStatePage() {
  const pt = usePageTranslation('native-empty-state');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Empty State'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'A standardized placeholder screen displayed when there is no data to show.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { EmptyState } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the EmptyState props below.'}
        </DocText>
        <NativePlayground
          controls={{
            title: {
              type: 'text',
              label: 'Title',
              defaultValue: 'No files found',
            },
            description: {
              type: 'text',
              label: 'Description',
              defaultValue: 'Upload your first file to get started.',
            },
          }}
          render={(values) => <EmptyState title={values.title as string} description={values.description as string} />}
          code={(values) =>
            `<EmptyState
  title="${values.title}"
  description="${values.description}"
/>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['with-icon-and-action']?.title ?? 'With Icon and Action'}>
        <DocText>
          {pt?.sections?.['with-icon-and-action']?.texts?.[0] ??
            'Full empty state with icon, title, description, and a call-to-action button — the icon is centered inside a blurred circular container.'}
        </DocText>
        <NativeShowcase
          code={`import { Inbox } from '@tac-ui/icon-native';

<EmptyState
  icon={<Inbox size={48} color="#71717a" />}
  title="No files found"
  description="Upload your first file to get started. Supported formats include PDF, PNG, and JPEG."
  action={
    <Button size="sm" onPress={() => console.log('upload')}>Upload File</Button>
  }
/>`}
        >
          <EmptyState
            icon={<Inbox size={48} color="#71717a" />}
            title="No files found"
            description="Upload your first file to get started. Supported formats include PDF, PNG, and JPEG."
            action={
              <Button size="sm" onPress={() => {}}>
                Upload File
              </Button>
            }
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['minimal']?.title ?? 'Minimal'}>
        <DocText>
          {pt?.sections?.['minimal']?.texts?.[0] ??
            'Simple empty state with just a title and description — no icon or action — suitable for compact list placeholders.'}
        </DocText>
        <NativeShowcase
          code={`<EmptyState
  title="Nothing here yet"
  description="Check back later or adjust your filters."
/>`}
        >
          <EmptyState title="Nothing here yet" description="Check back later or adjust your filters." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['visibility-toggle']?.title ?? 'Visibility Toggle'}>
        <DocText>
          {pt?.sections?.['visibility-toggle']?.texts?.[0] ??
            'The visible prop controls whether the component is rendered. When set to false, the component animates out before unmounting.'}
        </DocText>
        <PreviewCode
          code={`const [visible, setVisible] = useState(true);

<Button onPress={() => setVisible(v => !v)}>
  Toggle Empty State
</Button>

<EmptyState
  visible={visible}
  icon={<SearchIcon size={48} color="#71717a" />}
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button size="sm" variant="outline">Clear filters</Button>}
/>`}
        />
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
              description: pt?.props?.['icon'] ?? 'Optional icon or illustration displayed above the title.',
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
              description:
                pt?.props?.['visible'] ??
                'When false, the component animates out with fade and slide-up before unmounting.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
