import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTacNativeTheme, VStack } from '@tac-ui/native';

interface ScreenLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ScreenLayout({ title, description, children }: ScreenLayoutProps) {
  const { theme } = useTacNativeTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: theme.colors.mutedForeground }]}>{description}</Text>
        )}
      </View>
      <VStack gap="xl">{children}</VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
});
