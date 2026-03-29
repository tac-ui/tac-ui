'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { fadeVariants } from '../constants/motion';

/** Props for the EmptyState component, a standardized "no data" screen. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional icon or illustration displayed above the title. */
  icon?: React.ReactNode;
  /** Primary heading text. */
  title: string;
  /** Optional descriptive text below the title. */
  description?: string;
  /** Optional action button(s) rendered below the description. */
  action?: React.ReactNode;
  /** When false, the component animates out using fadeVariants. @default true */
  visible?: boolean;
}

/** A centered "no data" placeholder with an optional icon, title, description, and action. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, visible = true, ...props }, ref) => (
    <AnimatePresence>
      {visible && (
        <motion.div variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
          <div
            ref={ref}
            role="status"
            className={cn(
              'bg-[var(--surface-base)] rounded-[var(--radius-xl)]',
              'w-full py-12 px-8 flex flex-col items-center justify-center text-center',
              className,
            )}
            {...props}
          >
            {icon && (
              <div className="w-20 h-20 flex items-center justify-center rounded-full [backdrop-filter:blur(40px)_saturate(180%)] bg-[var(--interactive-surface-tint)] text-[var(--muted-foreground)] mb-6 [&>svg]:w-10 [&>svg]:h-10">
                {icon}
              </div>
            )}
            <h3 className="text-lg font-medium text-[var(--foreground)] leading-snug">{title}</h3>
            {description && (
              <p className="text-sm text-[var(--muted-foreground)] py-sm text-center w-max mt-2 leading-relaxed">
                {description}
              </p>
            )}
            {action && <div className="mt-6 flex gap-3">{action}</div>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  ),
);
EmptyState.displayName = 'EmptyState';
