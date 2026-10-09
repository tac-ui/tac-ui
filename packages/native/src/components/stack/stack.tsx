import React, { forwardRef } from 'react';
import { View, type ViewProps, type FlexStyle } from 'react-native';

export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends ViewProps {
  gap?: Spacing;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
}

const gapValues: Record<Spacing, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

const alignMap: Record<StackAlign, FlexStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<StackJustify, FlexStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export const VStack = forwardRef<View, StackProps>(
  ({ gap = 'md', align = 'stretch', justify = 'start', wrap, style, ...props }, ref) => (
    <View
      ref={ref}
      style={[
        {
          flexDirection: 'column',
          gap: gapValues[gap],
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? 'wrap' : undefined,
        },
        style,
      ]}
      {...props}
    />
  ),
);
VStack.displayName = 'VStack';

export const HStack = forwardRef<View, StackProps>(
  ({ gap = 'md', align = 'center', justify = 'start', wrap, style, ...props }, ref) => (
    <View
      ref={ref}
      style={[
        {
          flexDirection: 'row',
          gap: gapValues[gap],
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? 'wrap' : undefined,
        },
        style,
      ]}
      {...props}
    />
  ),
);
HStack.displayName = 'HStack';
