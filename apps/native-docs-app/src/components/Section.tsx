import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTacNativeTheme, VStack } from '@tac-ui/native';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Section({ title, description, children }: SectionProps) {
  const { theme } = useTacNativeTheme();

  return (
    <View>
      <Text style={[styles.title, { color: theme.colors.foreground }]}>{title}</Text>
      {description && <Text style={[styles.description, { color: theme.colors.mutedForeground }]}>{description}</Text>}
      <VStack gap="sm" style={{ marginTop: 12 }}>
        {children}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
});
