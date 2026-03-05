import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, type ViewProps } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { springConfigs, duration } from '../constants/motion';

export interface EmptyStateProps extends ViewProps {
  icon?: React.ReactNode;
  /** Primary heading text. */
  title: string;
  description?: string;
  action?: React.ReactNode;
  /** When false, the component animates out. @default true */
  visible?: boolean;
}

export const EmptyState = forwardRef<View, EmptyStateProps>(
  ({ icon, title, description, action, visible = true, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();

    const opacity = useRef(new Animated.Value(visible ? 0 : 0)).current;
    const translateY = useRef(new Animated.Value(visible ? 8 : 8)).current;
    const [shouldRender, setShouldRender] = useState(visible);
    const isMounted = useRef(false);

    useEffect(() => {
      if (!isMounted.current) {
        // Initial mount: animate in if visible
        isMounted.current = true;
        if (visible) {
          setShouldRender(true);
          Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: duration.normal, useNativeDriver: true }),
            Animated.spring(translateY, { toValue: 0, ...springConfigs.entrance, useNativeDriver: true }),
          ]).start();
        }
        return;
      }

      if (visible) {
        setShouldRender(true);
        opacity.setValue(0);
        translateY.setValue(8);
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: duration.normal, useNativeDriver: true }),
          Animated.spring(translateY, { toValue: 0, ...springConfigs.entrance, useNativeDriver: true }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: duration.fast, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 8, duration: duration.fast, useNativeDriver: true }),
        ]).start(() => setShouldRender(false));
      }
    }, [visible, opacity, translateY]);

    if (!shouldRender) return null;

    return (
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <View ref={ref} style={[styles.container, style]} {...props}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          {title && <Text style={[styles.title, { color: theme.colors.foreground }]}>{title}</Text>}
          {description && (
            <Text style={[styles.description, { color: theme.colors.mutedForeground }]}>{description}</Text>
          )}
          {action && <View style={styles.action}>{action}</View>}
        </View>
      </Animated.View>
    );
  },
);
EmptyState.displayName = 'EmptyState';

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  iconWrapper: { marginBottom: 4 },
  title: { fontSize: 17, fontWeight: '600', textAlign: 'center' },
  description: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  action: { marginTop: 8 },
});
