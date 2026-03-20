import React, { forwardRef, useState, useRef, useCallback, useId, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
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

const GAP = 6; // px gap between trigger and tooltip

function getTooltipPosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
): { top: number; left: number; actualPlacement: TooltipPlacement } {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const positions: Record<TooltipPlacement, { top: number; left: number }> = {
    top: {
      top: triggerRect.top + scrollY - tooltipRect.height - GAP,
      left: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
    },
    bottom: {
      top: triggerRect.bottom + scrollY + GAP,
      left: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
    },
    left: {
      top: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.left + scrollX - tooltipRect.width - GAP,
    },
    right: {
      top: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.right + scrollX + GAP,
    },
  };

  const opposite: Record<TooltipPlacement, TooltipPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const fits = (p: TooltipPlacement) => {
    const { top, left } = positions[p];
    const absTop = top - scrollY;
    const absLeft = left - scrollX;
    return absTop >= 0 && absLeft >= 0 && absTop + tooltipRect.height <= vh && absLeft + tooltipRect.width <= vw;
  };

  const pos = positions[placement];

  if (fits(placement)) return { ...pos, actualPlacement: placement };

  const flipped = opposite[placement];
  if (fits(flipped)) return { ...positions[flipped], actualPlacement: flipped };

  // Fallback: use the original placement but clamp to viewport
  return {
    top: Math.max(scrollY, Math.min(pos.top, scrollY + vh - tooltipRect.height)),
    left: Math.max(scrollX, Math.min(pos.left, scrollX + vw - tooltipRect.width)),
    actualPlacement: placement,
  };
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, description, placement = 'top', delay = 200 }, ref) => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [measured, setMeasured] = useState(false);
    const timerRef = useRef<number | undefined>(undefined);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const isRich = !!description;
    const tooltipId = useId();

    const show = useCallback(() => {
      timerRef.current = setTimeout(() => setVisible(true), delay) as unknown as number;
    }, [delay]);

    const hide = useCallback(() => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
      setVisible(false);
      setMeasured(false);
    }, []);

    useLayoutEffect(() => {
      if (!visible || !triggerRef.current || !tooltipRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const { top, left } = getTooltipPosition(triggerRect, tooltipRect, placement);
      setCoords({ top, left });
      setMeasured(true);
    }, [visible, placement]);

    // Recalculate on scroll/resize while visible
    useEffect(() => {
      if (!visible) return;
      const recalc = () => {
        if (!triggerRef.current || !tooltipRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const { top, left } = getTooltipPosition(triggerRect, tooltipRect, placement);
        setCoords({ top, left });
      };
      window.addEventListener('scroll', recalc, true);
      window.addEventListener('resize', recalc);
      return () => {
        window.removeEventListener('scroll', recalc, true);
        window.removeEventListener('resize', recalc);
      };
    }, [visible, placement]);

    const trigger = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
          'aria-describedby': tooltipId,
        })
      : children;

    return (
      <div
        ref={(node) => {
          (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn('inline-block cursor-pointer', focusRing)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        tabIndex={0}
      >
        {trigger}
        {typeof document !== 'undefined' &&
          ReactDOM.createPortal(
            <AnimatePresence>
              {visible && (
                <motion.div
                  ref={tooltipRef}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ ...tacSpring.light }}
                  style={{
                    position: 'absolute',
                    top: coords.top,
                    left: coords.left,
                    zIndex: 'var(--z-tooltip)' as unknown as number,
                    pointerEvents: 'none',
                    visibility: measured ? 'visible' : 'hidden',
                  }}
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
            </AnimatePresence>,
            document.body,
          )}
      </div>
    );
  },
);
Tooltip.displayName = 'Tooltip';
