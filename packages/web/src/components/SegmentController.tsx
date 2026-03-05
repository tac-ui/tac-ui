import React, { forwardRef, useState, useCallback, useId, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';
import { focusRing } from '../constants/styles';

/** Size variant of the SegmentController. */
export type SegmentControllerSize = 'sm' | 'md' | 'lg';

/** Selection mode of the SegmentController. */
export type SegmentControllerMode = 'single' | 'multi';

/** A single segment option. */
export interface SegmentOption {
  /** Unique value for this segment. */
  value: string;
  /** Display label for this segment. */
  label: string;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** When true, this segment cannot be selected. */
  disabled?: boolean;
}

/** Shared props for both modes. */
interface SegmentControllerBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Array of segment options to render. */
  options: SegmentOption[];
  /** Size variant affecting height and font size. @default 'md' */
  size?: SegmentControllerSize;
  /** When true, segments expand to fill available width. @default false */
  fullWidth?: boolean;
  /** When true, the entire control is disabled. */
  disabled?: boolean;
  /** When true, only the selected option is visible; expands on hover to reveal all options. @default false */
  collapsible?: boolean;
}

/** Props for single-select mode (default). */
interface SegmentControllerSingleProps extends SegmentControllerBaseProps {
  /** Selection mode. @default 'single' */
  mode?: 'single';
  /** The controlled selected value. */
  value?: string;
  /** The initial value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the selected segment changes. */
  onChange?: (value: string) => void;
}

/** Props for multi-select mode. */
interface SegmentControllerMultiProps extends SegmentControllerBaseProps {
  /** Selection mode. */
  mode: 'multi';
  /** The controlled selected values. */
  value?: string[];
  /** The initial values for uncontrolled usage. */
  defaultValue?: string[];
  /** Called when the selected segments change. */
  onChange?: (value: string[]) => void;
}

/** Props for the SegmentController component, a pill-shaped segmented control with animated indicator. */
export type SegmentControllerProps = SegmentControllerSingleProps | SegmentControllerMultiProps;

const sizeClasses: Record<SegmentControllerSize, { root: string; item: string }> = {
  sm: { root: 'h-8 p-0.5', item: 'px-3 text-xs gap-1' },
  md: { root: 'h-10 p-1', item: 'px-4 text-[13px] gap-1.5' },
  lg: { root: 'h-12 p-1', item: 'px-5 text-sm gap-1.5' },
};

const checkIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 6L5 8.5L9.5 3.5" />
  </svg>
);

