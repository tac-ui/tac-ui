/**
 * Elevation tokens — Tac UI soft depth.
 * Neutral warm shadows with subtle blue-ice glow in dark mode.
 * Elements float gently — depth through shadow, not hard borders.
 */
import type { ThemeMode, ThemeElevation } from '@tac-ui/shared';

export const elevation = {
  light: {
    sm: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
    m: '0 4px 12px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
    lg: '0 8px 24px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)',
    xl: '0 16px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04)',
    glass: '0 8px 32px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.02)',
    glassLg: '0 12px 48px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)',
  },
  dark: {
    sm: '0 1px 2px rgba(0,0,0,0.20), 0 1px 3px rgba(0,0,0,0.14)',
    m: '0 1px 4px rgba(0,0,0,0.20), 0 4px 12px rgba(0,0,0,0.16)',
    lg: '0 2px 8px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.18)',
    xl: '0 4px 12px rgba(0,0,0,0.22), 0 12px 32px rgba(0,0,0,0.20)',
    glass: '0 2px 12px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(255,255,255,0.06)',
    glassLg: '0 4px 20px rgba(0,0,0,0.20), 0 2px 4px rgba(0,0,0,0.12), 0 0 16px rgba(138,163,184,0.03)',
  },
} as const satisfies Record<ThemeMode, ThemeElevation>;

/** @deprecated Use elevation.light instead */
export const elevationLight = elevation.light;

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  toast: 1600,
} as const;
