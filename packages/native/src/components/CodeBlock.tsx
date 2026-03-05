import React, { forwardRef, useRef, useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, Animated, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { duration } from '../constants/motion';

// Lazily resolve clipboard module — if neither package is installed, copyFn is null.
let copyFn: ((text: string) => Promise<void>) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('expo-clipboard');
  const setStringAsync = mod?.setStringAsync ?? mod?.default?.setStringAsync;
  if (typeof setStringAsync === 'function') {
    copyFn = (text: string) => setStringAsync(text);
  }
} catch {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('@react-native-clipboard/clipboard');
    const Clipboard = mod?.default ?? mod;
    if (typeof Clipboard?.setString === 'function') {
      copyFn = (text: string) => {
        Clipboard.setString(text);
        return Promise.resolve();
      };
    }
  } catch {
    // neither clipboard package available — copy button will be hidden
  }
}

/** Props for the CodeBlock component. */
export interface CodeBlockProps extends ViewProps {
  /** The source code string to display. */
  code: string;
  /**
   * Optional language label shown in the top-left corner.
   * No syntax highlighting is applied — this is display-only.
   */
  language?: string;
  /**
   * When true, uses a semi-transparent (glass) background instead of
   * the solid foreground color.
   */
  glass?: boolean;
  style?: ViewStyle;
}

const BORDER_RADIUS = 12;
const PADDING = 16;
const COPY_FEEDBACK_DURATION = 1500;

export const CodeBlock = forwardRef<View, CodeBlockProps>(({ code, language, glass = false, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isCopied, setIsCopied] = useState(false);

  const bg = glass ? 'rgba(0, 0, 0, 0.55)' : (theme.colors.card as string);
  const textColor = theme.colors.background;
  const labelColor = glass ? 'rgba(255, 255, 255, 0.55)' : (theme.colors.mutedForeground ?? theme.colors.background);
  const copyButtonBg = glass ? 'rgba(255, 255, 255, 0.15)' : 'rgba(128, 128, 128, 0.25)';

  const showFeedback = useCallback(() => {
    setIsCopied(true);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: duration.fast, useNativeDriver: true }),
      Animated.delay(COPY_FEEDBACK_DURATION - 300),
      Animated.timing(fadeAnim, { toValue: 0, duration: duration.fast, useNativeDriver: true }),
    ]).start(() => setIsCopied(false));
  }, [fadeAnim]);

  const handleCopy = useCallback(async () => {
    if (!copyFn) return;
    try {
      await copyFn(code);
      showFeedback();
    } catch {
      // clipboard write failed silently
    }
  }, [code, showFeedback]);

  return (
    <View ref={ref} style={[styles.wrapper, { backgroundColor: bg, borderRadius: BORDER_RADIUS }, style]} {...props}>
      {/* Header row: language label + copy button */}
      <View style={styles.header}>
        {language ? <Text style={[styles.languageLabel, { color: labelColor }]}>{language}</Text> : <View />}

        {copyFn !== null && (
          <Pressable
            onPress={handleCopy}
            style={({ pressed }) => [
              styles.copyButton,
              { backgroundColor: copyButtonBg },
              pressed && styles.copyButtonPressed,
            ]}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            accessibilityLabel="Copy code"
            accessibilityRole="button"
          >
            {isCopied ? (
              <Animated.Text style={[styles.copyText, { color: textColor, opacity: fadeAnim }]}>✓ Copied</Animated.Text>
            ) : (
              <Text style={[styles.copyText, { color: labelColor }]}>Copy</Text>
            )}
          </Pressable>
        )}
      </View>

      {/* Code body */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.code, { color: textColor }]} selectable>
          {code}
        </Text>
      </ScrollView>
    </View>
  );
});
CodeBlock.displayName = 'CodeBlock';

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    paddingTop: PADDING,
    paddingBottom: PADDING,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING,
    marginBottom: 8,
  },
  languageLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  copyButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  copyButtonPressed: {
    opacity: 0.7,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: PADDING,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
});
