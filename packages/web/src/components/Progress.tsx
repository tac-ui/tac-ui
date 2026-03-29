'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';

/** Display style of the Progress indicator. */
export type ProgressVariant = 'linear' | 'circular';

/** Size of the linear progress bar. */
export type ProgressBarSize = 'sm' | 'md' | 'lg';

/** Props for the Progress component, which visualizes a determinate completion value. */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value. Defaults to 0. @example value={42} */
  value?: number;
  /** Maximum value used to calculate the percentage. Defaults to 100. */
  max?: number;
  /** Display style — horizontal bar or circular ring. @example variant="circular" */
  variant?: ProgressVariant;
  /** Diameter in pixels for the circular variant. Defaults to 64. */
  size?: number;
  /** Size of the linear progress bar. Defaults to 'md'. @example barSize="lg" */
  barSize?: ProgressBarSize;
  /** When true, renders a percentage label alongside the progress indicator. */
  showLabel?: boolean;
}

const barSizeStrokeScale: Record<ProgressBarSize, number> = { sm: 0.7, md: 1, lg: 1.5 };

function getCircularStrokeWidth(size: number, barSize: ProgressBarSize): number {
  const scale = barSizeStrokeScale[barSize];
  if (size <= 32) return 3 * scale;
  if (size <= 48) return 3.5 * scale;
  if (size <= 64) return 4 * scale;
  if (size <= 96) return 5 * scale;
  return 6 * scale;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, variant = 'linear', size = 64, barSize = 'md', showLabel, ...props }, ref) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));

    if (variant === 'circular') {
      const strokeWidth = getCircularStrokeWidth(size, barSize);
      const r = (size - strokeWidth) / 2;
      const circumference = 2 * Math.PI * r;
      const offset = circumference - (percent / 100) * circumference;

      return (
        <AnimatePresence>
          <motion.div
            ref={ref}
            role="progressbar"
            aria-valuenow={Math.round(percent)}
            aria-valuemin={0}
            aria-valuemax={100}
            className={cn('relative inline-flex items-center justify-center', className)}
            style={{ width: size, height: size }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={tacSpring.default}
            {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
          >
            <svg className="-rotate-90" width={size} height={size}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="var(--secondary)"
                strokeWidth={strokeWidth}
              />
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="var(--point)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: offset }}
                transition={tacSpring.default}
              />
            </svg>
            {showLabel && (
              <span className="absolute text-sm font-medium text-[var(--foreground)]">{Math.round(percent)}%</span>
            )}
          </motion.div>
        </AnimatePresence>
      );
    }

    const barSizeClasses = {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-3',
    };

    return (
      <AnimatePresence>
        <motion.div
          ref={ref}
          role="progressbar"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn('flex flex-col gap-1.5', className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={tacSpring.default}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
        >
          {showLabel && (
            <div className="flex justify-between text-sm">
              <span className="font-medium text-[var(--foreground)]">Progress</span>
              <span className="text-[var(--muted-foreground)]">{Math.round(percent)}%</span>
            </div>
          )}
          <div
            className={cn(
              'w-full bg-[var(--secondary)] rounded-[var(--radius-pill)] overflow-hidden',
              barSizeClasses[barSize],
            )}
          >
            <motion.div
              className="h-full bg-[var(--point)] rounded-[var(--radius-pill)]"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={tacSpring.default}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  },
);
Progress.displayName = 'Progress';
