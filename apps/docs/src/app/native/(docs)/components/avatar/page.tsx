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
import { Avatar } from '@tac-ui/native';
import { User } from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

export default function NativeAvatarPage() {
  const pt = usePageTranslation('native-avatar');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Avatar'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Displays a user image, initials, or icon in a circular frame with optional status indicator.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Avatar } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['playground']?.title ?? 'Playground'}>
        <DocText>
          {pt?.sections?.['playground']?.texts?.[0] ?? 'Interactively configure the Avatar props below.'}
        </DocText>
        <NativePlayground
          controls={{
            size: {
              type: 'select',
              label: 'Size',
              options: ['sm', 'md', 'lg', 'xl'],
              defaultValue: 'md',
            },
            initials: {
              type: 'text',
              label: 'Initials',
              defaultValue: 'JD',
            },
            status: {
              type: 'select',
              label: 'Status',
              options: ['none', 'online', 'offline', 'busy', 'away'],
              defaultValue: 'none',
            },
          }}
          render={(values) => (
            <Avatar
              size={values.size as 'md'}
              initials={values.initials as string}
              status={values.status === 'none' ? undefined : (values.status as 'online')}
            />
          )}
          code={(values) =>
            `<Avatar size="${values.size}" initials="${values.initials}"${values.status !== 'none' ? ` status="${values.status}"` : ''} />`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sizes-with-image']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes-with-image']?.texts?.[0] ??
            'Four sizes from compact indicators to large profile displays.'}
        </DocText>
        <NativeShowcase
          code={`<Avatar size="sm" src="https://i.pravatar.cc/150?img=1" alt="User" />
<Avatar size="md" src="https://i.pravatar.cc/150?img=1" alt="User" />
<Avatar size="lg" src="https://i.pravatar.cc/150?img=1" alt="User" />
<Avatar size="xl" src="https://i.pravatar.cc/150?img=1" alt="User" />`}
        >
          <Avatar size="sm" src="https://i.pravatar.cc/150?img=1" alt="User" />
          <Avatar size="md" src="https://i.pravatar.cc/150?img=1" alt="User" />
          <Avatar size="lg" src="https://i.pravatar.cc/150?img=1" alt="User" />
          <Avatar size="xl" src="https://i.pravatar.cc/150?img=1" alt="User" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['initials']?.title ?? 'Initials'}>
        <DocText>
          {pt?.sections?.['initials']?.texts?.[0] ?? 'Text initials are shown when no image is provided.'}
        </DocText>
        <NativeShowcase
          code={`<Avatar size="sm" initials="JD" />
<Avatar size="md" initials="AB" />
<Avatar size="lg" initials="CK" />
<Avatar size="xl" initials="MR" />`}
        >
          <Avatar size="sm" initials="JD" />
          <Avatar size="md" initials="AB" />
          <Avatar size="lg" initials="CK" />
          <Avatar size="xl" initials="MR" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['icon-fallback']?.title ?? 'Icon Fallback'}>
        <DocText>
          {pt?.sections?.['icon-fallback']?.texts?.[0] ??
            'An icon is displayed when neither image nor initials are available.'}
        </DocText>
        <NativeShowcase
          code={`import { User } from '@tac-ui/icon-native';

<Avatar size="sm" icon={<User size={16} color="#71717a" />} />
<Avatar size="md" icon={<User size={20} color="#71717a" />} />
<Avatar size="lg" icon={<User size={24} color="#71717a" />} />
<Avatar size="xl" icon={<User size={28} color="#71717a" />} />`}
        >
          <Avatar size="sm" icon={<User size={16} color="#71717a" />} />
          <Avatar size="md" icon={<User size={20} color="#71717a" />} />
          <Avatar size="lg" icon={<User size={24} color="#71717a" />} />
          <Avatar size="xl" icon={<User size={28} color="#71717a" />} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-status']?.title ?? 'Status Indicator'}>
        <DocText>
          {pt?.sections?.['with-status']?.texts?.[0] ??
            'A status dot on the bottom-right corner indicates online presence.'}
        </DocText>
        <NativeShowcase
          code={`<Avatar size="sm" initials="JD" status="online" />
<Avatar size="md" initials="AB" status="online" />
<Avatar size="lg" initials="AB" status="online" />
<Avatar size="xl" initials="MR" status="online" />`}
        >
          <Avatar size="sm" initials="JD" status="online" />
          <Avatar size="md" initials="AB" status="online" />
          <Avatar size="lg" initials="CK" status="online" />
          <Avatar size="xl" initials="MR" status="online" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-status-icons']?.title ?? 'Status with Content'}>
        <DocText>
          {pt?.sections?.['custom-status-icons']?.texts?.[0] ??
            'Replace the status dot with custom icons for richer status indicators.'}
        </DocText>
        <NativeShowcase
          code={`import { User } from '@tac-ui/icon-native';

<Avatar size="xl" initials="AB" statusColor="#22c55e" statusContent={<User size={8} color="#fff" />} />`}
        >
          <Avatar size="xl" initials="AB" statusColor="#22c55e" statusContent={<User size={8} color="#fff" />} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-status-colors']?.title ?? 'Status Colors'}>
        <DocText>
          {pt?.sections?.['custom-status-colors']?.texts?.[0] ??
            'Change the status dot color to represent different states.'}
        </DocText>
        <NativeShowcase
          code={`<Avatar size="lg" initials="ON" status="online" />
<Avatar size="lg" initials="AW" status="away" />
<Avatar size="lg" initials="OF" status="busy" />
<Avatar size="lg" initials="ID" status="offline" />`}
        >
          <Avatar size="lg" initials="ON" status="online" />
          <Avatar size="lg" initials="AW" status="away" />
          <Avatar size="lg" initials="OF" status="busy" />
          <Avatar size="lg" initials="ID" status="offline" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'size',
              type: '"sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Size of the avatar.',
            },
            {
              name: 'src',
              type: 'ImageSourcePropType | string',
              default: '-',
              description:
                pt?.props?.['src'] ??
                'Image source — a URL string or a React Native require() resource. Falls back to initials or icon on error.',
            },
            {
              name: 'alt',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['alt'] ??
                'Accessibility label for the image. Also used to derive first-character initials.',
            },
            {
              name: 'initials',
              type: 'string',
              default: '-',
              description: pt?.props?.['initials'] ?? 'Text initials shown when no image is available.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['icon'] ?? 'Icon node shown when no image or initials are available.',
            },
            {
              name: 'status',
              type: '"online" | "offline" | "busy" | "away"',
              default: '-',
              description:
                pt?.props?.['status'] ??
                'When provided, shows a colored presence indicator dot in the bottom-right corner.',
            },
            {
              name: 'statusContent',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['statusContent'] ?? 'Custom content rendered inside the status dot, such as a small icon.',
            },
            {
              name: 'statusColor',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['statusColor'] ??
                'Custom background color for the status dot. Overrides the default color mapping for the status value.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional React Native style applied to the avatar container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
