/**
 * Typography tokens — Tac UI "Liquid Precision" identity.
 * Pretendard for all UI text — optimized for Korean & Latin.
 * Tighter letter-spacing for modern, precise feel.
 */
import type { ThemeTypography } from '@tac-ui/shared';

export const typography = {
  fontFamily: {
    primary: 'Pretendard',
    secondary: 'Pretendard',
    display: 'Pretendard',
    mono: 'SF Mono',
  },
  display: {
    lg: { size: 56, weight: 700, lineHeight: 1.08, letterSpacing: -0.035 },
    md: { size: 48, weight: 700, lineHeight: 1.08, letterSpacing: -0.03 },
    sm: { size: 40, weight: 600, lineHeight: 1.1, letterSpacing: -0.025 },
  },
  heading: {
    h1: { size: 34, weight: 700, lineHeight: 1.15, letterSpacing: -0.025 },
    h2: { size: 28, weight: 600, lineHeight: 1.2, letterSpacing: -0.02 },
    h3: { size: 22, weight: 600, lineHeight: 1.25, letterSpacing: -0.015 },
    h4: { size: 20, weight: 600, lineHeight: 1.3, letterSpacing: -0.01 },
    h5: { size: 17, weight: 600, lineHeight: 1.35, letterSpacing: -0.005 },
    h6: { size: 15, weight: 600, lineHeight: 1.4, letterSpacing: 0 },
  },
  body: {
    lg: { size: 17, weight: 400, lineHeight: 1.5, letterSpacing: -0.01 },
    md: { size: 15, weight: 400, lineHeight: 1.5, letterSpacing: -0.005 },
    sm: { size: 13, weight: 400, lineHeight: 1.45, letterSpacing: 0 },
  },
  label: {
    lg: { size: 15, weight: 500, lineHeight: 1.4, letterSpacing: -0.005 },
    md: { size: 13, weight: 500, lineHeight: 1.4, letterSpacing: 0 },
    sm: { size: 12, weight: 500, lineHeight: 1.4, letterSpacing: 0.005 },
  },
  caption: { size: 12, weight: 400, lineHeight: 1.4, letterSpacing: 0.01 },
  overline: { size: 11, weight: 600, lineHeight: 1.4, letterSpacing: 0.06 },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const satisfies ThemeTypography;
