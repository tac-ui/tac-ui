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
import '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

export default function NativeFloatingMenuBarPage() {
  const pt = usePageTranslation('native-floating-menu-bar');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'FloatingMenuBar'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A floating bottom navigation bar for mobile apps. Supports animated tab selection, icon badges, and glass-style backgrounds.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { FloatingMenuBar } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['basic-usage']?.title ?? 'Basic Usage'}>
        <DocText>
          {pt?.sections?.['basic-usage']?.texts?.[0] ??
            'Define menu items with key, icon render function, and label. The active tab animates with spring physics.'}
        </DocText>
        <NativeShowcase
          code={`import { Home, Search, Bell, User } from '@tac-ui/icon-native';

const items = [
  { key: 'home', icon: (p) => <Home {...p} />, label: 'Home' },
  { key: 'search', icon: (p) => <Search {...p} />, label: 'Search' },
  { key: 'inbox', icon: (p) => <Bell {...p} />, label: 'Inbox', badge: 3 },
  { key: 'profile', icon: (p) => <User {...p} />, label: 'Profile' },
];

<FloatingMenuBar
  items={items}
  activeKey="home"
  onSelect={(key) => setActiveKey(key)}
/>`}
        >
          <DocText>
            FloatingMenuBar is positioned absolutely at the bottom of its container. Wrap your screen content and the
            menu bar in a flex container.
          </DocText>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['glass']?.title ?? 'Glass Variant'}>
        <DocText>
          {pt?.sections?.['glass']?.texts?.[0] ??
            'Use the glass prop for a translucent frosted background that blends with content behind it.'}
        </DocText>
        <NativeShowcase
          code={`<FloatingMenuBar
  items={items}
  activeKey="home"
  onSelect={setActiveKey}
  glass
/>`}
        >
          <DocText>The glass variant uses a semi-transparent background, ideal for overlaying rich content.</DocText>
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'items',
              type: 'FloatingMenuBarItem[]',
              default: '-',
              description: pt?.props?.['items'] ?? 'Array of menu items with key, icon, label, and optional badge.',
            },
            {
              name: 'activeKey',
              type: 'string',
              default: '-',
              description: pt?.props?.['activeKey'] ?? 'Key of the currently active tab.',
            },
            {
              name: 'onSelect',
              type: '(key: string) => void',
              default: '-',
              description: pt?.props?.['onSelect'] ?? 'Called when a menu item is pressed.',
            },
            {
              name: 'glass',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['glass'] ?? 'Uses a translucent glass-style background.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['item-type']?.title ?? 'FloatingMenuBarItem'}>
        <PropsTable
          data={[
            {
              name: 'key',
              type: 'string',
              default: '-',
              description: pt?.props?.['key'] ?? 'Unique identifier for the tab.',
            },
            {
              name: 'icon',
              type: '(props: { color, size }) => ReactNode',
              default: '-',
              description: pt?.props?.['icon'] ?? 'Icon render function receiving color and size.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Text label shown below the icon.',
            },
            {
              name: 'badge',
              type: 'number',
              default: '-',
              description: pt?.props?.['badge'] ?? 'Badge count displayed on the icon.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
