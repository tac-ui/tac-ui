import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useTacNativeTheme,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  VStack,
  HStack,
  Badge,
  Divider,
} from '@tac-ui/native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Section } from '../components/Section';

const categories = [
  {
    key: 'actions',
    title: 'Actions',
    description: 'Button, Dropdown',
    screen: 'ButtonScreen',
    count: 2,
  },
  {
    key: 'form',
    title: 'Form',
    description: 'Input, Select, Checkbox, Switch and more',
    screen: 'InputScreen',
    count: 12,
  },
  {
    key: 'data-display',
    title: 'Data Display',
    description: 'Badge, Avatar, Card, Table and more',
    screen: 'BadgeScreen',
    count: 10,
  },
  {
    key: 'feedback',
    title: 'Feedback',
    description: 'Alert, Snackbar, Toast, Divider',
    screen: 'AlertScreen',
    count: 4,
  },
  {
    key: 'navigation',
    title: 'Navigation',
    description: 'Tabs, Accordion, Stepper, FloatingMenuBar',
    screen: 'TabsScreen',
    count: 5,
  },
  {
    key: 'overlay',
    title: 'Overlay',
    description: 'Dialog',
    screen: 'DialogScreen',
    count: 1,
  },
  {
    key: 'layout',
    title: 'Layout',
    description: 'VStack, HStack',
    screen: 'StackScreen',
    count: 1,
  },
];

const stats = [
  { label: 'Components', value: '35+' },
  { label: 'Tokens', value: '100+' },
  { label: 'Themes', value: '2' },
  { label: 'Platforms', value: 'iOS · Android' },
];

const features = [
  {
    title: 'Design Tokens',
    description: 'Shared color, spacing, typography, and motion tokens via @tac-ui/tokens/native.',
  },
  {
    title: 'Spring Physics',
    description: 'Every interaction has mass and momentum — buttons scale, alerts slide, toggles snap.',
  },
  {
    title: 'Dark Mode',
    description: 'Built-in light, dark, and system theme support via TacNativeProvider.',
  },
  {
    title: 'Cross-Platform',
    description: 'Same design language shared with @tac-ui/web — consistent on every screen.',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { theme, mode, toggleMode } = useTacNativeTheme();

  return (
    <ScreenLayout
      title="Tac UI Native"
      description="A cross-platform design system for React Native. 35+ components with shared design tokens, spring animations, and full dark mode support."
    >
      {/* Stats Row */}
      <View style={[styles.statsRow, { borderColor: theme.colors.border }]}>
        {stats.map((stat, i) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.foreground }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.mutedForeground }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <HStack gap="sm">
        <Button variant="primary" size="sm" onPress={() => navigation.navigate('ButtonScreen')} style={{ flex: 1 }}>
          Explore Components
        </Button>
        <Button variant="outline" size="sm" onPress={toggleMode} style={{ flex: 1 }}>
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </HStack>

      {/* Features */}
      <Section title="Features">
        <VStack gap="sm">
          {features.map((feature) => (
            <Card key={feature.title} variant="flat">
              <CardHeader>
                <CardTitle style={{ fontSize: 15 }}>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </VStack>
      </Section>

      <Divider />

      {/* Component Categories */}
      <Section title="Components">
        <VStack gap="sm">
          {categories.map((category) => (
            <Pressable key={category.key} onPress={() => navigation.navigate(category.screen)}>
              <Card>
                <CardHeader>
                  <HStack gap="sm" align="center" justify="between" style={{ width: '100%' }}>
                    <VStack gap="xs" style={{ flex: 1 }}>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </VStack>
                    <Badge>{String(category.count)}</Badge>
                  </HStack>
                </CardHeader>
              </Card>
            </Pressable>
          ))}
        </VStack>
      </Section>

      {/* Quick Start */}
      <Section title="Quick Start">
        <Card variant="flat">
          <CardHeader>
            <CardTitle style={{ fontSize: 14, fontFamily: 'monospace' }}>Install</CardTitle>
            <CardDescription style={{ fontFamily: 'monospace', fontSize: 13 }}>
              pnpm add @tac-ui/native @tac-ui/tokens @tac-ui/icon-native
            </CardDescription>
          </CardHeader>
        </Card>
        <View style={{ height: 8 }} />
        <Card variant="flat">
          <CardHeader>
            <CardTitle style={{ fontSize: 14, fontFamily: 'monospace' }}>Usage</CardTitle>
            <CardDescription style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 20 }}>
              {
                "import { TacNativeProvider, Button }\n  from '@tac-ui/native';\n\n<TacNativeProvider>\n  <Button>Hello</Button>\n</TacNativeProvider>"
              }
            </CardDescription>
          </CardHeader>
        </Card>
      </Section>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statItem: {
    width: '50%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
