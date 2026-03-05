import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { exitVariants, tacSpring } from '../constants/motion';

/** Shape style of the Skeleton placeholder. */
export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

/** Animation style of the Skeleton placeholder. */
export type SkeletonAnimation = 'shimmer' | 'pulse';

/** Props for the Skeleton component, which shows a loading placeholder in place of content. */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton. Accepts CSS string or pixel number. @example width="80%" */
  width?: string | number;
  /** Height of the skeleton. Accepts CSS string or pixel number. @example height={20} */
  height?: string | number;
  /** Shape of the skeleton. `'text'` renders multiple stacked lines. @example variant="circular" */
  variant?: SkeletonVariant;
  /** Animation style. `'shimmer'` sweeps a highlight across, `'pulse'` fades opacity. @default 'shimmer' */
  animation?: SkeletonAnimation;
  /** Number of lines rendered when `variant` is `'text'`. Defaults to 3. */
  lines?: number;
}

/** Apple-style skeleton: very wide, ultra-soft gradient with no harsh edges, mimicking a breathing metallic surface. */
const shimmerClasses = [
  'before:absolute before:inset-0 before:-translate-x-full',
  'before:animate-[shimmer_1.5s_ease-in-out_infinite]',
  'before:bg-gradient-to-r',
  'before:from-transparent',
  'before:via-secondary',
  'before:to-transparent',
].join(' ');

const baseClasses = 'relative overflow-hidden bg-background-subtle';

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', animation = 'shimmer', width, height, lines = 3, style, ...props }, ref) => {
    const animClasses = animation === 'shimmer' ? shimmerClasses : 'animate-pulse';

    if (variant === 'text') {
      return (
        <AnimatePresence>
          <motion.div
            ref={ref}
            className={cn('flex flex-col gap-2.5', className)}
            style={style}
            variants={exitVariants}
            initial="initial"
            exit="exit"
            {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
          >
            {Array.from({ length: lines }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(baseClasses, 'h-3 rounded-[var(--radius-sm)]', animClasses)}
                style={{ width: i === lines - 1 ? '65%' : '100%' }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...tacSpring.light, delay: i * 0.05 }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      );
    }

    return (
      <AnimatePresence>
        <motion.div
          ref={ref}
          className={cn(
            baseClasses,
            animClasses,
            variant === 'circular' ? 'rounded-full' : 'rounded-[var(--radius-m)]',
            className,
          )}
          style={{
            width: width ?? (variant === 'circular' ? 40 : '100%'),
            height: height ?? (variant === 'circular' ? 40 : 20),
            ...style,
          }}
          variants={exitVariants}
          initial="initial"
          exit="exit"
          {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
        />
      </AnimatePresence>
    );
  },
);
Skeleton.displayName = 'Skeleton';
