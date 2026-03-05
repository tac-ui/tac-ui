import React, { createContext, forwardRef, useCallback, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';
import { focusRing } from '../constants/styles';

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (value: string) => void;
  glass?: boolean;
  outline?: boolean;
}

const AccordionContext = createContext<AccordionContextValue>({
  openItems: new Set(),
  toggle: () => {},
  glass: false,
  outline: true,
});

/** Controls whether one or multiple accordion items can be open simultaneously. */
export type AccordionType = 'single' | 'multiple';

/**
 * Collapsible accordion container that manages open/close state for its items.
 * @example <Accordion type="single" defaultValue="item-1">...</Accordion>
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether only one item can be open at a time or multiple. */
  type?: AccordionType;
  /** The value(s) of the item(s) open by default. */
  defaultValue?: string | string[];
  /** Applies glassmorphism styling to each accordion item. */
  glass?: boolean;
  /** When true, shows borders around each accordion item. @default true */
  outline?: boolean;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', defaultValue = [], glass, outline = true, className, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<Set<string>>(
      new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]),
    );
    const toggle = useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(value)) {
            next.delete(value);
          } else {
            if (type === 'single') next.clear();
            next.add(value);
          }
          return next;
        });
      },
      [type],
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle, glass, outline }}>
        <div
          ref={ref}
          className={cn(
            'flex flex-col gap-1',
            glass && 'p-2 rounded-[var(--radius-m)] bg-[var(--glass-bg)] backdrop-blur-[24px] saturate-[180%]',
            className,
          )}
          {...props}
        />
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';

/** Props for a single accordion section wrapper. */
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for this accordion item; used to control open state. */
  value: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(({ value, className, ...props }, ref) => {
  const { glass, outline } = useContext(AccordionContext);
  return (
    <div
      ref={ref}
      data-value={value}
      className={cn(
        'rounded-[var(--radius-m)] overflow-hidden',
        glass
          ? 'bg-[var(--glass-bg)] backdrop-blur-[24px] saturate-[180%] border-[0.5px] border-solid border-[var(--glass-border)]'
          : outline
            ? 'border-[0.5px] border-solid border-[var(--border)]'
            : 'border-b border-solid border-[var(--border)] last:border-b-0',
        className,
      )}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

/** Props for the button that toggles an accordion item open or closed. */
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The accordion item value this trigger controls. */
  value: string;
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems, toggle } = useContext(AccordionContext);
    const isOpen = openItems.has(value);

    return (
      <button
        ref={ref}
        type="button"
        id={`accordion-trigger-${value}`}
        onClick={() => toggle(value)}
        className={cn(
          'flex items-center justify-between w-full py-3 px-3.5 text-sm font-medium text-[var(--foreground)] bg-transparent border-none cursor-pointer text-left',
          'hover:bg-[var(--interactive-hover)]',
          focusRing,
          className,
        )}
        style={{ transition: 'background-color 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
        {...props}
      >
        {children}
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
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

/** Props for the collapsible content panel of an accordion item. */
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The accordion item value that controls visibility of this content. */
  value: string;
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems } = useContext(AccordionContext);
    const isOpen = openItems.has(value);

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={value}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={tacSpring.default}
            style={{ overflow: 'hidden' }}
          >
            <div
              ref={ref}
              id={`accordion-content-${value}`}
              role="region"
              aria-labelledby={`accordion-trigger-${value}`}
              className={cn('text-sm text-[var(--muted-foreground)] px-3.5 pb-3.5', className)}
              {...props}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
AccordionContent.displayName = 'AccordionContent';
