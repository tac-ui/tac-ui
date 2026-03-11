import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';

/**
 * Displays a scalar measurement within a known range, such as storage usage or score.
 * @example <Meter value={72} label="Storage used" />
 */
export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current meter value. */
  value: number;
  /** Minimum value of the range. @default 0 */
  min?: number;
  /** Maximum value of the range. @default 100 */
  max?: number;
  /** Label displayed to the left of the value. */
  label: string;
  /** Custom display text for the value. When omitted, shows percentage. */
  customValue?: string;
  /** When true, displays the value/percentage to the right of the label. @default true */
  showValue?: boolean;
}

export const Meter = forwardRef<HTMLDivElement, MeterProps>(
  ({ className, value, min = 0, max = 100, label, customValue, showValue = true, ...props }, ref) => {
    const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    const displayValue = customValue ?? `${Math.round(percent)}%`;

    // Color the bar based on value: green < 60, yellow 60-80, red > 80
    const barColor =
      percent > 80
        ? 'bg-[var(--error)]'
        : percent > 60
          ? 'bg-[var(--warning)]'
          : 'bg-[var(--point)]';

    return (
      <div
        ref={ref}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        className={cn('flex flex-col gap-1.5', className)}
        {...props}
      >
        {(label || showValue) && (
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[var(--foreground)]">{label}</span>
            {showValue && (
              <span className="text-[var(--muted-foreground)]">{displayValue}</span>
            )}
          </div>
        )}
        <div className="w-full h-2 bg-[var(--secondary)] rounded-[var(--radius-pill)] overflow-hidden">
          <motion.div
            className={cn('h-full rounded-[var(--radius-pill)]', barColor)}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={tacSpring.default}
          />
        </div>
      </div>
    );
  },
);
Meter.displayName = 'Meter';
