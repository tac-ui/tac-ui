import React, { forwardRef, useState, useRef, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';
import { focusRing } from '../constants/styles';

/** Position of the tooltip relative to its trigger element. */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Floating tooltip that appears on hover or focus after an optional delay.
 * @example <Tooltip content="Save file" placement="bottom"><Button>Save</Button></Tooltip>
 */
export interface TooltipProps {
  /** The trigger element that the tooltip is anchored to. */
  children: React.ReactElement;
  /** Primary tooltip text or node content. */
  content: React.ReactNode;
  /** Optional secondary description shown below the title in rich tooltip mode. */
  description?: string;
  /** Position of the tooltip relative to the trigger. @default 'top' */
  placement?: TooltipPlacement;
  /** Delay in milliseconds before the tooltip appears. @default 200 */
  delay?: number;
}

const placementOuterClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2',
  bottom: 'top-full left-1/2 -translate-x-1/2',
  left: 'right-full top-1/2 -translate-y-1/2',
  right: 'left-full top-1/2 -translate-y-1/2',
};

const placementGapClasses = {
  top: 'pb-1.5',
  bottom: 'pt-1.5',
  left: 'pr-1.5',
  right: 'pl-1.5',
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, description, placement = 'top', delay = 200 }, ref) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<number | undefined>(undefined);
    const isRich = !!description;
    const tooltipId = useId();

    const show = useCallback(() => {
      timerRef.current = setTimeout(() => setVisible(true), delay) as unknown as number;
    }, [delay]);

    const hide = useCallback(() => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
      setVisible(false);
    }, []);

    const trigger = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
          'aria-describedby': tooltipId,
        })
      : children;

    return (
      <div
        ref={ref}
        className={cn('relative inline-block cursor-pointer', focusRing)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        tabIndex={0}
      >
        {trigger}
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ ...tacSpring.light }}
              className={cn(
                'absolute z-[var(--z-tooltip)] pointer-events-auto',
                placementOuterClasses[placement],
                placementGapClasses[placement],
              )}
            >
              <div
                id={tooltipId}
                role="tooltip"
                className={cn(
                  isRich
                    ? 'py-2.5 px-4 flex flex-col gap-1 whitespace-normal w-max max-w-[240px]'
                    : 'py-2 px-3.5 w-max whitespace-nowrap text-center',
                  'bg-[var(--dropdown-bg)] text-[var(--foreground)] text-[13px] rounded-[var(--radius-m)] shadow-[var(--dropdown-shadow)] border-[0.5px] border-solid border-[var(--glass-border)]',
                )}
              >
                {isRich ? (
                  <>
                    <span className="font-medium text-[13px] text-[var(--foreground)]">{content}</span>
                    <span className="text-[11px] text-[var(--foreground)] opacity-60">{description}</span>
                  </>
                ) : (
                  content
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
Tooltip.displayName = 'Tooltip';
