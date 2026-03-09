import React, { forwardRef, useState, useRef, useEffect, useCallback, useId, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { dropdownMotionVariants, tacSpring, EASING, DURATION } from '../constants/motion';
import { focusRing, inputTransition } from '../constants/styles';

/** Picker mode: date-only, date+time, or month-only. */
export type DatePickerMode = 'date' | 'datetime' | 'month';

/** Props for the DatePicker component, a calendar-based date selector with dropdown panel. */
export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The controlled selected date. */
  value?: Date | null;
  /** Called when a date is selected. */
  onChange?: (date: Date | null) => void;
  /** Label text displayed above the input. */
  label?: string;
  /** Helper text displayed below the input. */
  helperText?: string;
  /** Placeholder text when no date is selected. @default 'Select date' */
  placeholder?: string;
  /** When true, applies error styling. */
  error?: boolean;
  /** Error message displayed below the input when `error` is true. */
  errorMessage?: string;
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
  /** When true, the date picker is disabled. */
  disabled?: boolean;
  /** Date format display function. Defaults to mode-aware format string. */
  formatDate?: (date: Date) => string;
  /** ID attribute for the trigger button. */
  id?: string;
  /** Picker mode. @default 'date' */
  mode?: DatePickerMode;
  /** When true, uses 24-hour format for time. @default true */
  use24Hour?: boolean;
  /** Minute step interval for time picker. @default 1 */
  minuteStep?: number;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function defaultFormatDateByMode(date: Date, mode: DatePickerMode): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  if (mode === 'month') return `${y}-${m}`;
  const d = String(date.getDate()).padStart(2, '0');
  if (mode === 'datetime') {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}`;
  }
  return `${y}-${m}-${d}`;
}

const btnTransition = `background-color ${DURATION.normal} ${EASING}`;
const cellTransition = `background-color ${DURATION.normal} ${EASING}, color ${DURATION.normal} ${EASING}`;

function clampNumber(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function roundToStep(val: number, step: number): number {
  return Math.round(val / step) * step;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      value,
      onChange,
      label,
      helperText,
      placeholder = 'Select date',
      error,
      errorMessage,
      minDate,
      maxDate,
      disabled,
      formatDate,
      id,
      mode = 'date',
      use24Hour = true,
      minuteStep = 1,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    const [open, setOpen] = useState(false);
    const today = useMemo(() => new Date(), []);
    const [viewYear, setViewYear] = useState((value ?? today).getFullYear());
    const [viewMonth, setViewMonth] = useState((value ?? today).getMonth());
    const containerRef = useRef<HTMLDivElement>(null);

    // Time state for datetime mode
    const [pendingHour, setPendingHour] = useState(value?.getHours() ?? 0);
    const [pendingMinute, setPendingMinute] = useState(value?.getMinutes() ?? 0);
    // AM/PM for 12-hour mode
    const [ampm, setAmpm] = useState<'AM' | 'PM'>(() => ((value?.getHours() ?? 0) >= 12 ? 'PM' : 'AM'));

    const displayFormat = formatDate ?? ((d: Date) => defaultFormatDateByMode(d, mode));
    const displayText = value ? displayFormat(value) : placeholder;

    // Close on outside click / Escape
    useEffect(() => {
      if (!open) return;
      const handleMouseDown = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('keydown', handleKey);
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('keydown', handleKey);
      };
    }, [open]);

    // Sync view when controlled value changes
    useEffect(() => {
      if (value) {
        setViewYear(value.getFullYear());
        setViewMonth(value.getMonth());
        setPendingHour(value.getHours());
        setPendingMinute(value.getMinutes());
        setAmpm(value.getHours() >= 12 ? 'PM' : 'AM');
      }
    }, [value]);

    const handleOpen = useCallback(() => {
      if (!disabled) setOpen((prev) => !prev);
    }, [disabled]);

    // Navigation for date/datetime modes (by month)
    const handlePrevMonth = useCallback(() => {
      setViewMonth((prev) => {
        if (prev === 0) {
          setViewYear((y) => y - 1);
          return 11;
        }
        return prev - 1;
      });
    }, []);

    const handleNextMonth = useCallback(() => {
      setViewMonth((prev) => {
        if (prev === 11) {
          setViewYear((y) => y + 1);
          return 0;
        }
        return prev + 1;
      });
    }, []);

    // Navigation for month mode (by year)
    const handlePrevYear = useCallback(() => {
      setViewYear((y) => y - 1);
    }, []);

    const handleNextYear = useCallback(() => {
      setViewYear((y) => y + 1);
    }, []);

    // Select a day (date or datetime mode)
    const handleSelectDate = useCallback(
      (day: number) => {
        if (mode === 'datetime') {
          const date = new Date(viewYear, viewMonth, day, pendingHour, pendingMinute);
          onChange?.(date);
          // Don't close — user may want to adjust time
        } else {
          const date = new Date(viewYear, viewMonth, day);
          onChange?.(date);
          setOpen(false);
        }
      },
      [viewYear, viewMonth, onChange, mode, pendingHour, pendingMinute],
    );

    // Select a month (month mode)
    const handleSelectMonth = useCallback(
      (month: number) => {
        const date = new Date(viewYear, month, 1);
        onChange?.(date);
        setOpen(false);
      },
      [viewYear, onChange],
    );

    // Time change handler
    const handleTimeChange = useCallback(
      (hour: number, minute: number) => {
        setPendingHour(hour);
        setPendingMinute(minute);
        if (value) {
          const updated = new Date(value);
          updated.setHours(hour, minute);
          onChange?.(updated);
        }
      },
      [value, onChange],
    );

    const isDateDisabled = useCallback(
      (day: number) => {
        const date = new Date(viewYear, viewMonth, day);
        if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
        if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
        return false;
      },
      [viewYear, viewMonth, minDate, maxDate],
    );

    const isMonthDisabled = useCallback(
      (month: number) => {
        if (minDate && new Date(viewYear, month + 1, 0) < new Date(minDate.getFullYear(), minDate.getMonth(), 1))
          return true;
        if (maxDate && new Date(viewYear, month, 1) > new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0))
          return true;
        return false;
      },
      [viewYear, minDate, maxDate],
    );

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    // Build calendar grid
    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

    // Nav button component
    const NavButton = ({
      onClick,
      ariaLabel,
      direction,
    }: {
      onClick: () => void;
      ariaLabel: string;
      direction: 'prev' | 'next';
    }) => (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        style={{ transition: btnTransition }}
        className={cn(
          'w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border-none bg-transparent cursor-pointer text-[var(--muted-foreground)] hover:bg-[var(--interactive-hover)] hover:text-[var(--foreground)]',
          focusRing,
        )}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={direction === 'prev' ? 'M10 4l-4 4 4 4' : 'M6 4l4 4-4 4'} />
        </svg>
      </button>
    );

    return (
      <div ref={ref} className="flex flex-col gap-2" {...props}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            id={inputId}
            aria-expanded={open}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? errorId : helperText ? errorId : undefined}
            onClick={handleOpen}
            disabled={disabled}
            style={{ transition: inputTransition }}
            className={cn(
              'w-full h-10 flex items-center gap-2 px-4 text-sm text-left bg-[var(--input-bg)] border border-solid rounded-[var(--input-radius)] outline-none cursor-pointer',
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
              error && 'border-[var(--error)] focus:border-[var(--point)]',
              !value && 'text-[var(--muted-foreground)]',
              value && 'text-[var(--foreground)]',
              disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
              className,
            )}
          >
            {/* Calendar icon */}
            <svg
              className="w-4 h-4 text-[var(--muted-foreground)] shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="12" height="11" rx="2" />
              <path d="M5 1v3M11 1v3M2 7h12" />
            </svg>
            <span className="truncate flex-1">{displayText}</span>
            <motion.svg
              className="w-4 h-4 text-[var(--muted-foreground)] shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              animate={{ rotate: open ? 180 : 0 }}
              transition={tacSpring.magnetic}
            >
              <path d="M4 6l4 4 4-4" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className={cn(
                  'absolute top-full mt-1 left-0 z-[var(--z-dropdown)]',
                  'bg-[var(--dropdown-bg)] backdrop-blur-[40px] backdrop-saturate-[180%]',
                  'rounded-[var(--radius-m)] border-[0.5px] border-solid border-[var(--input-border-rest)] shadow-[var(--dropdown-shadow)]',
                  'p-3 w-[280px]',
                )}
                variants={dropdownMotionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={tacSpring.magnetic}
                style={{ originY: 0 }}
              >
                {mode === 'month' ? (
                  /* ─── Month Mode ─── */
                  <>
                    {/* Year header */}
                    <div className="flex items-center justify-between mb-3">
                      <NavButton onClick={handlePrevYear} ariaLabel="Previous year" direction="prev" />
                      <span className="text-sm font-medium text-[var(--foreground)]">{viewYear}</span>
                      <NavButton onClick={handleNextYear} ariaLabel="Next year" direction="next" />
                    </div>

                    {/* Month grid (3×4) */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {MONTHS_SHORT.map((monthLabel, monthIndex) => {
                        const isSelected = value
                          ? value.getFullYear() === viewYear && value.getMonth() === monthIndex
                          : false;
                        const isCurrent = isSameMonth(new Date(viewYear, monthIndex, 1), today);
                        const isDisabled = isMonthDisabled(monthIndex);

                        return (
                          <button
                            key={monthLabel}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => handleSelectMonth(monthIndex)}
                            style={{ transition: cellTransition }}
                            className={cn(
                              'h-9 flex items-center justify-center text-sm rounded-[var(--radius-sm)] border-none cursor-pointer bg-transparent',
                              focusRing,
                              isSelected
                                ? 'bg-[var(--point)] text-white font-medium'
                                : isCurrent
                                  ? 'text-[var(--point)] font-medium hover:bg-[var(--interactive-hover)]'
                                  : 'text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
                              isDisabled && 'opacity-30 cursor-not-allowed pointer-events-none',
                            )}
                          >
                            {monthLabel}
                          </button>
                        );
                      })}
                    </div>

                    {/* This Month button */}
                    <div className="mt-2 pt-2 border-t border-solid border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() => {
                          setViewYear(today.getFullYear());
                          onChange?.(new Date(today.getFullYear(), today.getMonth(), 1));
                          setOpen(false);
                        }}
                        style={{ transition: btnTransition }}
                        className={cn(
                          'w-full h-7 flex items-center justify-center text-xs font-medium text-[var(--point)] rounded-[var(--radius-sm)] border-none bg-transparent cursor-pointer hover:bg-[var(--interactive-hover)]',
                          focusRing,
                        )}
                      >
                        This Month
                      </button>
                    </div>
                  </>
                ) : (
                  /* ─── Date / DateTime Mode ─── */
                  <>
                    {/* Month/Year header */}
                    <div className="flex items-center justify-between mb-3">
                      <NavButton onClick={handlePrevMonth} ariaLabel="Previous month" direction="prev" />
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {MONTHS[viewMonth]} {viewYear}
                      </span>
                      <NavButton onClick={handleNextMonth} ariaLabel="Next month" direction="next" />
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAYS.map((day) => (
                        <div
                          key={day}
                          className="h-8 flex items-center justify-center text-xs font-medium text-[var(--muted-foreground)]"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7">
                      {calendarDays.map((day, i) => {
                        if (day === null) {
                          return <div key={`empty-${i}`} className="h-8" />;
                        }

                        const dateObj = new Date(viewYear, viewMonth, day);
                        const isSelected = value ? isSameDay(dateObj, value) : false;
                        const isToday = isSameDay(dateObj, today);
                        const isDayDisabled = isDateDisabled(day);

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={isDayDisabled}
                            onClick={() => handleSelectDate(day)}
                            style={{ transition: cellTransition }}
                            className={cn(
                              'h-8 w-full flex items-center justify-center text-sm rounded-[var(--radius-sm)] border-none cursor-pointer bg-transparent',
                              focusRing,
                              isSelected
                                ? 'bg-[var(--point)] text-white font-medium'
                                : isToday
                                  ? 'text-[var(--point)] font-medium hover:bg-[var(--interactive-hover)]'
                                  : 'text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
                              isDayDisabled && 'opacity-30 cursor-not-allowed pointer-events-none',
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time section (datetime mode only) */}
                    {mode === 'datetime' && (
                      <div className="mt-2 pt-2 border-t border-solid border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          {/* Clock icon */}
                          <svg
                            className="w-4 h-4 text-[var(--muted-foreground)] shrink-0"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="8" cy="8" r="6.5" />
                            <path d="M8 4.5V8l2.5 1.5" />
                          </svg>

                          {/* Hour input */}
                          <input
                            type="number"
                            value={use24Hour ? pendingHour : pendingHour % 12 || 12}
                            min={use24Hour ? 0 : 1}
                            max={use24Hour ? 23 : 12}
                            onChange={(e) => {
                              let h = parseInt(e.target.value, 10);
                              if (isNaN(h)) return;
                              if (use24Hour) {
                                h = clampNumber(h, 0, 23);
                              } else {
                                h = clampNumber(h, 1, 12);
                                // Convert 12h to 24h
                                if (ampm === 'AM') h = h === 12 ? 0 : h;
                                else h = h === 12 ? 12 : h + 12;
                              }
                              handleTimeChange(h, pendingMinute);
                            }}
                            style={{ transition: inputTransition }}
                            className={cn(
                              'w-11 h-8 text-center text-xs font-mono text-[var(--foreground)] bg-[var(--input-bg)] border border-solid border-[var(--input-border-rest)] rounded-[var(--radius-sm)] outline-none',
                              'hover:border-[var(--input-border-hover)]',
                              'focus:border-[var(--point)]',
                              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                            )}
                          />

                          <span className="text-sm font-medium text-[var(--muted-foreground)]">:</span>

                          {/* Minute input */}
                          <input
                            type="number"
                            value={String(pendingMinute).padStart(2, '0')}
                            min={0}
                            max={59}
                            step={minuteStep}
                            onChange={(e) => {
                              let m = parseInt(e.target.value, 10);
                              if (isNaN(m)) return;
                              m = clampNumber(roundToStep(m, minuteStep), 0, 59);
                              handleTimeChange(pendingHour, m);
                            }}
                            style={{ transition: inputTransition }}
                            className={cn(
                              'w-11 h-8 text-center text-xs font-mono text-[var(--foreground)] bg-[var(--input-bg)] border border-solid border-[var(--input-border-rest)] rounded-[var(--radius-sm)] outline-none',
                              'hover:border-[var(--input-border-hover)]',
                              'focus:border-[var(--point)]',
                              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                            )}
                          />

                          {/* AM/PM toggle (12-hour mode) */}
                          {!use24Hour && (
                            <button
                              type="button"
                              onClick={() => {
                                const newAmpm = ampm === 'AM' ? 'PM' : 'AM';
                                setAmpm(newAmpm);
                                const newHour = newAmpm === 'AM' ? pendingHour - 12 : pendingHour + 12;
                                handleTimeChange(clampNumber(newHour, 0, 23), pendingMinute);
                              }}
                              style={{ transition: btnTransition }}
                              className={cn(
                                'h-8 px-2 text-xs font-medium rounded-[var(--radius-sm)] border border-solid border-[var(--input-border-rest)] bg-[var(--input-bg)] cursor-pointer text-[var(--foreground)]',
                                'hover:border-[var(--input-border-hover)]',
                                focusRing,
                              )}
                            >
                              {ampm}
                            </button>
                          )}

                          {/* Spacer + Done button */}
                          <div className="flex-1" />
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            style={{ transition: btnTransition }}
                            className={cn(
                              'h-8 px-3 text-xs font-medium text-white bg-[var(--point)] rounded-[var(--radius-sm)] border-none cursor-pointer hover:opacity-90',
                              focusRing,
                            )}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Today button (date mode only) */}
                    {mode === 'date' && (
                      <div className="mt-2 pt-2 border-t border-solid border-[var(--border)]">
                        <button
                          type="button"
                          onClick={() => {
                            setViewYear(today.getFullYear());
                            setViewMonth(today.getMonth());
                            onChange?.(today);
                            setOpen(false);
                          }}
                          style={{ transition: btnTransition }}
                          className={cn(
                            'w-full h-7 flex items-center justify-center text-xs font-medium text-[var(--point)] rounded-[var(--radius-sm)] border-none bg-transparent cursor-pointer hover:bg-[var(--interactive-hover)]',
                            focusRing,
                          )}
                        >
                          Today
                        </button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {error && errorMessage && (
          <span id={errorId} className="text-xs text-[var(--error)]">
            {errorMessage}
          </span>
        )}
        {helperText && !error && (
          <span id={errorId} className="text-xs text-[var(--muted-foreground)]">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);
DatePicker.displayName = 'DatePicker';
