import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring, EASING, DURATION } from '../constants/motion';

/** Props for the Toggle component, a button that swaps icons with a rotation animation on toggle. */
export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** The controlled checked state. */
  checked?: boolean;
  /** Callback fired when the toggle is clicked, receives the new checked value. */
  onChange?: (checked: boolean) => void;
  /** Icon rendered when `checked` is true. */
  iconOn?: React.ReactNode;
  /** Icon rendered when `checked` is false. */
  iconOff?: React.ReactNode;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, checked = false, onChange, iconOn, iconOff, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={checked}
        onClick={() => onChange?.(!checked)}
        style={{
          transition:
            `background ${DURATION.normal} ${EASING}, box-shadow ${DURATION.normal} ${EASING}`,
        }}
        className={cn(
          'relative w-10 h-10 flex items-center justify-center rounded-[var(--radius-m)] border-none cursor-pointer',
          'bg-transparent hover:bg-[var(--interactive-surface-tint)]',
          className,
        )}
        {...props}
      >
        {mounted ? (
          <AnimatePresence initial={false}>
            <motion.span
              key={checked ? 'on' : 'off'}
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={tacSpring.light}
              className="absolute w-5 h-5 text-[var(--foreground)] [&>svg]:w-5 [&>svg]:h-5"
            >
              {checked ? iconOn : iconOff}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span className="w-5 h-5 text-[var(--foreground)] [&>svg]:w-5 [&>svg]:h-5">{checked ? iconOn : iconOff}</span>
        )}
      </button>
    );
  },
);
Toggle.displayName = 'Toggle';

/** @deprecated Use Toggle instead. */
export const AnimatedToggle = Toggle;
/** @deprecated Use ToggleProps instead. */
export type AnimatedToggleProps = ToggleProps;
