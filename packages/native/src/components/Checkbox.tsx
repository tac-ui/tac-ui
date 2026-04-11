import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';
import Svg, { Path } from 'react-native-svg';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface CheckboxProps extends Omit<ViewProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  filled?: boolean;
}

const tokens = componentTokens.checkbox;

export const Checkbox = forwardRef<View, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      label,
      indeterminate,
      disabled,
      filled = false,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handlePress = useCallback(() => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
    }, [isChecked, disabled, isControlled, onChange]);

    const isActive = isChecked || indeterminate;

    const scaleAnim = useRef(new Animated.Value(isChecked ? 1 : 0)).current;
    const colorAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;
    const pressAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: isChecked ? 1 : 0,
          useNativeDriver: true,
          ...springConfigs.entrance,
        }),
        Animated.timing(colorAnim, {
          toValue: isActive ? 1 : 0,
          duration: duration.fast,
          useNativeDriver: false,
        }),
      ]).start();
    }, [isChecked, isActive, scaleAnim, colorAnim]);

    const handlePressIn = useCallback(() => {
      Animated.timing(pressAnim, { toValue: 0.8, duration: duration.instant, useNativeDriver: true }).start();
    }, [pressAnim]);

    const handlePressOut = useCallback(() => {
      Animated.timing(pressAnim, { toValue: 1, duration: duration.fast, useNativeDriver: true }).start();
    }, [pressAnim]);

    const animatedBorderColor = colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.gray300, theme.colors.point],
    });

    const animatedBgColor = colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', theme.colors.point],
    });

    return (
      <AnimatedPressable
        ref={ref}
        onPress={handlePress}
        onPressIn={disabled ? undefined : handlePressIn}
        onPressOut={disabled ? undefined : handlePressOut}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked, disabled: !!disabled }}
        style={[
          styles.wrapper,
          filled && {
            backgroundColor: theme.colors.interactiveSurfaceTint,
            paddingHorizontal: tokens.wrapperPaddingX,
            paddingVertical: tokens.wrapperPaddingY,
            borderRadius: tokens.wrapperRadius,
          },
          disabled && styles.disabled,
          { opacity: disabled ? 0.5 : pressAnim },
          style as ViewStyle,
        ]}
        {...props}
      >
        <Animated.View style={[styles.box, { borderColor: animatedBorderColor, backgroundColor: animatedBgColor }]}>
          {indeterminate ? (
            <Svg width={tokens.iconSize} height={tokens.iconSize} viewBox="0 0 14 14" fill="none">
              <Path d="M3 7h8" stroke={theme.colors.background} strokeWidth={2} strokeLinecap="round" />
            </Svg>
          ) : (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Svg width={tokens.iconSize} height={tokens.iconSize} viewBox="0 0 14 14" fill="none">
                <Path
                  d="M11.5 3.5L5.5 10.5L2.5 7.5"
                  stroke={theme.colors.background}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Animated.View>
          )}
        </Animated.View>
        {label && (
          <Text style={[styles.label, { color: disabled ? theme.colors.gray400 : theme.colors.foreground }]}>
            {label}
          </Text>
        )}
      </AnimatedPressable>
    );
  },
);
Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', gap: tokens.gap },
  box: {
    width: tokens.size,
    height: tokens.size,
    borderRadius: tokens.borderRadius,
    borderWidth: tokens.borderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: tokens.labelSize, fontWeight: '500' },
  disabled: { opacity: 0.5 },
});
