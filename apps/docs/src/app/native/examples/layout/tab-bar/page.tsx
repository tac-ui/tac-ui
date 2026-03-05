'use client';

import React from 'react';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, PreviewCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { usePageTranslation } from '@/i18n';

export default function NativeLayoutTabBarPage() {
  const pt = usePageTranslation('native-layout-tab-bar');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Tab Bar Layout'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A common mobile layout with a floating bottom navigation bar and scrollable content area. The FloatingMenuBar sits above the content with spring-animated tab switching.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['full-screen-layout']?.title ?? 'Full Screen Layout'}>
        <DocText>
          {pt?.sections?.['full-screen-layout']?.texts?.[0] ??
            'The most common mobile app layout — a full-screen content area with a floating bottom tab bar.'}
        </DocText>
        <PreviewCode
          code={`import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { FloatingMenuBar, Card, CardTitle, CardContent, VStack } from '@tac-ui/native';
import { Home, Search, Bell, User } from '@tac-ui/icon-native';

const tabs = [
  { key: 'home', icon: (p) => <Home {...p} />, label: 'Home' },
  { key: 'search', icon: (p) => <Search {...p} />, label: 'Search' },
  { key: 'inbox', icon: (p) => <Bell {...p} />, label: 'Inbox', badge: 5 },
  { key: 'profile', icon: (p) => <User {...p} />, label: 'Profile' },
];

export default function TabBarScreen() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        <VStack gap="md">
          <Card>
            <CardTitle>Welcome</CardTitle>
            <CardContent>
              <Text>Your main content goes here.</Text>
            </CardContent>
          </Card>
          {/* More cards... */}
        </VStack>
      </ScrollView>

      <FloatingMenuBar
        items={tabs}
        activeKey={activeTab}
        onSelect={setActiveTab}
      />
    </View>
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['glass-variant']?.title ?? 'Glass Variant with Background'}>
        <DocText>
          {pt?.sections?.['glass-variant']?.texts?.[0] ??
            'Use the glass variant for a frosted navigation bar that blends with rich content backgrounds like maps or images.'}
        </DocText>
        <PreviewCode
          code={`export default function GlassTabBarScreen() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={{ flex: 1 }}>
      {/* Background content (e.g., map, image feed) */}
      <Image
        source={{ uri: 'https://example.com/bg.jpg' }}
        style={StyleSheet.absoluteFill}
      />

      <FloatingMenuBar
        items={tabs}
        activeKey={activeTab}
        onSelect={setActiveTab}
        glass
      />
    </View>
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['screen-switching']?.title ?? 'With Screen Switching'}>
        <DocText>
          {pt?.sections?.['screen-switching']?.texts?.[0] ??
            'Combine with conditional rendering or a navigation library to switch between screen content based on the active tab.'}
        </DocText>
        <PreviewCode
          code={`function TabBarApp() {
  const [tab, setTab] = useState('home');

  const screens: Record<string, React.ReactNode> = {
    home: <HomeScreen />,
    search: <SearchScreen />,
    inbox: <InboxScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <View style={{ flex: 1 }}>
      {screens[tab]}
      <FloatingMenuBar
        items={tabs}
        activeKey={tab}
        onSelect={setTab}
      />
    </View>
  );
}`}
        />
      </DocSection>
    </DocPage>
  );
}
