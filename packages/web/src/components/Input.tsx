import React, { forwardRef, useId } from 'react';
import { cn } from '../utils/cn';

/** Props for the Input component, a styled text input with optional label, icons, and error state. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input. */
  label?: string;
  /** Helper text displayed below the input when there is no error. */
  helperText?: string;
  /** When true, applies error styling to the input. */
  error?: boolean;
  /** Error message displayed below the input when `error` is true. */
  errorMessage?: string;
  /** Icon rendered inside the left side of the input. */
  leftIcon?: React.ReactNode;
  /** Icon rendered inside the right side of the input. */
  rightIcon?: React.ReactNode;
  /** Button element rendered flush to the right side of the input. */
  rightButton?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, errorMessage, leftIcon, rightIcon, rightButton, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 z-20 flex items-center text-[var(--muted-foreground)] pointer-events-none [&_svg]:w-5 [&_svg]:h-5">{leftIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? errorId : helperText ? errorId : undefined}
            style={{ transition: 'border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            className={cn(
              'peer relative z-10 w-full py-3 px-4 text-sm font-[var(--font-primary)] text-[var(--foreground)] bg-[var(--input-bg)] border border-solid rounded-[var(--input-radius)] outline-none ring-0 ring-transparent',
              'placeholder:text-[var(--muted-foreground)]',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:ring-0 focus:ring-offset-0',
              error && 'border-[var(--error)] focus:border-[var(--point)]',
              'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              rightButton && 'pr-20',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 z-20 flex items-center text-[var(--muted-foreground)] [&_svg]:w-5 [&_svg]:h-5">{rightIcon}</div>
          )}
          {rightButton && (
            <div className="absolute right-1.5 z-20 flex items-center [&>button]:py-1.5 [&>button]:px-3 [&>button]:text-xs [&>button]:font-medium [&>button]:cursor-pointer [&>button]:rounded-[var(--radius-sm)] [&>button]:border-none [&>button]:bg-[var(--primary)] [&>button]:text-[var(--primary-foreground)] [&>button]:transition-colors [&>button]:duration-fast [&>button]:hover:opacity-90">
              {rightButton}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <span id={errorId} className="text-xs text-[var(--error)]">{errorMessage}</span>
        )}
        {helperText && !error && (
          <span id={errorId} className="text-xs text-[var(--muted-foreground)]">{helperText}</span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
