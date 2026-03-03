import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useFocusTrap, useFocusRestore } from '../hooks/useAccessibility';
import { panelVariants } from '../constants/motion';
import { focusRing } from '../constants/styles';
import { mergeRefs } from '../utils/mergeRefs';


/** Horizontal or vertical alignment of the popover panel relative to its trigger. */
export type PopoverAlign = 'start' | 'center' | 'end';

/** Side on which the popover panel appears relative to its trigger. */
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Generic popover primitive for richer floating content than Tooltip but lighter than Modal.
 * Supports controlled and uncontrolled open state, positioning via `side` and `align` props,
 * outside-click dismissal, and Escape key dismissal.
 * @example
 * <Popover trigger={<Button>Open</Button>} side="bottom" align="start">
 *   <PopoverHeader>Title</PopoverHeader>
 *   <PopoverBody>Content here</PopoverBody>
 *   <PopoverFooter><Button>Close</Button></PopoverFooter>
 * </Popover>
 */
export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The element that toggles the popover open/closed when clicked. */
  trigger: React.ReactNode;
  /** Controlled open state; omit to use uncontrolled mode. */
  open?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Side on which the panel appears relative to the trigger. @default 'bottom' */
  side?: PopoverSide;
  /** Alignment of the panel along the perpendicular axis. @default 'center' */
  align?: PopoverAlign;
}

const sideClasses: Record<PopoverSide, string> = {
  bottom: 'top-full mt-2',
  top: 'bottom-full mb-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
};

const alignClassesTopBottom: Record<PopoverAlign, string> = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
};

const alignClassesLeftRight: Record<PopoverAlign, string> = {
  start: 'top-0',
  center: 'top-1/2 -translate-y-1/2',
  end: 'bottom-0',
};

/**
 * Popover component. Click the trigger to open/close a floating panel.
 * Closes on outside click or Escape key.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      open: controlledOpen,
      onOpenChange,
      side = 'bottom',
      align = 'center',
      className,
      children,
      ...props
    },
    ref,
  ) => {
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
    const panelRef = useRef<HTMLDivElement>(null);

    useFocusRestore(open);
    useFocusTrap(panelRef, open);

    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
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

    const isTopBottom = side === 'top' || side === 'bottom';
    const alignClass = isTopBottom
      ? alignClassesTopBottom[align]
      : alignClassesLeftRight[align];

    const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!open);
      }
    }, [open, setOpen]);

    return (
      <div ref={containerRef} className={cn('relative inline-block', className)} {...props}>
        <div
          onClick={() => setOpen(!open)}
          onKeyDown={handleTriggerKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          className={cn('cursor-pointer rounded-[var(--radius-m)]', focusRing)}
        >
          {trigger}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={mergeRefs(panelRef, ref)}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              className={cn(
                'absolute w-max max-w-[384px]',
                '[backdrop-filter:blur(24px)_saturate(180%)] bg-[var(--dropdown-bg)]',
                'border-[0.5px] border-solid border-[var(--input-border-rest)] rounded-[var(--radius-m)] [box-shadow:var(--dropdown-shadow)]',
                'z-[var(--z-popover)]',
                sideClasses[side],
                alignClass,
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
Popover.displayName = 'Popover';

/**
 * Header section of a Popover panel with bottom border.
 * Intended for titles or primary action labels.
 */
export const PopoverHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-3 border-b border-solid border-[var(--border)]', className)}
      {...props}
    />
  ),
);
PopoverHeader.displayName = 'PopoverHeader';

/**
 * Body section of a Popover panel.
 * Intended for the main content of the popover.
 */
export const PopoverBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-4 py-3', className)} {...props} />
  ),
);
PopoverBody.displayName = 'PopoverBody';

/**
 * Footer section of a Popover panel with top border.
 * Intended for actions such as confirm or cancel buttons.
 */
export const PopoverFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-3 border-t border-solid border-[var(--border)]', className)}
      {...props}
    />
  ),
);
PopoverFooter.displayName = 'PopoverFooter';
