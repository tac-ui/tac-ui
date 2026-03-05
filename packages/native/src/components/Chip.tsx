import React, { forwardRef, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { duration, springConfigs } from '../constants/motion';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';
import type { ThemeColors } from '@tac-ui/shared';

export type ChipVariant = 'filter' | 'assist' | 'suggestion' | 'input' | 'glass';

export interface ChipProps extends Omit<ViewProps, 'children'> {
  variant?: ChipVariant;
  selected?: boolean;
  /** When true, reduces opacity and disables all press interactions. */
  disabled?: boolean;
  onPress?: () => void;
  onDismiss?: () => void;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
}

function getVariantStyles(
  variant: ChipVariant,
  selected: boolean,
  colors: ThemeColors,
): { container: ViewStyle; text: TextStyle } {
  if (selected) {
    return {
      container: { backgroundColor: colors.point, borderColor: colors.point },
      text: { color: colors.pointForeground },
    };
  }
  switch (variant) {
    case 'filter':
      return {
        container: { backgroundColor: 'transparent', borderColor: colors.border },
        text: { color: colors.point },
      };
    case 'assist':
      return {
        container: { backgroundColor: colors.secondary, borderColor: colors.border },
        text: { color: colors.foreground },
      };
    case 'suggestion':
      return {
        container: { backgroundColor: 'transparent', borderColor: colors.border, borderStyle: 'dashed' },
        text: { color: colors.mutedForeground },
      };
    case 'input':
      return {
        container: { backgroundColor: colors.secondary + '80', borderColor: colors.border },
        text: { color: colors.foreground },
      };
    case 'glass':
      return {
        container: { backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.12)' },
        text: { color: colors.foreground },
      };
  }
}

const tokens = componentTokens.chip;

export const Chip = forwardRef<View, ChipProps>(
  (
    { variant = 'filter', selected = false, disabled = false, onPress, onDismiss, leftIcon, children, style, ...props },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const variantStyles = getVariantStyles(variant, selected, theme.colors);

    const pressScale = useRef(new Animated.Value(1)).current;
    const dismissScale = useRef(new Animated.Value(1)).current;
    const dismissOpacity = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      if (disabled) return;
      Animated.spring(pressScale, { toValue: 0.98, ...springConfigs.light, useNativeDriver: true }).start();
    };
    const handlePressOut = () => {
      Animated.spring(pressScale, { toValue: 1, ...springConfigs.light, useNativeDriver: true }).start();
    };

    const handleDismiss = () => {
      if (disabled || !onDismiss) return;
      Animated.parallel([
        Animated.timing(dismissScale, {
          toValue: 0.8,
          duration: duration.fast,
          useNativeDriver: true,
        }),
        Animated.timing(dismissOpacity, {
          toValue: 0,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss();
      });
    };

    return (
      <Animated.View
        style={{ transform: [{ scale: Animated.multiply(pressScale, dismissScale) }], opacity: dismissOpacity }}
      >
        <Pressable
          ref={ref}
          disabled={disabled}
          onPress={disabled ? undefined : onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.base,
            variantStyles.container,
            { borderWidth: 1 },
            pressed && !disabled && { opacity: 0.8 },
            disabled && styles.disabled,
            style as ViewStyle,
          ]}
          {...props}
        >
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          {typeof children === 'string' ? <Text style={[styles.text, variantStyles.text]}>{children}</Text> : children}
          {onDismiss && (
            <Pressable onPress={handleDismiss} disabled={disabled} hitSlop={8}>
              <Text style={[{ fontSize: 14, fontWeight: '500' }, variantStyles.text]}>×</Text>
            </Pressable>
          )}
        </Pressable>
      </Animated.View>
    );
  },
);
Chip.displayName = 'Chip';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.paddingX,
    paddingVertical: tokens.paddingY,
    borderRadius: tokens.borderRadius,
    gap: 6,
  },
  text: { fontSize: tokens.fontSize, fontWeight: '500' },
  icon: { flexShrink: 0 },
  disabled: { opacity: 0.5 },
});
