import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { diaSpring } from '../constants/motion';
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
        ghost:
          'bg-transparent text-[color:var(--foreground)] hover:bg-[var(--btn-ghost-hover)]',
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
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'point'
  | 'destructive';

/** Size variant of the button. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component.
 * Extends native button attributes and CVA variant props.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Icon rendered to the left of the button label. */
  leftIcon?: React.ReactNode;
  /** Icon rendered to the right of the button label. */
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const isGhost = variant === 'ghost';
    // Small buttons feel snappy; medium/large feel controlled and weighty
    const spring = size === 'sm' ? diaSpring.light : diaSpring.default;

    const whileHoverProps = {};

    const whileTapProps = disabled
      ? {}
      : isGhost
        ? { scale: 0.99, transition: spring }
        : { scale: 0.97, y: 0, transition: spring };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        style={{ transition: 'color 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        disabled={disabled}
        whileHover={whileHoverProps}
        whileTap={whileTapProps}
        transition={spring}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {leftIcon && <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{rightIcon}</span>}
      </motion.button>
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
