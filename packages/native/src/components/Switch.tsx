import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, type ViewProps } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

export interface SwitchProps extends Omit<ViewProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const tokens = componentTokens.switch;

export const Switch = forwardRef<View, SwitchProps>(
  ({ checked: controlledChecked, defaultChecked = false, onChange, label, disabled, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const thumbAnim = useRef(new Animated.Value(checked ? tokens.thumbTranslateOn : tokens.thumbTranslateOff)).current;
    const colorAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
      Animated.spring(thumbAnim, {
        toValue: checked ? tokens.thumbTranslateOn : tokens.thumbTranslateOff,
        ...springConfigs.magnetic,
        useNativeDriver: true,
      }).start();
      Animated.timing(colorAnim, {
        toValue: checked ? 1 : 0,
        duration: duration.normal,
        useNativeDriver: false,
      }).start();
    }, [checked, thumbAnim, colorAnim]);

    const handlePress = useCallback(() => {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
    }, [checked, disabled, isControlled, onChange]);

    const shadow = nativeShadows[theme.mode].sm;

    const trackColor = colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.secondary, theme.colors.point],
    });

    const toggle = (
      <Pressable onPress={handlePress} disabled={disabled}>
        <Animated.View style={[styles.track, { backgroundColor: trackColor }, disabled && styles.disabled]}>
          <Animated.View
            style={[
              styles.thumb,
              { backgroundColor: theme.colors.background, ...shadow, transform: [{ translateX: thumbAnim }] },
            ]}
          />
        </Animated.View>
      </Pressable>
    );

    if (label) {
      return (
        <View
          ref={ref}
          style={[styles.labelContainer, { backgroundColor: theme.colors.interactiveSurfaceTint }, style]}
          {...props}
        >
          <Text style={[styles.labelText, { color: theme.colors.foreground }]}>{label}</Text>
          {toggle}
        </View>
      );
    }

    return (
      <View ref={ref} style={style} {...props}>
        {toggle}
      </View>
    );
  },
);
Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  track: {
    width: tokens.width,
    height: tokens.height,
    borderRadius: tokens.height / 2,
    justifyContent: 'center',
  },
  thumb: {
    width: tokens.thumbSize,
    height: tokens.thumbSize,
    borderRadius: tokens.thumbSize / 2,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  labelText: { fontSize: 14, fontWeight: '500' },
  disabled: { opacity: 0.4 },
});
