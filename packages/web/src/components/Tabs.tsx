import React, { createContext, forwardRef, useCallback, useContext, useState, useEffect, useId } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { cn } from '../utils/cn';
import { diaSpring } from '../constants/motion';
import { focusRing } from '../constants/styles';

/** Visual style variant for the Tabs component. */
export type TabVariant = 'underline' | 'pill' | 'outline' | 'icon';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant: TabVariant;
  mounted: boolean;
}

const TabsContext = createContext<TabsContextValue>({ value: '', onChange: () => {}, variant: 'underline', mounted: false });

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
    const [mounted, setMounted] = useState(false);
    const value = controlledValue ?? uncontrolled;
    const onChange = useCallback(
      (v: string) => { setUncontrolled(v); onValueChange?.(v); },
      [onValueChange],
    );

    useEffect(() => setMounted(true), []);

    return (
      <TabsContext.Provider value={{ value, onChange, variant, mounted }}>
        <div ref={ref} className={cn('flex flex-col', className)} {...props} />
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export const TabsList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useContext(TabsContext);
    const id = useId();

    return (
      <LayoutGroup id={id}>
        <div
          ref={ref}
          role="tablist"
          className={cn(
            variant === 'underline' && 'flex gap-1 pb-1 border-b border-solid border-[var(--border)]',
            variant === 'pill' && 'relative inline-flex gap-1 p-1 bg-[var(--muted)] rounded-[var(--radius-m)]',
            variant === 'outline' && 'inline-flex items-center p-[2px] bg-[var(--background)] border border-solid border-[var(--border)] rounded-[var(--radius-m)] shadow-sm',
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

/** Props for an individual tab trigger button. */
export interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value this trigger activates; must match a TabContent value. */
  value: string;
  /** Icon element to display (only used with icon variant). */
  icon?: React.ReactNode;
}

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ value: tabValue, className, children, icon, ...props }, ref) => {
    const { value, onChange, variant, mounted } = useContext(TabsContext);
    const active = value === tabValue;

    if (variant === 'icon') {
      return (
        <button
          ref={ref}
          role="tab"
          type="button"
          id={`tab-${tabValue}`}
          aria-selected={active}
          aria-controls={`tabpanel-${tabValue}`}
          onClick={() => onChange(tabValue)}
          className={cn(
            'relative flex items-center py-2 px-3 rounded-[var(--radius-m)] bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] transition-colors duration-fast ease-standard', focusRing,
            active && 'text-[var(--point-foreground)]',
            className,
          )}
          {...props}
        >
          {active && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-[var(--point)] rounded-[var(--radius-m)] shadow-none"
              transition={diaSpring.default}
            />
          )}
          {icon && <span className="relative z-10 w-5 h-5 [&>svg]:w-5 [&>svg]:h-5">{icon}</span>}
          {mounted ? (
            <AnimatePresence initial={false}>
              {active && (
                <motion.span
                  className="relative z-10 text-[13px] font-semibold overflow-hidden whitespace-nowrap inline-block"
                  initial={{ width: 0, marginLeft: 0 }}
                  animate={{ width: 'auto', marginLeft: 8 }}
                  exit={{ width: 0, marginLeft: 0 }}
                  transition={diaSpring.default}
                >
                  {children}
                </motion.span>
              )}
            </AnimatePresence>
          ) : active ? (
            <span className="relative z-10 text-[13px] font-semibold whitespace-nowrap ml-2">{children}</span>
          ) : null}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={`tab-${tabValue}`}
        aria-selected={active}
        aria-controls={`tabpanel-${tabValue}`}
        onClick={() => onChange(tabValue)}
        style={{ transition: 'color 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        className={cn(
          'relative cursor-pointer text-center', focusRing,
          variant === 'underline' && cn(
            'pt-2 pb-2 px-3 text-sm font-medium text-[var(--muted-foreground)] bg-transparent border-none border-b-2 border-b-transparent rounded-none -mb-[1px]',
            'hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)] hover:opacity-100',
            active
              ? 'opacity-100 text-[var(--point)] font-medium hover:text-[var(--point)] hover:bg-transparent'
              : 'opacity-60',
          ),
          variant === 'pill' && cn(
            'py-2 px-4 text-[13px] font-medium text-[var(--muted-foreground)] bg-transparent border-none rounded-[var(--radius-m)] transition-colors',
            active
              ? 'text-[var(--point-foreground)] font-semibold opacity-100'
              : 'opacity-60 hover:text-[var(--foreground)] hover:opacity-100 hover:bg-[var(--interactive-hover)]',
          ),
          variant === 'outline' && cn(
            'relative py-[6px] px-4 text-[13px] font-medium transition-colors bg-transparent border-none rounded-[calc(var(--radius-m)-2px)]',
            active
              ? 'text-[var(--point-foreground)]'
              : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
          ),
          className,
        )}
        {...props}
      >
        {active && variant === 'underline' && (
          <motion.div
            layoutId="tab-indicator"
            className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--point)] rounded-full shadow-none"
            transition={diaSpring.default}
          />
        )}
        {active && variant === 'pill' && (
          <motion.div
            layoutId="tab-indicator"
            className="absolute inset-0 bg-[var(--point)] rounded-[var(--radius-m)] shadow-none"
            transition={diaSpring.default}
          />
        )}
        {active && variant === 'outline' && (
          <motion.div
            layoutId="tab-indicator"
            className="absolute inset-0 bg-[var(--point)] rounded-[calc(var(--radius-m)-2px)] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
            transition={diaSpring.default}
          />
        )}
        {variant === 'outline' ? (
          <motion.span
            className="relative z-10"
            initial={false}
            animate={{ color: active ? 'var(--point-foreground)' : 'var(--muted-foreground)' }}
            transition={diaSpring.default}
          >
            {children}
          </motion.span>
        ) : (
          <span className="relative z-10">{children}</span>
        )}
      </button>
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
    const { value } = useContext(TabsContext);
    const isActive = value === tabValue;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${tabValue}`}
        aria-labelledby={`tab-${tabValue}`}
        hidden={!isActive}
        aria-hidden={!isActive}
        className={cn('mt-4 text-sm text-[var(--foreground)]', className)}
        {...props}
      />
    );
  },
);
TabContent.displayName = 'TabContent';
