import React, { forwardRef, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Button } from './Button';
import type { ButtonVariant, ButtonSize } from './Button';
import { tacSpring } from '../constants/motion';

/** Props for the CopyButton component. */
export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** The text value to copy to clipboard. */
  value: string;
  /** Visual style variant of the button. @default 'ghost' */
  variant?: ButtonVariant;
  /** Size of the button. @default 'sm' */
  size?: ButtonSize;
  /** Optional label shown after the icon. */
  label?: string;
  /** Duration in ms to show the success state. @default 2000 */
  feedbackDuration?: number;
}

// Inline SVG icons to avoid lucide-react dependency
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, variant = 'ghost', size = 'sm', label, feedbackDuration = 2000, ...props }, ref) => {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), feedbackDuration);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), feedbackDuration);
      }
    }, [value, feedbackDuration]);

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        iconOnly={!label}
        onClick={handleCopy}
        className={cn(copied && 'text-[var(--success)]', className)}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={tacSpring.light}
              className="inline-flex"
            >
              <CheckIcon />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={tacSpring.light}
              className="inline-flex"
            >
              <CopyIcon />
            </motion.span>
          )}
        </AnimatePresence>
        {label && <span>{label}</span>}
      </Button>
    );
  },
);
CopyButton.displayName = 'CopyButton';
