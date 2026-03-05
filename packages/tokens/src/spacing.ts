/**
 * Spacing, radius, breakpoint, grid, and container tokens.
 * Generous scale for "Airy" feel with softer radii.
 */
import type { ThemeSpacing, ThemeRadius, Breakpoints, GridConfig, Containers } from '@tac-ui/shared';

export const spacing = {
  '2xs': 2,
  xs: 4,
  sm: 8,
  m: 16,
  lg: 24,
  xl: 40,
  '2xl': 56,
  '3xl': 80,
} as const satisfies ThemeSpacing;

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  m: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  pill: 9999,
} as const satisfies ThemeRadius;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const satisfies Breakpoints;

export const grid = {
  columns: 12,
  gutter: 20,
  margin: {
    mobile: 20,
    tablet: 32,
    desktop: 40,
  },
} as const satisfies GridConfig;

export const containers = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const satisfies Containers;
