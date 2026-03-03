'use client';

import React from 'react';
import { Camera, Shield, Star } from '@tac-ui/icon';
import { Avatar } from '@tac-ui/web';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';
import { usePageTranslation } from '@/i18n';

export default function AvatarPage() {
  const pt = usePageTranslation('avatar');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Avatar'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Displays a user image, initials, or icon in a circular frame with optional status indicator.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['sizes-with-image']?.title ?? 'Sizes with Image'}>
        <DocText>{pt?.sections?.['sizes-with-image']?.texts?.[0] ?? 'All four sizes using an image source.'}</DocText>
        <Showcase
          code={`<Avatar size="sm" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
<Avatar size="md" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
<Avatar size="lg" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
<Avatar size="xl" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />`}
        >
          <Avatar size="sm" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
          <Avatar size="md" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
          <Avatar size="lg" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
          <Avatar size="xl" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['initials']?.title ?? 'Initials'}>
        <DocText>{pt?.sections?.['initials']?.texts?.[0] ?? 'Fallback to initials when no image is provided.'}</DocText>
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

      <DocSection title={pt?.sections?.['with-status']?.title ?? 'With Status'}>
        <DocText>{pt?.sections?.['with-status']?.texts?.[0] ?? 'Show an online status indicator in the bottom-right corner.'}</DocText>
        <Showcase
          code={`<Avatar size="md" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" showStatus />
<Avatar size="lg" initials="AB" showStatus />
<Avatar size="xl" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" showStatus />`}
        >
          <Avatar size="md" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" showStatus />
          <Avatar size="lg" initials="AB" showStatus />
          <Avatar size="xl" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" showStatus />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-status-icons']?.title ?? 'Custom Status Icons'}>
        <DocText>{pt?.sections?.['custom-status-icons']?.texts?.[0] ?? 'Replace the default status dot with custom icons or change the status color.'}</DocText>
        <Showcase
          code={`<Avatar size="lg" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" statusContent={<Camera />} statusColor="var(--primary)" />
<Avatar size="lg" initials="AB" statusContent={<Shield />} statusColor="var(--warning)" />
<Avatar size="xl" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" statusContent={<Star />} statusColor="var(--error)" />`}
        >
          <Avatar size="lg" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" statusContent={<Camera />} statusColor="var(--primary)" />
          <Avatar size="lg" initials="AB" statusContent={<Shield />} statusColor="var(--warning)" />
          <Avatar size="xl" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" statusContent={<Star />} statusColor="var(--error)" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-status-colors']?.title ?? 'Custom Status Colors'}>
        <DocText>{pt?.sections?.['custom-status-colors']?.texts?.[0] ?? 'Change the status dot color without a custom icon.'}</DocText>
        <Showcase
          code={`<Avatar size="lg" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" showStatus />
<Avatar size="lg" initials="AB" showStatus statusColor="var(--warning)" />
<Avatar size="lg" initials="CK" showStatus statusColor="var(--error)" />`}
        >
          <Avatar size="lg" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=256&h=256&q=80" alt="User" showStatus />
          <Avatar size="lg" initials="AB" showStatus statusColor="var(--warning)" />
          <Avatar size="lg" initials="CK" showStatus statusColor="var(--error)" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'src',
              type: 'string',
              default: '-',
              description: pt?.props?.['src'] ?? 'URL of the image to display. Falls back to initials or icon on error.',
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
              name: 'size',
              type: '"sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: pt?.props?.['size'] ?? 'Size of the avatar.',
            },
            {
              name: 'showStatus',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['showStatus'] ?? 'When true, renders a green online status dot in the bottom-right corner.',
            },
            {
              name: 'statusContent',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['statusContent'] ?? 'Custom content (icon or image) inside the status badge. When provided, the status badge is shown automatically.',
            },
            {
              name: 'statusColor',
              type: 'string',
              default: '"var(--success)"',
              description: pt?.props?.['statusColor'] ?? 'Custom background color for the status badge.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['icon'] ?? 'Icon node shown when no image or initials are available.',
            },
            {
              name: 'animated',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['animated'] ?? 'When true, enables a subtle hover animation (slight lift and scale).',
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
