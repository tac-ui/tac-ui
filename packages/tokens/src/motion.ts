/**
 * Motion tokens — Tac UI Dia-inspired organic spring interactions.
 * Elements have mass and momentum. They spring into place with natural
 * deceleration rather than sliding mechanically.
 *
 * Philosophy: Dia browser (by The Browser Company) feels physical and alive.
 * UI elements have MASS and MOMENTUM — they don't just move, they spring into
 * place. The key is spring-approximation cubic-bezier curves that overshoot
 * very slightly, creating a living feel without being bouncy or distracting.
 *
 * Spring physics needs time to resolve — durations are intentionally longer
 * than "snappy" UI so the spring character reads clearly.
 */
import type { ThemeMotion } from '@tac-ui/shared';

type SpringPreset = { readonly type: 'spring'; readonly stiffness: number; readonly damping: number; readonly mass?: number };
type MotionTokens = ThemeMotion & {
  spring: Record<string, SpringPreset>;
  diaSpring: Record<string, SpringPreset>;
  keyframes: Record<string, Record<string, unknown>>;
  glow: { rotationSpeed: Record<string, number>; blur: Record<string, number>; opacity: Record<string, number>; spread: Record<string, number> };
  morph: { spring: SpringPreset; springFast: SpringPreset };
};

/** Default Dia spring — standard mass, used for layout shifts and morph transitions. */
const DIA_SPRING_DEFAULT = { type: 'spring' as const, stiffness: 260, damping: 34, mass: 1 } as const;
/** Light Dia spring — half mass, used for nimble interactive feedback. */
const DIA_SPRING_LIGHT = { type: 'spring' as const, stiffness: 260, damping: 34, mass: 0.5 } as const;

