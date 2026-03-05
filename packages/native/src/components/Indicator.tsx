import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { View, Animated, StyleSheet, type ViewProps, type LayoutChangeEvent } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';

// react-native-svg is an optional peer dep — import lazily
let SvgComponent: React.ComponentType<Record<string, unknown>> | null = null;
let CircleComponent: React.ComponentType<Record<string, unknown>> | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const rnSvg = require('react-native-svg');
  SvgComponent = rnSvg.Svg ?? rnSvg.default;
  CircleComponent = rnSvg.Circle;
} catch {
  // react-native-svg not installed — circular variant will show nothing
}

/** Variant of the Indicator component. */
export type IndicatorVariant = 'linear' | 'circular';

export interface IndicatorProps extends ViewProps {
  /** Visual style of the indicator. @default 'linear' */
  variant?: IndicatorVariant;
  /** Diameter of the circular indicator in dp. @default 32 */
  size?: number;
  /** Color of the animated bar or ring. Defaults to theme.colors.point. */
  color?: string;
}

// ─── Linear ──────────────────────────────────────────────────────────────────

const LINEAR_DURATION = 1200;
const BAR_RATIO = 0.3; // bar is 30% of track width

interface LinearIndicatorProps {
  color: string;
  trackColor?: string;
  style?: ViewProps['style'];
}

const LinearIndicator = forwardRef<View, LinearIndicatorProps & Omit<ViewProps, 'children'>>(
  ({ color, trackColor, style, ...props }, ref) => {
    const [trackWidth, setTrackWidth] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;
    const animRef = useRef<Animated.CompositeAnimation | null>(null);

    const startAnim = useCallback(
      (width: number) => {
        if (width <= 0) return;
        const barWidth = width * BAR_RATIO;
        animRef.current?.stop();
        translateX.setValue(-barWidth);
        animRef.current = Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: width,
              duration: LINEAR_DURATION,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: -barWidth,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        );
        animRef.current.start();
      },
      [translateX],
    );

    useEffect(() => {
      startAnim(trackWidth);
      return () => animRef.current?.stop();
    }, [trackWidth, startAnim]);

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
      setTrackWidth(e.nativeEvent.layout.width);
    }, []);

    const barWidth = trackWidth > 0 ? trackWidth * BAR_RATIO : 0;

    return (
      <View
        ref={ref}
        style={[styles.linearTrack, trackColor ? { backgroundColor: trackColor } : undefined, style]}
        onLayout={handleLayout}
        {...props}
      >
        <Animated.View
          style={[
            styles.linearBar,
            {
              width: barWidth,
              backgroundColor: color,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    );
  },
);
LinearIndicator.displayName = 'LinearIndicator';

// ─── Circular ─────────────────────────────────────────────────────────────────

const CIRCULAR_DURATION = 900;

interface CircularIndicatorProps {
  color: string;
  size: number;
}

const CircularIndicator = ({ color, size }: CircularIndicatorProps) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: CIRCULAR_DURATION,
        useNativeDriver: true,
      }),
    );
    rotation.setValue(0);
    anim.start();
    return () => anim.stop();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!SvgComponent || !CircleComponent) return null;

  const Svg = SvgComponent;
  const Circle = CircleComponent;

  const strokeWidth = Math.max(2, Math.round(size * 0.1));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashFilled = circumference * 0.75;
  const dashGap = circumference * 0.25;
  const center = size / 2;

  return (
    <Animated.View style={{ width: size, height: size, transform: [{ rotate }] }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashFilled} ${dashGap}`}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
    </Animated.View>
  );
};

// ─── Indicator ────────────────────────────────────────────────────────────────

export const Indicator = forwardRef<View, IndicatorProps>(
  ({ variant = 'linear', size = 32, color, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const resolvedColor = color ?? theme.colors.point;

    if (variant === 'circular') {
      return (
        <View ref={ref} style={style} {...props}>
          <CircularIndicator color={resolvedColor} size={size} />
        </View>
      );
    }

    return <LinearIndicator ref={ref} color={resolvedColor} trackColor={theme.colors.muted} style={style} {...props} />;
  },
);
Indicator.displayName = 'Indicator';

const styles = StyleSheet.create({
  linearTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  linearBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});
