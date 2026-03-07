import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { tacSpring, EXIT_DURATION } from '../constants/motion';
import type { MotionConflictingHandlers } from '../constants/types';
import { focusRing } from '../constants/styles';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Color and semantic variant for the Toast component. */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/** Screen position where the toast stack is anchored. */
export type ToastPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

/** Options passed to the toast() trigger function. */
export interface ToastOptions {
  /** Visual variant. @default 'default' */
  variant?: ToastVariant;
  /** Auto-dismiss delay in milliseconds; 0 disables auto-dismiss. @default 5000 */
  duration?: number;
  /** Optional action element rendered to the right of the message. */
  action?: React.ReactNode;
  /** Optional icon rendered on the left (visible in default variant). */
  icon?: React.ReactNode;
  /** Callback fired when the action button is clicked. */
  onAction?: () => void;
}

/** Internal toast entry stored in context state. */
interface ToastEntry extends Required<Omit<ToastOptions, 'action' | 'icon' | 'onAction'>> {
  id: string;
  message: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  onAction?: () => void;
}

/** Shape of the value provided by ToastContext. */
interface ToastContextValue {
  toast: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  entries: ToastEntry[];
  position: ToastPosition;
}

/** Props for the ToastProvider. */
export interface ToastProviderProps {
  children: React.ReactNode;
  /** Where toasts are anchored on screen. @default 'bottom-right' */
  position?: ToastPosition;
  /** Maximum number of toasts visible at once. @default 5 */
  maxToasts?: number;
}

// ---------------------------------------------------------------------------
// CVA variants
// ---------------------------------------------------------------------------

