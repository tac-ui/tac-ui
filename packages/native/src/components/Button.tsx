import React, { forwardRef, useRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  Animated,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type PressableProps,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';
import type { ThemeColors } from '@tac-ui/shared';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'point' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Visual style of the button. @default 'primary' */
  variant?: ButtonVariant;
  /** Controls the height, padding, and font size. @default 'md' */
  size?: ButtonSize;
  /** When true, makes the button square (width = height) with no horizontal padding, for icon-only use. */
  iconOnly?: boolean;
  /** Icon element rendered before the label. */
  leftIcon?: React.ReactNode;
  /** Icon element rendered after the label. */
  rightIcon?: React.ReactNode;
  /** When true, replaces the button content with a spinner and disables interaction. */
  loading?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
}

function getVariantStyles(
  variant: ButtonVariant,
  colors: ThemeColors,
): { container: ViewStyle; pressed: ViewStyle; text: TextStyle } {
  switch (variant) {
    case 'primary':
      return {
        container: { backgroundColor: colors.btnPrimarySurface },
        pressed: { backgroundColor: colors.btnPrimaryHover },
        text: { color: colors.primaryForeground },
      };
    case 'secondary':
      return {
        container: { backgroundColor: colors.btnSecondarySurface },
        pressed: { backgroundColor: colors.btnSecondaryHover },
        text: { color: colors.secondaryForeground },
      };
    case 'outline':
      return {
        container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.btnOutlineBorder },
        pressed: { backgroundColor: colors.btnOutlineHoverBg },
        text: { color: colors.foreground },
      };
    case 'ghost':
      return {
        container: { backgroundColor: 'transparent' },
        pressed: { backgroundColor: colors.btnGhostHover },
        text: { color: colors.foreground },
      };
    case 'point':
      return {
        container: { backgroundColor: colors.btnPointSurface, borderWidth: 1, borderColor: colors.btnPointBorder },
        pressed: { backgroundColor: colors.btnPointHoverSurface },
        text: { color: colors.pointForeground },
      };
    case 'destructive':
      return {
        container: { backgroundColor: colors.btnDestructiveSurface },
        pressed: { backgroundColor: colors.btnDestructiveHover },
        text: { color: colors.primaryForeground },
      };
  }
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconOnly = false,
      leftIcon,
      rightIcon,
      loading = false,
      children,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const variantStyles = getVariantStyles(variant, theme.colors);
    const tokens = componentTokens.button[size];
    const isGhost = variant === 'ghost';
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const bgAnim = useRef(new Animated.Value(0)).current;
    const isDisabled = disabled || loading;

    const handlePressIn = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: isGhost ? 0.99 : 0.98,
          useNativeDriver: true,
          ...springConfigs.light,
        }),
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: duration.fast,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          ...springConfigs.light,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: duration.fast,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const animatedBgOpacity = bgAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          ref={ref}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityState={{ disabled: isDisabled, busy: loading }}
          onPressIn={isDisabled ? undefined : handlePressIn}
          onPressOut={isDisabled ? undefined : handlePressOut}
          style={[
            styles.base,
            {
              height: tokens.height,
              paddingHorizontal: iconOnly ? 0 : tokens.paddingX,
              borderRadius: tokens.borderRadius,
              overflow: 'hidden',
            },
            iconOnly && { width: tokens.height },
            variantStyles.container,
            isDisabled && styles.disabled,
            style,
          ]}
          {...props}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: variantStyles.pressed.backgroundColor,
                opacity: animatedBgOpacity,
              },
            ]}
          />
          {loading ? (
            <View style={styles.animatedContent}>
              <ActivityIndicator size="small" color={variantStyles.text.color as string} />
            </View>
          ) : (
            <View style={styles.animatedContent}>
              {leftIcon && (
                <View style={styles.iconWrapper}>
                  {React.isValidElement(leftIcon)
                    ? React.cloneElement(leftIcon as React.ReactElement<{ color?: string }>, {
                        color: variantStyles.text.color as string,
                      })
                    : leftIcon}
                </View>
              )}
              {!iconOnly && typeof children === 'string' ? (
                <Text style={[styles.text, { fontSize: tokens.fontSize }, variantStyles.text]}>{children}</Text>
              ) : !iconOnly ? (
                children
              ) : null}
              {rightIcon && (
                <View style={styles.iconWrapper}>
                  {React.isValidElement(rightIcon)
                    ? React.cloneElement(rightIcon as React.ReactElement<{ color?: string }>, {
                        color: variantStyles.text.color as string,
                      })
                    : rightIcon}
                </View>
              )}
            </View>
          )}
        </Pressable>
      </Animated.View>
    );
  },
);
Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  animatedContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  text: { fontWeight: '500' },
  iconWrapper: { flexShrink: 0 },
  disabled: { opacity: 0.5 },
});
