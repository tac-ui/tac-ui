'use client';

import React, { forwardRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

import { tacSpring, EXIT_DURATION } from '../constants/motion';
import type { MotionConflictingHandlers } from '../constants/types';
import { focusRing } from '../constants/styles';

const snackbarVariants = cva(
  'group fixed bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 flex items-center gap-3 pl-5 pr-4 py-3.5 sm:min-w-[320px] max-w-[560px] sm:w-auto rounded-[var(--radius-lg)] z-[var(--z-toast)] [backdrop-filter:blur(40px)_saturate(180%)] bg-[var(--card)]',
  {
    variants: {
      variant: {
        default: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        success: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        error: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        warning: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        info: 'text-[var(--foreground)] [box-shadow:var(--glass-panel-shadow),var(--glass-inset)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

const dotColorMap = {
  default: '',
  success: 'bg-[var(--success)]',
  error: 'bg-[var(--error)]',
  warning: 'bg-[var(--warning)]',
  info: 'bg-[var(--info)]',
};

const textColorMap = {
  default: 'text-[var(--foreground)]',
  success: 'text-[var(--success-foreground)]',
  error: 'text-[var(--error-foreground)]',
  warning: 'text-[var(--warning-foreground)]',
  info: 'text-[var(--info-foreground)]',
};

/** Color and semantic variant for the Snackbar component. */
export type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Fixed-position toast notification that auto-dismisses after a configurable duration.
 * @example <Snackbar open={open} onClose={handleClose} variant="success">Item saved.</Snackbar>
 */
export interface SnackbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, MotionConflictingHandlers>, VariantProps<typeof snackbarVariants> {
  /** Whether the snackbar is visible. */
  open: boolean;
  /** Callback fired when the snackbar closes (auto-hide or close button). */
  onClose?: () => void;
  /** Milliseconds before the snackbar auto-closes; set to 0 to disable. @default 5000 */
  autoHideDuration?: number;
  /** Optional icon shown on the left (only visible in the default variant). */
  icon?: React.ReactNode;
  /** Optional action button rendered to the right of the message. */
  action?: React.ReactNode;
  /** Accessible label for the close button. @default 'Close' */
  closeLabel?: string;
  /** Callback fired when the action button is clicked. */
  onAction?: () => void;
}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      className,
      variant = 'default',
      open,
      onClose,
      autoHideDuration = 5000,
      icon,
      action,
      closeLabel = 'Close',
      onAction,
      children,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(open);
    const [closing, setClosing] = useState(false);

    const handleClose = useCallback(() => {
      setClosing(true);
    }, []);

    useEffect(() => {
      if (open) {
        setVisible(true);
        setClosing(false);
      } else if (visible) {
        setClosing(true);
      }
    }, [open, visible]);

    useEffect(() => {
      if (open && autoHideDuration > 0) {
        const timer = setTimeout(handleClose, autoHideDuration);
        return () => clearTimeout(timer);
      }
    }, [open, autoHideDuration, handleClose]);

    const onAnimationComplete = () => {
      if (closing) {
        setVisible(false);
        setClosing(false);
        onClose?.();
      }
    };

    if (!visible) return null;

    return (
      <motion.div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={cn(snackbarVariants({ variant }), className)}
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={
          closing
            ? { opacity: 0, y: 6, filter: 'blur(2px)', transition: { duration: EXIT_DURATION } }
            : { opacity: 1, y: 0, filter: 'blur(0px)' }
        }
        transition={tacSpring.magnetic}
        onAnimationComplete={onAnimationComplete}
        {...props}
      >
        {variant !== 'default' && (
          <span className={cn('w-2 h-2 rounded-full shrink-0', dotColorMap[variant || 'default'])} />
        )}
        {icon && variant === 'default' && (
          <span className="w-[18px] h-[18px] shrink-0 text-[var(--muted-foreground)] [&>svg]:w-[18px] [&>svg]:h-[18px]">
            {icon}
          </span>
        )}
        <span className={cn('flex-1 text-sm font-medium', textColorMap[variant || 'default'])}>{children}</span>
        {action && (
          <button
            type="button"
            onClick={() => {
              onAction?.();
              handleClose();
            }}
            className={cn(
              'py-1.5 px-3.5 rounded-[var(--radius-sm)] text-[13px] font-medium cursor-pointer border-none transition-opacity hover:opacity-80',
              variant === 'default'
                ? 'bg-transparent text-[var(--point)]'
                : 'bg-[var(--secondary)] text-[var(--foreground)]',
            )}
          >
            {action}
          </button>
        )}
        {onClose && (
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              'flex items-center justify-center w-7 h-7 rounded-[var(--radius-sm)] text-[var(--muted-foreground)] bg-transparent border-none cursor-pointer transition-colors hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
              focusRing,
            )}
            aria-label={closeLabel}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 3L3 11" />
              <path d="M3 3l8 8" />
            </svg>
          </button>
        )}
      </motion.div>
    );
  },
);
Snackbar.displayName = 'Snackbar';

export { snackbarVariants };
