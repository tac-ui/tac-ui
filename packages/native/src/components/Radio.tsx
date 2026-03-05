import React, { forwardRef, createContext, useContext, useCallback, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

const tokens = componentTokens.radio;

interface RadioGroupContextValue {
  value: string | undefined;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends ViewProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

export const RadioGroup = forwardRef<View, RadioGroupProps>(
  ({ value: controlledValue, defaultValue, onValueChange, children, style, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = useCallback(
      (val: string) => {
        if (!isControlled) setInternalValue(val);
        onValueChange?.(val);
      },
      [isControlled, onValueChange],
    );

    return (
      <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange }}>
        <View ref={ref} style={[styles.group, style]} {...props}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps extends Omit<ViewProps, 'children'> {
  /** The value this radio represents; compared against the RadioGroup's selected value. */
  radioValue: string;
  label?: string;
  disabled?: boolean;
  filled?: boolean;
}

export const Radio = forwardRef<View, RadioProps>(
  ({ radioValue, label, disabled, filled = false, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const group = useContext(RadioGroupContext);
    const isSelected = group?.value === radioValue;

    const handlePress = useCallback(() => {
      if (disabled) return;
      group?.onChange(radioValue);
    }, [disabled, group, radioValue]);

    const dotScaleAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
    const colorAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(dotScaleAnim, {
          toValue: isSelected ? 1 : 0,
          useNativeDriver: true,
          ...springConfigs.entrance,
        }),
        Animated.timing(colorAnim, {
          toValue: isSelected ? 1 : 0,
          duration: duration.normal,
          useNativeDriver: false,
        }),
      ]).start();
    }, [isSelected, dotScaleAnim, colorAnim]);

    const dotSize = tokens.size * 0.44;

    const animatedBorderColor = colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.gray300, theme.colors.point],
    });

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.wrapper,
          filled && {
            backgroundColor: theme.colors.interactiveSurfaceTint,
            paddingHorizontal: tokens.wrapperPaddingX,
            paddingVertical: tokens.wrapperPaddingY,
            borderRadius: tokens.wrapperRadius,
          },
          disabled && styles.disabled,
          pressed && !disabled && { opacity: 0.8 },
          style as ViewStyle,
        ]}
        {...props}
      >
        <Animated.View
          style={[
            styles.circle,
            { borderColor: animatedBorderColor as unknown as string, borderWidth: tokens.borderWidth },
          ]}
        >
          <Animated.View
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: theme.colors.point,
              transform: [{ scale: dotScaleAnim }],
            }}
          />
        </Animated.View>
        {label && (
          <Text style={[styles.label, { color: disabled ? theme.colors.gray400 : theme.colors.foreground }]}>
            {label}
          </Text>
        )}
      </Pressable>
    );
  },
);
Radio.displayName = 'Radio';

const styles = StyleSheet.create({
  group: { gap: 4 },
  wrapper: { flexDirection: 'row', alignItems: 'center', gap: tokens.gap },
  circle: {
    width: tokens.size,
    height: tokens.size,
    borderRadius: tokens.size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: tokens.labelSize, fontWeight: '500' },
  disabled: { opacity: 0.5 },
});
