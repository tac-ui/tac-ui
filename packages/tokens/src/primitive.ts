/**
 * Primitive color tokens — Tac UI palette.
 * Luxurious Pantone Black & White Series.
 */
export const primitiveColors = {
  white: '#FFFFFF', // Pantone 11-0601 TCX
  black: '#000000', // Pure Black

  gray: {
    50: '#F5F5F6',  // Cool Gray 1 U
    100: '#E6E7E8', // Cool Gray 2 C
    200: '#D1D3D4', // Cool Gray 3 C
    300: '#BCBEC0', // Cool Gray 4 C
    400: '#A7A9AC', // Cool Gray 5 C
    500: '#808285', // Cool Gray 7 C
    600: '#6D6E71', // Cool Gray 8 C
    700: '#58595B', // Cool Gray 9 C
    800: '#414042', // Cool Gray 11 C
    900: '#2D2A26', // Pantone Black C
    950: '#101820', // Pantone Black 6 C
  },

  warmGray: {
    50: '#F6F5F3', 
    100: '#E5E1E0', // Warm Gray 1 C
    200: '#D7D2CB', // Warm Gray 2 C
    300: '#BFB8AF', // Warm Gray 3 C
    400: '#ACA39A', // Warm Gray 5 C
    500: '#968C83', // Warm Gray 7 C
    600: '#83786F', // Warm Gray 8 C
    700: '#6E6259', // Warm Gray 10 C
    800: '#5C5146', // Warm Gray 11 C
    900: '#4A4138',
  },

  status: {
    success: '#1A4331', // Pantone 343 C
    successLight: '#EAF1EC',
    warning: '#8A6D3B', // Pantone 117 C
    warningLight: '#F7F3EA',
    error: '#7C2128',   // Pantone 188 C
    errorLight: '#F4EAEB',
  },

  dark: {
    bg: '#101820', // Black 6 C
    bgSubtle: '#1A1C20',
    surface: '#1A1C20',
    surfaceHover: '#22252A',
    border: '#2D2A26', // Black C
    muted: '#1A1C20',
    mutedFg: '#808285', // Cool Gray 7 C
  },

  glass: {
    bg: 'rgba(16, 24, 32, 0.8)',
    bgHover: 'rgba(16, 24, 32, 0.9)',
    border: 'rgba(255, 255, 255, 0.05)',
    borderHover: 'rgba(255, 255, 255, 0.1)',
    lightBg: 'rgba(255, 255, 255, 0.8)',
    lightBgHover: 'rgba(255, 255, 255, 0.9)',
    lightBorder: 'rgba(16, 24, 32, 0.04)',
    lightBorderHover: 'rgba(16, 24, 32, 0.08)',
  },
} as const;