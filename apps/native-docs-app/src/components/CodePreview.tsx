import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTacNativeTheme } from '@tac-ui/native';

interface CodePreviewProps {
  code: string;
}

export function CodePreview({ code }: CodePreviewProps) {
  const { theme } = useTacNativeTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { backgroundColor: theme.colors.muted }]}
    >
      <View style={styles.codeWrapper}>
        <Text style={[styles.codeText, { color: theme.colors.foreground }]}>{code.trim()}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
  },
  codeWrapper: {
    padding: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12.5,
    lineHeight: 20,
  },
});
