import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  type ViewProps,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';
import type { ThemeColors } from '@tac-ui/shared';

const tokens = componentTokens.tabs.secondary;

/** A single segment option. */
export interface SegmentOption {
  /** Unique value for this segment. */
  value: string;
  /** Display label for this segment. */
  label: string;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** When true, this segment cannot be selected. */
  disabled?: boolean;
}

/** Size dimensions for segment variants. */
const sizeTokens = {
  sm: { height: 28, fontSize: 12, paddingHorizontal: 8, paddingVertical: 3 },
  md: { height: 34, fontSize: 13, paddingHorizontal: 12, paddingVertical: 4 },
  lg: { height: 40, fontSize: 14, paddingHorizontal: 16, paddingVertical: 6 },
} as const;

export interface SegmentControllerProps extends Omit<ViewProps, 'children'> {
  // New API (preferred)
  options?: SegmentOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;

  // Legacy API (backward compat)
  items?: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;

  style?: ViewStyle;
}

function SegmentItem({
  option,
  isActive,
  isDisabled,
  sz,
  theme,
  onLayout,
  onPress,
}: {
  option: SegmentOption;
  isActive: boolean;
  isDisabled: boolean;
  sz: (typeof sizeTokens)[keyof typeof sizeTokens];
  theme: { colors: ThemeColors; mode: 'light' | 'dark' };
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
}) {
  const colorAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: isActive ? 1 : 0,
      duration: duration.fast,
      useNativeDriver: false,
    }).start();
  }, [isActive, colorAnim]);

  const textColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.mutedForeground, theme.colors.foreground],
  });

  return (
    <Pressable
      key={option.value}
      onLayout={onLayout}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.segment,
        {
          paddingHorizontal: sz.paddingHorizontal,
          paddingVertical: sz.paddingVertical,
          opacity: isDisabled ? 0.4 : 1,
        },
      ]}
    >
      {option.icon && <View style={styles.iconWrapper}>{option.icon}</View>}
      <Animated.Text
        style={[
          styles.segmentText,
          {
            fontSize: sz.fontSize,
            color: textColor,
          },
        ]}
      >
        {option.label}
      </Animated.Text>
    </Pressable>
  );
}

export const SegmentController = forwardRef<View, SegmentControllerProps>(
  (
    {
      options: optionsProp,
      value: valueProp,
      onValueChange,
      size = 'md',
      disabled = false,
      items,
      selectedIndex: selectedIndexProp = 0,
      onSelect,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const shadow = nativeShadows[theme.mode].sm;
    const sz = sizeTokens[size];

    // Resolve options — prefer new API, fall back to legacy items[]
    const options: SegmentOption[] = optionsProp
      ? optionsProp
      : (items ?? []).map((label, i) => ({ value: String(i), label }));

    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState<string>(
      optionsProp !== undefined ? (valueProp ?? options[0]?.value ?? '') : String(selectedIndexProp),
    );
    const isControlled = optionsProp !== undefined ? valueProp !== undefined : true;
    const resolvedValue = isControlled
      ? optionsProp !== undefined
        ? valueProp!
        : String(selectedIndexProp)
      : internalValue;

    const translateX = useRef(new Animated.Value(0)).current;
    const indicatorWidth = useRef(new Animated.Value(0)).current;
    const [segmentLayouts, setSegmentLayouts] = useState<{ width: number; x: number }[]>([]);

    const handleLayout = useCallback(
      (index: number) => (e: LayoutChangeEvent) => {
        const { x, width } = e.nativeEvent.layout;
        setSegmentLayouts((prev) => {
          const next = [...prev];
          next[index] = { width, x };
          return next;
        });
      },
      [],
    );

    const activeIndex = options.findIndex((o) => o.value === resolvedValue);
    const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;

    useEffect(() => {
      const layout = segmentLayouts[safeActiveIndex];
      if (layout) {
        Animated.parallel([
          Animated.spring(translateX, {
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
    }, [safeActiveIndex, segmentLayouts, translateX, indicatorWidth]);

    const handlePress = useCallback(
      (option: SegmentOption, index: number) => {
        if (disabled || option.disabled) return;
        if (!isControlled) {
          setInternalValue(option.value);
        }
        if (optionsProp !== undefined) {
          onValueChange?.(option.value);
        } else {
          onSelect?.(index);
        }
      },
      [disabled, isControlled, optionsProp, onValueChange, onSelect],
    );

    const segmentWidth = segmentLayouts[safeActiveIndex]?.width ?? 0;

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.muted,
            borderRadius: tokens.containerRadius,
            padding: tokens.containerPadding,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
        {...props}
      >
        {segmentWidth > 0 && (
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: theme.colors.background,
                borderRadius: tokens.itemRadius,
                ...shadow,
                top: tokens.containerPadding,
                bottom: tokens.containerPadding,
                width: indicatorWidth as unknown as number,
                left: translateX as unknown as number,
              },
            ]}
          />
        )}
        {options.map((option, index) => {
          const isActive = option.value === resolvedValue;
          const isDisabled = disabled || option.disabled;
          return (
            <SegmentItem
              key={option.value}
              option={option}
              isActive={isActive}
              isDisabled={!!isDisabled}
              sz={sz}
              theme={theme}
              onLayout={handleLayout(index)}
              onPress={() => handlePress(option, index)}
            />
          );
        })}
      </View>
    );
  },
);
SegmentController.displayName = 'SegmentController';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', position: 'relative', alignItems: 'center' },
  indicator: { position: 'absolute' },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    zIndex: 1,
  },
  iconWrapper: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  segmentText: { fontWeight: '500' },
});
