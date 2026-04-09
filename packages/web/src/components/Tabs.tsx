'use client';

import React, { createContext, forwardRef, useCallback, useContext, useMemo, useRef, useState, useId } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring, EASING, DURATION } from '../constants/motion';
import { focusRing } from '../constants/styles';

/** Visual style variant for the Tabs component. */
export type TabVariant = 'underline' | 'pill' | 'outline' | 'icon';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant: TabVariant;
  tabsId: string;
}

const TabsContext = createContext<TabsContextValue>({
  value: '',
  onChange: () => {},
  variant: 'underline',
  tabsId: '',
});

/**
 * Root tabs container that manages active tab state.
 * @example <Tabs defaultValue="tab1" variant="underline">...</Tabs>
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The controlled active tab value. */
  value?: string;
  /** The tab value open by default in uncontrolled mode. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Visual style of the tab list. @default 'underline' */
  variant?: TabVariant;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ value: controlledValue, defaultValue = '', onValueChange, variant = 'underline', className, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const tabsId = useId();
    const value = controlledValue ?? uncontrolled;
    const onChange = useCallback(
      (v: string) => {
        setUncontrolled(v);
        onValueChange?.(v);
      },
      [onValueChange],
    );

    const ctx = useMemo(
      () => ({ value, onChange, variant, tabsId }),
      [value, onChange, variant, tabsId],
    );

    return (
      <TabsContext.Provider value={ctx}>
        <div ref={ref} className={cn('flex flex-col', className)} {...props} />
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export const TabsList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, onKeyDown, ...props }, ref) => {
    const { variant } = useContext(TabsContext);
    const layoutId = useId();
    const listRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(e);
        const tabs = Array.from(
          (listRef.current ?? (ref as React.RefObject<HTMLDivElement>)?.current)?.querySelectorAll<HTMLElement>('[role="tab"]') ?? [],
        );
        const current = tabs.indexOf(e.target as HTMLElement);
        if (current === -1) return;

        let next = current;
        switch (e.key) {
          case 'ArrowRight':
            next = (current + 1) % tabs.length;
            break;
          case 'ArrowLeft':
            next = (current - 1 + tabs.length) % tabs.length;
            break;
          case 'Home':
            next = 0;
            break;
          case 'End':
            next = tabs.length - 1;
            break;
          default:
            return;
        }
        e.preventDefault();
        tabs[next].focus();
        tabs[next].click();
      },
      [onKeyDown, ref],
    );

    return (
      <LayoutGroup id={layoutId}>
        <div
          ref={listRef}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={cn(
            'overflow-x-auto scrollbar-none max-w-full',
            variant === 'underline' && 'flex gap-1 pb-1 border-b border-solid border-[var(--border)]',
            variant === 'pill' && 'relative inline-flex gap-1 p-1 bg-[var(--muted)] rounded-[var(--radius-m)]',
            variant === 'outline' &&
              'inline-flex items-center p-[2px] bg-[var(--background)] border border-solid border-[var(--border)] rounded-[var(--radius-m)] shadow-sm',
            variant === 'icon' && 'relative inline-flex gap-1 p-1 bg-[var(--muted)] rounded-[var(--radius-m)]',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </LayoutGroup>
    );
  },
);
TabsList.displayName = 'TabsList';

/** Class names for internal elements of TabTrigger. */
export interface TabTriggerClassNames {
  /** The active indicator element (underline bar, pill background, etc.). */
  indicator?: string;
  /** The text label wrapper. */
  label?: string;
  /** The icon wrapper (icon variant only). */
  icon?: string;
}

