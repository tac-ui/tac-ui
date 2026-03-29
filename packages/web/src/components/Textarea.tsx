'use client';

import React, { forwardRef, useId } from 'react';
import { cn } from '../utils/cn';
import { inputTransition } from '../constants/styles';

/** Size variant of the Textarea component. */
export type TextareaSize = 'sm' | 'md' | 'lg';

/** Props for the Textarea component, a styled multi-line text input with optional label and error state. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Controls the padding and font size of the textarea element. */
  size?: TextareaSize;
  /** Label text displayed above the textarea. */
  label?: string;
  /** Helper text displayed below the textarea when there is no error. */
  helperText?: string;
  /** When true, applies error styling to the textarea. */
  error?: boolean;
  /** Error message displayed below the textarea when `error` is true. */
  errorMessage?: string;
}

const sizeClasses = {
  sm: 'px-[var(--input-sm-px)] text-[length:var(--input-sm-font-size)] rounded-[var(--input-sm-radius)] min-h-[60px] py-2',
  md: 'px-[var(--input-md-px)] text-[length:var(--input-md-font-size)] rounded-[var(--input-md-radius)] min-h-[80px] py-3',
  lg: 'px-[var(--input-lg-px)] text-[length:var(--input-lg-font-size)] rounded-[var(--input-lg-radius)] min-h-[100px] py-3.5',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, errorMessage, size = 'md', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div className="relative isolate">
          <textarea
            ref={ref}
            id={inputId}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? errorId : helperText ? errorId : undefined}
            style={{ transition: inputTransition }}
            className={cn(
              'peer relative z-10 w-full font-[var(--font-primary)] text-[var(--foreground)] bg-[var(--input-bg)] border-[0.5px] border-solid outline-none resize-y',
              sizeClasses[size],
              'placeholder:text-[var(--muted-foreground)]',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
              error && 'border-[var(--error)] focus:border-[var(--point)]',
              'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          />
        </div>
        {error && errorMessage && (
          <span id={errorId} className="text-xs text-[var(--error)]">
            {errorMessage}
          </span>
        )}
        {helperText && !error && (
          <span id={errorId} className="text-xs text-[var(--muted-foreground)]">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
