/**
 * Primitive color tokens — Tac UI raw palette.
 * Gray scale aligned to Tailwind Zinc for consistency.
 */
export const primitiveColors = {
  white: '#FFFFFF',
  black: '#000000',

  gray: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },

  warmGray: {
    50: '#F6F5F3',
    100: '#E5E1E0',
    200: '#D7D2CB',
    300: '#BFB8AF',
    400: '#ACA39A',
    500: '#968C83',
    600: '#83786F',
    700: '#6E6259',
    800: '#5C5146',
    900: '#4A4138',
  },

  status: {
    success: '#166534',
    successLight: '#DCFCE7',
    warning: '#854D0E',
    warningLight: '#FEF9C3',
    error: '#991B1B',
    errorLight: '#FEE2E2',
  },

  dark: {
    bg: '#09090B',
    bgSubtle: '#18181B',
    surface: '#18181B',
    surfaceHover: '#27272A',
    border: '#27272A',
    muted: '#18181B',
    mutedFg: '#71717A',
  },

  glass: {
    bg: 'rgba(9, 9, 11, 0.8)',
    bgHover: 'rgba(9, 9, 11, 0.9)',
    border: 'rgba(255, 255, 255, 0.05)',
    borderHover: 'rgba(255, 255, 255, 0.1)',
    lightBg: 'rgba(255, 255, 255, 0.8)',
    lightBgHover: 'rgba(255, 255, 255, 0.9)',
    lightBorder: 'rgba(24, 24, 27, 0.04)',
    lightBorderHover: 'rgba(24, 24, 27, 0.08)',
  },
} as const;
