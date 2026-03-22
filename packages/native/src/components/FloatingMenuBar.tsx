import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

// ─── Types ───────────────────────────────────────────────────────────────────

/** A single item in the FloatingMenuBar. */
export interface FloatingMenuBarItem {
  /** Unique key identifying this tab. */
  key: string;
  /** Icon rendered in the tab. Receives `color` and `size`. */
  icon: (props: { color: string; size: number }) => React.ReactNode;
  /** Label shown below the icon. */
  label: string;
  /** Optional badge count displayed on the icon. */
  badge?: number;
}

/** Props for the FloatingMenuBar component. */
export interface FloatingMenuBarProps {
  /** Array of menu items to display. */
  items: FloatingMenuBarItem[];
  /** Currently active item key. */
  activeKey: string;
  /** Called when a menu item is pressed. */
  onSelect: (key: string) => void;
  /** When true, uses a translucent glass-style background. @default false */
  glass?: boolean;
  /** Style applied to the outer container. */
  style?: ViewStyle;
}

// ─── AnimatedTab ─────────────────────────────────────────────────────────────

interface AnimatedTabProps {
  item: FloatingMenuBarItem;
  active: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: () => void;
}

function AnimatedTab({ item, active, activeColor, inactiveColor, onPress }: AnimatedTabProps) {
  const { theme } = useTacNativeTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const iconTranslateY = useRef(new Animated.Value(0)).current;
  const labelOpacity = useRef(new Animated.Value(active ? 1 : 0)).current;
  const dotScale = useRef(new Animated.Value(active ? 1 : 0)).current;

  const colorAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(iconTranslateY, {
        toValue: active ? -2 : 0,
        useNativeDriver: true,
        ...springConfigs.magnetic,
      }),
      Animated.spring(labelOpacity, {
        toValue: active ? 1 : 0,
        useNativeDriver: true,
        ...springConfigs.magnetic,
      }),
      Animated.spring(dotScale, {
        toValue: active ? 1 : 0,
        useNativeDriver: true,
        ...springConfigs.bouncy,
      }),
      Animated.timing(colorAnim, {
        toValue: active ? 1 : 0,
        duration: duration.fast,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, iconTranslateY, labelOpacity, dotScale, colorAnim]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      ...springConfigs.light,
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      ...springConfigs.light,
    }).start();
  }, [scale]);

  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      style={styles.tab}
    >
      <Animated.View
        style={[
          styles.tabContent,
          {
            transform: [{ scale }, { translateY: iconTranslateY }],
          },
        ]}
      >
        <Animated.View>
          {item.icon({ color: animatedColor as unknown as string, size: 22 })}
          {item.badge != null && item.badge > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
              <Text style={[styles.badgeText, { color: theme.colors.errorForeground }]}>
                {item.badge > 99 ? '99+' : String(item.badge)}
              </Text>
            </View>
          )}
        </Animated.View>
        <Animated.Text
          style={[
            styles.label,
            {
              color: animatedColor,
              opacity: labelOpacity,
            },
          ]}
          numberOfLines={1}
        >
          {item.label}
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.activeDot,
          {
            backgroundColor: activeColor,
            transform: [{ scale: dotScale }],
          },
        ]}
      />
    </Pressable>
  );
}

// ─── FloatingMenuBar ─────────────────────────────────────────────────────────

export const FloatingMenuBar = forwardRef<View, FloatingMenuBarProps>(
  ({ items, activeKey, onSelect, glass = false, style }, ref) => {
    const { theme } = useTacNativeTheme();
    const shadow = nativeShadows[theme.mode].lg;

    const bgStyle: ViewStyle = glass
      ? {
          backgroundColor: theme.mode === 'dark' ? 'rgba(30, 30, 30, 0.75)' : 'rgba(255, 255, 255, 0.75)',
        }
      : { backgroundColor: theme.colors.surface };

    return (
      <View ref={ref} style={[styles.wrapper, style]} pointerEvents="box-none">
        <View
          style={[
            styles.bar,
            bgStyle,
            {
              borderColor: theme.colors.border,
              ...shadow,
            },
          ]}
        >
          {items.map((item) => (
            <AnimatedTab
              key={item.key}
              item={item}
              active={item.key === activeKey}
              activeColor={theme.colors.point}
              inactiveColor={theme.colors.mutedForeground}
              onPress={() => onSelect(item.key)}
            />
          ))}
        </View>
      </View>
    );
  },
);
FloatingMenuBar.displayName = 'FloatingMenuBar';

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 28,
    borderWidth: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    minWidth: 240,
    maxWidth: 400,
    width: '100%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
});