/** Props for an individual tab trigger button. */
export interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value this trigger activates; must match a TabContent value. */
  value: string;
  /** Icon element to display (only used with icon variant). */
  icon?: React.ReactNode;
  /** Custom class names for internal elements. */
  classNames?: TabTriggerClassNames;
}

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ value: tabValue, className, classNames: slotClassNames, children, icon, onDrag: _onDrag, ...props }, ref) => {
    const { value, onChange, variant, tabsId } = useContext(TabsContext);
    const active = value === tabValue;
    const indicatorId = `${tabsId}-indicator`;

    if (variant === 'icon') {
      return (
        <motion.button
          ref={ref}
          layout
          role="tab"
          type="button"
          tabIndex={active ? 0 : -1}
          id={`${tabsId}-tab-${tabValue}`}
          aria-selected={active}
          aria-controls={`${tabsId}-tabpanel-${tabValue}`}
          onClick={() => onChange(tabValue)}
          className={cn(
            'relative shrink-0 flex items-center py-2 px-3 rounded-[var(--radius-m)] bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] transition-colors duration-fast ease-standard',
            focusRing,
            active && 'text-[var(--point-foreground)]',
            className,
          )}
          {...(props as React.ComponentProps<typeof motion.button>)}
        >
          {active && (
            <motion.div
              layoutId={indicatorId}
              className={cn('absolute inset-0 bg-[var(--point)] rounded-[var(--radius-m)] shadow-none', slotClassNames?.indicator)}
              transition={tacSpring.default}
            />
          )}
          {icon && <span className={cn('relative z-10 w-5 h-5 [&>svg]:w-5 [&>svg]:h-5', slotClassNames?.icon)}>{icon}</span>}
          <AnimatePresence initial={false}>
            {active && (
              <motion.span
                className={cn('relative z-10 text-[13px] font-semibold overflow-hidden whitespace-nowrap inline-block', slotClassNames?.label)}
                initial={{ width: 0, marginLeft: 0 }}
                animate={{ width: 'auto', marginLeft: 8 }}
                exit={{ width: 0, marginLeft: 0 }}
                transition={tacSpring.default}
              >
                {children}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      );
    }

    return (
      <motion.button
        ref={ref}
        layout="position"
        role="tab"
        type="button"
        tabIndex={active ? 0 : -1}
        id={`${tabsId}-tab-${tabValue}`}
        aria-selected={active}
        aria-controls={`${tabsId}-tabpanel-${tabValue}`}
        onClick={() => onChange(tabValue)}
        style={{
          transition: `color ${DURATION.normal} ${EASING}, background-color ${DURATION.normal} ${EASING}, border-color ${DURATION.normal} ${EASING}, box-shadow ${DURATION.normal} ${EASING}, opacity ${DURATION.normal} ${EASING}`,
        }}
        className={cn(
          'relative shrink-0 cursor-pointer text-center',
          focusRing,
          variant === 'underline' &&
            cn(
              'pt-2 pb-2 px-3 text-sm font-medium text-[var(--muted-foreground)] bg-transparent border-none rounded-[var(--radius-sm)] -mb-[1px]',
              'hover:text-[var(--foreground)] hover:opacity-100',
              active
                ? 'opacity-100 text-[var(--foreground)] font-medium hover:bg-[var(--interactive-hover)]'
                : 'opacity-60 hover:bg-[var(--interactive-hover)]',
            ),
          variant === 'pill' &&
            cn(
              'py-2 px-4 text-[13px] font-medium text-[var(--muted-foreground)] bg-transparent border-none rounded-[var(--radius-m)]',
              active
                ? 'text-[var(--point-foreground)] font-semibold opacity-100'
                : 'opacity-60 hover:text-[var(--foreground)] hover:opacity-100 hover:bg-[var(--interactive-hover)]',
            ),
          variant === 'outline' &&
            cn(
              'relative py-[6px] px-4 text-[13px] font-medium bg-transparent border-none rounded-[calc(var(--radius-m)-2px)]',
              active
                ? 'text-[var(--point-foreground)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
            ),
          className,
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {active && variant === 'underline' && (
          <motion.div
            layoutId={indicatorId}
            className={cn('absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--point)] rounded-full shadow-none', slotClassNames?.indicator)}
            transition={tacSpring.default}
          />
        )}
        {active && variant === 'pill' && (
          <motion.div
            layoutId={indicatorId}
            className={cn('absolute inset-0 bg-[var(--point)] rounded-[var(--radius-m)] shadow-none', slotClassNames?.indicator)}
            transition={tacSpring.default}
          />
        )}
        {active && variant === 'outline' && (
          <motion.div
            layoutId={indicatorId}
            className={cn('absolute inset-0 bg-[var(--point)] rounded-[calc(var(--radius-m)-2px)] shadow-sm', slotClassNames?.indicator)}
            transition={tacSpring.default}
          />
        )}
        {variant === 'outline' ? (
          <motion.span
            className={cn('relative z-10', slotClassNames?.label)}
            initial={false}
            animate={{ color: active ? 'var(--point-foreground)' : 'var(--muted-foreground)' }}
            transition={tacSpring.default}
          >
            {children}
          </motion.span>
        ) : (
          <span className={cn('relative z-10', slotClassNames?.label)}>{children}</span>
        )}
      </motion.button>
    );
  },
);
TabTrigger.displayName = 'TabTrigger';

/** Props for a tab panel that renders when its value is active. */
export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value that activates this content panel; must match a TabTrigger value. */
  value: string;
}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ value: tabValue, className, ...props }, ref) => {
    const { value, tabsId } = useContext(TabsContext);
    const isActive = value === tabValue;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${tabsId}-tabpanel-${tabValue}`}
        aria-labelledby={`${tabsId}-tab-${tabValue}`}
        hidden={!isActive}
        aria-hidden={!isActive}
        className={cn('mt-4 text-sm text-[var(--foreground)]', className)}
        {...props}
      />
    );
  },
);
TabContent.displayName = 'TabContent';
