'use client';

import React, { forwardRef, useId, useState, useCallback } from 'react';
import { cn } from '../utils/cn';
import { EASING, DURATION } from '../constants/motion';

/** Props for the Slider component, a styled range input with optional label and current value display. */
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text displayed above the slider. */
  label?: string;
  /** When true, displays the current value next to the label. */
  showValue?: boolean;
  /** When true, the track is filled up to the current value. @default true */
  filled?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      showValue,
      filled = true,
      min = 0,
      max = 100,
      value,
      defaultValue,
      id,
      style,
      onChange,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const sliderId = id || generatedId;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? min);
    const [isDragging, setIsDragging] = useState(false);
    const currentValue = isControlled ? value : internalValue;
    const numMin = Number(min);
    const numMax = Number(max);
    const numVal = Number(currentValue ?? numMin);
    const percent = numMax > numMin ? ((numVal - numMin) / (numMax - numMin)) * 100 : 0;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternalValue(Number(e.target.value));
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        setIsDragging(true);
        onMouseDown?.(e);
      },
      [onMouseDown],
    );

    const handleMouseUp = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        setIsDragging(false);
        onMouseUp?.(e);
      },
      [onMouseUp],
    );

    const handleTouchStart = useCallback(
      (e: React.TouchEvent<HTMLInputElement>) => {
        setIsDragging(true);
        onTouchStart?.(e);
      },
      [onTouchStart],
    );

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent<HTMLInputElement>) => {
        setIsDragging(false);
        onTouchEnd?.(e);
      },
      [onTouchEnd],
    );

    return (
      <div className={cn('w-full flex flex-col gap-2', className)}>
        {(label || showValue) && (
          <div className="flex justify-between text-sm">
            {label && (
              <label htmlFor={sliderId} className="font-medium text-[var(--foreground)]">
                {label}
              </label>
            )}
            {showValue && <span className="text-[var(--muted-foreground)]">{currentValue}</span>}
          </div>
        )}
        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          {...(isControlled ? { value } : { defaultValue })}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            background: filled
              ? `linear-gradient(to right, var(--point) 0%, var(--point) ${percent}%, var(--secondary) ${percent}%, var(--secondary) 100%)`
              : 'var(--secondary)',
            transition: `background ${DURATION.normal} ${EASING}, box-shadow ${DURATION.normal} ${EASING}`,
            ...style,
          }}
          className={cn(
            'w-full h-1 rounded-[var(--radius-pill)] appearance-none cursor-pointer outline-none',
            'shadow-[0_0_0_0px_transparent] focus-visible:shadow-none',
            // WebKit thumb — white circle with shadow
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--background)] [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-[0_0.5px_4px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:transition-[transform,box-shadow] [&::-webkit-slider-thumb]:duration-[220ms] [&::-webkit-slider-thumb]:ease-[cubic-bezier(0.22,1,0.36,1)] [&::-webkit-slider-thumb]:hover:scale-105 [&::-webkit-slider-thumb]:hover:shadow-[0_0.5px_6px_rgba(0,0,0,0.16),0_0_1px_rgba(0,0,0,0.10)] [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:active:scale-[1.08]',
            '[&::-webkit-slider-runnable-track]:rounded-[var(--radius-pill)]',
            // Firefox thumb — white circle with shadow
            '[&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--background)] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0.5px_4px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:transition-[transform,box-shadow] [&::-moz-range-thumb]:duration-[220ms] [&::-moz-range-thumb]:ease-[cubic-bezier(0.22,1,0.36,1)] [&::-moz-range-thumb]:hover:scale-105 [&::-moz-range-thumb]:hover:shadow-[0_0.5px_6px_rgba(0,0,0,0.16),0_0_1px_rgba(0,0,0,0.10)] [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:active:scale-[1.08]',
            '[&::-moz-range-progress]:bg-[var(--point)] [&::-moz-range-progress]:rounded-[var(--radius-pill)]',
            // Dragging state — slightly larger shadow
            isDragging &&
              '[&::-webkit-slider-thumb]:shadow-[0_0.5px_6px_rgba(0,0,0,0.16),0_0_1px_rgba(0,0,0,0.10)] [&::-moz-range-thumb]:shadow-[0_0.5px_6px_rgba(0,0,0,0.16),0_0_1px_rgba(0,0,0,0.10)]',
            'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          )}
          {...props}
        />
      </div>
    );
  },
);
Slider.displayName = 'Slider';
