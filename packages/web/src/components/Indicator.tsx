'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import type { MotionConflictingHandlers } from '../constants/types';

/** Display style of the Indicator. */
export type IndicatorVariant = 'linear' | 'circular';

/** Props for the Indicator component, which shows an indeterminate loading animation. */
export interface IndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, MotionConflictingHandlers> {
  /** Display style — horizontal bar or spinning circle. @example variant="circular" */
  variant?: IndicatorVariant;
  /** Diameter in pixels used for the circular variant. Defaults to 32. */
  size?: number;
  /** CSS color value for the animated portion. Defaults to `var(--primary)`. */
  color?: string;
  /** Controls visibility with enter/exit animation. When undefined, always visible. */
  visible?: boolean;
}

const indicatorTransition = { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, variant = 'linear', size = 32, color = 'var(--point)', visible, ...props }, ref) => {
    if (variant === 'circular') {
      const strokeWidth = Math.max(2, size / 10);

      const circularInner = (
        <>
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: `${strokeWidth}px solid var(--secondary)` }}
          />
          <div
            className="absolute inset-0 animate-spin"
            style={{
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, transparent, ${color} 270deg, transparent 360deg)`,
              mask: `radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), black calc(100% - ${strokeWidth}px))`,
              WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), black calc(100% - ${strokeWidth}px))`,
            }}
          />
        </>
      );

      if (visible === undefined) {
        return (
          <div
            ref={ref}
            role="progressbar"
            aria-label="Loading"
            className={cn('inline-flex items-center justify-center relative', className)}
            style={{ width: size, height: size }}
            {...props}
          >
            {circularInner}
          </div>
        );
      }

      return (
        <AnimatePresence>
          {visible && (
            <motion.div
              ref={ref}
              role="progressbar"
              aria-label="Loading"
              className={cn('inline-flex items-center justify-center relative', className)}
              style={{ width: size, height: size }}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={indicatorTransition}
              {...props}
            >
              {circularInner}
            </motion.div>
          )}
        </AnimatePresence>
      );
    }

    const linearInner = (
      <div
        className="h-full rounded-[var(--radius-pill)] animate-indicator-slide"
        style={{
          width: '40%',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    );

    if (visible === undefined) {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-label="Loading"
          className={cn('w-full h-1 bg-[var(--secondary)] rounded-[var(--radius-pill)] overflow-hidden', className)}
          {...props}
        >
          {linearInner}
        </div>
      );
    }

    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={ref}
            role="progressbar"
            aria-label="Loading"
            className={cn('w-full h-1 bg-[var(--secondary)] rounded-[var(--radius-pill)] overflow-hidden', className)}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={indicatorTransition}
            {...props}
          >
            {linearInner}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
Indicator.displayName = 'Indicator';
