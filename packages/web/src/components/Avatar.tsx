'use client';

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';
import { focusRingPoint } from '../constants/styles';

const avatarVariants = cva('inline-flex items-center justify-center rounded-full overflow-hidden shrink-0', {
  variants: {
    size: {
      sm: 'w-7 h-7 text-[11px]',
      md: 'w-9 h-9 text-sm',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-2xl',
    },
  },
  defaultVariants: { size: 'md' },
});

/** Size of the Avatar. */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/* ─── Status badge sizing ─── */

const statusDotClasses: Record<AvatarSize, string> = {
  sm: 'w-2 h-2 border-[1.5px]',
  md: 'w-2.5 h-2.5 border-2',
  lg: 'w-3 h-3 border-2',
  xl: 'w-3.5 h-3.5 border-[2.5px]',
};

const statusContentClasses: Record<AvatarSize, string> = {
  sm: 'w-3 h-3 border-[1.5px] [&>svg]:w-[7px] [&>svg]:h-[7px]',
  md: 'w-4 h-4 border-2 [&>svg]:w-2 [&>svg]:h-2',
  lg: 'w-5 h-5 border-2 [&>svg]:w-2.5 [&>svg]:h-2.5',
  xl: 'w-6 h-6 border-[2.5px] [&>svg]:w-3 [&>svg]:h-3',
};

/** Props for the Avatar component, which displays a user image, initials, or icon in a circular frame. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  /** Size of the avatar. @example size="lg" */
  size?: AvatarSize;
  /** URL of the image to display. Falls back to `initials` or `icon` on error. */
  src?: string;
  /** Accessible alt text for the image. */
  alt?: string;
  /** Text initials shown when no image is available. @example initials="JD" */
  initials?: string;
  /** Icon node shown when no image or initials are available. */
  icon?: React.ReactNode;
  /** When true, renders a status dot in the bottom-right corner. */
  showStatus?: boolean;
  /** Custom content inside status badge (icon or image). */
  statusContent?: React.ReactNode;
  /** Custom background color for status badge. @default 'var(--success)' */
  statusColor?: string;
  /** When true, enables hover animation. @default false */
  animated?: boolean;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      size = 'md',
      src,
      alt,
      initials,
      icon,
      showStatus,
      statusContent,
      statusColor = 'var(--success)',
      animated = false,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = useState(false);

    const content =
      src && !imgError ? (
        <img
          src={src}
          alt={alt || initials || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : icon ? (
        <span className="text-[var(--muted-foreground)]">{icon}</span>
      ) : initials ? (
        <span className="font-medium">{initials}</span>
      ) : null;

    const bgClass =
      src && !imgError
        ? ''
        : icon
          ? 'bg-[var(--muted)] text-[var(--muted-foreground)]'
          : 'bg-[var(--interactive-surface-tint)] text-[color:var(--point)] shadow-[inset_0_0_0_1px_var(--card-accent-border)]';

    const hasStatus = showStatus || statusContent;

    return (
      <motion.div
        className="relative inline-flex"
        whileHover={animated ? { y: -1, scale: 1.02, transition: tacSpring.light } : undefined}
      >
        <span ref={ref} className={cn(avatarVariants({ size }), bgClass, focusRingPoint, className)} {...props}>
          {content}
        </span>
        {hasStatus && (
          <span
            className={cn(
              'absolute bottom-[14%] right-[14%] translate-x-1/2 translate-y-1/2',
              'rounded-full border-solid border-[var(--background)]',
              'flex items-center justify-center overflow-hidden',
              '[&>img]:w-full [&>img]:h-full [&>img]:object-cover',
              statusContent ? statusContentClasses[size] : statusDotClasses[size],
            )}
            style={{ backgroundColor: statusColor }}
          >
            {statusContent ?? <span className="sr-only">Online</span>}
          </span>
        )}
      </motion.div>
    );
  },
);
Avatar.displayName = 'Avatar';

export { avatarVariants };
