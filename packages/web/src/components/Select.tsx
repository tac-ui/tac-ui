'use client';

import React, { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import { useDropdownPosition } from '../hooks/useDropdownPosition';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { inputTransition } from '../constants/styles';
import { useRovingIndex } from '../hooks/useAccessibility';
import { dropdownMotionVariants, tacSpring, EASING, DURATION } from '../constants/motion';

/** Size variant of the Select component. */
export type SelectSize = 'sm' | 'md' | 'lg';

/** Represents a single option in the Select dropdown. */
export interface SelectOption {
  /** The value submitted when this option is selected. */
  value: string;
  /** The human-readable label displayed for this option. */
  label: string;
  /** When true, this option cannot be selected. */
  disabled?: boolean;
}

/** Props for the Select component, a styled native select with optional label and error state. */
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Label text displayed above the select. */
  label?: string;
  /** Helper text displayed below the select when there is no error. */
  helperText?: string;
  /** When true, applies error styling to the select. */
  error?: boolean;
  /** Error message displayed below the select when `error` is true. */
  errorMessage?: string;
  /** Array of options to render in the dropdown. */
  options: SelectOption[];
  /** Placeholder option shown when no value is selected. */
  placeholder?: string;
  /** Controls the height and font size of the select element. */
  size?: SelectSize;
  /** Currently selected value (controlled). */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when an option is selected. */
  onChange?: (value: string) => void;
  /** When true, the select is disabled. */
  disabled?: boolean;
  /** ID attribute for the trigger button. */
  id?: string;
}

const sizeClasses = {
  sm: 'h-[var(--input-sm-height)] text-[length:var(--input-sm-font-size)] pl-[var(--input-sm-px)] rounded-[var(--input-sm-radius)]',
  md: 'h-[var(--input-md-height)] text-[length:var(--input-md-font-size)] pl-[var(--input-md-px)] rounded-[var(--input-md-radius)]',
  lg: 'h-[var(--input-lg-height)] text-[length:var(--input-lg-font-size)] pl-[var(--input-lg-px)] rounded-[var(--input-lg-radius)]',
};

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      errorMessage,
      options,
      placeholder,
      size = 'md',
      id,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const listboxId = `${inputId}-listbox`;

    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerBtnRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const side = useDropdownPosition(triggerBtnRef, listboxRef, open);

    const currentValue = isControlled ? value : internalValue;
    const selectedOption = options.find((o) => o.value === currentValue);
    const displayText = selectedOption ? selectedOption.label : placeholder || 'Select...';

    const handleOpen = useCallback(() => {
      if (!disabled) setOpen(true);
    }, [disabled]);

    const handleClose = useCallback(() => {
      setOpen(false);
    }, []);

    const handleSelect = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;
        if (!isControlled) setInternalValue(option.value);
        onChange?.(option.value);
        handleClose();
      },
      [isControlled, onChange, handleClose],
    );

    const handleTriggerClick = useCallback(() => {
      if (open) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [open, handleOpen, handleClose]);

    const handleTriggerKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
          setTimeout(() => {
            const firstItem = listboxRef.current?.querySelector<HTMLElement>(
              '[role="option"]:not([aria-disabled="true"])',
            );
            firstItem?.focus();
          }, 0);
        } else if (e.key === 'Escape') {
          handleClose();
        }
      },
      [handleClose],
    );

    // Outside-click closes
    useEffect(() => {
      if (!open) return;
      const handleMouseDown = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          handleClose();
        }
      };
      document.addEventListener('mousedown', handleMouseDown);
      return () => document.removeEventListener('mousedown', handleMouseDown);
    }, [open, handleClose]);

    // Keyboard navigation within the listbox
    useRovingIndex(listboxRef, open, {
      itemSelector: '[role="option"]:not([aria-disabled="true"])',
      onSelect: () => setOpen(false),
    });

    return (
      <div ref={ref} className="w-full flex flex-col gap-2" {...props}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            id={inputId}
            ref={triggerBtnRef}
            aria-expanded={open}
            aria-controls={listboxId}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? errorId : helperText ? helperId : undefined}
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
            disabled={disabled}
            style={{ transition: inputTransition }}
            className={cn(
              'w-full appearance-none font-[var(--font-primary)] bg-[var(--input-bg)] border-[0.5px] border-solid outline-none text-[var(--foreground)] pr-10 cursor-pointer text-left truncate',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
              error && 'border-[var(--error)] focus:border-[var(--point)]',
              !selectedOption && 'text-[var(--muted-foreground)]',
              sizeClasses[size],
              className,
            )}
          >
            {displayText}
          </button>
          <motion.svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)] pointer-events-none"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={tacSpring.magnetic}
          >
            <path d="M4 6l4 4 4-4" />
          </motion.svg>

          <AnimatePresence>
            {open && (
              <motion.div
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                className={cn(
                  'absolute w-max min-w-full max-w-[calc(100vw-1rem)]',
                  side === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1',
                  'bg-[var(--dropdown-bg)] backdrop-blur-[40px] backdrop-saturate-[180%]',
                  'rounded-[var(--radius-m)] border-[0.5px] border-solid border-[var(--input-border-rest)] shadow-[var(--dropdown-shadow)]',
                  'max-h-[280px] overflow-y-auto',
                  'z-[var(--z-dropdown)]',
                )}
                variants={dropdownMotionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={tacSpring.magnetic}
                style={{ originY: side === 'bottom' ? 0 : 1 }}
              >
                {options.map((option, index) => (
                  <div
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={option.value === currentValue}
                    aria-disabled={option.disabled}
                    tabIndex={option.disabled ? -1 : 0}
                    onClick={() => handleSelect(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSelect(option);
                      if (e.key === 'Escape') handleClose();
                    }}
                    style={{
                      transition: `color ${DURATION.fast} ${EASING}, background-color ${DURATION.fast} ${EASING}`,
                    }}
                    className={cn(
                      'px-3 py-3 text-sm cursor-pointer',
                      'hover:bg-[var(--dropdown-item-hover)] active:bg-[var(--dropdown-item-hover)] focus:bg-[var(--dropdown-item-hover)] focus:outline-none',
                      'first:rounded-t-[var(--radius-sm)] last:rounded-b-[var(--radius-sm)]',
                      option.value === currentValue && 'bg-[var(--secondary)] font-medium text-[var(--point)]',
                      option.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                    )}
                  >
                    {option.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {error && errorMessage && (
          <span id={errorId} className="text-xs text-[var(--error)]">
            {errorMessage}
          </span>
        )}
        {helperText && !error && (
          <span id={helperId} className="text-xs text-[var(--muted-foreground)]">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';
