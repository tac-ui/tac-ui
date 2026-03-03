/**
 * Semantic color tokens — Tac UI Identity "The Luxurious Pantone Monochrome"
 * * Design philosophy: 
 * - High-end, structured, and architectural based on physical Pantone standards.
 * - Minimalist palette using Pantone Cool Grays and deepest Blacks (e.g. Black 6 C) to create immense depth and luxury.
 * - Point color uses true deep black for light mode, and crisp white for dark mode.
 */
import type { ThemeMode, ThemeColors } from '@tac-ui/shared';

export const semanticTokens = {
  light: {
    // ── Canvas & Surface (Off-white paper base) ──
    background: '#FAFAFA',         // Off-white base
    backgroundSubtle: '#F4F4F5',   // Slightly darker gray
    surface: '#FCFCFC',            // Just faintly off-white surface
    surfaceHover: '#F4F4F5',
    surfaceBase: '#FAFAFA',
    surfaceElevatedLow: '#FCFCFC',
    surfaceElevatedMid: '#FCFCFC',
    surfaceElevatedHigh: '#FCFCFC',
    card: '#FCFCFC',
    cardForeground: '#121212',     // Barely off-black

    // ── Text ──
    foreground: '#121212',
    muted: '#F4F4F5',
    mutedForeground: '#71717A',

    // ── Brand ──
    primary: '#1E232D',            // Iron Navy
    primaryHover: '#2A303D',       // Slightly lighter for hover
    primaryForeground: '#FAFAFA',
    secondary: '#E4E4E7',          // Darkened from F4F4F5 for better visibility
    secondaryForeground: '#1E232D',
    ring: '#1E232D',

    // ── Point / Accent (Steel Navy) ──
    point: '#323944',
    pointHover: '#4A5361',
    pointForeground: '#FAFAFA',
    pointSubtle: 'rgba(30, 35, 45, 0.08)',

    // ── Border ──
    border: '#E4E4E7',
    input: '#E4E4E7',

    // ── Gray Scale ──
    gray50: '#FAFAFA', 
    gray100: '#F4F4F5',
    gray200: '#E4E4E7',
    gray300: '#D4D4D8',
    gray400: '#A1A1AA',
    gray500: '#71717A',
    gray600: '#52525B',
    gray700: '#3F3F46',
    gray800: '#27272A',
    gray900: '#18181B',

    // ── Glass & Effects ──
    glassBg: 'rgba(252, 252, 252, 0.85)',
    glassBorder: 'rgba(18, 18, 18, 0.04)',
    glassInset: 'inset 0 1px 0 rgba(250, 250, 250, 0.6)',
    glassPanelShadow: '0 12px 40px rgba(18, 18, 18, 0.04), 0 1px 3px rgba(18, 18, 18, 0.02)',
    accentGlow: '0 0 0 transparent',

    // ── Gradients ──
    gradientBrand: 'none',
    gradientBrandHover: 'none',
    gradientSubtle: 'none',
    gradientAccent: 'none',
    gradientAccentVivid: 'none',
    gradientGlow: 'none',
    gradientMesh: 'none',
    gradientSurface: 'none',
    gradientGlowShadow: 'none',

    // ── Shadow ──
    shadowColor: 'rgba(18, 18, 18, 0.05)',

    // ── Status ──
    success: '#1A4331',
    successBg: '#EAF1EC',
    successForeground: '#1A4331',
    warning: '#8A6D3B',
    warningBg: '#F7F3EA',
    warningForeground: '#8A6D3B',
    error: '#7C2128',
    errorBg: '#F4EAEB',
    errorForeground: '#7C2128',
    info: '#121212',
    infoBg: '#FAFAFA',
    infoForeground: '#121212',

    // ── Interaction States ──
    interactiveHover: 'rgba(18, 18, 18, 0.04)',
    interactivePressed: 'rgba(18, 18, 18, 0.08)',
    interactiveFocus: '#121212',
    interactiveSurfaceTint: 'rgba(18, 18, 18, 0.02)',
    interactiveHoverTint: 'rgba(18, 18, 18, 0.04)',
    focusGlow: '0 0 0 2px #E4E4E7',
    pointGlow: '0 0 0 2px rgba(18, 18, 18, 0.15)',

    // ── Components ──
    btnPrimarySurface: '#1E232D',
    btnPrimaryHover: '#2A303D',
    btnPrimaryEnergy: '0 4px 12px rgba(30, 35, 45, 0.16)',
    btnPrimaryInset: 'none',
    btnSecondarySurface: '#E4E4E7',
    btnSecondaryHover: '#D4D4D8',
    btnOutlineBorder: '#E4E4E7',
    btnOutlineBorderHover: '#D4D4D8',
    btnOutlineHoverBg: '#F4F4F5',
    btnGhostHover: '#F4F4F5',
    btnPointSurface: '#323944',
    btnPointBorder: 'transparent',
    btnPointHoverSurface: '#4A5361',
    btnPointHoverBorder: 'transparent',
    btnPointEnergy: '0 4px 12px rgba(50, 57, 68, 0.2)',
    btnDestructiveSurface: '#7C2128',
    btnDestructiveHover: '#5B171D',

    inputBg: '#FCFCFC',
    inputBorderRest: '#E4E4E7',
    inputBorderHover: '#A1A1AA',
    inputHoverGlow: '0 0 0 2px #F4F4F5',
    inputFocusGlow: '0 0 0 2px #E4E4E7',
    inputErrorGlow: '0 0 0 2px #F4EAEB',

    dropdownBg: '#FCFCFC',
    dropdownShadow: '0 20px 25px -5px rgba(18, 18, 18, 0.08), 0 0 0 1px rgba(18, 18, 18, 0.03)',
    dropdownItemHover: '#F4F4F5',

    cardAccentBorder: '#E4E4E7',
    cardAccentGlow: 'none',
    cardAccentHoverBorder: '#D4D4D8',
    cardAccentHoverGlow: '0 8px 24px rgba(18, 18, 18, 0.06)',
  },
  dark: {
    // ── Canvas & Surface (High-Contrast Charcoal Base) ──
    background: '#121214',         // Off-black charcoal
    backgroundSubtle: '#18181A',   // Zinc 900
    surface: '#27272A',            // Zinc 800 - distinct from subtle background
    surfaceHover: '#3F3F46',       // Zinc 700
    surfaceBase: '#121214',
    surfaceElevatedLow: '#18181A', 
    surfaceElevatedMid: '#27272A', 
    surfaceElevatedHigh: '#3F3F46',
    card: '#18181A',               // Zinc 900
    cardForeground: '#F4F4F5',     // Off-white

    // ── Text ──
    foreground: '#F4F4F5',         // Off-white
    muted: '#27272A',              // Zinc 800
    mutedForeground: '#A1A1AA',    // Zinc 400

    // ── Brand (Iron Navy Light / Cold Steel Blue-Gray) ──
    primary: '#B8C4D9',            
    primaryHover: '#D1DBE8',
    primaryForeground: '#1E232D',  // Deep Iron Navy text
    secondary: '#27272A',
    secondaryForeground: '#B8C4D9',
    ring: '#B8C4D9',

    // ── Point / Accent (Lighter Steel Blue-Gray) ──
    point: '#D1DBE8',
    pointHover: '#E6ECEF',         
    pointForeground: '#1E232D',
    pointSubtle: 'rgba(209, 219, 232, 0.12)',

    // ── Border (Highly Visible) ──
    border: '#3F3F46',             // Zinc 700
    input: '#3F3F46',

    // ── Gray Scale (Zinc) ──
    gray50: '#121214',
    gray100: '#18181A',
    gray200: '#27272A',
    gray300: '#3F3F46',
    gray400: '#52525B',
    gray500: '#71717A',
    gray600: '#A1A1AA',
    gray700: '#D4D4D8',
    gray800: '#E4E4E7',
    gray900: '#FAFAFA',

    // ── Glass & Effects ──
    glassBg: 'rgba(18, 18, 20, 0.85)',
    glassBorder: 'rgba(250, 250, 250, 0.1)',
    glassInset: 'inset 0 1px 0 rgba(250, 250, 250, 0.05)',
    glassPanelShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
    accentGlow: 'none',

    // ── Gradients ──
    gradientBrand: 'none',
    gradientBrandHover: 'none',
    gradientSubtle: 'none',
    gradientAccent: 'none',
    gradientAccentVivid: 'none',
    gradientGlow: 'none',
    gradientMesh: 'none',
    gradientSurface: 'none',
    gradientGlowShadow: 'none',

    // ── Shadow ──
    shadowColor: 'rgba(0, 0, 0, 0.9)',

    // ── Status (Deep & Clear) ──
    success: '#34D399',
    successBg: 'rgba(52, 211, 153, 0.15)',
    successForeground: '#34D399',
    warning: '#FBBF24',
    warningBg: 'rgba(251, 191, 36, 0.15)',
    warningForeground: '#FBBF24',
    error: '#F87171',
    errorBg: 'rgba(248, 113, 113, 0.15)',
    errorForeground: '#F87171',
    info: '#FAFAFA',
    infoBg: 'rgba(250, 250, 250, 0.15)',
    infoForeground: '#FAFAFA',

    // ── Interaction States ──
    interactiveHover: 'rgba(250, 250, 250, 0.08)',
    interactivePressed: 'rgba(250, 250, 250, 0.12)',
    interactiveFocus: '#FAFAFA',
    interactiveSurfaceTint: 'rgba(250, 250, 250, 0.04)',
    interactiveHoverTint: 'rgba(250, 250, 250, 0.08)',
    focusGlow: '0 0 0 2px #3F3F46',
    pointGlow: '0 0 0 2px rgba(250, 250, 250, 0.3)',

    // ── Components ──
    btnPrimarySurface: '#B8C4D9',
    btnPrimaryHover: '#D1DBE8',
    btnPrimaryEnergy: '0 4px 16px rgba(184, 196, 217, 0.25)',
    btnPrimaryInset: 'none',
    btnSecondarySurface: '#27272A',
    btnSecondaryHover: '#3F3F46',
    btnOutlineBorder: '#3F3F46',
    btnOutlineBorderHover: '#52525B',
    btnOutlineHoverBg: '#27272A',
    btnGhostHover: '#27272A',
    btnPointSurface: '#D1DBE8',
    btnPointBorder: 'transparent',
    btnPointHoverSurface: '#E6ECEF',
    btnPointHoverBorder: 'transparent',
    btnPointEnergy: '0 4px 16px rgba(209, 219, 232, 0.25)',
    btnDestructiveSurface: '#7C2128',
    btnDestructiveHover: '#9A2A32',

    inputBg: '#18181A',
    inputBorderRest: '#3F3F46',
    inputBorderHover: '#52525B',
    inputHoverGlow: '0 0 0 2px #27272A',
    inputFocusGlow: '0 0 0 2px #3F3F46',
    inputErrorGlow: '0 0 0 2px #3E1014',

    dropdownBg: '#18181A',
    dropdownShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(250,250,250,0.1)',
    dropdownItemHover: '#27272A',

    cardAccentBorder: '#3F3F46',
    cardAccentGlow: 'none',
    cardAccentHoverBorder: '#52525B',
    cardAccentHoverGlow: '0 8px 24px rgba(0, 0, 0, 0.8)',
  },
} as const satisfies Record<ThemeMode, ThemeColors>;