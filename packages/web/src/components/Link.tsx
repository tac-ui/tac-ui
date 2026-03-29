'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { focusRing } from '../constants/styles';

const linkVariants = cva(
  'inline-flex items-center gap-1 cursor-pointer transition-colors duration-[150ms]',
  {
    variants: {
      variant: {
        inline:
          'text-[var(--point)] underline underline-offset-2 decoration-[var(--point)]/40 hover:decoration-[var(--point)]',
        plain:
          'text-[var(--foreground)] no-underline hover:text-[var(--point)]',
        current:
          'text-[var(--point)] font-medium no-underline pointer-events-none',
      },
    },
    defaultVariants: { variant: 'inline' },
  },
);

/** Visual variant for the Link component. */
export type LinkVariant = 'inline' | 'plain' | 'current';

/**
 * Styled anchor element with variant styles and external link support.
 * @example <Link href="/about" variant="inline">About</Link>
 */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  /** When true, opens in a new tab and shows an external link icon. */
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'inline', external, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant }), focusRing, className)}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      >
        {children}
        {external && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        )}
      </a>
    );
  },
);
Link.displayName = 'Link';

export { linkVariants };
