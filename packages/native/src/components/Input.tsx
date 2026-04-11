import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, type TextInputProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';

/** Size variant of the Input component. */
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends TextInputProps {
  /** Controls the height and font size of the input element. */
  size?: InputSize;
  /** Label text displayed above the input. */
  label?: string;
  /** Helper text displayed below the input when there is no error. */
  helperText?: string;
  /** When true, applies error styling to the input. */
  error?: boolean;
  /** Error message displayed below the input when `error` is true. */
  errorMessage?: string;
  /** Icon rendered inside the left side of the input. */
  leftIcon?: React.ReactNode;
  /** Icon rendered inside the right side of the input. */
  rightIcon?: React.ReactNode;
  /** Button element rendered flush to the right side of the input (overrides rightIcon). */
  rightButton?: React.ReactNode;
  /** Custom style for the outer container wrapping label, input row, and helper/error text. */
  containerStyle?: ViewStyle;
}

const tokens = componentTokens.input.md;

const sizeConfig: Record<
  InputSize,
  { height: number; fontSize: number; paddingHorizontal: number; iconSize: number; iconPadding: number }
> = {
  sm: {
    height: componentTokens.input.sm.height,
    fontSize: componentTokens.input.sm.fontSize,
    paddingHorizontal: componentTokens.input.sm.paddingX,
    iconSize: componentTokens.input.sm.iconSize,
    iconPadding: componentTokens.input.sm.iconPadding,
  },
  md: {
    height: tokens.height,
    fontSize: tokens.fontSize,
    paddingHorizontal: tokens.paddingX,
    iconSize: tokens.iconSize,
    iconPadding: tokens.iconPadding,
  },
  lg: {
    height: componentTokens.input.lg.height,
    fontSize: componentTokens.input.lg.fontSize,
    paddingHorizontal: componentTokens.input.lg.paddingX,
    iconSize: componentTokens.input.lg.iconSize,
    iconPadding: componentTokens.input.lg.iconPadding,
  },
};

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      helperText,
      error,
      errorMessage,
      leftIcon,
      rightIcon,
      rightButton,
      containerStyle,
      style,
      editable = true,
      size: sizeProp = 'md',
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const disabled = editable === false;
    const [focused, setFocused] = useState(false);
    const size = sizeConfig[sizeProp];

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
          {leftIcon && <View style={[styles.iconLeft, { top: (size.height - size.iconSize) / 2 }]}>{leftIcon}</View>}
          <TextInput
            ref={ref}
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
                height: size.height,
                paddingHorizontal: size.paddingHorizontal,
                fontSize: size.fontSize,
                color: theme.colors.foreground,
                backgroundColor: theme.colors.inputBg,
                borderColor,
              },
              leftIcon ? { paddingLeft: size.iconPadding } : undefined,
              rightIcon && !rightButton ? { paddingRight: size.iconPadding } : undefined,
              rightButton ? { paddingRight: size.height + 8 } : undefined,
              disabled ? styles.disabled : undefined,
              style,
            ]}
            {...props}
          />
          {rightButton ? (
            <View style={[styles.rightButton, { top: 4, bottom: 4 }]}>{rightButton}</View>
          ) : rightIcon ? (
            <View style={[styles.iconRight, { top: (size.height - size.iconSize) / 2 }]}>{rightIcon}</View>
          ) : null}
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
Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: { gap: 8, width: '100%' },
  label: { fontSize: 14, fontWeight: '500' },
  inputRow: { position: 'relative' },
  input: {
    borderWidth: 1,
    borderRadius: tokens.borderRadius,
    outlineWidth: 0,
  },
  iconLeft: { position: 'absolute', left: 12, zIndex: 1 },
  iconRight: { position: 'absolute', right: 12, zIndex: 1 },
  rightButton: { position: 'absolute', right: 6, zIndex: 1, justifyContent: 'center' },
  helperText: { fontSize: 12 },
  disabled: { opacity: 0.5 },
});
