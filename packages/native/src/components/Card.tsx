import React, { forwardRef, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const cardLayoutAnimation = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export type CardVariant = 'default' | 'accent' | 'flat' | 'glass';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  interactive?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const tokens = componentTokens.card;

export const Card = forwardRef<View, CardProps>(
  ({ variant = 'default', interactive, onPress, children, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const shadow = nativeShadows[theme.mode];
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    const isFirstRender = useRef(true);
    useLayoutEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      LayoutAnimation.configureNext(cardLayoutAnimation);
    });

    const containerStyle: ViewStyle = {
      backgroundColor:
        variant === 'flat'
          ? theme.colors.surface
          : variant === 'glass'
            ? 'rgba(255, 255, 255, 0.05)'
            : theme.colors.card,
      borderRadius: tokens.borderRadius,
      padding: tokens.padding,
      gap: tokens.gap,
      width: '100%',
      ...(variant === 'default'
        ? {
            borderWidth: 1,
            borderColor: theme.colors.border,
            ...shadow.sm,
          }
        : {}),
      ...(variant === 'accent'
        ? {
            borderWidth: 1,
            borderColor: theme.colors.point,
            ...shadow.sm,
          }
        : {}),
      ...(variant === 'glass'
        ? {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }
        : {}),
    };

    const handlePressIn = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.99,
          useNativeDriver: true,
          ...springConfigs.light,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.97,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          ...springConfigs.light,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    if (interactive || onPress) {
      return (
        <AnimatedPressable
          ref={ref}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[containerStyle, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }, style as ViewStyle]}
          {...props}
        >
          {children}
        </AnimatedPressable>
      );
    }

    return (
      <View ref={ref} style={[containerStyle, style as ViewStyle]} {...props}>
        {children}
      </View>
    );
  },
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<View, ViewProps>(({ style, ...props }, ref) => (
  <View ref={ref} style={[styles.header, style]} {...props} />
));
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends ViewProps {
  children?: React.ReactNode;
}

export const CardTitle = forwardRef<View, CardTitleProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={style} {...props}>
      {typeof children === 'string' ? (
        <Text style={{ fontSize: tokens.titleSize, fontWeight: '600', color: theme.colors.cardForeground }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
});
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends ViewProps {
  children?: React.ReactNode;
}

export const CardDescription = forwardRef<View, CardDescriptionProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={style} {...props}>
      {typeof children === 'string' ? (
        <Text style={{ fontSize: tokens.bodySize, color: theme.colors.mutedForeground }}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<View, ViewProps>(({ style, ...props }, ref) => (
  <View ref={ref} style={style} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<View, ViewProps>(({ style, ...props }, ref) => (
  <View ref={ref} style={[styles.footer, style]} {...props} />
));
CardFooter.displayName = 'CardFooter';

const styles = StyleSheet.create({
  header: { gap: 6 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
