'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { Tooltip } from './Tooltip';

/**
 * Accessible form label with optional required indicator, optional suffix, and tooltip support.
 * @example <Label htmlFor="email" required>Email</Label>
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** When true, appends a red asterisk to indicate the field is required. */
  required?: boolean;
  /** When true, appends a grey "(optional)" suffix. */
  showOptional?: boolean;
  /** Tooltip content shown next to the label via an info icon. */
  tooltip?: React.ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, showOptional, tooltip, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] select-none',
          className,
        )}
        {...props}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          {required && (
            <span className="text-[var(--error)]" aria-hidden="true">
              *
            </span>
          )}
          {showOptional && (
            <span className="text-xs font-normal text-[var(--muted-foreground)]">(optional)</span>
          )}
        </span>
        {tooltip && (
          <Tooltip content={tooltip} placement="top">
            <span className="inline-flex items-center text-[var(--muted-foreground)] cursor-help">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </span>
          </Tooltip>
        )}
      </label>
    );
  },
);
Label.displayName = 'Label';
