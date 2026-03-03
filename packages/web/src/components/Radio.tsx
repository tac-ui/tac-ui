import React, { createContext, forwardRef, useCallback, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { diaSpring } from '../constants/motion';
import { peerFocusRing } from '../constants/styles';

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

/** Props for the RadioGroup component, a container that manages selection state for Radio children. */
export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The controlled selected value. */
  value?: string;
  /** The initially selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Callback fired when the selected radio changes. */
  onValueChange?: (value: string) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value: controlledValue, defaultValue, onValueChange, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = useCallback((v: string) => {
      if (!isControlled) setInternalValue(v);
      onValueChange?.(v);
    }, [isControlled, onValueChange]);

    return (
      <RadioGroupContext.Provider value={{ value, onChange: handleChange }}>
        <div ref={ref} role="radiogroup" className={cn('flex flex-col gap-2', className)} {...props} />
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

/** Props for the Radio component, a single radio button that works within a RadioGroup. */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** Label text displayed next to the radio button. */
  label?: string;
  /** The value this radio represents; compared against the RadioGroup's selected value. */
  radioValue: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, radioValue, disabled, ...props }, ref) => {
    const { value, onChange } = useContext(RadioGroupContext);
    const checked = value === radioValue;
    const handleChange = useCallback(() => {
      if (!disabled) onChange?.(radioValue);
    }, [disabled, onChange, radioValue]);

    return (
      <label className={cn('flex items-center gap-3 py-2.5 px-4 rounded-[var(--radius-m)] bg-[var(--interactive-surface-tint)] cursor-pointer transition-colors hover:bg-[var(--interactive-hover-tint)]', disabled && 'cursor-default hover:bg-[var(--interactive-surface-tint)]', className)}>
        <input
          ref={ref}
          type="radio"
          className="peer absolute opacity-0"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <span
          style={{ transition: 'border-color 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms cubic-bezier(0.22, 1, 0.36, 1)' }}
          className={cn(
            'relative w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-2 border-solid',
            peerFocusRing,
            checked ? 'border-[var(--point)]' : 'border-[var(--gray-300)]',
            disabled && 'opacity-50',
          )}
        >
          <AnimatePresence initial={false}>
            {checked && (
              <motion.span
                className="block w-2.5 h-2.5 rounded-full bg-[var(--point)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={diaSpring.light}
              />
            )}
          </AnimatePresence>
        </span>
        {label && (
          <span className={cn('text-sm font-medium text-[var(--foreground)]', disabled && 'text-[var(--gray-400)]')}>
            {label}
          </span>
        )}
      </label>
    );
  },
);
Radio.displayName = 'Radio';
