import React, { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { inputTransition } from '../constants/styles';
import { useRovingIndex } from '../hooks/useAccessibility';
import { dropdownMotionVariants, tacSpring } from '../constants/motion';

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
export interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Available options to filter and select from. */
  options: ComboboxOption[];
  /** Currently selected value. */
  value?: string;
  /** Called when an option is selected. */
  onChange?: (value: string) => void;
  /** Placeholder text for the search input. */
  placeholder?: string;
  /** Text shown when no options match the filter. @default 'No results found' */
  emptyText?: string;
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
  ({ className, options, value, onChange, placeholder, emptyText = 'No results found', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const listboxId = `${inputId}-listbox`;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

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
        onChange?.(option.value);
        handleClose();
      },
      [onChange, handleClose],
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
        <div className="relative flex items-center">
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
              'w-full h-[var(--input-height)] px-[var(--input-px)] pr-9',
              'text-[var(--input-font-size)] font-[var(--font-primary)] text-[var(--foreground)]',
              'bg-[var(--input-bg)] border border-solid',
              'rounded-[var(--input-radius)] outline-none',
              'placeholder:text-[var(--gray-400)]',
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
                maskImage:
                  filtered.length > 5 ? 'linear-gradient(to bottom, black calc(100% - 32px), transparent)' : undefined,
                WebkitMaskImage:
                  filtered.length > 5 ? 'linear-gradient(to bottom, black calc(100% - 32px), transparent)' : undefined,
                originY: 0,
              }}
              className={cn(
                'absolute top-full mt-1 w-full',
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
                      transition:
                        'color 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms cubic-bezier(0.22, 1, 0.36, 1)',
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
