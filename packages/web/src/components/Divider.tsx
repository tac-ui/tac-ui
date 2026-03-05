import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const dividerVariants = cva('', {
  variants: {
    variant: {
      full: 'w-full h-px bg-[var(--border)]',
      inset: 'h-px bg-[var(--border)] mx-16',
      thick: 'w-full h-px bg-[var(--foreground)]/10',
      withLabel: 'flex items-center gap-4 w-full',
    },
  },
  defaultVariants: { variant: 'full' },
});

/** Visual style of the divider. */
export type DividerVariant = 'full' | 'inset' | 'thick' | 'withLabel';

/**
 * Horizontal rule component that separates content sections.
 * Supports full-width, inset, thick, labeled, and gradient variants.
 */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerVariants> {
  /** Visual style variant of the divider. @example variant="gradient" */
  variant?: DividerVariant;
  /** Text label rendered in the center of the divider (implies withLabel style). @example label="OR" */
  label?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(({ className, variant, label, ...props }, ref) => {
  if (variant === 'withLabel' || label) {
    return (
      <div ref={ref} className={cn('flex items-center gap-4 w-full', className)} {...props}>
        <span className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-xs text-[var(--muted-foreground)] whitespace-nowrap font-medium px-1 tracking-wide">
          {label}
        </span>
        <span className="flex-1 h-px bg-[var(--border)]" />
      </div>
    );
  }
  return <div ref={ref} role="separator" className={cn(dividerVariants({ variant }), className)} {...props} />;
});
Divider.displayName = 'Divider';

export { dividerVariants };
