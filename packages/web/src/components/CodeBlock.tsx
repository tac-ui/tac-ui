import React, { forwardRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { focusRing } from '../constants/styles';

/**
 * Displays a syntax-highlighted code block with a copy-to-clipboard button.
 */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source code string to display. @example code="const x = 1;" */
  code: string;
  /** Language label shown in the header bar. @example language="typescript" */
  language?: string;
  /** When true, applies glassmorphism styling with backdrop blur. @default false */
  glass?: boolean;
}

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language, glass = false, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(code).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-m)] overflow-hidden border border-solid',
          glass
            ? 'bg-[var(--glass-bg)] [backdrop-filter:blur(24px)_saturate(180%)] border-[var(--glass-border)]'
            : 'bg-[var(--surface)] border-[var(--border)]',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'flex items-center justify-between px-4 py-2 border-b border-solid border-[var(--border)]',
            glass ? 'bg-transparent' : 'bg-[var(--muted)]',
          )}
        >
          {language && <span className="text-xs text-[var(--muted-foreground)] font-mono">{language}</span>}
          {!language && <span />}
          <motion.button
            type="button"
            onClick={handleCopy}
            aria-live="polite"
            whileTap={{ scale: 0.95 }}
            style={{
              transition:
                'color 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className={cn(
              'text-xs text-[var(--muted-foreground)] bg-transparent border-none cursor-pointer px-2 py-0.5 rounded-[var(--radius-sm)]',
              'hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
              focusRing,
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'copied' : 'copy'}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
        <pre className="p-4 overflow-x-auto m-0">
          <code className="text-[13px] font-mono text-[var(--foreground)] leading-relaxed">{code}</code>
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = 'CodeBlock';
