import React, { forwardRef, useId } from 'react';
import { cn } from '../utils/cn';
import { inputTransition } from '../constants/styles';

/** Size variant of the Input component. */
export type InputSize = 'sm' | 'md' | 'lg';

/** Props for the Input component, a styled text input with optional label, icons, and error state. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Controls the height and font size of the input element. */
  size?: InputSize;
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

const sizeClasses = {
  sm: 'h-[var(--input-sm-height)] text-[length:var(--input-sm-font-size)] px-[var(--input-sm-px)] rounded-[var(--input-sm-radius)]',
  md: 'h-[var(--input-md-height)] text-[length:var(--input-md-font-size)] px-[var(--input-md-px)] rounded-[var(--input-md-radius)]',
  lg: 'h-[var(--input-lg-height)] text-[length:var(--input-lg-font-size)] px-[var(--input-lg-px)] rounded-[var(--input-lg-radius)]',
};

const iconLeftPadding = {
  sm: 'pl-[var(--input-sm-icon-padding)]',
  md: 'pl-[var(--input-md-icon-padding)]',
  lg: 'pl-[var(--input-lg-icon-padding)]',
};
const iconRightPadding = {
  sm: 'pr-[var(--input-sm-icon-padding)]',
  md: 'pr-[var(--input-md-icon-padding)]',
  lg: 'pr-[var(--input-lg-icon-padding)]',
};
const buttonRightPadding = { sm: 'pr-16', md: 'pr-20', lg: 'pr-22' };
const iconSizeClasses = {
  sm: '[&_svg]:w-[var(--input-sm-icon-size)] [&_svg]:h-[var(--input-sm-icon-size)]',
  md: '[&_svg]:w-[var(--input-md-icon-size)] [&_svg]:h-[var(--input-md-icon-size)]',
  lg: '[&_svg]:w-[var(--input-lg-icon-size)] [&_svg]:h-[var(--input-lg-icon-size)]',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      errorMessage,
      leftIcon,
      rightIcon,
      rightButton,
      size = 'md',
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className={cn(
                'absolute left-3 z-20 flex items-center text-[var(--muted-foreground)] pointer-events-none',
                iconSizeClasses[size],
              )}
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? errorId : helperText ? helperId : undefined}
            style={{ transition: inputTransition }}
            className={cn(
              'peer relative z-10 w-full font-[var(--font-primary)] text-[var(--foreground)] bg-[var(--input-bg)] border-[0.5px] border-solid outline-none',
              sizeClasses[size],
              'placeholder:text-[var(--muted-foreground)]',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
              error && 'border-[var(--error)] focus:border-[var(--point)]',
              'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
              leftIcon && iconLeftPadding[size],
              rightIcon && iconRightPadding[size],
              rightButton && buttonRightPadding[size],
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div
              className={cn(
                'absolute right-3 z-20 flex items-center text-[var(--muted-foreground)]',
                iconSizeClasses[size],
              )}
            >
              {rightIcon}
            </div>
          )}
          {rightButton && (
            <div className="absolute right-1.5 z-20 flex items-center [&>button]:py-1.5 [&>button]:px-3 [&>button]:text-xs [&>button]:font-medium [&>button]:cursor-pointer [&>button]:rounded-[var(--radius-sm)] [&>button]:border-none [&>button]:bg-[var(--primary)] [&>button]:text-[var(--primary-foreground)] [&>button]:transition-colors [&>button]:duration-fast [&>button]:hover:opacity-90">
              {rightButton}
            </div>
          )}
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
Input.displayName = 'Input';
