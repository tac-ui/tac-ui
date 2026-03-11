import React, { forwardRef, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring, EASING, DURATION } from '../constants/motion';
import { focusRing } from '../constants/styles';

/**
 * A single collapsible disclosure panel with animated expand/collapse.
 * Supports both controlled and uncontrolled modes.
 * @example <Collapsible label="Details">Hidden content here</Collapsible>
 */
export interface CollapsibleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The label displayed in the trigger button. */
  label: React.ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Initial open state for uncontrolled mode. @default false */
  defaultOpen?: boolean;
  /** Content revealed when the panel is open. */
  children: React.ReactNode;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, label, open: controlledOpen, onOpenChange, defaultOpen = false, children, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
    const contentId = useId();
    const triggerId = useId();

    const toggle = useCallback(() => {
      const next = !isOpen;
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    }, [isOpen, isControlled, onOpenChange]);

    return (
      <div
        ref={ref}
        className={cn('rounded-[var(--radius-m)] border-[0.5px] border-solid border-[var(--border)] overflow-hidden', className)}
        {...props}
      >
        <button
          type="button"
          id={triggerId}
          onClick={toggle}
          className={cn(
            'flex items-center justify-between w-full py-3 px-3.5 text-sm font-medium text-[var(--foreground)] bg-transparent border-none cursor-pointer text-left',
            'hover:bg-[var(--interactive-hover)]',
            focusRing,
          )}
          style={{ transition: `background-color ${DURATION.normal} ${EASING}` }}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          {label}
          <motion.svg
            className="w-4 h-4 text-[var(--muted-foreground)] shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={tacSpring.default}
          >
            <path d="M4 6l4 4 4-4" />
          </motion.svg>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="collapsible-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={tacSpring.default}
              style={{ overflow: 'hidden' }}
            >
              <div
                id={contentId}
                role="region"
                aria-labelledby={triggerId}
                className="text-sm text-[var(--muted-foreground)] px-3.5 pb-3.5"
              >
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
Collapsible.displayName = 'Collapsible';
