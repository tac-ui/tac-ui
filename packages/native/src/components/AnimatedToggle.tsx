import React, { forwardRef, useRef, useEffect } from 'react';
import { View, Pressable, Animated, StyleSheet, type ViewStyle, type PressableProps } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';
import { springConfigs } from '../constants/motion';

export interface ToggleProps extends Omit<PressableProps, 'children' | 'style'> {
  /** The controlled checked state. */
  checked?: boolean;
  /** Callback fired when the toggle is clicked, receives the new checked value. */
  onChange?: (checked: boolean) => void;
  /** Icon rendered when checked is true. */
  iconOn?: React.ReactNode;
  /** Icon rendered when checked is false. */
  iconOff?: React.ReactNode;
  /** @deprecated Use checked instead. */
  isOn?: boolean;
  /** @deprecated Use onChange instead. */
  onToggle?: () => void;
  /** @deprecated Use iconOn instead. */
  onIcon?: React.ReactNode;
  /** @deprecated Use iconOff instead. */
  offIcon?: React.ReactNode;
  style?: ViewStyle;
}

const tokens = componentTokens.animatedToggle;

export const Toggle = forwardRef<View, ToggleProps>(
  ({ checked, onChange, iconOn, iconOff, isOn, onToggle, onIcon, offIcon, disabled, style, ...props }, ref) => {
    const { theme: _theme } = useTacNativeTheme();

    // New names take priority over deprecated aliases
    const isChecked = checked ?? isOn ?? false;
    const resolvedIconOn = iconOn ?? onIcon;
    const resolvedIconOff = iconOff ?? offIcon;

    const handlePress = () => {
      if (onChange) {
        onChange(!isChecked);
      } else if (onToggle) {
        onToggle();
      }
    };

    const rotateAnim = useRef(new Animated.Value(isChecked ? 1 : 0)).current;

    useEffect(() => {
      Animated.spring(rotateAnim, {
        toValue: isChecked ? 1 : 0,
        ...springConfigs.snappy,
        useNativeDriver: true,
      }).start();
    }, [isChecked, rotateAnim]);

    const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const opacity = rotateAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1],
    });

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.container,
          { backgroundColor: 'transparent' },
          pressed && !disabled && { opacity: 0.8, transform: [{ scale: 0.95 }] },
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        <Animated.View style={{ transform: [{ rotate }], opacity }}>
          {isChecked ? resolvedIconOn : resolvedIconOff}
        </Animated.View>
      </Pressable>
    );
  },
);
Toggle.displayName = 'Toggle';

/** @deprecated Use Toggle instead. */
export const AnimatedToggle = Toggle;
/** @deprecated Use ToggleProps instead. */
export type AnimatedToggleProps = ToggleProps;

const styles = StyleSheet.create({
  container: {
    width: tokens.size,
    height: tokens.size,
    borderRadius: tokens.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.5 },
});
