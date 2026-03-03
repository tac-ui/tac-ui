import React, { forwardRef, useEffect, useCallback, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useFocusTrap, useFocusRestore } from '../hooks/useAccessibility';
import { diaSpring } from '../constants/motion';
import { mergeRefs } from '../utils/mergeRefs';
import type { MotionConflictingHandlers } from '../constants/types';


/**
 * Modal dialog with a fixed-width layout, backdrop, and keyboard (Escape) dismissal.
 * Traps focus within the dialog while open and restores focus on close.
 * @example <Dialog open={open} onClose={() => setOpen(false)}>...</Dialog>
 */

export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, MotionConflictingHandlers> {
  /** Whether the dialog is visible. */
  open: boolean;
  /** Callback fired when the dialog should close (backdrop click or Escape key). */
  onClose: () => void;
  /** Optional layoutId for shared layout morphing via Framer Motion. */
  layoutId?: string;
  /** When false, the dark backdrop overlay is hidden. @default true */
  backdrop?: boolean;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ className, open, onClose, layoutId, backdrop = true, children, ...props }, ref) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    useFocusRestore(open);
    useFocusTrap(panelRef, open);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    }, [onClose]);

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

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("fixed inset-0 flex items-center justify-center z-[var(--z-modal)]", backdrop && "bg-black/40 backdrop-blur-sm")}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          >
            <motion.div
              ref={mergeRefs(panelRef, ref)}
              layoutId={layoutId}
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)', transition: { duration: 0.15 } }}
              transition={{ ...diaSpring.heavy, filter: { duration: 0.25 } }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={cn(
                'w-[var(--dialog-width)] max-w-[90vw] [backdrop-filter:blur(24px)_saturate(180%)] bg-[var(--background)] border border-solid border-[var(--input-border-rest)] rounded-[var(--dialog-radius)] [box-shadow:var(--glass-inset),var(--glass-panel-shadow)] overflow-hidden',
                className,
              )}
              onClick={(e) => e.stopPropagation()}
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
Dialog.displayName = 'Dialog';

export const DialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-medium text-[var(--foreground)]', className)} {...props} />
  ),
);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-[var(--muted-foreground)] leading-relaxed', className)} {...props} />
  ),
);
DialogDescription.displayName = 'DialogDescription';

export const DialogHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-5 flex flex-col gap-2', className)} {...props} />
  ),
);
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex justify-end gap-3 px-6 py-4 border-t border-solid border-[var(--border)]', className)} {...props} />
  ),
);
DialogFooter.displayName = 'DialogFooter';
