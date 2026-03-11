import React, { forwardRef, useState, useCallback, useRef, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { EXIT_DURATION, EASING, DURATION } from '../constants/motion';
import { focusRing, inputTransition } from '../constants/styles';

type SensitiveState = 'masked' | 'revealed' | 'empty';

/**
 * A secure input that masks its value by default and reveals on explicit user action.
 * Supports copy-without-reveal and keyboard-driven state transitions.
 * @example <SensitiveInput value={apiKey} onChange={setApiKey} />
 */
export interface SensitiveInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Called after the value is copied to clipboard. */
  onCopy?: () => void;
  /** Called when the input transitions from masked to revealed. */
  onReveal?: () => void;
}

export const SensitiveInput = forwardRef<HTMLInputElement, SensitiveInputProps>(
  ({ className, value, defaultValue, onCopy, onReveal, onKeyDown, ...props }, ref) => {
    const hasValue = value !== undefined
      ? String(value).length > 0
      : defaultValue !== undefined
        ? String(defaultValue).length > 0
        : false;
    const [state, setState] = useState<SensitiveState>(hasValue ? 'masked' : 'empty');
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const inputId = props.id || generatedId;

    // Merge refs
    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    const reveal = useCallback(() => {
      setState('revealed');
      onReveal?.();
      // Focus the input after revealing
      requestAnimationFrame(() => inputRef.current?.focus());
    }, [onReveal]);

    const mask = useCallback(() => {
      if (hasValue) setState('masked');
    }, [hasValue]);

    const handleCopy = useCallback(async () => {
      const val = String(value ?? defaultValue ?? '');
      await navigator.clipboard.writeText(val).catch(() => {});
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }, [value, defaultValue, onCopy]);

    const handleMaskKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          reveal();
        }
      },
      [reveal],
    );

    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          mask();
        }
        onKeyDown?.(e);
      },
      [mask, onKeyDown],
    );

    useEffect(() => {
      if (!hasValue && state === 'revealed') {
        setState('empty');
      }
    }, [hasValue, state]);

    const isMasked = state === 'masked' && hasValue;

    return (
      <div
        className="relative w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Actual input — hidden behind mask when masked */}
        <input
          ref={mergedRef}
          id={inputId}
          type={isMasked ? 'password' : 'text'}
          value={value}
          defaultValue={defaultValue}
          style={{
            transition: inputTransition,
            ...(isMasked ? { opacity: 0, position: 'absolute', pointerEvents: 'none' } : {}),
          }}
          className={cn(
            'peer relative z-10 w-full font-[var(--font-primary)] text-[var(--foreground)] bg-[var(--input-bg)] border-[0.5px] border-solid outline-none',
            'h-[var(--input-md-height)] text-[length:var(--input-md-font-size)] px-[var(--input-md-px)] rounded-[var(--input-md-radius)]',
            'placeholder:text-[var(--muted-foreground)]',
            'border-[var(--input-border-rest)]',
            'hover:border-[var(--input-border-hover)]',
            'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
            'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
            !isMasked && className,
          )}
          onKeyDown={handleInputKeyDown}
          {...props}
        />

        {/* Masked overlay */}
        {isMasked && (
          <div
            role="button"
            tabIndex={0}
            onClick={reveal}
            onKeyDown={handleMaskKeyDown}
            aria-label="Click to reveal value"
            className={cn(
              'relative z-10 flex items-center w-full font-[var(--font-primary)] bg-[var(--input-bg)] border-[0.5px] border-solid cursor-pointer',
              'h-[var(--input-md-height)] text-[length:var(--input-md-font-size)] px-[var(--input-md-px)] rounded-[var(--input-md-radius)]',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              focusRing,
              className,
            )}
            style={{ transition: inputTransition }}
          >
            <span className="flex-1 text-[var(--muted-foreground)] tracking-wider select-none" aria-hidden="true">
              {'••••••••••••'}
            </span>
            <AnimatePresence>
              {hovered && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: EXIT_DURATION }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                  className={cn(
                    'shrink-0 flex items-center justify-center w-7 h-7 bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] rounded-[var(--radius-sm)]',
                    'hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
                    focusRing,
                  )}
                  style={{ transition: `color ${DURATION.fast} ${EASING}, background-color ${DURATION.fast} ${EASING}` }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {copied ? (
                      <path d="M20 6L9 17l-5-5" />
                    ) : (
                      <>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </>
                    )}
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}

        <span className="sr-only" aria-live="polite">
          {state === 'masked' ? 'Value is hidden' : state === 'revealed' ? 'Value is visible' : ''}
        </span>
      </div>
    );
  },
);
SensitiveInput.displayName = 'SensitiveInput';