export const motion = {
  duration: {
    instant: 80,
    fast: 150,
    normal: 220,
    slow: 320,
    complex: 450,
  },
  easing: {
    /** Dia's signature curve — slight overshoot with smooth natural deceleration. */
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
    /** Exit easing — fast acceleration, abrupt departure. */
    easeIn: 'cubic-bezier(0.55, 0, 1, 0.45)',
    /** Entrance easing — gentle deceleration without overshoot. */
    easeOut: 'cubic-bezier(0, 0.55, 0.45, 1)',
    /** Symmetric ease — smooth in both directions. */
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    /** Playful overshoot — for toggles, switches, confirmatory feedback. */
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    /** Stronger spring feel — deliberate physical presence. */
    spring: 'cubic-bezier(0.22, 1.2, 0.36, 1)',
    /** Subtle rubber-band — elastic resistance with quick snap back. */
    elastic: 'cubic-bezier(0.68, -0.2, 0.265, 1.2)',
  },
  /** Framer Motion spring presets calibrated for Dia-style organic feel. */
  spring: {
    /** Quick interactive feedback — subtle and responsive. */
    snappy: { type: 'spring' as const, stiffness: 260, damping: 28 },
    /** Smooth state changes — gentle spring resolution. */
    gentle: { type: 'spring' as const, stiffness: 180, damping: 26 },
    /** Toggle/switch feel — restrained with minimal bounce. */
    bouncy: { type: 'spring' as const, stiffness: 260, damping: 24 },
    /** Large layout shifts — deliberate mass with controlled deceleration. */
    slow: { type: 'spring' as const, stiffness: 140, damping: 24 },
    /** Press/release with life — elastic resistance, mass gives it weight. */
    elastic: { type: 'spring' as const, stiffness: 220, damping: 22, mass: 0.8 },
    /** Elements appearing — spring resolves cleanly with organic arrival. */
    entrance: { type: 'spring' as const, stiffness: 180, damping: 24, mass: 0.9 },
  },
  /** Mass-differentiated spring configs for Dia Browser-like physics interactions. */
  diaSpring: {
    default: DIA_SPRING_DEFAULT,
    light: DIA_SPRING_LIGHT,
    heavy: { type: 'spring' as const, stiffness: 220, damping: 32, mass: 1.5 },
    magnetic: { type: 'spring' as const, stiffness: 340, damping: 38, mass: 0.8 },
    entrance: { type: 'spring' as const, stiffness: 180, damping: 28, mass: 1.2 },
  },
  /** Standard animation keyframe presets for reuse across components. */
  keyframes: {
    fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
    fadeOut: { from: { opacity: '1' }, to: { opacity: '0' } },
    /** Blur entrance — element fades in from blurry with subtle upward spring motion. */
    blurFadeIn: {
      from: { opacity: '0', filter: 'blur(4px)', transform: 'translateY(4px)' },
      to: { opacity: '1', filter: 'blur(0px)', transform: 'translateY(0)' },
    },
    /** Blur scale entrance — deblurs while gently scaling up from slight compression. */
    blurScaleIn: {
      from: { opacity: '0', filter: 'blur(3px)', transform: 'scale(0.98)' },
      to: { opacity: '1', filter: 'blur(0px)', transform: 'scale(1)' },
    },
    /** Slide entrance from below — element springs up from offset position. */
    slideInUp: { from: { opacity: '0', transform: 'translateY(5px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
    /** Slide entrance from above — element springs down from offset position. */
    slideInDown: { from: { opacity: '0', transform: 'translateY(-5px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
    /** Slide entrance from left — element springs in from offset. */
    slideInLeft: { from: { opacity: '0', transform: 'translateX(-5px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
    /** Slide entrance from right — element springs in from offset. */
    slideInRight: { from: { opacity: '0', transform: 'translateX(5px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
    /** Scale entrance — element inflates from slight compression. */
    scaleIn: { from: { opacity: '0', transform: 'scale(0.98)' }, to: { opacity: '1', transform: 'scale(1)' } },
    scaleOut: { from: { opacity: '1', transform: 'scale(1)' }, to: { opacity: '0', transform: 'scale(0.98)' } },
    /** Zoom entrance — element arrives from meaningful distance, not just nearby. */
    zoomIn: { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
    /** Press feedback — subtle scale to confirm tap/click with physical weight. */
    pressDown: { from: { transform: 'scale(1)' }, to: { transform: 'scale(0.98)' } },
    /** Press keyframes — clean squish held at destination. */
    elasticPress: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(0.98)' },
      '100%': { transform: 'scale(0.98)' },
    },
    /** Release keyframes — spring overshoots slightly then resolves to rest. */
    elasticRelease: {
      '0%': { transform: 'scale(0.98)' },
      '50%': { transform: 'scale(1.005)' },
      '100%': { transform: 'scale(1)' },
    },
    /** Lift — subtle elevation shift on hover, element has mass. */
    liftUp: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-1px)' } },
    /** Glow pulse — ambient glow to indicate active state. */
    glowPulse: {
      '0%, 100%': { boxShadow: '0 0 0 0 color-mix(in srgb, var(--point) 0%, transparent)' },
      '50%': { boxShadow: '0 0 12px 2px color-mix(in srgb, var(--point) 20%, transparent)' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    gradientShimmer: {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
    /** Gradient glow — soft glow for decorative emphasis. */
    gradientGlow: {
      '0%, 100%': { boxShadow: '0 0 0 0 color-mix(in srgb, var(--point) 0%, transparent)' },
      '50%': { boxShadow: '0 0 16px 3px color-mix(in srgb, var(--point) 15%, transparent)' },
    },
    /** Spotlight pulse — radial glow that breathes gently. */
    spotlightPulse: {
      '0%, 100%': { opacity: '0' },
      '50%': { opacity: '1' },
    },
    spin: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
    pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
    bounce: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-2px)' } },
    /** Float — gentle hovering motion with spring-like rhythm. */
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-2px)' },
    },
  },
  /** Glow animation configuration for border glow effects. */
  glow: {
    /** Rotation speed in seconds for the border glow sweep. */
    rotationSpeed: { idle: 3, focused: 1.5 },
    /** Blur radius in px applied to the glow trail. */
    blur: { idle: 8, focused: 16 },
    /** Opacity of the glow sweep. */
    opacity: { idle: 0.3, focused: 0.6 },
    /** Conic gradient color stop percentages. */
    spread: { transparent: 25, start: 40, peak: 50, end: 60, fadeOut: 75 },
  },
  /** Layout morphing spring config — for FLIP transitions between components. */
  morph: {
    /** Spring config for morph transitions — references diaSpring.default. */
    spring: DIA_SPRING_DEFAULT,
    /** Faster variant for small elements. */
    springFast: { type: 'spring' as const, stiffness: 400, damping: 35, mass: 0.8 },
  },
} as const satisfies MotionTokens;

/** Standalone export of Dia spring presets for direct consumption in packages/web. */
export const diaSpring = motion.diaSpring;
