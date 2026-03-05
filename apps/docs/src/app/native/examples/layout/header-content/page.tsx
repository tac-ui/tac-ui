'use client';

import React from 'react';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, PreviewCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { usePageTranslation } from '@/i18n';

export default function NativeLayoutHeaderContentPage() {
  const pt = usePageTranslation('native-layout-header-content');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Header + Content Layout'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A standard mobile layout with a fixed header bar and scrollable content below. The header provides navigation context while content scrolls independently.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['basic-header']?.title ?? 'Basic Header + Scroll'}>
        <DocText>
          {pt?.sections?.['basic-header']?.texts?.[0] ??
            'A fixed header with title, back button, and action buttons above a scrollable content area.'}
        </DocText>
        <PreviewCode
          code={`import { View, ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useTacNativeTheme, VStack, Card, CardTitle, Divider } from '@tac-ui/native';
import { ArrowLeft, Settings } from '@tac-ui/icon-native';

export default function HeaderContentScreen() {
  const { theme } = useTacNativeTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Fixed Header */}
      <View style={{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
      }}>
        <Pressable hitSlop={8}>
          <ArrowLeft size={20} color={theme.colors.foreground} />
        </Pressable>
        <Text style={{
          flex: 1,
          fontSize: 17,
          fontWeight: '600',
          color: theme.colors.foreground,
          textAlign: 'center',
        }}>
          Settings
        </Text>
        <Pressable hitSlop={8}>
          <Settings size={20} color={theme.colors.foreground} />
        </Pressable>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <VStack gap="md">
          <Card><CardTitle>Account</CardTitle></Card>
          <Card><CardTitle>Notifications</CardTitle></Card>
          <Card><CardTitle>Privacy</CardTitle></Card>
          <Card><CardTitle>About</CardTitle></Card>
        </VStack>
      </ScrollView>
    </View>
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['collapsible-header']?.title ?? 'Collapsible Header'}>
        <DocText>
          {pt?.sections?.['collapsible-header']?.texts?.[0] ??
            'A large title header that collapses on scroll, transitioning from a prominent display to a compact bar.'}
        </DocText>
        <PreviewCode
          code={`import { Animated, ScrollView, View, Text } from 'react-native';
import { useTacNativeTheme } from '@tac-ui/native';

const HEADER_MAX = 120;
const HEADER_MIN = 56;

export default function CollapsibleHeaderScreen() {
  const { theme } = useTacNativeTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX - HEADER_MIN],
    outputRange: [HEADER_MAX, HEADER_MIN],
    extrapolate: 'clamp',
  });

  const titleSize = scrollY.interpolate({
    inputRange: [0, HEADER_MAX - HEADER_MIN],
    outputRange: [28, 17],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={{
        height: headerHeight,
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.border,
      }}>
        <Animated.Text style={{
          fontSize: titleSize,
          fontWeight: '700',
          color: theme.colors.foreground,
        }}>
          Discover
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Content */}
      </Animated.ScrollView>
    </View>
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['full-app-shell']?.title ?? 'Header + Content + FloatingMenuBar'}>
        <DocText>
          {pt?.sections?.['full-app-shell']?.texts?.[0] ??
            'Combine the header layout with a floating bottom navigation for a complete app shell.'}
        </DocText>
        <PreviewCode
          code={`export default function AppShellScreen() {
  const [tab, setTab] = useState('home');

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={headerStyles}>
        <Text style={titleStyle}>My App</Text>
      </View>

      {/* Screen Content */}
      <ScrollView contentContainerStyle={{
        padding: 16,
        paddingBottom: 100, // space for FloatingMenuBar
      }}>
        {/* ... */}
      </ScrollView>

      {/* Bottom Navigation */}
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
