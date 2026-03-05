import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

/** Display style of the Indicator. */
export type IndicatorVariant = 'linear' | 'circular';

/** Props for the Indicator component, which shows an indeterminate loading animation. */
export interface IndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Display style — horizontal bar or spinning circle. @example variant="circular" */
  variant?: IndicatorVariant;
  /** Diameter in pixels used for the circular variant. Defaults to 32. */
  size?: number;
  /** CSS color value for the animated portion. Defaults to `var(--primary)`. */
  color?: string;
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, variant = 'linear', size = 32, color = 'var(--point)', ...props }, ref) => {
    if (variant === 'circular') {
      const strokeWidth = Math.max(2, size / 10);

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-label="Loading"
          className={cn('inline-flex items-center justify-center relative', className)}
          style={{ width: size, height: size }}
          {...props}
        >
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
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label="Loading"
        className={cn('w-full h-1 bg-[var(--secondary)] rounded-[var(--radius-pill)] overflow-hidden', className)}
        {...props}
      >
        <div
          className="h-full rounded-[var(--radius-pill)] animate-indicator-slide"
          style={{
            width: '40%',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      </div>
    );
  },
);
Indicator.displayName = 'Indicator';
