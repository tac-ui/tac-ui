import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { fadeVariants, diaSpring } from '../constants/motion';
import { focusRingCompact } from '../constants/styles';

const alertVariants = cva(
  'relative flex items-start gap-3 py-3.5 px-4 rounded-[var(--radius-m)] border border-solid overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-[var(--surface-base)] border-[var(--border)] text-[var(--foreground)]',
        success: 'bg-[var(--success-bg)] border-[var(--success)] text-[var(--foreground)]',
        error: 'bg-[var(--error-bg)] border-[var(--error)] text-[var(--foreground)]',
        warning: 'bg-[var(--warning-bg)] border-[var(--warning)] text-[var(--foreground)]',
        info: 'bg-[var(--info-bg)] border-[var(--info)] text-[var(--foreground)]',
        glass: 'bg-[var(--glass-bg)] [backdrop-filter:blur(24px)_saturate(180%)] border-[var(--glass-border)] text-[var(--foreground)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);


const iconColorMap = {
  default: 'text-[var(--primary)]',
  success: 'text-[var(--success)]',
  error: 'text-[var(--error)]',
  warning: 'text-[var(--warning)]',
  info: 'text-[var(--info)]',
  glass: 'text-[var(--foreground)]',
};

/** Color and semantic variant for the Alert component. */
export type AlertVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'glass';

/**
 * Inline alert banner for displaying status messages with optional icon and dismiss button.
 * Features a left accent stripe for visual emphasis.
 * @example <Alert variant="success" icon={<CheckIcon />}>Saved successfully.</Alert>
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  /** Optional icon displayed to the left of the alert content. */
  icon?: React.ReactNode;
  /** When true, shows a close button to dismiss the alert. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
}

const alertMotionVariants = {
  initial: { opacity: 0, y: 6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: diaSpring.magnetic,
  },
  exit: fadeVariants.exit,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', icon, dismissible, onDismiss, children, ...props }, ref) => {
    const [dismissed, setDismissed] = useState(false);

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    return (
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            variants={alertMotionVariants}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            <div
              ref={ref}
              role="alert"
              className={cn(alertVariants({ variant }), className)}
              {...props}
            >
              {icon && (
                <span className={cn('shrink-0 w-5 h-5 [&>svg]:w-5 [&>svg]:h-5', iconColorMap[variant || 'default'])}>
                  {icon}
                </span>
              )}
              <div className="flex-1 flex flex-col gap-1 min-w-0">{children}</div>
              {dismissible && (
                <button
                  type="button"
                  onClick={handleDismiss}
                  className={cn('shrink-0 w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)] transition-colors', focusRingCompact)}
                  aria-label="Dismiss alert"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
Alert.displayName = 'Alert';

export const AlertTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('text-sm font-semibold tracking-tight text-[var(--foreground)]', className)} {...props} />
  ),
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-[13px] text-[var(--muted-foreground)] leading-tight', className)} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';

export { alertVariants };
