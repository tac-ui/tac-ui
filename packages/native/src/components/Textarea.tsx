import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, type TextInputProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';

/** Size variant of the Textarea component. */
export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends TextInputProps {
  /** Controls the padding and font size of the textarea element. */
  size?: TextareaSize;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  rows?: number;
}

const tokens = componentTokens.input.md;

const sizeConfig: Record<
  TextareaSize,
  { fontSize: number; paddingHorizontal: number; paddingVertical: number; minHeight: number }
> = {
  sm: {
    fontSize: componentTokens.input.sm.fontSize,
    paddingHorizontal: componentTokens.input.sm.paddingX,
    paddingVertical: 8,
    minHeight: 60,
  },
  md: {
    fontSize: tokens.fontSize,
    paddingHorizontal: tokens.paddingX,
    paddingVertical: 12,
    minHeight: 80,
  },
  lg: {
    fontSize: componentTokens.input.lg.fontSize,
    paddingHorizontal: componentTokens.input.lg.paddingX,
    paddingVertical: 14,
    minHeight: 100,
  },
};

export const Textarea = forwardRef<TextInput, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      errorMessage,
      containerStyle,
      rows = 4,
      size: sizeProp = 'md',
      style,
      editable = true,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const disabled = editable === false;
    const size = sizeConfig[sizeProp];
    const minHeight = Math.max(size.minHeight, rows * 20 + size.paddingVertical * 2);
    const [focused, setFocused] = useState(false);

    const borderColor = error ? theme.colors.error : focused ? theme.colors.ring : theme.colors.inputBorderRest;

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={[styles.label, { color: theme.colors.foreground }]}>{label}</Text>}
        <View style={styles.inputRow}>
          {focused && (
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                {
                  top: -3,
                  left: -3,
                  right: -3,
                  bottom: -3,
                  borderWidth: 3,
                  borderColor: error ? theme.colors.error : theme.colors.ring,
                  borderRadius: tokens.borderRadius + 2,
                  opacity: 0.2, // Simulate web's focus-visible ring glow
                },
              ]}
            />
          )}
          <TextInput
            ref={ref}
            multiline
            textAlignVertical="top"
            editable={editable}
            placeholderTextColor={theme.colors.mutedForeground}
            onFocus={(e) => {
              setFocused(true);
              onFocusProp?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlurProp?.(e);
            }}
            style={[
              styles.input,
              {
                minHeight,
                paddingHorizontal: size.paddingHorizontal,
                paddingVertical: size.paddingVertical,
                fontSize: size.fontSize,
                color: theme.colors.foreground,
                backgroundColor: theme.colors.inputBg,
                borderColor,
              },
              disabled ? styles.disabled : undefined,
              style,
            ]}
            {...props}
          />
        </View>
        {error && errorMessage && (
          <Text style={[styles.helperText, { color: theme.colors.error }]}>{errorMessage}</Text>
        )}
        {helperText && !error && (
          <Text style={[styles.helperText, { color: theme.colors.mutedForeground }]}>{helperText}</Text>
        )}
      </View>
    );
  },
);
Textarea.displayName = 'Textarea';

const styles = StyleSheet.create({
  container: { gap: 8, width: '100%' },
  label: { fontSize: 14, fontWeight: '500' },
  inputRow: { position: 'relative' },
  input: {
    borderWidth: 1,
    borderRadius: tokens.borderRadius,
    outlineWidth: 0,
  },
  helperText: { fontSize: 12 },
  disabled: { opacity: 0.5 },
});
