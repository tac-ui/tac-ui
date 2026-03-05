import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration as motionDuration } from '../constants/motion';
import type { ThemeColors } from '@tac-ui/shared';

export type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface SnackbarProps extends ViewProps {
  variant?: SnackbarVariant;
  message: string;
  action?: { label: string; onPress: () => void };
  icon?: React.ReactNode;
  visible?: boolean;
  duration?: number;
  onDismiss?: () => void;
  /** When true, shows a close button on the right side of the snackbar. */
  dismissible?: boolean;
}

function getVariantColors(
  variant: SnackbarVariant,
  colors: ThemeColors,
): { bg: string; text: string; actionText: string } {
  switch (variant) {
    case 'default':
      return { bg: colors.surface, text: colors.foreground, actionText: colors.point };
    case 'success':
      return { bg: colors.successBg, text: colors.successForeground, actionText: colors.success };
    case 'error':
      return { bg: colors.errorBg, text: colors.errorForeground, actionText: colors.error };
    case 'warning':
      return { bg: colors.warningBg, text: colors.warningForeground, actionText: colors.warning };
    case 'info':
      return { bg: colors.infoBg, text: colors.infoForeground, actionText: colors.info };
  }
}

const tokens = componentTokens.snackbar;

export const Snackbar = forwardRef<View, SnackbarProps>(
  (
    {
      variant = 'default',
      message,
      action,
      icon,
      visible = true,
      duration = 4000,
      onDismiss,
      dismissible,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const [shouldRender, setShouldRender] = useState(visible);
    const shadow = nativeShadows[theme.mode].m;
    const variantColors = getVariantColors(variant, theme.colors);

    useEffect(() => {
      if (visible) {
        setShouldRender(true);
        Animated.parallel([
          Animated.spring(translateY, { toValue: 0, ...springConfigs.snappy, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: motionDuration.fast, useNativeDriver: true }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(translateY, { toValue: 100, duration: motionDuration.normal, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: motionDuration.normal, useNativeDriver: true }),
        ]).start(() => setShouldRender(false));
      }
    }, [visible, translateY, opacity]);

    useEffect(() => {
      if (!visible || duration <= 0 || !onDismiss) return;
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }, [visible, duration, onDismiss]);

    if (!shouldRender) return null;

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.container,
          {
            backgroundColor: variantColors.bg,
            borderColor: theme.colors.border,
            ...shadow,
            transform: [{ translateY }],
            opacity,
          },
          style as ViewStyle,
        ]}
        {...props}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.message, { color: variantColors.text }]} numberOfLines={2}>
          {message}
        </Text>
        {action && (
          <Pressable
            onPress={action.onPress}
            style={[styles.action, { backgroundColor: theme.colors.interactiveSurfaceTint }]}
          >
            <Text style={[styles.actionText, { color: variantColors.actionText }]}>{action.label}</Text>
          </Pressable>
        )}
        {dismissible && onDismiss && (
          <Pressable onPress={onDismiss} style={styles.closeButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={[styles.closeText, { color: variantColors.text, opacity: 0.6 }]}>✕</Text>
          </Pressable>
        )}
      </Animated.View>
    );
  },
);
Snackbar.displayName = 'Snackbar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: tokens.paddingTop,
    paddingBottom: tokens.paddingBottom,
    paddingLeft: tokens.paddingLeft,
    paddingRight: tokens.paddingRight,
    borderRadius: tokens.borderRadius,
    borderWidth: 1,
    gap: tokens.gap,
  },
  icon: { flexShrink: 0 },
  message: { flex: 1, fontSize: tokens.messageSize },
  action: {
    paddingHorizontal: tokens.actionPaddingX,
    paddingVertical: tokens.actionPaddingY,
    borderRadius: tokens.actionRadius,
  },
  actionText: { fontSize: tokens.actionSize, fontWeight: '600' },
  closeButton: { flexShrink: 0, padding: 2 },
  closeText: { fontSize: 14, lineHeight: 18 },
});
