import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { diaSpring } from '../constants/motion';

const avatarVariants = cva(
  'inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
  {
    variants: {
      size: {
        sm: 'w-7 h-7 text-[11px]',
        md: 'w-9 h-9 text-sm',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-2xl',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/** Size of the Avatar. */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

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
  /** When true, renders a green online status dot in the bottom-right corner. */
  showStatus?: boolean;
  /** Custom content inside status badge (icon or image). */
  statusContent?: React.ReactNode;
  /** Custom background color for status badge. @default 'var(--success)' */
  statusColor?: string;
  /** When true, enables hover animation. @default true */
  animated?: boolean;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size = 'md', src, alt, initials, icon, showStatus, statusContent, statusColor = 'var(--success)', animated = false, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    const content = src && !imgError ? (
      <img src={src} alt={alt || initials || 'Avatar'} className="w-full h-full object-cover" onError={() => setImgError(true)} />
    ) : icon ? (
      <span className="text-[var(--muted-foreground)]">{icon}</span>
    ) : initials ? (
      <span className="font-medium">{initials}</span>
    ) : null;

    const bgClass = src && !imgError
      ? ''
      : icon
        ? 'bg-[var(--muted)] text-[var(--muted-foreground)]'
        : 'bg-[var(--interactive-surface-tint)] text-[color:var(--point)] ring-1 ring-[var(--card-accent-border)]';

    const shouldShowStatus = showStatus || statusContent;

    return (
      <motion.div
        className={cn('relative', shouldShowStatus ? 'inline-block' : 'inline-flex')}
        whileHover={animated ? { y: -1, scale: 1.02, transition: diaSpring.light } : undefined}
      >
        <span
          ref={ref}
          className={cn(avatarVariants({ size }), bgClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--point)] focus-visible:ring-offset-0', className)}
          {...props}
        >
          {content}
        </span>
        {shouldShowStatus && (
          <span className={cn(
            'absolute',
            size === 'sm' && '-bottom-px -right-px',
            size === 'md' && '-bottom-0.5 -right-0.5',
            size === 'lg' && 'bottom-0 right-0',
            size === 'xl' && 'bottom-0.5 right-0.5',
          )}>
            {showStatus && !statusContent && (
              <span
                className={cn(
                  'absolute rounded-full opacity-40',
                  size === 'sm' && 'w-2.5 h-2.5',
                  size === 'md' && 'w-3.5 h-3.5',
                  size === 'lg' && 'w-4.5 h-4.5',
                  size === 'xl' && 'w-5.5 h-5.5',
                )}
                style={{ backgroundColor: statusColor }}
              />
            )}
            <span
              className={cn(
                'relative border-solid border-[var(--card)] rounded-full flex items-center justify-center overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-cover',
                size === 'sm' && 'w-2.5 h-2.5 border-[1.5px] [&>svg]:w-1.5 [&>svg]:h-1.5',
                size === 'md' && 'w-3.5 h-3.5 border-2 [&>svg]:w-2 [&>svg]:h-2',
                size === 'lg' && 'w-4.5 h-4.5 border-[2.5px] [&>svg]:w-2.5 [&>svg]:h-2.5',
                size === 'xl' && 'w-5.5 h-5.5 border-[3px] [&>svg]:w-3 [&>svg]:h-3',
              )}
              style={{ backgroundColor: statusColor }}
            >
              {statusContent || <span className="sr-only">Online</span>}
            </span>
          </span>
        )}
      </motion.div>
    );
  },
);
Avatar.displayName = 'Avatar';

export { avatarVariants };
