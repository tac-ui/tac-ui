import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FloatingMenuBar, useTacNativeTheme } from '@tac-ui/native';
import { Home, Search, Bell, User } from '@tac-ui/icon-native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

function FloatingMenuBarDemo({ glass }: { glass?: boolean }) {
  const { theme } = useTacNativeTheme();
  const [activeKey, setActiveKey] = useState('home');

  const items = [
    {
      key: 'home',
      icon: ({ color, size }: { color: string; size: number }) => <Home color={color} size={size} />,
      label: 'Home',
    },
    {
      key: 'search',
      icon: ({ color, size }: { color: string; size: number }) => <Search color={color} size={size} />,
      label: 'Search',
    },
    {
      key: 'notifications',
      icon: ({ color, size }: { color: string; size: number }) => <Bell color={color} size={size} />,
      label: 'Alerts',
      badge: 3,
    },
    {
      key: 'profile',
      icon: ({ color, size }: { color: string; size: number }) => <User color={color} size={size} />,
      label: 'Profile',
    },
  ];

  return (
    <View style={{ height: 120, position: 'relative' }}>
      <Text
        style={{
          color: theme.colors.mutedForeground,
          fontSize: 13,
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        Active: {activeKey}
      </Text>
      <FloatingMenuBar items={items} activeKey={activeKey} onSelect={setActiveKey} glass={glass} />
    </View>
  );
}

export default function FloatingMenuBarScreen() {
  return (
    <ScreenLayout
      title="FloatingMenuBar"
      description="A floating bottom navigation bar with animated tab indicators and badges."
    >
      <Section title="Import">
        <CodePreview
          code={`import { FloatingMenuBar } from '@tac-ui/native';\nimport type { FloatingMenuBarItem } from '@tac-ui/native';`}
        />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`const [activeKey, setActiveKey] = useState('home');\n\nconst items = [\n  { key: 'home', icon: ({ color, size }) => <Home color={color} size={size} />, label: 'Home' },\n  { key: 'search', icon: ({ color, size }) => <Search color={color} size={size} />, label: 'Search' },\n  { key: 'notifications', icon: ({ color, size }) => <Bell color={color} size={size} />, label: 'Alerts', badge: 3 },\n  { key: 'profile', icon: ({ color, size }) => <User color={color} size={size} />, label: 'Profile' },\n];\n\n<FloatingMenuBar\n  items={items}\n  activeKey={activeKey}\n  onSelect={setActiveKey}\n/>`}
        >
          <FloatingMenuBarDemo />
        </ShowcaseCard>
      </Section>

      <Section title="Glass Style">
        <ShowcaseCard
          code={`<FloatingMenuBar\n  items={items}\n  activeKey={activeKey}\n  onSelect={setActiveKey}\n  glass\n/>`}
        >
          <FloatingMenuBarDemo glass />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'items',
              type: 'FloatingMenuBarItem[]',
              default: '—',
              description: 'Array of menu items with key, icon, label, and optional badge.',
            },
            {
              name: 'activeKey',
              type: 'string',
              default: '—',
              description: 'Key of the currently active menu item.',
            },
            {
              name: 'onSelect',
              type: '(key: string) => void',
              default: '—',
              description: 'Called when a menu item is pressed.',
            },
            {
              name: 'glass',
              type: 'boolean',
              default: 'false',
              description: 'When true, uses a translucent glass-style background.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '—',
              description: 'Additional styles applied to the outer container.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