export const SegmentController = forwardRef<HTMLDivElement, SegmentControllerProps>((props, ref) => {
  const {
    className,
    options,
    mode = 'single',
    size = 'md',
    fullWidth = false,
    disabled,
    collapsible = false,
    ...rest
  } = props;
  const isMulti = mode === 'multi';

  // ── Collapsible state ──
  const [isExpanded, setIsExpanded] = useState(false);

  // ── Single-select state ──
  const layoutId = useId();
  const [singleInternal, setSingleInternal] = useState(
    !isMulti ? ((props as SegmentControllerSingleProps).defaultValue ?? options[0]?.value ?? '') : '',
  );
  const singleValue = !isMulti ? ((props as SegmentControllerSingleProps).value ?? singleInternal) : '';

  // ── Multi-select state ──
  const [multiInternal, setMultiInternal] = useState<string[]>(
    isMulti ? ((props as SegmentControllerMultiProps).defaultValue ?? []) : [],
  );
  const multiValue = isMulti ? ((props as SegmentControllerMultiProps).value ?? multiInternal) : [];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSingleSelect = useCallback(
    (optionValue: string) => {
      if (disabled) return;
      setSingleInternal(optionValue);
      (props as SegmentControllerSingleProps).onChange?.(optionValue);
    },
    [disabled, (props as SegmentControllerSingleProps).onChange],
  );

  const handleMultiToggle = useCallback(
    (optionValue: string) => {
      if (disabled) return;
      const next = multiValue.includes(optionValue)
        ? multiValue.filter((v) => v !== optionValue)
        : [...multiValue, optionValue];
      setMultiInternal(next);
      (props as SegmentControllerMultiProps).onChange?.(next);
    },
    [disabled, multiValue, (props as SegmentControllerMultiProps).onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isMulti) {
        // Multi: arrow keys move focus, space/enter handled by button click
        const btns = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="checkbox"]'));
        const currentIndex = btns.indexOf(document.activeElement as HTMLButtonElement);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          btns[currentIndex < btns.length - 1 ? currentIndex + 1 : 0]?.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          btns[currentIndex > 0 ? currentIndex - 1 : btns.length - 1]?.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          btns[0]?.focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          btns[btns.length - 1]?.focus();
        }
        return;
      }

      // Single: arrow keys change selection
      const enabledOptions = options.filter((o) => !o.disabled);
      const currentIndex = enabledOptions.findIndex((o) => o.value === singleValue);

      let nextIndex = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = currentIndex < enabledOptions.length - 1 ? currentIndex + 1 : 0;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledOptions.length - 1;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = enabledOptions.length - 1;
      }

      if (nextIndex >= 0) {
        handleSingleSelect(enabledOptions[nextIndex].value);
      }
    },
    [isMulti, options, singleValue, handleSingleSelect],
  );

  const sc = sizeClasses[size];

  // Strip mode/value/defaultValue/onChange/collapsible from rest to avoid passing to DOM
  const {
    mode: _mode,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    collapsible: _collapsible,
    ...domProps
  } = rest as SegmentControllerBaseProps & {
    mode?: string;
    value?: unknown;
    defaultValue?: unknown;
    onChange?: unknown;
    collapsible?: boolean;
  };

  const renderButton = (option: SegmentOption, isActive: boolean, isDisabled: boolean) => (
    <button
      key={option.value}
      type="button"
      role={isMulti ? 'checkbox' : 'radio'}
      aria-checked={isActive}
      aria-label={isMulti ? option.label : undefined}
      disabled={isDisabled}
      tabIndex={isMulti ? 0 : isActive ? 0 : -1}
      onClick={() => {
        if (isDisabled) return;
        if (isMulti) {
          handleMultiToggle(option.value);
        } else {
          handleSingleSelect(option.value);
        }
      }}
      style={{ transition: 'color 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      className={cn(
        'relative flex items-center justify-center h-full rounded-[calc(var(--radius-m)-2px)] border-none cursor-pointer bg-transparent font-medium whitespace-nowrap',
        focusRing,
        sc.item,
        fullWidth && 'flex-1',
        isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        isDisabled && 'cursor-not-allowed opacity-50',
      )}
    >
      {/* Indicator */}
      {isMulti ? (
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={tacSpring.default}
              className="absolute inset-0 bg-[var(--surface)] rounded-[calc(var(--radius-m)-2px)] shadow-[var(--shadow-sm)]"
            />
          )}
        </AnimatePresence>
      ) : (
        <>
          {isActive && mounted && (
            <motion.div
              layoutId="segment-indicator"
              className="absolute inset-0 bg-[var(--surface)] rounded-[calc(var(--radius-m)-2px)] shadow-[var(--shadow-sm)]"
              transition={tacSpring.default}
            />
          )}
          {isActive && !mounted && (
            <div className="absolute inset-0 bg-[var(--surface)] rounded-[calc(var(--radius-m)-2px)] shadow-[var(--shadow-sm)]" />
          )}
        </>
      )}

      {/* Check icon (multi mode only) */}
      {isMulti && (
        <AnimatePresence mode="wait" initial={false}>
          {isActive && (
            <motion.span
              key="check"
              initial={{ scale: 0, width: 0 }}
              animate={{ scale: 1, width: 'auto' }}
              exit={{ scale: 0, width: 0 }}
              transition={tacSpring.magnetic}
              className="relative z-10 inline-flex items-center overflow-hidden"
            >
              {checkIcon}
            </motion.span>
          )}
        </AnimatePresence>
      )}

      {option.icon && <span className="relative z-10 w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">{option.icon}</span>}
      {option.label && <span className="relative z-10">{option.label}</span>}
    </button>
  );

  const container = (
    <div
      ref={ref}
      role={isMulti ? 'group' : 'radiogroup'}
      aria-label={isMulti ? 'Toggle options' : undefined}
      aria-expanded={collapsible ? isExpanded : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={collapsible ? () => setIsExpanded(true) : undefined}
      onMouseLeave={collapsible ? () => setIsExpanded(false) : undefined}
      onFocus={collapsible ? () => setIsExpanded(true) : undefined}
      onBlur={
        collapsible
          ? (e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsExpanded(false);
            }
          : undefined
      }
      className={cn(
        'inline-flex items-center bg-[var(--background-subtle)] rounded-[var(--radius-m)]',
        !collapsible && 'gap-0.5',
        sc.root,
        fullWidth && 'w-full',
        disabled && 'opacity-50 pointer-events-none',
        collapsible && !isExpanded && 'cursor-pointer',
        className,
      )}
      {...domProps}
    >
      <AnimatePresence initial={false}>
        {options.map((option) => {
          const isActive = isMulti ? multiValue.includes(option.value) : option.value === singleValue;
          const isDisabled = disabled || option.disabled;

          // Collapsible: hide non-selected options when collapsed
          if (collapsible && !isExpanded && !isActive) return null;

          const btn = renderButton(option, isActive, isDisabled ?? false);

          if (collapsible) {
            // Use consistent key for each option so AnimatePresence
            // tracks them correctly when selection changes
            return (
              <motion.div
                key={option.value}
                initial={isActive ? false : { width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={isActive ? undefined : { width: 0, opacity: 0 }}
                transition={tacSpring.magnetic}
                style={isActive ? undefined : { overflow: 'hidden' }}
                className="flex items-center h-full"
              >
                {btn}
              </motion.div>
            );
          }

          return btn;
        })}
      </AnimatePresence>
    </div>
  );

  // Single mode needs LayoutGroup for shared layoutId indicator
  if (!isMulti) {
    return <LayoutGroup id={layoutId}>{container}</LayoutGroup>;
  }

  return container;
});
SegmentController.displayName = 'SegmentController';

// ---------------------------------------------------------------------------
// Backward-compatible aliases (merged from SlidingSelect)
// ---------------------------------------------------------------------------

/** @deprecated Use `SegmentOption` instead. */
export type SlidingSelectOption = SegmentOption;
/** @deprecated Use `SegmentControllerSize` instead. */
export type SlidingSelectSize = SegmentControllerSize;
/** @deprecated Use `SegmentControllerProps` instead. */
export type SlidingSelectProps = SegmentControllerSingleProps;

/** @deprecated Use `SegmentController` instead. */
export const SlidingSelect = SegmentController;
