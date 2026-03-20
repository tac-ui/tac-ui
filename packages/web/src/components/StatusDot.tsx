import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

/** Status type for the StatusDot indicator. */
export type StatusDotStatus = 'success' | 'error' | 'warning' | 'info' | 'neutral';

/** Size variant of the StatusDot. */
export type StatusDotSize = 'sm' | 'md' | 'lg';

/** Props for the StatusDot component, a colored circle indicating entity status. */
export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The status to represent visually. @default 'neutral' */
  status?: StatusDotStatus;
  /** Size of the dot. @default 'md' */
  size?: StatusDotSize;
  /** When true, the dot pulses to indicate an active/live state. */
  pulse?: boolean;
}

const statusColors: Record<StatusDotStatus, string> = {
  success: 'bg-[var(--success)]',
  error: 'bg-[var(--error)]',
  warning: 'bg-[var(--warning)]',
  info: 'bg-[var(--info)]',
  neutral: 'bg-[var(--muted-foreground)]',
};

const sizeClasses: Record<StatusDotSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status = 'neutral', size = 'md', pulse, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      className={cn(
        'inline-block shrink-0 rounded-full',
        sizeClasses[size],
        statusColors[status],
        pulse && 'animate-pulse',
        className,
      )}
      {...props}
    />
  ),
);
StatusDot.displayName = 'StatusDot';
