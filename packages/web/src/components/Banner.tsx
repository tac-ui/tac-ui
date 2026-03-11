import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { tacSpring, fadeVariants } from '../constants/motion';
import { focusRing } from '../constants/styles';

const bannerVariants = cva(
  'relative flex items-start gap-3 w-full py-3.5 px-4 border-b border-solid',
  {
    variants: {
      variant: {
        default: 'bg-[var(--info-bg)] border-[var(--info)] text-[var(--foreground)]',
        warning: 'bg-[var(--warning-bg)] border-[var(--warning)] text-[var(--foreground)]',
        error: 'bg-[var(--error-bg)] border-[var(--error)] text-[var(--foreground)]',
        success: 'bg-[var(--success-bg)] border-[var(--success)] text-[var(--foreground)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

const bannerIconColorMap = {
  default: 'text-[var(--info)]',
  warning: 'text-[var(--warning)]',
  error: 'text-[var(--error)]',
  success: 'text-[var(--success)]',
};

/** Color and semantic variant for the Banner component. */
export type BannerVariant = 'default' | 'warning' | 'error' | 'success';

/**
 * Full-width page-level notification bar, typically placed at the top of a page or section.
 * Supports icon, title, description, and optional dismiss.
 * @example <Banner variant="warning" title="Maintenance" description="Scheduled downtime at 2 AM UTC." dismissible />
 */
export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Optional title displayed in bold. */
  title?: string;
  /** Optional description text. */
  description?: string;
  /** Optional icon displayed to the left. */
  icon?: React.ReactNode;
  /** When true, shows a close button to dismiss the banner. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
}

const bannerMotionVariants = {
  initial: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tacSpring.entrance,
  },
  exit: fadeVariants.exit,
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      icon,
      dismissible,
      onDismiss,
      children,
      ...props
    },
    ref,
  ) => {
    const [dismissed, setDismissed] = useState(false);

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    return (
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            variants={bannerMotionVariants}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            <div
              ref={ref}
              role="status"
              className={cn(bannerVariants({ variant }), className)}
              {...props}
            >
              {icon && (
                <span
                  className={cn(
                    'shrink-0 w-[18px] h-[18px] [&>svg]:w-[18px] [&>svg]:h-[18px] mt-0.5',
                    bannerIconColorMap[variant || 'default'],
                  )}
                >
                  {icon}
                </span>
              )}
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                {title && (
                  <span className="text-sm font-semibold text-[var(--foreground)]">{title}</span>
                )}
                {description && (
                  <span className="text-[13px] text-[var(--muted-foreground)] leading-tight">
                    {description}
                  </span>
                )}
                {children}
              </div>
              {dismissible && (
                <button
                  type="button"
                  onClick={handleDismiss}
                  className={cn(
                    'shrink-0 w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)] transition-colors',
                    focusRing,
                  )}
                  aria-label="Dismiss banner"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
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
Banner.displayName = 'Banner';

export { bannerVariants };
