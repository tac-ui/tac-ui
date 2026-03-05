import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';
import { focusRingPoint, focusRing } from '../constants/styles';

/** Props for the MorphingCard component, which smoothly morphs between a compact preview and an expanded detail view. */
export interface MorphingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique ID for layout morphing synchronization. */
  layoutId: string;
  /** Whether the card is in expanded state. */
  expanded?: boolean;
  /** Callback when expansion state changes. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Content shown in compact (collapsed) state. */
  preview?: React.ReactNode;
  /** Content shown in expanded state. */
  detail?: React.ReactNode;
}

export const MorphingCard = forwardRef<HTMLDivElement, MorphingCardProps>(
  (
    {
      className,
      layoutId,
      expanded: controlledExpanded,
      onExpandedChange,
      preview,
      detail,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledExpanded !== undefined;
    const [internalExpanded, setInternalExpanded] = useState(false);
    const isExpanded = isControlled ? controlledExpanded : internalExpanded;

    const setExpanded = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalExpanded(value);
        }
        onExpandedChange?.(value);
      },
      [isControlled, onExpandedChange],
    );

    const handleCollapsedClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setExpanded(true);
        onClick?.(e);
      },
      [setExpanded, onClick],
    );

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          setExpanded(false);
        }
      },
      [setExpanded],
    );

    useEffect(() => {
      if (!isExpanded) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setExpanded(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isExpanded, setExpanded]);

    const glassClasses =
      'bg-[var(--glass-bg)] backdrop-blur-[24px] saturate-[180%] border-[0.5px] border-[var(--input-border-rest)] [box-shadow:var(--glass-inset),var(--glass-panel-shadow)] rounded-[var(--card-radius)]';

    return (
      <>
        {/* Collapsed card */}
        {!isExpanded && (
          <motion.div
            ref={ref}
            layoutId={layoutId}
            transition={tacSpring.default}
            onClick={handleCollapsedClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded(true);
              }
            }}
            style={{
              transition:
                'box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className={cn(
              glassClasses,
              'p-[var(--card-padding)] flex flex-col gap-[var(--card-gap)]',
              'cursor-pointer hover:[box-shadow:var(--glass-inset),var(--glass-panel-shadow)] hover:border-[var(--card-accent-border)]',
              focusRingPoint,
              className,
            )}
            {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
          >
            {preview ?? children}
          </motion.div>
        )}

        {/* Expanded overlay + card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key={`${layoutId}-overlay`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[8px]"
              onClick={handleOverlayClick}
            >
              <motion.div
                layoutId={layoutId}
                transition={tacSpring.default}
                className={cn(
                  glassClasses,
                  'p-[var(--card-padding)] flex flex-col gap-[var(--card-gap)]',
                  'relative w-full max-w-lg mx-4 outline-none',
                  className,
                )}
              >
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setExpanded(false)}
                  style={{
                    transition:
                      'color 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className={cn(
                    'absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] cursor-pointer border-none',
                    focusRing,
                  )}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 2L2 10" />
                    <path d="M2 2l8 8" />
                  </svg>
                </button>
                {detail ?? preview ?? children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  },
);
MorphingCard.displayName = 'MorphingCard';
