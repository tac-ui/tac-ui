'use client';

import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { useDropdownPosition } from '../hooks/useDropdownPosition';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useRovingIndex } from '../hooks/useAccessibility';
import { tacSpring, EXIT_DURATION } from '../constants/motion';
import { focusRing } from '../constants/styles';
import { mergeRefs } from '../utils/mergeRefs';

/** Horizontal alignment of the dropdown menu relative to its trigger. */
export type DropdownAlign = 'start' | 'center' | 'end';

/**
 * Dropdown menu that displays a floating list of actions on trigger click.
 * Supports keyboard navigation (Arrow keys, Home, End, Enter, Escape).
 * @example <Dropdown trigger={<Button>Open</Button>} align="end">...</Dropdown>
 */
export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The element that toggles the dropdown open/closed when clicked. */
  trigger: React.ReactNode;
  /** Controlled open state; omit to use uncontrolled mode. */
  open?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Horizontal alignment of the menu relative to the trigger. @default 'start' */
  align?: DropdownAlign;
}

const alignClasses = { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' };

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, open: controlledOpen, onOpenChange, align = 'start', className, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = controlledOpen ?? internalOpen;
    const setOpen = useCallback(
      (v: boolean) => {
        setInternalOpen(v);
        onOpenChange?.(v);
      },
      [onOpenChange],
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerAreaRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const side = useDropdownPosition(triggerAreaRef, menuRef, open);

    useRovingIndex(menuRef, open, {
      itemSelector: '[role="menuitem"]',
      onSelect: () => setOpen(false),
    });

    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
      };
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleKey);
      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handleKey);
      };
    }, [open, setOpen]);

    const handleTriggerKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
      },
      [setOpen],
    );

    return (
      <div ref={containerRef} className={cn('relative inline-block', className)} {...props}>
        <div
          ref={triggerAreaRef}
          onClick={() => setOpen(!open)}
          onKeyDown={handleTriggerKeyDown}
          tabIndex={0}
          role="button"
          aria-haspopup="menu"
          aria-expanded={open}
          data-state={open ? 'open' : 'closed'}
          className={cn(
            'cursor-pointer rounded-[var(--radius-m)]',
            focusRing,
            open && '[&_button]:bg-[var(--interactive-hover)]',
          )}
        >
          {trigger}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={mergeRefs(menuRef, ref)}
              initial={{ opacity: 0, scale: 0.97, y: side === 'bottom' ? 4 : -4, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, y: side === 'bottom' ? 2 : -2, filter: 'blur(4px)', transition: { duration: EXIT_DURATION } }}
              transition={tacSpring.magnetic}
              role="menu"
              style={{ originY: side === 'bottom' ? 0 : 1 }}
              className={cn(
                'absolute min-w-[200px] bg-[var(--dropdown-bg)] [backdrop-filter:blur(24px)_saturate(180%)] border-[0.5px] border-solid border-[var(--input-border-rest)] rounded-[var(--radius-m)] [box-shadow:var(--dropdown-shadow)] p-1 z-[var(--z-dropdown)]',
                side === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1',
                alignClasses[align],
              )}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
Dropdown.displayName = 'Dropdown';

export const DropdownTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-3 py-2 text-xs font-semibold text-[var(--muted-foreground)]', className)}
      {...props}
    />
  ),
);
DropdownTitle.displayName = 'DropdownTitle';

export const DropdownDivider = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('h-px bg-[var(--border)] my-1', className)} {...props} />
  ),
);
DropdownDivider.displayName = 'DropdownDivider';

/** Props for a single clickable item inside a Dropdown menu. */
export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Renders the item in destructive (error) colors to signal a dangerous action. */
  destructive?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, destructive, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      tabIndex={-1}
      className={cn(
        'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-[var(--radius-m)] bg-transparent border-none cursor-pointer text-left transition-colors duration-fast',
        destructive
          ? 'text-[var(--error)] hover:bg-[var(--error-bg)]'
          : 'text-[var(--foreground)] hover:bg-[var(--dropdown-item-hover)]',
        'disabled:opacity-50 disabled:pointer-events-none',
        'focus:outline-none focus:bg-[var(--dropdown-item-hover)]',
        className,
      )}
      {...props}
    />
  ),
);
DropdownItem.displayName = 'DropdownItem';

/** Props for a search input rendered at the top of a Dropdown menu. */
export type DropdownSearchProps = React.InputHTMLAttributes<HTMLInputElement>;

export const DropdownSearch = forwardRef<HTMLInputElement, DropdownSearchProps>(({ className, ...props }, ref) => (
  <div className="px-2 pb-1">
    <input
      ref={ref}
      className={cn(
        'w-full px-3 py-2 text-sm bg-[var(--secondary)] border-none rounded-[var(--radius-m)] outline-none placeholder:text-[var(--muted-foreground)]',
        className,
      )}
      {...props}
    />
  </div>
));
DropdownSearch.displayName = 'DropdownSearch';
