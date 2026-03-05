import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import { springConfigs } from '../constants/motion';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';
import type { ThemeColors } from '@tac-ui/shared';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'glass';

export interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  interactive?: boolean;
  onPress?: () => void;
  /** Numeric count to display inside the badge. Animates with a spring scale when changed. */
  count?: number;
  children?: React.ReactNode;
}

function getVariantStyles(variant: BadgeVariant, colors: ThemeColors): { container: ViewStyle; text: TextStyle } {
  switch (variant) {
    case 'default':
    case 'secondary':
      return { container: { backgroundColor: colors.secondary }, text: { color: colors.secondaryForeground } };
    case 'destructive':
      return { container: { backgroundColor: colors.error }, text: { color: colors.primaryForeground } };
    case 'outline':
      return {
        container: { backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.border },
        text: { color: colors.foreground },
      };
    case 'success':
      return { container: { backgroundColor: colors.successBg }, text: { color: colors.successForeground } };
    case 'error':
      return { container: { backgroundColor: colors.errorBg }, text: { color: colors.errorForeground } };
    case 'warning':
      return { container: { backgroundColor: colors.warningBg }, text: { color: colors.warningForeground } };
    case 'info':
      return { container: { backgroundColor: colors.infoBg }, text: { color: colors.infoForeground } };
    case 'glass':
      return {
        container: { backgroundColor: colors.glassBg, borderWidth: 1, borderColor: colors.glassBorder },
        text: { color: colors.foreground },
      };
  }
}

const tokens = componentTokens.badge;

export const Badge = forwardRef<View, BadgeProps>(
  ({ variant = 'default', interactive, onPress, count, children, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const variantStyles = getVariantStyles(variant, theme.colors);

    const scale = useRef(new Animated.Value(1)).current;
    const pressScale = useRef(new Animated.Value(1)).current;
    const prevCount = useRef(count);

    const handlePressIn = useCallback(() => {
      Animated.spring(pressScale, { toValue: 0.98, ...springConfigs.light, useNativeDriver: true }).start();
    }, [pressScale]);
    const handlePressOut = useCallback(() => {
      Animated.spring(pressScale, { toValue: 1, ...springConfigs.light, useNativeDriver: true }).start();
    }, [pressScale]);

    useEffect(() => {
      if (count !== undefined && prevCount.current !== count) {
        prevCount.current = count;
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 1.2,
            useNativeDriver: true,
            friction: 4,
            tension: 200,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            friction: 5,
            tension: 180,
          }),
        ]).start();
      }
    }, [count, scale]);

    const content =
      count !== undefined ? (
        <Animated.View style={{ transform: [{ scale }] }}>
          <Text style={[styles.text, variantStyles.text]}>{count}</Text>
        </Animated.View>
      ) : typeof children === 'string' ? (
        <Text style={[styles.text, variantStyles.text]}>{children}</Text>
      ) : (
        children
      );

    if (interactive || onPress) {
      return (
        <Animated.View style={{ transform: [{ scale: pressScale }] }}>
          <Pressable
            ref={ref}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={({ pressed }) => [
              styles.base,
              variantStyles.container,
              pressed && { opacity: 0.8 },
              style as ViewStyle,
            ]}
            {...props}
          >
            {content}
          </Pressable>
        </Animated.View>
      );
    }

    return (
      <View ref={ref} style={[styles.base, variantStyles.container, style as ViewStyle]} {...props}>
        {content}
      </View>
    );
  },
);
Badge.displayName = 'Badge';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.paddingX,
    paddingVertical: tokens.paddingY,
    borderRadius: tokens.borderRadius,
  },
  text: {
    fontSize: tokens.fontSize,
    fontWeight: '500',
  },
});
