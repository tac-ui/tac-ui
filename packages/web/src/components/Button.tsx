'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { tacSpring, EASING, DURATION } from '../constants/motion';
import { focusRing } from '../constants/styles';

const buttonVariants = cva(
  `relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer border-none ${focusRing} disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--btn-primary-surface)] text-[color:var(--primary-foreground)] shadow-[var(--btn-primary-inset)] hover:bg-[var(--btn-primary-hover)]',
        secondary:
          'bg-[var(--btn-secondary-surface)] text-[color:var(--secondary-foreground)] hover:bg-[var(--btn-secondary-hover)]',
        outline:
          'bg-transparent text-[color:var(--foreground)] border border-solid border-[var(--btn-outline-border)] shadow-[0_0_0_0px_transparent] hover:border-[var(--btn-outline-border-hover)] hover:bg-[var(--btn-outline-hover-bg)]',
        ghost: 'bg-transparent text-[color:var(--foreground)] hover:bg-[var(--btn-ghost-hover)]',
        point:
          'bg-[var(--btn-point-surface)] text-[color:var(--point-foreground)] backdrop-blur-[16px] border border-solid border-[var(--btn-point-border)] hover:bg-[var(--btn-point-hover-surface)] hover:border-[var(--btn-point-hover-border)]',
        destructive:
          'bg-[var(--btn-destructive-surface)] text-[var(--primary-foreground)] hover:bg-[var(--btn-destructive-hover)]',
      },
      size: {
        sm: 'h-[var(--btn-sm-height)] px-[var(--btn-sm-px)] text-[length:var(--btn-sm-font-size)] rounded-[var(--btn-sm-radius)]',
        md: 'h-[var(--btn-md-height)] px-[var(--btn-md-px)] text-[length:var(--btn-md-font-size)] rounded-[var(--btn-md-radius)]',
        lg: 'h-[var(--btn-lg-height)] px-[var(--btn-lg-px)] text-[length:var(--btn-lg-font-size)] rounded-[var(--btn-lg-radius)]',
      },
      iconOnly: {
        true: 'p-0',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'sm', class: 'w-[var(--btn-sm-height)]' },
      { iconOnly: true, size: 'md', class: 'w-[var(--btn-md-height)]' },
      { iconOnly: true, size: 'lg', class: 'w-[var(--btn-lg-height)]' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

/** Visual style variant of the button. */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'point' | 'destructive';

/** Size variant of the button. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component.
 * Extends native button attributes and CVA variant props.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Icon rendered to the left of the button label. */
  leftIcon?: React.ReactNode;
  /** Icon rendered to the right of the button label. */
  rightIcon?: React.ReactNode;
  /** When true, shows a loading spinner and disables the button. */
  loading?: boolean;
}

const Spinner = ({ className }: { className?: string }) => (
  <svg className={cn('animate-spin', className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, leftIcon, rightIcon, loading, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;
    const isGhost = variant === 'ghost';
    // Small buttons feel snappy; medium/large feel controlled and weighty
    const spring = tacSpring.light;

    const whileHoverProps = {};

    const whileTapProps = isDisabled
      ? {}
      : isGhost
        ? { scale: 0.99, transition: spring }
        : { scale: 0.98, y: 0, transition: spring };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        style={{
          transition: `color ${DURATION.normal} ${EASING}, background-color ${DURATION.normal} ${EASING}, border-color ${DURATION.normal} ${EASING}, box-shadow ${DURATION.normal} ${EASING}`,
        }}
        disabled={isDisabled}
        whileHover={whileHoverProps}
        whileTap={whileTapProps}
        transition={spring}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {leftIcon && !loading && <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{leftIcon}</span>}
        {loading && <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5"><Spinner /></span>}
        {children}
        {rightIcon && <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{rightIcon}</span>}
      </motion.button>
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
