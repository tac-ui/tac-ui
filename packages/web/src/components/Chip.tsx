import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { tacSpring, exitVariants } from '../constants/motion';

const chipVariants = cva(
  'inline-flex items-center gap-2 py-2 px-4 text-[13px] rounded-[var(--radius-pill)] cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        filter:
          'bg-[var(--interactive-surface-tint)] [backdrop-filter:blur(24px)_saturate(180%)] text-[color:var(--point)] font-medium border border-solid border-[var(--border)] hover:border-[var(--card-accent-hover-border)]',
        assist:
          'bg-[var(--secondary)] text-[var(--foreground)] font-medium border border-solid border-[var(--border)] hover:bg-[var(--secondary)]/80',
        suggestion:
          'bg-transparent text-[var(--muted-foreground)] font-medium border border-dashed border-[var(--border)] hover:bg-[var(--secondary)]/50 hover:text-[var(--foreground)]',
        input:
          'bg-[var(--secondary)]/50 text-[var(--foreground)] font-medium border border-solid border-[var(--border)] hover:bg-[var(--secondary)]',
        glass:
          'bg-[var(--interactive-surface-tint)] [backdrop-filter:blur(40px)_saturate(180%)] text-[var(--foreground)] font-medium border border-solid border-[var(--glass-border)] hover:bg-[var(--interactive-hover-tint)]',
      },
    },
    defaultVariants: { variant: 'filter' },
  },
);

/** Visual/behavioral style of the Chip. */
export type ChipVariant = 'filter' | 'assist' | 'suggestion' | 'input' | 'glass';

/** Props for the Chip component, which represents a compact interactive element such as a filter tag or suggestion. */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipVariants> {
  /** Visual style of the chip. @example variant="filter" */
  variant?: ChipVariant;
  /** Icon rendered to the left of the chip label. */
  leftIcon?: React.ReactNode;
  /** Callback fired when the dismiss (×) button is clicked. Renders the dismiss button when provided. */
  onDismiss?: () => void;
}

const MotionButton = motion.button;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, leftIcon, onDismiss, children, disabled, ...props }, ref) => (
    <MotionButton
      ref={ref}
      type="button"
      disabled={disabled}
      whileHover={!disabled ? { scale: 1, transition: tacSpring.light } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      style={{ transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      className={cn(chipVariants({ variant }), leftIcon && 'py-2 px-3', className)}
      {...(props as React.ComponentPropsWithoutRef<typeof MotionButton>)}
    >
      {leftIcon && (
        <span className="flex items-center justify-center w-3.5 h-3.5 shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">
          {leftIcon}
        </span>
      )}
      {children}
      <AnimatePresence>
        {onDismiss && (
          <motion.span
            key="delete"
            variants={exitVariants}
            initial="initial"
            exit="exit"
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onDismiss();
              }
            }}
            style={{ transition: 'opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            className="flex items-center justify-center w-3.5 h-3.5 shrink-0 bg-transparent border-none cursor-pointer opacity-70 hover:opacity-100"
            aria-label="Remove"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2L2 8" />
              <path d="M2 2l6 6" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </MotionButton>
  ),
);
Chip.displayName = 'Chip';

export { chipVariants };
