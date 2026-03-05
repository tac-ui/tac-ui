import React, { forwardRef, createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Pressable,
  ScrollView,
  Animated,
  StyleSheet,
  type ViewProps,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

const tokens = componentTokens.tabs.primary;
const segTokens = componentTokens.tabs.secondary;

/** Visual style variant for native Tabs. */
export type TabVariant = 'underline' | 'pill' | 'outline' | 'icon';

interface TabLayout {
  x: number;
  width: number;
}

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  registerLayout: (value: string, layout: TabLayout) => void;
  getIndicatorAnim: () => { x: Animated.Value; width: Animated.Value };
  hasLayout: (value: string) => boolean;
  variant: TabVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends ViewProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Visual style of the tab list. @default 'underline' */
  variant?: TabVariant;
  children?: React.ReactNode;
}

export const Tabs = forwardRef<View, TabsProps>(
  (
    { defaultValue = '', value: controlledValue, onValueChange, variant = 'underline', children, style, ...props },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : internalValue;
    const layoutsRef = useRef<Record<string, TabLayout>>({});
    const indicatorX = useRef(new Animated.Value(0)).current;
    const indicatorWidth = useRef(new Animated.Value(0)).current;
    const initializedRef = useRef(false);

    const setActiveTab = useCallback(
      (tab: string) => {
        if (!isControlled) setInternalValue(tab);
        onValueChange?.(tab);
      },
      [isControlled, onValueChange],
    );

    const animateIndicator = useCallback(
      (tab: string, skipAnimation = false) => {
        const layout = layoutsRef.current[tab];
        if (!layout) return;
        if (skipAnimation) {
          indicatorX.setValue(layout.x);
          indicatorWidth.setValue(layout.width);
        } else {
          Animated.parallel([
            Animated.spring(indicatorX, {
              toValue: layout.x,
              ...springConfigs.snappy,
              useNativeDriver: false,
            }),
            Animated.spring(indicatorWidth, {
              toValue: layout.width,
              ...springConfigs.snappy,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
      [indicatorX, indicatorWidth],
    );

    const registerLayout = useCallback(
      (value: string, layout: TabLayout) => {
        layoutsRef.current[value] = layout;
        if (value === activeTab) {
          animateIndicator(activeTab, !initializedRef.current);
          initializedRef.current = true;
        }
      },
      [activeTab, animateIndicator],
    );

    const hasLayout = useCallback((value: string) => {
      return !!layoutsRef.current[value];
    }, []);

    useEffect(() => {
      if (initializedRef.current) {
        animateIndicator(activeTab);
      }
    }, [activeTab, animateIndicator]);

    const getIndicatorAnim = useCallback(
      () => ({
        x: indicatorX,
        width: indicatorWidth,
      }),
      [indicatorX, indicatorWidth],
    );

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, registerLayout, getIndicatorAnim, hasLayout, variant }}>
        <View ref={ref} style={[{ width: '100%' }, style]} {...props}>
          {children}
        </View>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export interface TabsListProps extends ViewProps {
  children?: React.ReactNode;
}

export const TabsList = forwardRef<ScrollView, TabsListProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  const ctx = useContext(TabsContext);
  const variant = ctx?.variant ?? 'underline';
  const anim = ctx?.getIndicatorAnim();
  const shadow = nativeShadows[theme.mode].sm;

  // Pill / outline: full-background sliding indicator
  const isPill = variant === 'pill';
  const isOutline = variant === 'outline';
  const isUnderline = variant === 'underline';

  const containerStyle: ViewStyle[] = [
    isUnderline
      ? { position: 'relative', borderBottomWidth: 1, borderBottomColor: theme.colors.border }
      : isPill || variant === 'icon'
        ? {
            position: 'relative',
            backgroundColor: theme.colors.muted,
            borderRadius: segTokens.containerRadius,
            padding: segTokens.containerPadding,
          }
        : /* outline */ {
            position: 'relative',
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: segTokens.containerRadius,
            padding: 2,
          },
    style as ViewStyle,
  ];

  return (
    <View style={containerStyle}>
      {/* Sliding background indicator for pill/outline/icon */}
      {(isPill || isOutline || variant === 'icon') && anim && (
        <Animated.View
          style={{
            position: 'absolute',
            top: isOutline ? 2 : segTokens.containerPadding,
            bottom: isOutline ? 2 : segTokens.containerPadding,
            backgroundColor: isOutline ? theme.colors.muted : theme.colors.background,
            borderRadius: segTokens.itemRadius,
            left: anim.x,
            width: anim.width,
            ...(isOutline ? { ...shadow } : {}),
          }}
        />
      )}
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        {...props}
      >
        {children}
        {/* Underline sliding indicator */}
        {isUnderline && anim && (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              height: tokens.indicatorHeight,
              backgroundColor: theme.colors.point,
              borderRadius: tokens.indicatorHeight / 2,
              left: anim.x,
              width: anim.width,
            }}
          />
        )}
      </ScrollView>
    </View>
  );
});
TabsList.displayName = 'TabsList';

export interface TabTriggerProps extends Omit<ViewProps, 'children'> {
  value: string;
  /** Icon element to display alongside the label. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const TabTrigger = forwardRef<View, TabTriggerProps>(({ value, children, icon, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  const ctx = useContext(TabsContext);
  const variant = ctx?.variant ?? 'underline';
  const isActive = ctx?.activeTab === value;

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      ctx?.registerLayout(value, { x, width });
    },
    [ctx, value],
  );

  const isPillOrOutline = variant === 'pill' || variant === 'outline';
  const isPillOutlineIcon = isPillOrOutline || variant === 'icon';

  // For pill/outline/icon, padding matches segment controller
  const paddingH = isPillOutlineIcon ? segTokens.paddingX : tokens.paddingX;
  const paddingV = isPillOutlineIcon ? segTokens.paddingY : tokens.paddingY;
  const fontSize = isPillOutlineIcon ? segTokens.fontSize : tokens.fontSize;

  const activeColor = theme.colors.foreground;
  const inactiveColor = theme.colors.mutedForeground;

  // Press scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      ...springConfigs.light,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      ...springConfigs.light,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  // Text color animation
  const colorAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: isActive ? 1 : 0,
      duration: duration.normal,
      useNativeDriver: false,
    }).start();
  }, [isActive, colorAnim]);

  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const animatedFontWeight = isActive ? '600' : '500';

  return (
    <Pressable
      ref={ref}
      onPress={() => ctx?.setActiveTab(value)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={[
        styles.trigger,
        {
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }], flexDirection: 'row', alignItems: 'center' }}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        {(variant !== 'icon' || isActive) &&
          (typeof children === 'string' ? (
            <Animated.Text
              style={[
                styles.triggerText,
                {
                  fontSize,
                  color: animatedColor,
                  fontWeight: animatedFontWeight,
                  zIndex: 1,
                  marginLeft: icon && variant === 'icon' ? 6 : 0,
                },
              ]}
              numberOfLines={1}
            >
              {children}
            </Animated.Text>
          ) : (
            children
          ))}
      </Animated.View>
    </Pressable>
  );
});
TabTrigger.displayName = 'TabTrigger';

export interface TabContentProps extends ViewProps {
  value: string;
  children?: React.ReactNode;
}

export const TabContent = forwardRef<View, TabContentProps>(({ value, children, style, ...props }, ref) => {
  const ctx = useContext(TabsContext);
  if (ctx?.activeTab !== value) return null;
  return (
    <View ref={ref} style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
});
TabContent.displayName = 'TabContent';

const styles = StyleSheet.create({
  listContent: { flexDirection: 'row', position: 'relative' as const },
  trigger: {
    paddingHorizontal: tokens.paddingX,
    paddingVertical: tokens.paddingY,
  },
  triggerText: { fontSize: tokens.fontSize, fontWeight: '500' },
  iconWrapper: { width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  content: { paddingTop: 16 },
});
