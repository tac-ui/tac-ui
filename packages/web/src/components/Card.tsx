import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { tacSpring, EASING, DURATION } from '../constants/motion';
import { focusRingPoint } from '../constants/styles';

const cardVariants = cva('rounded-[var(--card-radius)] p-[var(--card-padding)] flex flex-col gap-[var(--card-gap)]', {
  variants: {
    variant: {
      default: 'bg-[var(--card)] border border-solid border-[var(--border)] shadow-[var(--shadow-sm)]',
      accent:
        'bg-[var(--card)] border border-solid border-[var(--card-accent-border)] shadow-[var(--card-accent-glow)]',
      glass:
        '[backdrop-filter:blur(32px)_saturate(180%)] bg-[var(--glass-bg)] border border-solid border-[var(--glass-border)] shadow-[var(--glass-inset),var(--glass-panel-shadow)]',
      flat: 'bg-[var(--surface)] shadow-none',
    },
  },
  defaultVariants: { variant: 'default' },
});

const hoverClasses: Record<string, string> = {
  default: 'hover:border-[var(--card-accent-hover-border)] hover:shadow-[var(--card-accent-hover-glow)]',
  accent: 'hover:border-[var(--card-accent-hover-border)] hover:shadow-[var(--card-accent-hover-glow)]',
  glass: 'hover:border-[var(--glass-border)]',
  flat: 'hover:bg-[var(--surface-hover)]',
};

/** Visual style of the Card. */
export type CardVariant = 'default' | 'accent' | 'glass' | 'flat';

/** Props for the Card container component, which groups related content with a bordered surface. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  /** Visual style of the card. @default 'default' */
  variant?: CardVariant;
  /** When true, enables hover/active/focus spring interactions. @default false */
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', interactive = false, children, style, ...props }, ref) => {
    if (interactive) {
      return (
        <motion.div
          ref={ref}
          tabIndex={0}
          whileHover={{ y: -2, transition: tacSpring.light }}
          whileTap={{ scale: 0.99, y: 0, transition: tacSpring.light }}
          transition={tacSpring.light}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
          style={style}
          className={cn(
            cardVariants({ variant }),
            'relative cursor-pointer',
            hoverClasses[variant],
            focusRingPoint,
            className,
          )}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        {...props}
        style={{
          transition:
            `box-shadow ${DURATION.moderate} ${EASING}, border-color ${DURATION.moderate} ${EASING}, background-color ${DURATION.moderate} ${EASING}`,
          ...style,
        }}
        className={cn(cardVariants({ variant }), className)}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />,
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-[length:var(--card-title-size)] font-semibold text-[var(--card-foreground)] tracking-tight',
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-[length:var(--card-body-size)] text-[var(--muted-foreground)]', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-[length:var(--card-body-size)] leading-relaxed text-[var(--muted-foreground)]', className)}
      {...props}
    />
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />,
);
CardFooter.displayName = 'CardFooter';

export { cardVariants };
