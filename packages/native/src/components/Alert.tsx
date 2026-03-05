import React, { forwardRef, useEffect, useRef, useState } from 'react';
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
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import type { ThemeColors } from '@tac-ui/shared';
import { springConfigs, duration } from '../constants/motion';

export type AlertVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'glass';

export interface AlertProps extends ViewProps {
  variant?: AlertVariant;
  icon?: React.ReactNode;
  /** When true, shows a close button to dismiss the alert. */
  dismissible?: boolean;
  /** Called when the dismiss button is pressed. */
  onDismiss?: () => void;
  children?: React.ReactNode;
}

function getVariantStyles(variant: AlertVariant, colors: ThemeColors): { container: ViewStyle; text: TextStyle } {
  switch (variant) {
    case 'default':
      return {
        container: { backgroundColor: colors.surface, borderColor: colors.border },
        text: { color: colors.foreground },
      };
    case 'success':
      return {
        container: { backgroundColor: colors.successBg, borderColor: colors.success },
        text: { color: colors.successForeground },
      };
    case 'error':
      return {
        container: { backgroundColor: colors.errorBg, borderColor: colors.error },
        text: { color: colors.errorForeground },
      };
    case 'warning':
      return {
        container: { backgroundColor: colors.warningBg, borderColor: colors.warning },
        text: { color: colors.warningForeground },
      };
    case 'info':
      return {
        container: { backgroundColor: colors.infoBg, borderColor: colors.info },
        text: { color: colors.infoForeground },
      };
    case 'glass':
      return {
        container: { backgroundColor: colors.glassBg, borderColor: colors.glassBorder },
        text: { color: colors.foreground },
      };
  }
}

export const Alert = forwardRef<View, AlertProps>(
  ({ variant = 'default', icon, dismissible, onDismiss, children, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const variantStyles = getVariantStyles(variant, theme.colors);

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(8)).current;
    const [_visible, setVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    // Entrance animation on mount
    useEffect(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: duration.normal, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, ...springConfigs.magnetic, useNativeDriver: true }),
      ]).start();
    }, [opacity, translateY]);

    const handleDismiss = () => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: duration.fast, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 8, duration: duration.fast, useNativeDriver: true }),
      ]).start(() => {
        setShouldRender(false);
        onDismiss?.();
      });
      setVisible(false);
    };

    if (!shouldRender) return null;

    return (
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <View ref={ref} style={[styles.container, variantStyles.container, style as ViewStyle]} {...props}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <View style={styles.content}>{children}</View>
          {dismissible && (
            <Pressable
              onPress={handleDismiss}
              style={styles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.closeText, { color: theme.colors.mutedForeground }]}>✕</Text>
            </Pressable>
          )}
        </View>
      </Animated.View>
    );
  },
);
Alert.displayName = 'Alert';

export interface AlertTitleProps extends ViewProps {
  children?: React.ReactNode;
}

export const AlertTitle = forwardRef<View, AlertTitleProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={style} {...props}>
      {typeof children === 'string' ? (
        <Text style={{ fontSize: 15, fontWeight: '600', color: theme.colors.foreground }}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps extends ViewProps {
  children?: React.ReactNode;
}

export const AlertDescription = forwardRef<View, AlertDescriptionProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={style} {...props}>
      {typeof children === 'string' ? (
        <Text style={{ fontSize: 13, color: theme.colors.mutedForeground, lineHeight: 18 }}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
AlertDescription.displayName = 'AlertDescription';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 16, borderRadius: 12, borderWidth: 1, gap: 12, width: '100%' },
  iconWrapper: { flexShrink: 0, marginTop: 1 },
  content: { flex: 1, gap: 4 },
  closeButton: { flexShrink: 0, alignSelf: 'flex-start', padding: 2 },
  closeText: { fontSize: 14, lineHeight: 18 },
});
