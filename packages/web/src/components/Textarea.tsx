import React, { forwardRef, useId } from 'react';
import { cn } from '../utils/cn';

/** Props for the Textarea component, a styled multi-line text input with optional label and error state. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea. */
  label?: string;
  /** Helper text displayed below the textarea when there is no error. */
  helperText?: string;
  /** When true, applies error styling to the textarea. */
  error?: boolean;
  /** Error message displayed below the textarea when `error` is true. */
  errorMessage?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, errorMessage, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    return (
      <div className="flex flex-col gap-2">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">{label}</label>}
        <div className="relative isolate">
          <textarea
            ref={ref}
            id={inputId}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? errorId : helperText ? errorId : undefined}
            style={{ transition: 'border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            className={cn(
              'peer relative z-10 w-full min-h-[80px] py-3 px-4 text-sm text-[var(--foreground)] bg-[var(--input-bg)] border border-solid rounded-[var(--radius-m)] outline-none resize-y ring-0 ring-transparent',
              'placeholder:text-[var(--muted-foreground)]',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:ring-0 focus:ring-offset-0',
              error && 'border-[var(--error)] focus:border-[var(--point)]',
              'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          />
        </div>
        {error && errorMessage && <span id={errorId} className="text-xs text-[var(--error)]">{errorMessage}</span>}
        {helperText && !error && <span id={errorId} className="text-xs text-[var(--muted-foreground)]">{helperText}</span>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
