import { tacSpring } from '@tac-ui/tokens';

export { tacSpring };

/** CSS transition easing — spring feel without overshoot. */
export const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** CSS transition durations (string for inline styles). */
export const DURATION = {
  fast: '150ms',
  moderate: '200ms',
  normal: '220ms',
  slow: '350ms',
} as const;

/** Framer Motion exit duration in seconds. */
export const EXIT_DURATION = 0.15;

/** Framer Motion overlay fade duration in seconds. */
export const OVERLAY_DURATION = 0.2;

/** Shared dropdown panel motion variants for Select, Combobox, Dropdown, DatePicker, ColorPicker. */
export const dropdownMotionVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: -4,
    transition: tacSpring.magnetic,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: tacSpring.magnetic,
  },
};

/** Overlay panel entrance for Modal/Dialog/Popover. */
export const panelVariants = {
  hidden: { opacity: 0, scale: 0.97, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: tacSpring.heavy,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
    transition: { duration: EXIT_DURATION },
  },
};

/** Blur-fade entrance/exit for feedback & status components (Alert, EmptyState, Toast, Snackbar). */
export const fadeVariants = {
  hidden: { opacity: 0, filter: 'blur(4px)', y: 6 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: tacSpring.entrance,
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(4px)',
    transition: { duration: EXIT_DURATION },
  },
};

/** Element removal exit — scale down + fade (Chip, Badge, Skeleton). */
export const exitVariants = {
  initial: { scale: 1, opacity: 1 },
  exit: { scale: 0.85, opacity: 0, transition: { duration: EXIT_DURATION } },
};

/** Entrance fade for page-level content. */
export const pageEntrance = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: tacSpring.entrance },
};
