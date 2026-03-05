/** Theme mode */
export type ThemeMode = 'light' | 'dark';
/** Theme preference including system auto-detection */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Semantic color tokens */
export interface ThemeColors {
  /** Main page background color */
  background: string;
  /** Subtle background variant for cards and sections */
  backgroundSubtle: string;
  /** Primary text and content color */
  foreground: string;
  /** Surface/card background color */
  surface: string;
  /** Surface color on hover interaction */
  surfaceHover: string;
  /** Brand primary color */
  primary: string;
  /** Brand primary color on hover */
  primaryHover: string;
  /** Text color on primary backgrounds */
  primaryForeground: string;
  /** Secondary action and background color */
  secondary: string;
  /** Text color on secondary backgrounds */
  secondaryForeground: string;
  /** Muted background for low-emphasis elements */
  muted: string;
  /** Text color on muted backgrounds */
  mutedForeground: string;
  /** Card component background */
  card: string;
  /** Text color on card backgrounds */
  cardForeground: string;
  /** Default border color */
  border: string;
  /** Input field border color */
  input: string;
  /** Focus ring color */
  ring: string;
  /** Accent/point highlight color */
  point: string;
  /** Accent/point color on hover */
  pointHover: string;
  /** Text color on point/accent backgrounds */
  pointForeground: string;
  /** Subtle tint of the point/accent color */
  pointSubtle: string;
  /** Glow effect value for accent elements */
  accentGlow: string;
  // Glass
  /** Semi-transparent glassmorphism background */
  glassBg: string;
  /** Glassmorphism border color */
  glassBorder: string;
  // Status colors
  /** Success state color */
  success: string;
  /** Success state background */
  successBg: string;
  /** Text color on success backgrounds */
  successForeground: string;
  /** Warning state color */
  warning: string;
  /** Warning state background */
  warningBg: string;
  /** Text color on warning backgrounds */
  warningForeground: string;
  /** Error/destructive state color */
  error: string;
  /** Error state background */
  errorBg: string;
  /** Text color on error backgrounds */
  errorForeground: string;
  /** Informational state color */
  info: string;
  /** Info state background */
  infoBg: string;
  /** Text color on info backgrounds */
  infoForeground: string;
  // Gradients
  /** Brand gradient for primary CTAs and hero elements */
  gradientBrand: string;
  /** Brand gradient on hover state */
  gradientBrandHover: string;
  /** Subtle low-opacity gradient for section backgrounds */
  gradientSubtle: string;
  /** Accent directional gradient */
  gradientAccent: string;
  /** High-contrast vivid accent gradient */
  gradientAccentVivid: string;
  /** Radial glow gradient for atmospheric top-of-page effects */
  gradientGlow: string;
  /** Multi-point mesh gradient for rich, layered backgrounds */
  gradientMesh: string;
  /** Layered surface gradient conveying depth and elevation */
  gradientSurface: string;
  /** Box-shadow glow effect combining blur spread and brand color */
  gradientGlowShadow: string;
  // Shadow
  /** Base shadow color (semi-transparent, used in box-shadow values) */
  shadowColor: string;
  // Gray scale
  /** Lightest gray — subtle page backgrounds */
  gray50: string;
  /** Very light gray — dividers and tinted areas */
  gray100: string;
  /** Light gray — borders and rule lines */
  gray200: string;
  /** Light-medium gray */
  gray300: string;
  /** Medium gray — placeholder text */
  gray400: string;
  /** Medium gray — secondary/supporting text */
  gray500: string;
  /** Medium-dark gray — body text */
  gray600: string;
  /** Dark gray — headings and labels */
  gray700: string;
  /** Very dark gray */
  gray800: string;
  /** Darkest gray — near-black foreground */
  gray900: string;
  // Surface layers
  /** Base surface layer — lowest elevation (page canvas) */
  surfaceBase: string;
  /** Elevated surface at low depth (e.g., cards, sidebars) */
  surfaceElevatedLow: string;
  /** Elevated surface at mid depth (e.g., modals, dropdowns) */
  surfaceElevatedMid: string;
  /** Elevated surface at high depth (e.g., dialogs, tooltips) */
  surfaceElevatedHigh: string;
  // Interactive states
  /** Background overlay applied on hover interactions */
  interactiveHover: string;
  /** Background overlay applied on press/active interactions */
  interactivePressed: string;
  /** Focus indicator color for keyboard-navigable elements */
  interactiveFocus: string;