const toastVariants = cva(
  'group relative flex items-center gap-3 pl-5 pr-4 py-3.5 min-w-[320px] max-w-[480px] w-auto rounded-[var(--radius-lg)] pointer-events-auto [backdrop-filter:blur(40px)_saturate(180%)] bg-[var(--card)]',
  {
    variants: {
      variant: {
        default: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        success: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        error: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        warning: 'text-[var(--foreground)] shadow-[var(--glass-panel-shadow)]',
        info: 'text-[var(--foreground)] [box-shadow:var(--glass-panel-shadow),var(--glass-inset)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const dotColorMap: Record<ToastVariant, string> = {
  default: '',
  success: 'bg-[var(--success)]',
  error: 'bg-[var(--error)]',
  warning: 'bg-[var(--warning)]',
  info: 'bg-[var(--info)]',
};

const textColorMap: Record<ToastVariant, string> = {
  default: 'text-[var(--foreground)]',
  success: 'text-[var(--success-foreground)]',
  error: 'text-[var(--error-foreground)]',
  warning: 'text-[var(--warning-foreground)]',
  info: 'text-[var(--info-foreground)]',
};

const positionClassMap: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

let idCounter = 0;
const nextId = () => `toast-${++idCounter}`;

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ToastContext = React.createContext<ToastContextValue | null>(null);

// ---------------------------------------------------------------------------
// ToastProvider
// ---------------------------------------------------------------------------

/**
 * Wraps the application and provides the toast notification system.
 * Must be rendered once near the root of the component tree.
 * @example
 * <ToastProvider position="bottom-right">
 *   <App />
 * </ToastProvider>
 */
export function ToastProvider({ children, position = 'bottom-right', maxToasts = 5 }: ToastProviderProps) {
  const [entries, setEntries] = useState<ToastEntry[]>([]);
  // Keep a ref so dismiss callbacks always see up-to-date entries.
  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  const dismiss = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setEntries([]);
  }, []);

  const toast = useCallback(
    (message: string, options: ToastOptions = {}): string => {
      const id = nextId();
      const entry: ToastEntry = {
        id,
        message,
        variant: options.variant ?? 'default',
        duration: options.duration ?? 5000,
        action: options.action,
        icon: options.icon,
        onAction: options.onAction,
      };

      setEntries((prev) => {
        const next = [...prev, entry];
        // Trim to maxToasts by dismissing oldest entries.
        if (next.length > maxToasts) {
          return next.slice(next.length - maxToasts);
        }
        return next;
      });

      return id;
    },
    [maxToasts],
  );

  const value: ToastContextValue = { toast, dismiss, dismissAll, entries, position };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// useToast hook
// ---------------------------------------------------------------------------

/**
 * Returns toast control functions. Must be used within a ToastProvider.
 * @example
 * const { toast, dismiss, dismissAll } = useToast();
 * toast('Saved!', { variant: 'success' });
 */
export function useToast(): {
  toast: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
} {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return { toast: ctx.toast, dismiss: ctx.dismiss, dismissAll: ctx.dismissAll };
}

// ---------------------------------------------------------------------------
// Individual Toast item
// ---------------------------------------------------------------------------

/** Props for a single rendered toast item. */
export interface ToastItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, MotionConflictingHandlers>, VariantProps<typeof toastVariants> {
  /** Toast entry data. */
  entry: ToastEntry;
  /** Callback to dismiss this toast. */
  onDismiss: (id: string) => void;
}

/**
 * Renders a single toast notification card.
 * Auto-dismisses after entry.duration ms when duration > 0.
 */
export const ToastItem = forwardRef<HTMLDivElement, ToastItemProps>(
  ({ className, entry, onDismiss, ...props }, ref) => {
    const variant = entry.variant;

    useEffect(() => {
      if (entry.duration > 0) {
        const timer = setTimeout(() => onDismiss(entry.id), entry.duration);
        return () => clearTimeout(timer);
      }
    }, [entry.id, entry.duration, onDismiss]);

    return (
      <motion.div
        ref={ref}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={cn(toastVariants({ variant }), className)}
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 6, filter: 'blur(2px)', transition: { duration: EXIT_DURATION } }}
        transition={tacSpring.magnetic}
        {...props}
      >
        {variant !== 'default' && <span className={cn('w-2 h-2 rounded-full shrink-0', dotColorMap[variant])} />}
        {entry.icon && variant === 'default' && (
          <span className="w-[18px] h-[18px] shrink-0 text-[var(--muted-foreground)] [&>svg]:w-[18px] [&>svg]:h-[18px]">
            {entry.icon}
          </span>
        )}
        <span className={cn('flex-1 text-sm font-medium', textColorMap[variant])}>{entry.message}</span>
        {entry.action && (
          <button
            type="button"
            onClick={() => {
              entry.onAction?.();
              onDismiss(entry.id);
            }}
            className={cn(
              'py-1.5 px-3.5 rounded-[var(--radius-sm)] text-[13px] font-semibold cursor-pointer border-none transition-opacity hover:opacity-80',
              variant === 'default'
                ? 'bg-[var(--secondary)] text-[var(--foreground)]'
                : 'bg-[var(--secondary)] text-[var(--foreground)] opacity-90',
            )}
          >
            {entry.action}
          </button>
        )}
        <button
          type="button"
          onClick={() => onDismiss(entry.id)}
          className={cn(
            'flex items-center justify-center w-7 h-7 rounded-[var(--radius-sm)] text-[var(--muted-foreground)] bg-transparent border-none cursor-pointer transition-colors hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
            focusRing,
          )}
          aria-label="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 3L3 11" />
            <path d="M3 3l8 8" />
          </svg>
        </button>
      </motion.div>
    );
  },
);
ToastItem.displayName = 'ToastItem';

// ---------------------------------------------------------------------------
// ToastContainer
// ---------------------------------------------------------------------------

/**
 * Renders the stacked list of active toasts. Automatically included inside
 * ToastProvider; you do not need to render this yourself.
 */
export const ToastContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const ctx = useContext(ToastContext);
    if (!ctx) return null;

    const { entries, dismiss, position } = ctx;

    return (
      <div
        ref={ref}
        aria-label="Notifications"
        className={cn(
          'fixed flex flex-col gap-2 pointer-events-none z-[var(--z-toast)]',
          positionClassMap[position],
          className,
        )}
        {...props}
      >
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <ToastItem key={entry.id} entry={entry} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    );
  },
);
ToastContainer.displayName = 'ToastContainer';

export { toastVariants };
