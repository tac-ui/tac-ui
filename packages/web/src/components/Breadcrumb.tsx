import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

/** Props for the Breadcrumb root nav element. */
export type BreadcrumbProps = React.HTMLAttributes<HTMLElement>;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('', className)} {...props} />
  ),
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn('flex items-center gap-1.5 flex-wrap text-sm text-[var(--muted-foreground)]', className)} {...props} />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

/** Props for an individual breadcrumb list item. */
export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Marks this item as the current page, applying active styles and aria-current="page". */
  current?: boolean;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, current, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', current && 'text-[var(--foreground)] font-medium', className)} aria-current={current ? 'page' : undefined} {...props} />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

/** Props for a breadcrumb anchor link. */
export type BreadcrumbLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'cursor-pointer hover:text-[var(--foreground)] transition-colors',
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      className={cn('text-[var(--muted-foreground)] opacity-40', className)}
      style={{ transition: 'opacity 150ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      {...props}
    >
      {children || (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 4l4 4-4 4" /></svg>
      )}
    </span>
  ),
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('flex items-center justify-center w-6 h-6', className)} {...props}>...</span>
  ),
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
