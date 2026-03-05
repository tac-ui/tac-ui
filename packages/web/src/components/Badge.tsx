import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { tacSpring, exitVariants } from '../constants/motion';

const badgeVariants = cva(
  'inline-flex items-center justify-center py-1.5 px-3 text-xs font-medium rounded-[var(--radius-pill)] whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
        secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
        destructive: 'bg-[var(--error)] text-[var(--primary-foreground)]',
        outline: 'bg-transparent border-[0.5px] border-solid border-[var(--border)] text-[var(--foreground)]',
        success: 'bg-[var(--success-bg)] text-[var(--success-foreground)]',
        error: 'bg-[var(--error-bg)] text-[var(--error-foreground)]',
        warning: 'bg-[var(--warning-bg)] text-[var(--warning-foreground)]',
        info: 'bg-[var(--info-bg)] text-[var(--info-foreground)]',
        glass:
          'bg-[var(--interactive-surface-tint)] [backdrop-filter:blur(40px)_saturate(180%)] text-[var(--foreground)] border border-[var(--glass-border)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

/** Visual style of the Badge. */
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

/** Props for the Badge component, which displays a short status label or count. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Visual style of the badge. @example variant="success" */
  variant?: BadgeVariant;
  /** When true, applies subtle spring hover/tap interactions. Automatically enabled when onClick is provided. @default false */
  interactive?: boolean;
  /** Numeric count value. When provided, changes animate with an exit transition. */
  count?: number;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, interactive, onClick, count, children, ...props }, ref) => {
    const isInteractive = interactive || !!onClick;

    const content =
      count !== undefined ? (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            variants={exitVariants}
            initial="initial"
            animate={{ scale: 1, opacity: 1 }}
            exit="exit"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      ) : (
        children
      );

    if (isInteractive) {
      return (
        <motion.span
          ref={ref}
          whileHover={{ scale: 1, transition: tacSpring.light }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className={cn(badgeVariants({ variant }), 'cursor-pointer', className)}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.span>)}
        >
          {content}
        </motion.span>
      );
    }

    return (
      <span ref={ref} className={cn(badgeVariants({ variant }), className)} onClick={onClick} {...props}>
        {content}
      </span>
    );
  },
);
Badge.displayName = 'Badge';

export { badgeVariants };
