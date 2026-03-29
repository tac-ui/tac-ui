'use client';

import React, { forwardRef, useEffect, useCallback, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useFocusTrap, useFocusRestore } from '../hooks/useAccessibility';
import { tacSpring, EXIT_DURATION, OVERLAY_DURATION } from '../constants/motion';
import { mergeRefs } from '../utils/mergeRefs';
import type { MotionConflictingHandlers } from '../constants/types';

/** Controls the maximum width of the Modal panel. */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Responsive modal dialog with configurable size, backdrop, and keyboard (Escape) dismissal.
 * Traps focus within the modal while open and restores focus on close.
 * @example <Modal open={open} onClose={() => setOpen(false)} size="lg">...</Modal>
 */

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, MotionConflictingHandlers> {
  /** Whether the modal is visible. */
  open: boolean;
  /** Callback fired when the modal should close (backdrop click or Escape key). */
  onClose: () => void;
  /** Maximum width preset of the modal panel. @default 'md' */
  size?: ModalSize;
  /** Optional layoutId for shared layout morphing via Framer Motion. */
  layoutId?: string;
  /** When false, the dark backdrop overlay is hidden. @default true */
  backdrop?: boolean;
}

const sizeClasses = {
  sm: 'max-w-[480px]',
  md: 'max-w-[640px]',
  lg: 'max-w-[800px]',
  xl: 'max-w-[960px]',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, open, onClose, size = 'md', layoutId, backdrop = true, children, ...props }, ref) => {
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

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: OVERLAY_DURATION }}
            className={cn(
              'fixed inset-0 flex items-center justify-center px-4 max-sm:items-end z-[var(--z-modal)]',
              backdrop && 'bg-black/30 backdrop-blur-md',
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.div
              ref={mergeRefs(panelRef, ref)}
              layoutId={layoutId}
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)', transition: { duration: EXIT_DURATION } }}
              transition={{ ...tacSpring.heavy, filter: { duration: 0.25 } }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={cn(
                'w-full [backdrop-filter:blur(24px)_saturate(180%)] bg-[var(--background)] border-[0.5px] border-solid border-[var(--input-border-rest)] rounded-[var(--radius-xl)] [box-shadow:var(--glass-inset),var(--glass-panel-shadow)] overflow-hidden max-sm:max-w-none max-sm:mx-0 max-sm:rounded-b-none max-sm:max-h-[90vh] max-sm:overflow-y-auto',
                sizeClasses[size],
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
Modal.displayName = 'Modal';

export const ModalHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-5 flex flex-col gap-2', className)} {...props} />
  ),
);
ModalHeader.displayName = 'ModalHeader';

export const ModalIcon = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-center pt-6 [&>svg]:w-8 [&>svg]:h-8 text-[var(--primary)]', className)}
      {...props}
    />
  ),
);
ModalIcon.displayName = 'ModalIcon';

export const ModalTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-medium text-[var(--foreground)]', className)} {...props} />
  ),
);
ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-[var(--muted-foreground)] leading-relaxed', className)} {...props} />
  ),
);
ModalDescription.displayName = 'ModalDescription';

export const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex justify-end gap-2 px-6 py-5 border-t-[0.5px] border-solid border-[var(--border)]', className)}
      {...props}
    />
  ),
);
ModalFooter.displayName = 'ModalFooter';
