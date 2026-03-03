import { diaSpring } from '@tac-ui/tokens';

export { diaSpring };

/** Shared dropdown panel motion variants for Select, Combobox, Dropdown, DatePicker, ColorPicker. */
export const dropdownMotionVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: -4,
    transition: diaSpring.magnetic,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: diaSpring.magnetic,
  },
};

/** Overlay panel entrance for Modal/Dialog/Popover. */
export const panelVariants = {
  hidden: { opacity: 0, scale: 0.97, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: diaSpring.heavy,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
    transition: { duration: 0.15 },
  },
};

/** Blur-fade entrance/exit for feedback & status components (Alert, EmptyState, Toast, Snackbar). */
export const fadeVariants = {
  hidden: { opacity: 0, filter: 'blur(4px)', y: 6 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: diaSpring.entrance,
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(4px)',
    transition: { duration: 0.15 },
  },
};

/** Element removal exit — scale down + fade (Chip, Badge, Skeleton). */
export const exitVariants = {
  initial: { scale: 1, opacity: 1 },
  exit: { scale: 0.85, opacity: 0, transition: { duration: 0.15 } },
};

/** Entrance fade for page-level content. */
export const pageEntrance = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: diaSpring.entrance },
};
