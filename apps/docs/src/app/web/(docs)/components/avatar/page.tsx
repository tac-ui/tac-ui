'use client';

import React from 'react';
import { Camera, Shield, Star, User } from '@tac-ui/icon';
import { Avatar } from '@tac-ui/web';
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
import { usePageTranslation } from '@/i18n';
import { Playground } from '@/components/docs/Playground';

export default function AvatarPage() {
  const pt = usePageTranslation('avatar');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Avatar'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Displays a user image, initials, or icon in a circular frame with optional status indicator.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Avatar } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Avatar props below.</DocText>
        <Playground
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
            showStatus: {
              type: 'boolean',
              label: 'Status',
              defaultValue: false,
            },
            animated: {
              type: 'boolean',
              label: 'Animated',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <Avatar
              size={values.size as 'md'}
              initials={values.initials as string}
              showStatus={values.showStatus as boolean}
              animated={values.animated as boolean}
            />
          )}
          code={(values) => {
            const props = [`size="${values.size}"`, `initials="${values.initials}"`];
            if (values.showStatus) props.push('showStatus');
            if (values.animated) props.push('animated');
            return `<Avatar ${props.join(' ')} />`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sizes-with-image']?.title ?? 'Sizes'}>
        <DocText>
          {pt?.sections?.['sizes-with-image']?.texts?.[0] ??
            'Four sizes from compact indicators to large profile displays.'}
        </DocText>
        <Showcase
          code={`<Avatar size="sm" src="/avatar.jpg" alt="User" />
<Avatar size="md" src="/avatar.jpg" alt="User" />
<Avatar size="lg" src="/avatar.jpg" alt="User" />
<Avatar size="xl" src="/avatar.jpg" alt="User" />`}
        >
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
          />
          <Avatar
            size="md"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
          />
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
          />
          <Avatar
            size="xl"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['initials']?.title ?? 'Initials'}>
        <DocText>
          {pt?.sections?.['initials']?.texts?.[0] ?? 'Text initials are shown when no image is provided.'}
        </DocText>
        <Showcase
          code={`<Avatar size="sm" initials="JD" />
<Avatar size="md" initials="AB" />
<Avatar size="lg" initials="CK" />
<Avatar size="xl" initials="MR" />`}
        >
          <Avatar size="sm" initials="JD" />
          <Avatar size="md" initials="AB" />
          <Avatar size="lg" initials="CK" />
          <Avatar size="xl" initials="MR" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['icon-fallback']?.title ?? 'Icon Fallback'}>
        <DocText>
          {pt?.sections?.['icon-fallback']?.texts?.[0] ??
            'An icon is displayed when neither image nor initials are available.'}
        </DocText>
        <Showcase
          code={`<Avatar size="sm" icon={<User />} />
<Avatar size="md" icon={<User />} />
<Avatar size="lg" icon={<User />} />
<Avatar size="xl" icon={<User />} />`}
        >
          <Avatar size="sm" icon={<User />} />
          <Avatar size="md" icon={<User />} />
          <Avatar size="lg" icon={<User />} />
          <Avatar size="xl" icon={<User />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-status']?.title ?? 'Status Indicator'}>
        <DocText>
          {pt?.sections?.['with-status']?.texts?.[0] ??
            'A status dot on the bottom-right corner indicates online presence.'}
        </DocText>
        <Showcase
          code={`<Avatar size="sm" initials="JD" showStatus />
<Avatar size="md" src="/avatar.jpg" alt="User" showStatus />
<Avatar size="lg" initials="AB" showStatus />
<Avatar size="xl" src="/avatar.jpg" alt="User" showStatus />`}
        >
          <Avatar size="sm" initials="JD" showStatus />
          <Avatar
            size="md"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
            showStatus
          />
          <Avatar size="lg" initials="AB" showStatus />
          <Avatar
            size="xl"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
            showStatus
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-status-icons']?.title ?? 'Status with Content'}>
        <DocText>
          {pt?.sections?.['custom-status-icons']?.texts?.[0] ??
            'Replace the status dot with custom icons for richer status indicators.'}
        </DocText>
        <Showcase
          code={`<Avatar size="md" src="/avatar.jpg" statusContent={<Camera />} statusColor="var(--primary)" />
<Avatar size="lg" initials="AB" statusContent={<Shield />} statusColor="var(--warning)" />
<Avatar size="xl" src="/avatar.jpg" statusContent={<Star />} statusColor="var(--error)" />`}
        >
          <Avatar
            size="md"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
            statusContent={<Camera />}
            statusColor="var(--primary)"
          />
          <Avatar size="lg" initials="AB" statusContent={<Shield />} statusColor="var(--warning)" />
          <Avatar
            size="xl"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
            statusContent={<Star />}
            statusColor="var(--error)"
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-status-colors']?.title ?? 'Status Colors'}>
        <DocText>
          {pt?.sections?.['custom-status-colors']?.texts?.[0] ??
            'Change the status dot color to represent different states.'}
        </DocText>
        <Showcase
          code={`<Avatar size="lg" initials="ON" showStatus />
<Avatar size="lg" initials="AW" showStatus statusColor="var(--warning)" />
<Avatar size="lg" initials="OF" showStatus statusColor="var(--error)" />
<Avatar size="lg" initials="ID" showStatus statusColor="var(--muted-foreground)" />`}
        >
          <Avatar size="lg" initials="ON" showStatus />
          <Avatar size="lg" initials="AW" showStatus statusColor="var(--warning)" />
          <Avatar size="lg" initials="OF" showStatus statusColor="var(--error)" />
          <Avatar size="lg" initials="ID" showStatus statusColor="var(--muted-foreground)" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['animated']?.title ?? 'Animated'}>
        <DocText>
          {pt?.sections?.['animated']?.texts?.[0] ?? 'Enable hover animation with a subtle lift and scale effect.'}
        </DocText>
        <Showcase
          code={`<Avatar size="md" initials="JD" animated />
<Avatar size="lg" src="/avatar.jpg" alt="User" animated showStatus />
<Avatar size="xl" initials="AB" animated />`}
        >
          <Avatar size="md" initials="JD" animated />
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80"
            alt="User"
            animated
            showStatus
          />
          <Avatar size="xl" initials="AB" animated />
        </Showcase>
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
              type: 'string',
              default: '-',
              description:
                pt?.props?.['src'] ?? 'URL of the image to display. Falls back to initials or icon on error.',
            },
            {
              name: 'alt',
              type: 'string',
              default: '-',
              description: pt?.props?.['alt'] ?? 'Accessible alt text for the image.',
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
              name: 'showStatus',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['showStatus'] ?? 'Renders a status dot in the bottom-right corner.',
            },
            {
              name: 'statusContent',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['statusContent'] ??
                'Custom content inside the status badge. Automatically shows the badge when provided.',
            },
            {
              name: 'statusColor',
              type: 'string',
              default: '"var(--success)"',
              description: pt?.props?.['statusColor'] ?? 'Background color for the status badge.',
            },
            {
              name: 'animated',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['animated'] ?? 'Enables a subtle hover animation (lift and scale).',
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
