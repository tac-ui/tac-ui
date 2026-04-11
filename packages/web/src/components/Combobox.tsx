'use client';

import React, { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import { useDropdownPosition } from '../hooks/useDropdownPosition';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { inputTransition } from '../constants/styles';
import { useRovingIndex } from '../hooks/useAccessibility';
import { dropdownMotionVariants, tacSpring, EASING, DURATION } from '../constants/motion';

/** Size variant of the Combobox component. */
export type ComboboxSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<ComboboxSize, string> = {
  sm: 'h-[var(--input-sm-height)] px-[var(--input-sm-px)] text-[length:var(--input-sm-font-size)] rounded-[var(--input-sm-radius)]',
  md: 'h-[var(--input-md-height)] px-[var(--input-md-px)] text-[length:var(--input-md-font-size)] rounded-[var(--input-md-radius)]',
  lg: 'h-[var(--input-lg-height)] px-[var(--input-lg-px)] text-[length:var(--input-lg-font-size)] rounded-[var(--input-lg-radius)]',
};

/** A single selectable option in the Combobox dropdown. */
export interface ComboboxOption {
  /** The value submitted when this option is selected. */
  value: string;
  /** The human-readable label displayed for this option. */
  label: string;
  /** When true, this option cannot be selected. */
  disabled?: boolean;
}

/** Props for the Combobox component, a searchable select input with a filterable dropdown. */
export interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size'> {
  /** Available options to filter and select from. */
  options: ComboboxOption[];
  /** Currently selected value (controlled). */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when an option is selected. */
  onChange?: (value: string) => void;
  /** Placeholder text for the search input. */
  placeholder?: string;
  /** Text shown when no options match the filter. @default 'No results found' */
  emptyText?: string;
  /** Controls the height and font size. @default 'md' */
  size?: ComboboxSize;
}

/**
 * Combobox is a searchable select input that filters a list of options as the user types.
 * Supports keyboard navigation (Arrow keys, Enter, Escape) and outside-click to close.
 *
 * @example
 * <Combobox
 *   options={[{ value: 'a', label: 'Apple' }, { value: 'b', label: 'Banana' }]}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="Search fruit..."
 * />
 */

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      className,
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder,
      emptyText = 'No results found',
      size = 'md',
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const listboxId = `${inputId}-listbox`;

    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputWrapperRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const side = useDropdownPosition(inputWrapperRef, listboxRef, open);

    const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

    const filtered = isSearching ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options;

    const handleOpen = useCallback(() => {
      setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
      setOpen(false);
      setIsSearching(false);
      setQuery('');
    }, []);

    const handleSelect = useCallback(
      (option: ComboboxOption) => {
        if (option.disabled) return;
        if (!isControlled) setInternalValue(option.value);
        onChange?.(option.value);
        handleClose();
      },
      [isControlled, onChange, handleClose],
    );

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setIsSearching(true);
      setOpen(true);
    }, []);

    const handleInputFocus = useCallback(() => {
      handleOpen();
    }, [handleOpen]);

    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          handleClose();
          (e.currentTarget as HTMLInputElement).blur();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
          const firstItem = listboxRef.current?.querySelector<HTMLElement>(
            '[role="option"]:not([aria-disabled="true"])',
          );
          firstItem?.focus();
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

    const displayValue = isSearching ? query : selectedLabel;

    return (
      <div ref={containerRef} className="relative inline-block w-full">
        <div ref={inputWrapperRef} className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls={listboxId}
            autoComplete="off"
            value={displayValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            style={{ transition: inputTransition }}
            className={cn(
              'w-full pr-9',
              sizeClasses[size],
              'font-[var(--font-primary)] text-[var(--foreground)]',
              'bg-[var(--input-bg)] border-[0.5px] border-solid',
              'outline-none',
              'placeholder:text-[var(--muted-foreground)]',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
              className,
            )}
            {...props}
          />
          {/* Chevron — spring rotation */}
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
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              style={{
                ...(filtered.length > 5 ? (() => {
                  const fadeMask = side === 'bottom'
                    ? 'linear-gradient(to bottom, black calc(100% - 32px), transparent)'
                    : 'linear-gradient(to top, black calc(100% - 32px), transparent)';
                  return { maskImage: fadeMask, WebkitMaskImage: fadeMask };
                })() : {}),
                originY: side === 'bottom' ? 0 : 1,
              }}
              className={cn(
                'absolute w-full',
                side === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1',
                'bg-[var(--dropdown-bg)] backdrop-blur-[40px] backdrop-saturate-[180%]',
                'rounded-[var(--radius-m)] border-[0.5px] border-solid border-[var(--input-border-rest)] shadow-[var(--dropdown-shadow)]',
                'max-h-[200px] overflow-y-auto',
                'z-[var(--z-dropdown)]',
                'pb-2',
              )}
              variants={dropdownMotionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={tacSpring.magnetic}
            >
              {filtered.length === 0 ? (
                <div className="px-3 py-6 text-sm text-center text-[var(--muted-foreground)]">{emptyText}</div>
              ) : (
                filtered.map((option, index) => (
                  <div
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={option.value === value}
                    aria-disabled={option.disabled}
                    tabIndex={option.disabled ? -1 : 0}
                    onClick={() => handleSelect(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSelect(option);
                      if (e.key === 'Escape') {
                        handleClose();
                      }
                    }}
                    style={{
                      transition: `color ${DURATION.fast} ${EASING}, background-color ${DURATION.fast} ${EASING}`,
                    }}
                    className={cn(
                      'px-3 py-2.5 text-sm cursor-pointer',
                      'hover:bg-[var(--dropdown-item-hover)] focus:bg-[var(--dropdown-item-hover)] focus:outline-none',
                      'first:rounded-t-[var(--radius-sm)] last:rounded-b-[var(--radius-sm)]',
                      option.value === value && 'bg-[var(--secondary)] font-medium text-[var(--point)]',
                      option.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                    )}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

Combobox.displayName = 'Combobox';
