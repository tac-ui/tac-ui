/**
 * Semantic color tokens — Tac UI brand palette.
 * Monochrome + Indigo: Ink Black primary, Royal Indigo accent.
 * Neutral: Zinc scale.
 */
import type { ThemeMode, ThemeColors } from '@tac-ui/shared';

export const semanticTokens = {
  light: {
    // ── Canvas & Surface ──
    background: '#FAFAFA',
    backgroundSubtle: '#F4F4F5',
    surface: '#FFFFFF',
    surfaceHover: '#F4F4F5',
    surfaceBase: '#FAFAFA',
    surfaceElevatedLow: '#FFFFFF',
    surfaceElevatedMid: '#FFFFFF',
    surfaceElevatedHigh: '#FFFFFF',
    card: '#FFFFFF',
    cardForeground: '#18181B',

    // ── Text ──
    foreground: '#18181B',
    muted: '#F4F4F5',
    mutedForeground: '#71717A',

    // ── Brand (Ink Black) ──
    primary: '#18181B',
    primaryHover: '#27272A',
    primaryForeground: '#FFFFFF',
    secondary: '#F4F4F5',
    secondaryForeground: '#18181B',
    ring: '#18181B',

    // ── Point / Accent (Royal Indigo) ──
    point: '#5856D6',
    pointHover: '#4B49B8',
    pointForeground: '#FFFFFF',
    pointSubtle: 'rgba(88, 86, 214, 0.1)',

    // ── Border ──
    border: '#E4E4E7',
    input: '#E4E4E7',

    // ── Gray Scale (Zinc) ──
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
    glassBg: 'rgba(255, 255, 255, 0.85)',
    glassBorder: 'rgba(24, 24, 27, 0.04)',
    glassInset: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    glassPanelShadow: '0 12px 40px rgba(24, 24, 27, 0.04), 0 1px 3px rgba(24, 24, 27, 0.02)',
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
    shadowColor: 'rgba(24, 24, 27, 0.05)',

    // ── Status ──
    success: '#166534',
    successBg: '#DCFCE7',
    successForeground: '#166534',
    warning: '#854D0E',
    warningBg: '#FEF9C3',
    warningForeground: '#854D0E',
    error: '#991B1B',
    errorBg: '#FEE2E2',
    errorForeground: '#991B1B',
    info: '#18181B',
    infoBg: '#F4F4F5',
    infoForeground: '#18181B',

    // ── Interaction States ──
    interactiveHover: 'rgba(24, 24, 27, 0.04)',
    interactivePressed: 'rgba(24, 24, 27, 0.08)',
    interactiveFocus: '#18181B',
    interactiveSurfaceTint: 'rgba(0, 0, 0, 0.02)',
    interactiveHoverTint: 'rgba(0, 0, 0, 0.04)',
    focusGlow: '0 0 0 3px rgba(24, 24, 27, 0.1)',
    pointGlow: '0 0 0 2px rgba(88, 86, 214, 0.2)',

    // ── Components ──
    btnPrimarySurface: '#18181B',
    btnPrimaryHover: '#27272A',
    btnPrimaryEnergy: '0 4px 12px rgba(24, 24, 27, 0.15)',
    btnPrimaryInset: 'none',
    btnSecondarySurface: '#F4F4F5',
    btnSecondaryHover: '#E4E4E7',
    btnOutlineBorder: '#D4D4D8',
    btnOutlineBorderHover: '#A1A1AA',
    btnOutlineHoverBg: '#F9FAFB',
    btnGhostHover: '#F4F4F5',
    btnPointSurface: '#5856D6',
    btnPointBorder: 'transparent',
    btnPointHoverSurface: '#4B49B8',
    btnPointHoverBorder: 'transparent',
    btnPointEnergy: '0 4px 12px rgba(88, 86, 214, 0.2)',
    btnDestructiveSurface: '#DC2626',
    btnDestructiveHover: '#B91C1C',

    inputBg: '#F4F4F5',
    inputBorderRest: '#D4D4D8',
    inputBorderHover: '#A1A1AA',
    inputHoverGlow: '0 0 0 2px rgba(0, 0, 0, 0.04)',
    inputFocusGlow: '0 0 0 2px rgba(24, 24, 27, 0.15)',
    inputErrorGlow: '0 0 0 2px #FEE2E2',

    dropdownBg: '#FFFFFF',
    dropdownShadow: '0 20px 25px -5px rgba(24, 24, 27, 0.08), 0 0 0 1px rgba(24, 24, 27, 0.03)',
    dropdownItemHover: '#F4F4F5',

    cardAccentBorder: '#E4E4E7',
    cardAccentGlow: 'none',
    cardAccentHoverBorder: '#D4D4D8',
    cardAccentHoverGlow: '0 8px 24px rgba(24, 24, 27, 0.06)',
  },
  dark: {
    // ── Canvas & Surface ──
    background: '#09090B',
    backgroundSubtle: '#18181B',
    surface: '#27272A',
    surfaceHover: '#3F3F46',
    surfaceBase: '#09090B',
    surfaceElevatedLow: '#18181B',
    surfaceElevatedMid: '#27272A',
    surfaceElevatedHigh: '#3F3F46',
    card: '#18181B',
    cardForeground: '#FAFAFA',

    // ── Text ──
    foreground: '#FAFAFA',
    muted: '#27272A',
    mutedForeground: '#A1A1AA',

    // ── Brand (Inverted — Near-White) ──
    primary: '#FAFAFA',
    primaryHover: '#E4E4E7',
    primaryForeground: '#18181B',
    secondary: '#27272A',
    secondaryForeground: '#FAFAFA',
    ring: '#FAFAFA',

    // ── Point / Accent (Royal Indigo) ──
    point: '#5E5CE6',
    pointHover: '#7A78F0',
    pointForeground: '#FFFFFF',
    pointSubtle: 'rgba(94, 92, 230, 0.15)',

    // ── Border ──
    border: '#3F3F46',
    input: '#3F3F46',

    // ── Gray Scale (Zinc Inverted) ──
    gray50: '#09090B',
    gray100: '#18181B',
    gray200: '#27272A',
    gray300: '#3F3F46',
    gray400: '#52525B',
    gray500: '#71717A',
    gray600: '#A1A1AA',
    gray700: '#D4D4D8',
    gray800: '#E4E4E7',
    gray900: '#FAFAFA',

    // ── Glass & Effects ──
    glassBg: 'rgba(9, 9, 11, 0.85)',
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

    // ── Status ──
    success: '#4ADE80',
    successBg: 'rgba(74, 222, 128, 0.15)',
    successForeground: '#4ADE80',
    warning: '#FACC15',
    warningBg: 'rgba(250, 204, 21, 0.15)',
    warningForeground: '#FACC15',
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
    interactiveSurfaceTint: 'rgba(255, 255, 255, 0.04)',
    interactiveHoverTint: 'rgba(255, 255, 255, 0.08)',
    focusGlow: '0 0 0 3px rgba(250, 250, 250, 0.15)',
    pointGlow: '0 0 0 2px rgba(94, 92, 230, 0.3)',

    // ── Components ──
    btnPrimarySurface: '#FAFAFA',
    btnPrimaryHover: '#E4E4E7',
    btnPrimaryEnergy: '0 4px 16px rgba(250, 250, 250, 0.1)',
    btnPrimaryInset: 'none',
    btnSecondarySurface: '#27272A',
    btnSecondaryHover: '#3F3F46',
    btnOutlineBorder: '#3F3F46',
    btnOutlineBorderHover: '#52525B',
    btnOutlineHoverBg: '#18181B',
    btnGhostHover: '#27272A',
    btnPointSurface: '#5E5CE6',
    btnPointBorder: 'transparent',
    btnPointHoverSurface: '#7A78F0',
    btnPointHoverBorder: 'transparent',
    btnPointEnergy: '0 4px 16px rgba(94, 92, 230, 0.3)',
    btnDestructiveSurface: '#EF4444',
    btnDestructiveHover: '#F87171',

    inputBg: '#27272A',
    inputBorderRest: '#3F3F46',
    inputBorderHover: '#52525B',
    inputHoverGlow: '0 0 0 2px rgba(255, 255, 255, 0.04)',
    inputFocusGlow: '0 0 0 2px rgba(250, 250, 250, 0.15)',
    inputErrorGlow: '0 0 0 2px rgba(248, 113, 113, 0.3)',

    dropdownBg: '#18181B',
    dropdownShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(250, 250, 250, 0.1)',
    dropdownItemHover: '#27272A',

    cardAccentBorder: '#3F3F46',
    cardAccentGlow: 'none',
    cardAccentHoverBorder: '#52525B',
    cardAccentHoverGlow: '0 8px 24px rgba(0, 0, 0, 0.8)',
  },
} as const satisfies Record<ThemeMode, ThemeColors>;
