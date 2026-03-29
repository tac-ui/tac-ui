'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

/** Layout preset for the Grid component. */
export type GridVariant = '2up' | 'side-by-side' | '2-1' | '1-2' | '1-3up' | '3up' | '4up' | '6up' | '1-2-4up';

/** Gap size between grid cells. */
export type GridGap = 'none' | 'sm' | 'md' | 'lg';

const gapClasses: Record<GridGap, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const variantClasses: Record<GridVariant, string> = {
  '2up': 'grid-cols-1 sm:grid-cols-2',
  'side-by-side': 'grid-cols-1 sm:grid-cols-2',
  '2-1': 'grid-cols-1 sm:grid-cols-3 [&>*:first-child]:sm:col-span-2',
  '1-2': 'grid-cols-1 sm:grid-cols-3 [&>*:last-child]:sm:col-span-2',
  '1-3up': 'grid-cols-1 sm:grid-cols-3 [&>*:first-child]:sm:col-span-3',
  '3up': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  '4up': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  '6up': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  '1-2-4up': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 [&>*:first-child]:sm:col-span-2 [&>*:first-child]:lg:col-span-4',
};

/**
 * Responsive grid layout with predefined column presets.
 * @example <Grid variant="3up" gap="md"><GridItem>A</GridItem><GridItem>B</GridItem><GridItem>C</GridItem></Grid>
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout preset that defines the column structure. @default '2up' */
  variant?: GridVariant;
  /** Gap size between grid cells. @default 'md' */
  gap?: GridGap;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant = '2up', gap = 'md', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid', variantClasses[variant], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Grid.displayName = 'Grid';

/** Props for a single grid cell. */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns this item should span. */
  span?: number;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('min-w-0', className)}
        style={{ ...style, ...(span ? { gridColumn: `span ${span}` } : {}) }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GridItem.displayName = 'GridItem';
