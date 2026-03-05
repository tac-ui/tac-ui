/**
 * Motion tokens — Tac UI organic spring interactions.
 * Elements have mass and momentum. They spring into place with natural
 * deceleration rather than sliding mechanically.
 *
 * Spring physics needs time to resolve — durations are intentionally longer
 * than "snappy" UI so the spring character reads clearly.
 */
import type { ThemeMotion } from '@tac-ui/shared';

type SpringPreset = {
  readonly type: 'spring';
  readonly stiffness: number;
  readonly damping: number;
  readonly mass?: number;
};
type MotionTokens = ThemeMotion & {
  spring: Record<string, SpringPreset>;
  tacSpring: Record<string, SpringPreset>;
  keyframes: Record<string, Record<string, unknown>>;
  glow: {
    rotationSpeed: Record<string, number>;
    blur: Record<string, number>;
    opacity: Record<string, number>;
    spread: Record<string, number>;
  };
  morph: { spring: SpringPreset; springFast: SpringPreset };
};

/** Default spring — standard mass, tuned damping for natural deceleration. */
const TAC_SPRING_DEFAULT = { type: 'spring' as const, stiffness: 300, damping: 35, mass: 1 } as const;
/** Light spring — half mass, tuned for nimble interactive feedback. */
const TAC_SPRING_LIGHT = { type: 'spring' as const, stiffness: 350, damping: 35, mass: 0.5 } as const;

export const motion = {
  duration: {
    instant: 80,
    fast: 150,
    normal: 220,
    slow: 320,
    complex: 450,
  },
  easing: {
    /** Slight overshoot with smooth natural deceleration. */
    standard: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    /** Exit easing — fast acceleration, abrupt departure. */
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
    /** Entrance easing — gentle deceleration without overshoot. */
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    /** Symmetric ease — smooth in both directions. */
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    /** Restrained overshoot — for toggles, switches, confirmatory feedback. */
    bounce: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
    /** Subtle spring feel — deliberate physical presence. */
    spring: 'cubic-bezier(0.22, 1.1, 0.36, 1)',
    /** Subtle rubber-band — elastic resistance with quick snap back. */
    elastic: 'cubic-bezier(0.68, -0.1, 0.265, 1.1)',
  },
  /** Framer Motion spring presets — tuned with higher damping for natural deceleration. */
  spring: {
    /** Quick interactive feedback — subtle and responsive. */
    snappy: { type: 'spring' as const, stiffness: 260, damping: 32 },
    /** Smooth state changes — gentle spring resolution. */
    gentle: { type: 'spring' as const, stiffness: 180, damping: 30 },
    /** Toggle/switch feel — restrained with minimal bounce. */
    bouncy: { type: 'spring' as const, stiffness: 260, damping: 30 },
    /** Large layout shifts — deliberate mass with controlled deceleration. */
    slow: { type: 'spring' as const, stiffness: 140, damping: 28 },
    /** Press/release with life — elastic resistance, mass gives it weight. */
    elastic: { type: 'spring' as const, stiffness: 220, damping: 28, mass: 0.8 },
    /** Elements appearing — spring resolves cleanly with organic arrival. */
    entrance: { type: 'spring' as const, stiffness: 180, damping: 28, mass: 0.9 },
  },
  /** Mass-differentiated spring configs — tuned higher damping for smooth deceleration. */
  tacSpring: {
    default: TAC_SPRING_DEFAULT,
    light: TAC_SPRING_LIGHT,
    heavy: { type: 'spring' as const, stiffness: 250, damping: 38, mass: 1.5 },
    magnetic: { type: 'spring' as const, stiffness: 400, damping: 40, mass: 0.8 },
    entrance: { type: 'spring' as const, stiffness: 220, damping: 32, mass: 1.2 },
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
    slideInUp: {
      from: { opacity: '0', transform: 'translateY(5px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    /** Slide entrance from above — element springs down from offset position. */
    slideInDown: {
      from: { opacity: '0', transform: 'translateY(-5px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    /** Slide entrance from left — element springs in from offset. */
    slideInLeft: {
      from: { opacity: '0', transform: 'translateX(-5px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
    /** Slide entrance from right — element springs in from offset. */
    slideInRight: {
      from: { opacity: '0', transform: 'translateX(5px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
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
    /** Spring config for morph transitions — references tacSpring.default. */
    spring: TAC_SPRING_DEFAULT,
    /** Faster variant for small elements. */
    springFast: { type: 'spring' as const, stiffness: 450, damping: 35, mass: 0.8 },
  },
} as const satisfies MotionTokens;

/** Standalone export of Tac spring presets for direct consumption in packages/web. */
export const tacSpring = motion.tacSpring;

/** Platform-agnostic spring configs — usable by both Framer Motion and reanimated.
 *  Merges motion.spring + motion.tacSpring presets without the `type` field. */
export const springConfigs = {
  default: { stiffness: 300, damping: 35, mass: 1 },
  snappy: { stiffness: 260, damping: 32, mass: 1 },
  gentle: { stiffness: 180, damping: 30, mass: 1 },
  bouncy: { stiffness: 260, damping: 30, mass: 1 },
  magnetic: { stiffness: 400, damping: 40, mass: 0.8 },
  entrance: { stiffness: 180, damping: 28, mass: 0.9 },
  light: { stiffness: 350, damping: 35, mass: 0.5 },
  heavy: { stiffness: 250, damping: 38, mass: 1.5 },
  elastic: { stiffness: 220, damping: 28, mass: 0.8 },
  slow: { stiffness: 140, damping: 28, mass: 1 },
} as const;
