import React, { forwardRef, useEffect, useCallback, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useFocusTrap, useFocusRestore } from '../hooks/useAccessibility';
import { tacSpring } from '../constants/motion';
import { mergeRefs } from '../utils/mergeRefs';
import type { MotionConflictingHandlers } from '../constants/types';

/** Controls which edge the Drawer slides in from. */
export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

/**
 * Side-panel overlay (Sheet/Drawer) that slides in from a specified edge.
 * Traps focus within the panel while open and restores focus on close.
 * Closes on Escape key press or backdrop click.
 * @example <Drawer open={open} onClose={() => setOpen(false)} side="right">...</Drawer>
 */

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, MotionConflictingHandlers> {
  /** Whether the drawer is visible. */
  open: boolean;
  /** Callback fired when the drawer should close (backdrop click or Escape key). */
  onClose: () => void;
  /** Which edge the drawer slides in from. @default 'right' */
  side?: DrawerSide;
  /** When false, the dark backdrop overlay is hidden. @default true */
  backdrop?: boolean;
}

const panelStaticClasses: Record<DrawerSide, string> = {
  left: 'left-0 top-0 h-full w-[360px] max-w-[90vw]',
  right: 'right-0 top-0 h-full w-[360px] max-w-[90vw]',
  top: 'top-0 left-0 w-full h-auto max-h-[80vh]',
  bottom: 'bottom-0 left-0 w-full h-auto max-h-[80vh]',
};

const radiusClasses: Record<DrawerSide, string> = {
  left: 'rounded-r-[var(--radius-xl)]',
  right: 'rounded-l-[var(--radius-xl)]',
  top: 'rounded-b-[var(--radius-xl)]',
  bottom: 'rounded-t-[var(--radius-xl)]',
};

const panelVariants: Record<
  DrawerSide,
  { initial: { x?: string; y?: string }; animate: { x?: number; y?: number }; exit: { x?: string; y?: string } }
> = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
};

/**
 * Side-panel overlay (Sheet/Drawer) component.
 * Renders a sliding panel from the specified edge with a translucent backdrop.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, open, onClose, side = 'right', backdrop = true, children, ...props }, ref) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    useFocusRestore(open);
    useFocusTrap(panelRef, open);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      },
      [onClose],
    );

    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.body.style.overflow = '';
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [open, handleKeyDown]);

    const { initial, animate, exit } = panelVariants[side];

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn('fixed inset-0 z-[var(--z-modal)]', backdrop && 'bg-black/30 backdrop-blur-md')}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.div
              ref={mergeRefs(panelRef, ref)}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={tacSpring.heavy}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={cn(
                'fixed flex flex-col [backdrop-filter:blur(24px)_saturate(180%)] bg-[var(--background)] border-[0.5px] border-solid border-[var(--input-border-rest)] [box-shadow:var(--glass-inset),var(--glass-panel-shadow)] overflow-hidden',
                panelStaticClasses[side],
                radiusClasses[side],
                className,
              )}
              {...props}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
Drawer.displayName = 'Drawer';

/**
 * Header area of a Drawer, providing vertical spacing for title and description.
 */
export const DrawerHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-5 flex flex-col gap-2', className)} {...props} />
  ),
);
DrawerHeader.displayName = 'DrawerHeader';

/**
 * Title text within a DrawerHeader.
 */
export const DrawerTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-medium text-[var(--foreground)]', className)} {...props} />
  ),
);
DrawerTitle.displayName = 'DrawerTitle';

/**
 * Descriptive text within a DrawerHeader, rendered in muted color.
 */
export const DrawerDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-[var(--muted-foreground)] leading-relaxed', className)} {...props} />
  ),
);
DrawerDescription.displayName = 'DrawerDescription';

/**
 * Footer area of a Drawer with a top border, used for action buttons.
 */
export const DrawerFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex justify-end gap-2 px-6 py-5 border-t-[0.5px] border-solid border-[var(--border)]', className)}
      {...props}
    />
  ),
);
DrawerFooter.displayName = 'DrawerFooter';

/**
 * Scrollable body area of a Drawer, grows to fill available space.
 */
export const DrawerBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-y-auto px-6 py-4', className)} {...props} />
  ),
);
DrawerBody.displayName = 'DrawerBody';
