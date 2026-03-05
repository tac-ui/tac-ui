import React, { forwardRef, useRef, useEffect } from 'react';
import { View, Animated, type ViewProps, type ViewStyle, type DimensionValue } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';

/** Animation style of the Skeleton placeholder. */
export type SkeletonAnimation = 'shimmer' | 'pulse';

export interface SkeletonProps extends ViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  variant?: 'rectangular' | 'circular' | 'text';
  /** Animation style. 'shimmer' sweeps a highlight across, 'pulse' fades opacity. @default 'shimmer' */
  animation?: SkeletonAnimation;
  /** Number of lines rendered when variant is 'text'. @default 3 */
  lines?: number;
}

interface SingleSkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  animation: SkeletonAnimation;
  backgroundColor: string;
  delay?: number;
  style?: ViewStyle;
}

const SingleSkeleton = ({
  width,
  height,
  borderRadius,
  animation,
  backgroundColor,
  delay = 0,
  style,
}: SingleSkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const shimmerX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animation === 'pulse') {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.7, duration: 800, delay, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
        ]),
      );
      anim.start();
      return () => anim.stop();
    } else {
      // shimmer: translate an overlay from -1 to 1 (normalized), loop
      const anim = Animated.loop(
        Animated.timing(shimmerX, {
          toValue: 1,
          duration: 1500,
          delay,
          useNativeDriver: true,
        }),
      );
      shimmerX.setValue(0);
      anim.start();
      return () => anim.stop();
    }
  }, [animation, delay, opacity, shimmerX]);

  if (animation === 'shimmer') {
    return (
      <View
        style={[
          {
            backgroundColor,
            width,
            height,
            borderRadius,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '60%',
            backgroundColor: 'rgba(255,255,255,0.18)',
            transform: [
              {
                translateX: shimmerX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 400],
                }),
              },
            ],
          }}
        />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        {
          backgroundColor,
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const Skeleton = forwardRef<View, SkeletonProps>(
  (
    { width, height = 16, borderRadius, variant = 'rectangular', animation = 'shimmer', lines = 3, style, ...props },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const resolvedRadius = borderRadius ?? (variant === 'circular' ? 9999 : variant === 'text' ? 4 : 8);

    if (variant === 'text') {
      return (
        <View ref={ref} style={[{ flexDirection: 'column', gap: 8 }, style as ViewStyle]} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <SingleSkeleton
              key={i}
              width={i === lines - 1 ? '65%' : '100%'}
              height={12}
              borderRadius={resolvedRadius}
              animation={animation}
              backgroundColor={theme.colors.backgroundSubtle}
              delay={i * 60}
            />
          ))}
        </View>
      );
    }

    return (
      <View ref={ref} style={style as ViewStyle} {...props}>
        <SingleSkeleton
          width={width ?? (variant === 'circular' ? 40 : '100%')}
          height={height ?? (variant === 'circular' ? 40 : 20)}
          borderRadius={resolvedRadius}
          animation={animation}
          backgroundColor={theme.colors.backgroundSubtle}
        />
      </View>
    );
  },
);
Skeleton.displayName = 'Skeleton';
