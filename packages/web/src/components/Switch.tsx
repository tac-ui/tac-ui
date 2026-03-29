'use client';

import React, { forwardRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring, EASING, DURATION } from '../constants/motion';
import { focusRing } from '../constants/styles';

export type SwitchSize = 'sm' | 'md';

/** Props for the Switch component, a toggle control that supports controlled and uncontrolled usage. */
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** The controlled checked state. */
  checked?: boolean;
  /** The initial checked state for uncontrolled usage. */
  defaultChecked?: boolean;
  /** Callback fired when the switch is toggled, receives the new checked value. */
  onChange?: (checked: boolean) => void;
  /** Label text displayed next to the switch. */
  label?: string;
  /** Size variant of the switch. @default 'md' */
  size?: SwitchSize;
}

// Pixel values sourced from packages/tokens/src/component.ts switch tokens:
// thumbTranslateOff: 2, thumbTranslateOn: 22
// Framer Motion cannot animate CSS custom properties, so we use literals.
const switchSizes = {
  sm: {
    track: 'w-[34px] h-[20px]',
    thumb: 'w-[16px] h-[16px]',
    thumbXOff: 2,
    thumbXOn: 16,
    thumbTop: 'calc(50% - 8px)',
  },
  md: {
    track: 'w-[var(--switch-width)] h-[var(--switch-height)]',
    thumb: 'w-[var(--switch-thumb-size)] h-[var(--switch-thumb-size)]',
    thumbXOff: 2,
    thumbXOn: 22,
    thumbTop: 'calc(50% - var(--switch-thumb-size) / 2)',
  },
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked: controlledChecked, defaultChecked = false, onChange, label, size = 'md', disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;
    const sizeConfig = switchSizes[size];

    const handleClick = useCallback(() => {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
    }, [checked, disabled, isControlled, onChange]);

    const toggle = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        style={{
          transition: `background-color ${DURATION.moderate} ${EASING}, box-shadow ${DURATION.moderate} ${EASING}`,
        }}
        className={cn(
          'relative rounded-[var(--radius-pill)] cursor-pointer',
          sizeConfig.track,
          focusRing,
          checked ? 'bg-[var(--point)]' : 'bg-[var(--muted-foreground)]/25',
          disabled && 'opacity-40 cursor-not-allowed saturate-0',
          !disabled && 'hover:shadow-sm',
          !label && className,
        )}
        {...props}
      >
        <motion.span
          className={cn(
            'absolute left-0 rounded-full bg-[var(--background)] shadow-[var(--shadow-sm)] pointer-events-none',
            sizeConfig.thumb,
          )}
          style={{ top: sizeConfig.thumbTop }}
          animate={{ x: checked ? sizeConfig.thumbXOn : sizeConfig.thumbXOff, scale: 1 }}
          transition={tacSpring.magnetic}
        />
      </button>
    );

    if (label) {
      return (
        <div
          className={cn(
            'flex items-center justify-between gap-4 py-3 px-4 rounded-[var(--radius-m)] bg-[var(--interactive-surface-tint)]',
            className,
          )}
        >
          <span className="text-sm font-medium text-[var(--foreground)]">{label}</span>
          {toggle}
        </div>
      );
    }

    return toggle;
  },
);
Switch.displayName = 'Switch';
