import React, { forwardRef, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, type ViewProps } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';
import { duration } from '../constants/motion';

// react-native-svg is an optional peer dep — import lazily to avoid hard crash
type SvgCircleProps = {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  strokeDasharray?: number;
  strokeDashoffset?: Animated.AnimatedInterpolation<string | number> | number;
};

type SvgProps = {
  width: number;
  height: number;
  style?: object;
  children?: React.ReactNode;
};

let SvgComponent: React.ComponentType<SvgProps> | null = null;
let CircleComponent: React.ComponentType<SvgCircleProps> | null = null;
let AnimatedCircleComponent: React.ComponentType<SvgCircleProps> | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const rnSvg = require('react-native-svg');
  SvgComponent = rnSvg.Svg as React.ComponentType<SvgProps>;
  CircleComponent = rnSvg.Circle as React.ComponentType<SvgCircleProps>;
  AnimatedCircleComponent = Animated.createAnimatedComponent(
    CircleComponent as React.ComponentType<SvgCircleProps>,
  ) as React.ComponentType<SvgCircleProps>;
} catch {
  // react-native-svg not installed — circular variant will show a text-only fallback
}

/** Display style of the Progress indicator. */
export type ProgressVariant = 'linear' | 'circular';

/** Size of the linear progress bar. */
export type ProgressBarSize = 'sm' | 'md' | 'lg';

/** Props for the Progress component, which visualizes a determinate completion value. */
export interface ProgressProps extends ViewProps {
  /** Current progress value. Defaults to 0. */
  value?: number;
  /** Maximum value used to calculate the percentage. Defaults to 100. */
  max?: number;
  /** Display style — horizontal bar or circular ring. @default 'linear' */
  variant?: ProgressVariant;
  /** Diameter in pixels for the circular variant. Defaults to 64. */
  size?: number;
  /** Size of the linear progress bar. Defaults to 'md'. */
  barSize?: ProgressBarSize;
  /** When true, renders a percentage label alongside the progress indicator. */
  showLabel?: boolean;
}

const tokens = componentTokens.progress;

const linearBarHeights: Record<ProgressBarSize, number> = {
  sm: 4,
  md: 6,
  lg: 12,
};

export const Progress = forwardRef<View, ProgressProps>(
  (
    { value = 0, max = 100, variant = 'linear', size = 64, barSize = 'md', showLabel = false, style, ...props },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    const animValue = useRef(new Animated.Value(percent)).current;

    useEffect(() => {
      Animated.timing(animValue, {
        toValue: percent,
        duration: duration.slow,
        useNativeDriver: false,
      }).start();
    }, [percent, animValue]);

    if (variant === 'circular') {
      const strokeWidth = tokens.circular.strokeWidth;
      const r = (size - strokeWidth) / 2;
      const circumference = 2 * Math.PI * r;

      const dashoffset = animValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
      });

      const label = showLabel ? (
        <Text style={[styles.circularLabel, { color: theme.colors.foreground, fontSize: tokens.circular.textSize }]}>
          {Math.round(percent)}%
        </Text>
      ) : null;

      if (!SvgComponent || !CircleComponent || !AnimatedCircleComponent) {
        // Fallback when react-native-svg is not available
        return (
          <View
            ref={ref}
            style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}
            {...props}
          >
            {label}
          </View>
        );
      }

      return (
        <View
          ref={ref}
          style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}
          {...props}
        >
          <SvgComponent width={size} height={size} style={styles.svgRotate}>
            <CircleComponent
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={theme.colors.secondary}
              strokeWidth={strokeWidth}
            />
            <AnimatedCircleComponent
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={theme.colors.point}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
            />
          </SvgComponent>
          {label}
        </View>
      );
    }

    // Linear variant
    const barHeight = linearBarHeights[barSize];
    const borderRadius = tokens.linear.borderRadius;

    const fillWidth = animValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });

    return (
      <View ref={ref} style={[styles.linearContainer, style]} {...props}>
        {showLabel && (
          <View style={styles.labelRow}>
            <Text style={[styles.labelText, { color: theme.colors.foreground }]}>Progress</Text>
            <Text style={[styles.labelPercent, { color: theme.colors.mutedForeground }]}>{Math.round(percent)}%</Text>
          </View>
        )}
        <View
          style={[
            styles.track,
            {
              height: barHeight,
              borderRadius,
              backgroundColor: theme.colors.secondary,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.fill,
              {
                width: fillWidth,
                height: barHeight,
                borderRadius,
                backgroundColor: theme.colors.point,
              },
            ]}
          />
        </View>
      </View>
    );
  },
);
Progress.displayName = 'Progress';

const styles = StyleSheet.create({
  linearContainer: {
    flexDirection: 'column',
    gap: 6,
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelPercent: {
    fontSize: 14,
  },
  circularLabel: {
    position: 'absolute',
    fontWeight: '500',
  },
  svgRotate: {
    transform: [{ rotate: '-90deg' }],
  },
});