  // Button tokens
  /** Primary button surface color */
  btnPrimarySurface: string;
  /** Primary button hover surface color */
  btnPrimaryHover: string;
  /** Primary button energy effect (inset glow or shadow depth) */
  btnPrimaryEnergy: string;
  /** Primary button inset highlight */
  btnPrimaryInset: string;
  /** Secondary button surface color */
  btnSecondarySurface: string;
  /** Secondary button hover surface color */
  btnSecondaryHover: string;
  /** Outline button border color */
  btnOutlineBorder: string;
  /** Outline button border hover color */
  btnOutlineBorderHover: string;
  /** Outline button hover background tint */
  btnOutlineHoverBg: string;
  /** Ghost button hover background */
  btnGhostHover: string;
  /** Point button surface color */
  btnPointSurface: string;
  /** Point button border color */
  btnPointBorder: string;
  /** Point button hover surface color */
  btnPointHoverSurface: string;
  /** Point button hover border color */
  btnPointHoverBorder: string;
  /** Point button energy effect (glow bloom or shadow cast) */
  btnPointEnergy: string;
  /** Destructive button surface color */
  btnDestructiveSurface: string;
  /** Destructive button hover modifier */
  btnDestructiveHover: string;

  // Shared interactive tokens
  /** Subtle surface tint for interactive elements */
  interactiveSurfaceTint: string;
  /** Hover tint for interactive elements */
  interactiveHoverTint: string;
  /** Focus glow effect (dual-ring shadow) */
  focusGlow: string;
  /** Point/accent glow effect */
  pointGlow: string;
  /** Glass inset highlight */
  glassInset: string;
  /** Glass panel shadow */
  glassPanelShadow: string;

  // Input tokens
  /** Input field background */
  inputBg: string;
  /** Input border at rest state */
  inputBorderRest: string;
  /** Input border on hover */
  inputBorderHover: string;
  /** Input hover glow effect */
  inputHoverGlow: string;
  /** Input focus glow effect */
  inputFocusGlow: string;
  /** Input error glow effect */
  inputErrorGlow: string;

  // Dropdown tokens
  /** Dropdown panel background */
  dropdownBg: string;
  /** Dropdown panel shadow */
  dropdownShadow: string;
  /** Dropdown item hover background */
  dropdownItemHover: string;

  // Card accent tokens
  /** Card accent border color */
  cardAccentBorder: string;
  /** Card accent glow effect */
  cardAccentGlow: string;
  /** Card accent border on hover */
  cardAccentHoverBorder: string;
  /** Card accent glow on hover */
  cardAccentHoverGlow: string;
}

/** Typography scale entry */
export interface TypeScaleEntry {
  size: number;
  weight: number;
  lineHeight: number;
  /** Optional letter spacing multiplier (em units) */
  letterSpacing?: number;
}

/** Typography tokens */
export interface ThemeTypography {
  fontFamily: {
    primary: string;
    secondary: string;
    display: string;
  };
  display: {
    lg: TypeScaleEntry;
    md: TypeScaleEntry;
    sm: TypeScaleEntry;
  };
  heading: {
    h1: TypeScaleEntry;
    h2: TypeScaleEntry;
    h3: TypeScaleEntry;
    h4: TypeScaleEntry;
    h5: TypeScaleEntry;
    h6: TypeScaleEntry;
  };
  body: {
    lg: TypeScaleEntry;
    md: TypeScaleEntry;
    sm: TypeScaleEntry;
  };
  caption: TypeScaleEntry;
  fontWeight: {
    light: string;
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

/** Spacing tokens */
export interface ThemeSpacing {
  '2xs': number;
  xs: number;
  sm: number;
  m: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

/** Border radius tokens */
export interface ThemeRadius {
  none: number;
  xs: number;
  sm: number;
  m: number;
  lg: number;
  xl: number;
  '2xl': number;
  pill: number;
}

/** Elevation / shadow tokens */
export interface ThemeElevation {
  sm: string;
  m: string;
  lg: string;
  xl: string;
  glass: string;
  glassLg: string;
}

/** Motion / animation tokens */
export interface ThemeMotion {
  duration: {
    instant: number;
    fast: number;
    normal: number;
    slow: number;
    complex: number;
  };
  easing: {
    standard: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    bounce: string;
    spring: string;
    elastic: string;
  };
}

/** Chart tokens */
export interface ThemeChart {
  colors: string[];
  grid: string;
  axis: string;
  label: string;
  tooltipBg: string;
  lineWidth: number;
  dotSize: number;
  barRadius: number;
  areaOpacity: number;
}

/** Full theme object */
export interface TacTheme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  elevation: ThemeElevation;
  motion: ThemeMotion;
  chart: ThemeChart;
}

/** Breakpoint values */
export interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

/** Grid system config */
export interface GridConfig {
  columns: number;
  gutter: number;
  margin: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

/** Container max-widths */
export interface Containers {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

/** Component size variants */
export type ComponentSize = 'sm' | 'md' | 'lg';

/** Component variant for buttons */
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'point';

/** Badge variant */
export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'glass';

/** Status variant (shared across components) */
export type StatusVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/** Chip variant */
export type ChipVariant = 'filter' | 'assist' | 'suggestion' | 'input' | 'glass';

/** Tab variant */
export type TabVariant = 'underline' | 'pill' | 'outline' | 'icon';

/** Divider variant */
export type DividerVariant = 'full' | 'inset' | 'thick' | 'withLabel';

/** Snackbar variant */
export type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/** Avatar size */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
