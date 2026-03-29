'use client';

import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring, OVERLAY_DURATION } from '../constants/motion';
import { peerFocusRing } from '../constants/styles';

/** Props for the Checkbox component, a styled checkbox input with optional label and indeterminate state. */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text displayed next to the checkbox. */
  label?: string;
  /** When true, renders the checkbox in an indeterminate (partially checked) state. */
  indeterminate?: boolean;
  /** When false, removes the background tint from the label container. @default true */
  filled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate, filled = false, checked, defaultChecked, onChange, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    const [internalChecked, setInternalChecked] = useState(!!defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <label
        className={cn(
          'group flex items-center gap-3 cursor-pointer transition-colors',
          filled
            ? 'py-2.5 px-4 rounded-[var(--radius-m)] bg-[var(--interactive-surface-tint)] hover:bg-[var(--interactive-hover-tint)]'
            : 'py-1',
          'peer-disabled:opacity-60',
          props.disabled && cn('cursor-default', filled && 'hover:bg-[var(--interactive-surface-tint)]'),
          className,
        )}
      >
        <input
          ref={innerRef}
          type="checkbox"
          className="peer sr-only"
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          onChange={handleChange}
          {...props}
        />
        <motion.span
          className={cn(
            'relative w-5 h-5 rounded-[var(--checkbox-radius)] border-[1.5px] flex items-center justify-center shrink-0',
            peerFocusRing,
            'peer-disabled:bg-[var(--gray-200)] peer-disabled:border-[var(--gray-200)]',
            indeterminate && 'bg-[var(--point)] border-[var(--point)]',
          )}
          animate={
            indeterminate
              ? undefined
              : {
                  backgroundColor: isChecked ? 'var(--point)' : 'transparent',
                  borderColor: isChecked ? 'var(--point)' : 'var(--gray-300)',
                }
          }
          whileTap={{ scale: 0.95 }}
          transition={{
            ...tacSpring.light,
            backgroundColor: { duration: OVERLAY_DURATION },
            borderColor: { duration: OVERLAY_DURATION },
          }}
        >
          {indeterminate ? (
            <svg
              className="w-3.5 h-3.5 text-[var(--background)]"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 7h8" />
            </svg>
          ) : (
            <AnimatePresence initial={false}>
              {isChecked && (
                <motion.svg
                  className="w-3.5 h-3.5 text-[var(--background)]"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={tacSpring.light}
                >
                  <motion.path
                    d="M11.5 3.5L5.5 10.5L2.5 7.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          )}
        </motion.span>
        {label && (
          <span className={cn('text-sm font-medium text-[var(--foreground)]', 'peer-disabled:text-[var(--gray-400)]')}>
            {label}
          </span>
        )}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';
