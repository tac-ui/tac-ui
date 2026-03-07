import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { focusRing } from '../constants/styles';
import { tacSpring, EASING, DURATION } from '../constants/motion';

/** Props for the Pagination root nav element. */
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Accessible label for the pagination nav element. @default 'Pagination' */
  label?: string;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, label = 'Pagination', ...props }, ref) => (
    <nav ref={ref} aria-label={label} className={cn('flex justify-center', className)} {...props} />
  ),
);
Pagination.displayName = 'Pagination';

/** Props for the Pagination content list. */
export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Applies glassmorphism styling to the pagination container. */
  glass?: boolean;
}

export const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, glass, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(
        'flex items-center gap-1',
        glass &&
          'p-1 rounded-[var(--radius-lg)] bg-[var(--glass-bg)] backdrop-blur-[8px] border border-solid border-[var(--glass-border)]',
        className,
      )}
      {...props}
    />
  ),
);
PaginationContent.displayName = 'PaginationContent';

/** Props for an individual page number button in the pagination list. */
export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Highlights this item as the currently active page. */
  active?: boolean;
}

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, active, ...props }, ref) => (
    <li className="list-none">
      <motion.button
        ref={ref}
        type="button"
        aria-current={active ? 'page' : undefined}
        style={{
          transition:
            `color ${DURATION.fast} ${EASING}, background-color ${DURATION.fast} ${EASING}`,
        }}
        className={cn(
          'w-9 h-9 flex items-center justify-center text-sm rounded-[var(--radius-m)] border-none cursor-pointer',
          focusRing,
          active
            ? 'bg-[var(--point-subtle)] text-[var(--point)] font-semibold'
            : 'bg-transparent text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
          'disabled:opacity-50 disabled:pointer-events-none',
          className,
        )}
        whileTap={{ scale: 0.97, transition: tacSpring.light }}
        transition={tacSpring.light}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      />
    </li>
  ),
);
PaginationItem.displayName = 'PaginationItem';

export const PaginationEllipsis = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <li className="list-none">
      <span
        ref={ref}
        className={cn('w-9 h-9 flex items-center justify-center text-[var(--muted-foreground)]', className)}
        {...props}
      >
        ...
      </span>
    </li>
  ),
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

/** Props for the Previous and Next navigation buttons in a pagination component. */
export type PaginationPrevNextProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PaginationPrevious = forwardRef<HTMLButtonElement, PaginationPrevNextProps>(
  ({ className, children, ...props }, ref) => (
    <li className="list-none">
      <motion.button
        ref={ref}
        type="button"
        style={{
          transition:
            `color ${DURATION.fast} ${EASING}, background-color ${DURATION.fast} ${EASING}`,
        }}
        className={cn(
          'flex items-center gap-1 px-3 h-9 text-sm rounded-[var(--radius-m)] bg-transparent border-none cursor-pointer text-[var(--foreground)] hover:bg-[var(--interactive-hover)] disabled:opacity-50 disabled:pointer-events-none',
          focusRing,
          className,
        )}
        whileTap={{ scale: 0.97, transition: tacSpring.light }}
        transition={tacSpring.light}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 4l-4 4 4 4" />
        </svg>
        {children || 'Previous'}
      </motion.button>
    </li>
  ),
);
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = forwardRef<HTMLButtonElement, PaginationPrevNextProps>(
  ({ className, children, ...props }, ref) => (
    <li className="list-none">
      <motion.button
        ref={ref}
        type="button"
        style={{
          transition:
            `color ${DURATION.fast} ${EASING}, background-color ${DURATION.fast} ${EASING}`,
        }}
        className={cn(
          'flex items-center gap-1 px-3 h-9 text-sm rounded-[var(--radius-m)] bg-transparent border-none cursor-pointer text-[var(--foreground)] hover:bg-[var(--interactive-hover)] disabled:opacity-50 disabled:pointer-events-none',
          focusRing,
          className,
        )}
        whileTap={{ scale: 0.97, transition: tacSpring.light }}
        transition={tacSpring.light}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {children || 'Next'}
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </motion.button>
    </li>
  ),
);
PaginationNext.displayName = 'PaginationNext';
