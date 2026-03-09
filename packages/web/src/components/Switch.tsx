import React, { forwardRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring, EASING, DURATION } from '../constants/motion';
import { focusRing } from '../constants/styles';

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
}

// Pixel values sourced from packages/tokens/src/component.ts switch tokens:
// thumbTranslateOff: 2, thumbTranslateOn: 22
// Framer Motion cannot animate CSS custom properties, so we use literals.
const THUMB_X_OFF = 2;
const THUMB_X_ON = 22;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked: controlledChecked, defaultChecked = false, onChange, label, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

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
          'relative w-[var(--switch-width)] h-[var(--switch-height)] rounded-[var(--radius-pill)] cursor-pointer',
          focusRing,
          checked ? 'bg-[var(--point)]' : 'bg-[var(--secondary)]',
          disabled && 'opacity-40 cursor-not-allowed saturate-0',
          !disabled && 'hover:shadow-sm',
          !label && className,
        )}
        {...props}
      >
        <motion.span
          className="absolute left-0 w-[var(--switch-thumb-size)] h-[var(--switch-thumb-size)] rounded-full bg-[var(--background)] shadow-[var(--shadow-sm)] pointer-events-none"
          style={{ top: 'calc(50% - var(--switch-thumb-size) / 2)' }}
          animate={{ x: checked ? THUMB_X_ON : THUMB_X_OFF, scale: 1 }}
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
