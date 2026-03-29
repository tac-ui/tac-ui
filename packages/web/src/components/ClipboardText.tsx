'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { EXIT_DURATION, EASING, DURATION } from '../constants/motion';
import { focusRing } from '../constants/styles';

const clipboardTextVariants = cva(
  'inline-flex items-center gap-2 font-mono rounded-[var(--radius-m)] border-[0.5px] border-solid border-[var(--border)] bg-[var(--surface)] group',
  {
    variants: {
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/** Size of the ClipboardText component. */
export type ClipboardTextSize = 'sm' | 'md' | 'lg';

/**
 * Displays a monospace text value with a copy-to-clipboard button.
 * @example <ClipboardText text="npm install @tac-ui/web" />
 */
export interface ClipboardTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof clipboardTextVariants> {
  /** The text value to display and copy. */
  text: string;
  /** Called after the text is successfully copied. */
  onCopy?: () => void;
}

export const ClipboardText = forwardRef<HTMLDivElement, ClipboardTextProps>(
  ({ className, text, size = 'md', onCopy, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(text).catch(() => {});
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }, [text, onCopy]);

    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

    return (
      <div
        ref={ref}
        className={cn(clipboardTextVariants({ size }), className)}
        {...props}
      >
        <span className="text-[var(--foreground)] select-all truncate">{text}</span>
        <motion.button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          whileTap={{ scale: 0.9 }}
          style={{
            transition: `color ${DURATION.fast} ${EASING}, background-color ${DURATION.fast} ${EASING}`,
          }}
          className={cn(
            'shrink-0 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] rounded-[var(--radius-sm)] p-0.5',
            'hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
            'opacity-0 group-hover:opacity-100 transition-opacity',
            focusRing,
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.svg
              key={copied ? 'check' : 'copy'}
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: EXIT_DURATION }}
            >
              {copied ? (
                <path d="M20 6L9 17l-5-5" />
              ) : (
                <>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </>
              )}
            </motion.svg>
          </AnimatePresence>
        </motion.button>
      </div>
    );
  },
);
ClipboardText.displayName = 'ClipboardText';

export { clipboardTextVariants };
