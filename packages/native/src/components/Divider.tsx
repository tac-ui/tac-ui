import React, { forwardRef } from 'react';
import { View, Text, type ViewProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';

export type DividerVariant = 'full' | 'inset' | 'thick' | 'withLabel';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends ViewProps {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  label?: string;
}

const tokens = componentTokens.divider;

export const Divider = forwardRef<View, DividerProps>(
  ({ variant = 'full', orientation = 'horizontal', label, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const isHorizontal = orientation === 'horizontal';
    const insetMargin = variant === 'inset' ? tokens.insetMargin : 0;
    const thickness = variant === 'thick' ? 2 : tokens.thickness;

    if (variant === 'withLabel' && label) {
      return (
        <View
          ref={ref}
          style={[{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', gap: 12 }, style]}
          {...props}
        >
          <View style={{ flex: 1, height: tokens.thickness, backgroundColor: theme.colors.border }} />
          <Text style={{ fontSize: tokens.labelSize, color: theme.colors.mutedForeground, fontWeight: '500' }}>
            {label}
          </Text>
          <View style={{ flex: 1, height: tokens.thickness, backgroundColor: theme.colors.border }} />
        </View>
      );
    }

    const lineStyle: ViewStyle = isHorizontal
      ? { height: thickness, backgroundColor: theme.colors.border, alignSelf: 'stretch', marginHorizontal: insetMargin }
      : { width: thickness, backgroundColor: theme.colors.border, alignSelf: 'stretch', marginVertical: insetMargin };

    return <View ref={ref} style={[lineStyle, style]} {...props} />;
  },
);
Divider.displayName = 'Divider';
