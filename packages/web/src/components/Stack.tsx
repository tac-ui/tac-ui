'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

/** Gap size between stack children. */
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Cross-axis alignment of stack children. */
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/** Main-axis justification of stack children. */
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const gapClasses: Record<Spacing, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

/**
 * Shared props for VStack and HStack flex container components.
 */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between children using the design-token spacing scale. @example gap="md" */
  gap?: Spacing;
  /** Cross-axis alignment of children. @example align="center" */
  align?: StackAlign;
  /** Main-axis justification of children. @example justify="between" */
  justify?: StackJustify;
  /** Whether children should wrap onto multiple lines. @example wrap */
  wrap?: boolean;
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const VStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = 'md', align = 'stretch', justify = 'start', wrap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col',
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    />
  ),
);
VStack.displayName = 'VStack';

export const HStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = 'md', align = 'center', justify = 'start', wrap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-row',
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    />
  ),
);
HStack.displayName = 'HStack';
