import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, type ViewProps, type LayoutChangeEvent } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs } from '../constants/motion';

const tokens = componentTokens.slider;

const THUMB_BORDER_WIDTH = 2;

export interface SliderProps extends Omit<ViewProps, 'children'> {
  /** Controlled value (0–100 by default). */
  value?: number;
  /** Initial value for uncontrolled usage. @default 0 */
  defaultValue?: number;
  /** Minimum value. @default 0 */
  min?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Snap interval. @default 1 */
  step?: number;
  /** Optional label rendered above the track. */
  label?: string;
  /** Show current value next to the label. @default false */
  showValue?: boolean;
  /** Fill track up to the thumb. @default true */
  filled?: boolean;
  /** Disable all interaction. @default false */
  disabled?: boolean;
  /** Called on every value change while dragging. */
  onChange?: (value: number) => void;
  /** Called when the user releases the thumb. */
  onChangeEnd?: (value: number) => void;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function snapToStep(val: number, step: number, min: number): number {
  return Math.round((val - min) / step) * step + min;
}

export const Slider = forwardRef<View, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      label,
      showValue = false,
      filled = true,
      disabled = false,
      onChange,
      onChangeEnd,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number>(clamp(defaultValue, min, max));
    const currentValue = isControlled ? controlledValue! : internalValue;

    const trackWidthRef = useRef<number>(0);
    const valueRef = useRef<number>(currentValue);
    valueRef.current = currentValue;

    // Animated scale for thumb press feedback
    const thumbScale = useRef(new Animated.Value(1)).current;

    const updateValue = useCallback(
      (rawX: number) => {
        const trackWidth = trackWidthRef.current;
        if (trackWidth <= 0) return;

        const ratio = clamp(rawX / trackWidth, 0, 1);
        const raw = ratio * (max - min) + min;
        const snapped = clamp(snapToStep(raw, step, min), min, max);

        if (snapped === valueRef.current) return;

        if (!isControlled) setInternalValue(snapped);
        onChange?.(snapped);
        valueRef.current = snapped;
      },
      [isControlled, max, min, onChange, step],
    );

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,

        onPanResponderGrant: (evt) => {
          if (disabled) return;
          Animated.spring(thumbScale, {
            toValue: 1.08,
            ...springConfigs.magnetic,
            useNativeDriver: true,
          }).start();
          // Handle tap-to-set at grant position
          updateValue(evt.nativeEvent.locationX);
        },

        onPanResponderMove: (evt) => {
          if (disabled) return;
          updateValue(evt.nativeEvent.locationX);
        },

        onPanResponderRelease: () => {
          if (disabled) return;
          Animated.spring(thumbScale, {
            toValue: 1,
            ...springConfigs.magnetic,
            useNativeDriver: true,
          }).start();
          onChangeEnd?.(valueRef.current);
        },

        onPanResponderTerminate: () => {
          Animated.spring(thumbScale, {
            toValue: 1,
            ...springConfigs.magnetic,
            useNativeDriver: true,
          }).start();
        },
      }),
    ).current;

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
      trackWidthRef.current = e.nativeEvent.layout.width;
    }, []);

    // Derive thumb position as a ratio
    const ratio = max > min ? (currentValue - min) / (max - min) : 0;

    const thumbOffset = ratio * 100;

    return (
      <View ref={ref} style={[styles.container, disabled && styles.disabled, style]} {...props}>
        {/* Label row */}
        {(label || showValue) && (
          <View style={styles.labelRow}>
            {label ? <Text style={[styles.labelText, { color: theme.colors.foreground }]}>{label}</Text> : null}
            {showValue ? (
              <Text style={[styles.valueText, { color: theme.colors.mutedForeground }]}>{currentValue}</Text>
            ) : null}
          </View>
        )}

        {/* Track hit area */}
        <View style={styles.trackHitArea} onLayout={handleLayout} {...panResponder.panHandlers}>
          {/* Track background */}
          <View style={[styles.track, { backgroundColor: theme.colors.secondary, height: tokens.trackHeight }]}>
            {/* Filled portion */}
            {filled && (
              <View
                style={[
                  styles.fill,
                  {
                    backgroundColor: theme.colors.point,
                    width: `${thumbOffset}%`,
                    height: tokens.trackHeight,
                  },
                ]}
              />
            )}
          </View>

          {/* Thumb */}
          <Animated.View
            style={[
              styles.thumb,
              {
                width: tokens.thumbSize,
                height: tokens.thumbSize,
                borderRadius: tokens.thumbSize / 2,
                backgroundColor: theme.colors.background,
                borderWidth: THUMB_BORDER_WIDTH,
                borderColor: theme.colors.point,
                left: `${thumbOffset}%` as unknown as number,
                transform: [{ translateX: -(tokens.thumbSize / 2) }, { scale: thumbScale }],
                // Base shadow when at scale 1; when scaled up to 1.08, RN naturally increases shadow visual.
                ...nativeShadows[theme.mode].sm,
              },
            ]}
            pointerEvents="none"
          />
        </View>
      </View>
    );
  },
);
Slider.displayName = 'Slider';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  valueText: {
    fontSize: 13,
  },
  trackHitArea: {
    height: 44,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    width: '100%',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 9999,
  },
  thumb: {
    position: 'absolute',
    top: '50%',
    marginTop: -(componentTokens.slider.thumbSize / 2),
  },
});
