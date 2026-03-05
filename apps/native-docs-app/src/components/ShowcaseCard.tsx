import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTacNativeTheme, Divider } from '@tac-ui/native';
import { CodePreview } from './CodePreview';

interface ShowcaseCardProps {
  code: string;
  children: React.ReactNode;
}

export function ShowcaseCard({ code, children }: ShowcaseCardProps) {
  const { theme } = useTacNativeTheme();
  const [showCode, setShowCode] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.preview}>{children}</View>
      <Divider />
      <Pressable style={styles.toggleButton} onPress={() => setShowCode(!showCode)}>
        <Text style={[styles.toggleText, { color: theme.colors.mutedForeground }]}>
          {showCode ? 'Hide Code' : 'View Code'}
        </Text>
      </Pressable>
      {showCode && (
        <>
          <Divider />
          <CodePreview code={code} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  preview: {
    padding: 16,
    gap: 12,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
