import React, { forwardRef, useState, useRef, useEffect, useCallback, useId, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { dropdownMotionVariants, tacSpring, EASING, DURATION, EXIT_DURATION } from '../constants/motion';
import { focusRing, inputTransition } from '../constants/styles';

/* ─── EyeDropper API type declaration ─── */
declare global {
  interface EyeDropper {
    open(options?: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
  }
  var EyeDropper: { new (): EyeDropper } | undefined;
}

/* ─── Color conversion types ─── */
interface RGB {
  r: number;
  g: number;
  b: number;
}
interface HSV {
  h: number;
  s: number;
  v: number;
}

/* ─── Color conversion utilities ─── */

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? `${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}` : h;
  return {
    r: parseInt(full.substring(0, 2), 16),
    g: parseInt(full.substring(2, 4), 16),
    b: parseInt(full.substring(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsv(r: number, g: number, b: number): HSV {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + 6) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
  }

  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function hsvToRgb(h: number, s: number, v: number): RGB {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let rn = 0,
    gn = 0,
    bn = 0;
  if (h < 60) {
    rn = c;
    gn = x;
  } else if (h < 120) {
    rn = x;
    gn = c;
  } else if (h < 180) {
    gn = c;
    bn = x;
  } else if (h < 240) {
    gn = x;
    bn = c;
  } else if (h < 300) {
    rn = x;
    bn = c;
  } else {
    rn = c;
    bn = x;
  }

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/* ─── Validation ─── */

function isValidHex(hex: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function normalizeHex(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`.toUpperCase();
  }
  return `#${h}`.toUpperCase();
}

/* ─── Transition constants ─── */
const btnTransition = `background-color ${DURATION.normal} ${EASING}, opacity ${DURATION.normal} ${EASING}`;

/* ─── Default colors ─── */
const DEFAULT_COLORS = [
  '#EF4444',
  '#DC2626',
  '#B91C1C',
  '#F97316',
  '#EA580C',
  '#5856D6',
  '#EAB308',
  '#CA8A04',
  '#A16207',
  '#22C55E',
  '#16A34A',
  '#15803D',
  '#14B8A6',
  '#0D9488',
  '#0F766E',
  '#3B82F6',
  '#2563EB',
  '#4B49B8',
  '#6366F1',
  '#4F46E5',
  '#4338CA',
  '#A855F7',
  '#9333EA',
  '#7E22CE',
  '#EC4899',
  '#DB2777',
  '#BE185D',
  '#6B7280',
  '#4B5563',
  '#374151',
  '#1F2937',
  '#111827',
  '#000000',
];

/* ─── Props ─── */

/** Props for the ColorPicker component, a color selector with spectrum picker, swatch grid, and channel inputs. */
export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The controlled selected color as a hex string (e.g. '#FF0000'). */
  value?: string;
  /** Called when a color is selected (after confirming). */
  onChange?: (color: string) => void;
  /** Label text displayed above the picker trigger. */
  label?: string;
  /** Helper text displayed below the trigger. */
  helperText?: string;
  /** When true, applies error styling. */
  error?: boolean;
  /** Error message displayed below the trigger when `error` is true. */
  errorMessage?: string;
  /** Custom array of hex color strings for the swatch grid. */
  colors?: string[];
  /** When true, the picker is disabled. */
  disabled?: boolean;
  /** Placeholder text when no color is selected. @default 'Select color' */
  placeholder?: string;
  /** ID attribute for the trigger button. */
  id?: string;
  /** When true, shows a text input for manual hex entry. @default true */
  showInput?: boolean;
  /** When true, shows the spectrum gradient picker for detailed color selection. @default true */
  showSpectrum?: boolean;
  /** When true, shows the eyedropper button (only works in supported browsers). @default true */
  showEyeDropper?: boolean;
  /** When true, shows RGB/HSB channel inputs for precise values. @default true */
  showChannels?: boolean;
}

/* ─── Compact channel input ─── */
function ChannelInput({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5 items-center">
      <span className="text-[10px] font-medium text-[var(--muted-foreground)] select-none">{label}</span>
      <input
        type="number"
        value={Math.round(value)}
        min={min}
        max={max}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v)) onChange(clamp(v, min, max));
        }}
        aria-label={label}
        style={{ transition: inputTransition }}
        className={cn(
          'w-[52px] h-7 text-center text-xs font-mono text-[var(--foreground)] bg-[var(--input-bg)] border border-solid border-[var(--input-border-rest)] rounded-[var(--radius-sm)] outline-none',
          'hover:border-[var(--input-border-hover)]',
          'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
        )}
      />
    </div>
  );
}

/* ─── Component ─── */

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      className,
      value,
      onChange,
      label,
      helperText,
      error,
      errorMessage,
      colors = DEFAULT_COLORS,
      disabled,
      placeholder = 'Select color',
      id,
      showInput = true,
      showSpectrum = true,
      showEyeDropper = true,
      showChannels = true,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const svRef = useRef<HTMLDivElement>(null);
    const hueRef = useRef<HTMLDivElement>(null);

    // Internal state for uncontrolled mode
    const [internalColor, setInternalColor] = useState<string | undefined>(undefined);
    const isControlled = value !== undefined;
    const resolvedValue = isControlled ? value : internalColor;

    // Pending color state (HSV is the source of truth while panel is open)
    const [pendingHsv, setPendingHsv] = useState<HSV>({ h: 0, s: 1, v: 1 });
    const [hexInput, setHexInput] = useState(resolvedValue ?? '');

    // Dragging state
    const [draggingSV, setDraggingSV] = useState(false);
    const [draggingHue, setDraggingHue] = useState(false);

    // Presets collapsed state
    const [presetsOpen, setPresetsOpen] = useState(true);

    // Eyedropper support check
    const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

    // Derived pending color values
    const pendingRgb = useMemo(() => hsvToRgb(pendingHsv.h, pendingHsv.s, pendingHsv.v), [pendingHsv]);
    const pendingHex = useMemo(() => rgbToHex(pendingRgb.r, pendingRgb.g, pendingRgb.b), [pendingRgb]);

    // Display color (committed value — uses internal state for uncontrolled mode)
    const displayColor = useMemo(() => {
      if (resolvedValue && isValidHex(resolvedValue)) return normalizeHex(resolvedValue);
      return null;
    }, [resolvedValue]);

    // Initialize pending state from value when panel opens
    const initPendingFromValue = useCallback(() => {
      const current = resolvedValue;
      if (current && isValidHex(current)) {
        const rgb = hexToRgb(normalizeHex(current));
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setPendingHsv(hsv);
        setHexInput(normalizeHex(current));
      } else {
        setPendingHsv({ h: 0, s: 1, v: 1 });
        setHexInput('');
      }
    }, [resolvedValue]);

    // Sync hex input when pending changes (from non-hex sources)
    useEffect(() => {
      setHexInput(pendingHex);
    }, [pendingHex]);

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

    const handleOpen = useCallback(() => {
      if (disabled) return;
      setOpen((prev) => {
        if (!prev) {
          // Opening — initialize pending from current value
          initPendingFromValue();
        }
        return !prev;
      });
    }, [disabled, initPendingFromValue]);

    // Update pending from a hex string
    const updatePendingFromHex = useCallback((hex: string) => {
      if (isValidHex(hex)) {
        const normalized = normalizeHex(hex);
        const rgb = hexToRgb(normalized);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setPendingHsv(hsv);
      }
    }, []);

    // Swatch click → update pending
    const handleSwatchClick = useCallback(
      (color: string) => {
        const normalized = normalizeHex(color);
        setHexInput(normalized);
        updatePendingFromHex(normalized);
      },
      [updatePendingFromHex],
    );

    // Hex input change
    const handleHexInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setHexInput(raw);
        const withHash = raw.startsWith('#') ? raw : `#${raw}`;
        if (isValidHex(withHash)) {
          updatePendingFromHex(withHash);
        }
      },
      [updatePendingFromHex],
    );

    // Hex input Enter → confirm
    const handleHexKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          const withHash = hexInput.startsWith('#') ? hexInput : `#${hexInput}`;
          if (isValidHex(withHash)) {
            const normalized = normalizeHex(withHash);
            if (!isControlled) setInternalColor(normalized);
            onChange?.(normalized);
            setOpen(false);
          }
        }
      },
      [hexInput, onChange, isControlled],
    );

    // Confirm (Select) button
    const handleConfirm = useCallback(() => {
      if (!isControlled) setInternalColor(pendingHex);
      onChange?.(pendingHex);
      setOpen(false);
    }, [onChange, pendingHex, isControlled]);

    // Eyedropper
    const handleEyeDropper = useCallback(async () => {
      if (!hasEyeDropper) return;
      try {
        const dropper = new window.EyeDropper!();
        const result = await dropper.open();
        const hex = normalizeHex(result.sRGBHex);
        setHexInput(hex);
        updatePendingFromHex(hex);
      } catch {
        // User cancelled or API error — ignore
      }
    }, [hasEyeDropper, updatePendingFromHex]);

    // ─── SV gradient pointer handling ───
    const updateSVFromPointer = useCallback((clientX: number, clientY: number) => {
      if (!svRef.current) return;
      const rect = svRef.current.getBoundingClientRect();
      const s = clamp((clientX - rect.left) / rect.width, 0, 1);
      const v = clamp(1 - (clientY - rect.top) / rect.height, 0, 1);
      setPendingHsv((prev) => ({ ...prev, s, v }));
    }, []);

    const handleSVPointerDown = useCallback(
      (e: React.PointerEvent) => {
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        setDraggingSV(true);
        updateSVFromPointer(e.clientX, e.clientY);
      },
      [updateSVFromPointer],
    );

    const handleSVPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!draggingSV) return;
        updateSVFromPointer(e.clientX, e.clientY);
      },
      [draggingSV, updateSVFromPointer],
    );

    const handleSVPointerUp = useCallback(() => {
      setDraggingSV(false);
    }, []);

    // ─── Hue slider pointer handling ───
    const updateHueFromPointer = useCallback((clientX: number) => {
      if (!hueRef.current) return;
      const rect = hueRef.current.getBoundingClientRect();
      const h = clamp(((clientX - rect.left) / rect.width) * 360, 0, 360);
      setPendingHsv((prev) => ({ ...prev, h }));
    }, []);

    const handleHuePointerDown = useCallback(
      (e: React.PointerEvent) => {
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        setDraggingHue(true);
        updateHueFromPointer(e.clientX);
      },
      [updateHueFromPointer],
    );

    const handleHuePointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!draggingHue) return;
        updateHueFromPointer(e.clientX);
      },
      [draggingHue, updateHueFromPointer],
    );

    const handleHuePointerUp = useCallback(() => {
      setDraggingHue(false);
    }, []);

    // ─── Channel input handlers ───
    const handleRgbChange = useCallback(
      (channel: 'r' | 'g' | 'b', val: number) => {
        const rgb = { ...pendingRgb, [channel]: val };
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setPendingHsv(hsv);
      },
      [pendingRgb],
    );

    const handleHsvChannelChange = useCallback((channel: 'h' | 's' | 'v', val: number) => {
      setPendingHsv((prev) => ({
        ...prev,
        [channel]: channel === 'h' ? val : val / 100,
      }));
    }, []);

    // Keyboard support for SV canvas
    const handleSVKeyDown = useCallback((e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 0.1 : 0.02;
      let handled = true;
      setPendingHsv((prev) => {
        switch (e.key) {
          case 'ArrowRight':
            return { ...prev, s: clamp(prev.s + step, 0, 1) };
          case 'ArrowLeft':
            return { ...prev, s: clamp(prev.s - step, 0, 1) };
          case 'ArrowUp':
            return { ...prev, v: clamp(prev.v + step, 0, 1) };
          case 'ArrowDown':
            return { ...prev, v: clamp(prev.v - step, 0, 1) };
          default:
            handled = false;
            return prev;
        }
      });
      if (handled) e.preventDefault();
    }, []);

    // Keyboard support for hue slider
    const handleHueKeyDown = useCallback((e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 2;
      let handled = true;
      setPendingHsv((prev) => {
        switch (e.key) {
          case 'ArrowRight':
            return { ...prev, h: (prev.h + step) % 360 };
          case 'ArrowLeft':
            return { ...prev, h: (prev.h - step + 360) % 360 };
          default:
            handled = false;
            return prev;
        }
      });
      if (handled) e.preventDefault();
    }, []);

    // Pure hue color for SV gradient background
    const pureHueColor = useMemo(() => {
      const { r, g, b } = hsvToRgb(pendingHsv.h, 1, 1);
      return rgbToHex(r, g, b);
    }, [pendingHsv.h]);

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
              'w-full h-10 flex items-center gap-3 px-4 text-sm text-left bg-[var(--input-bg)] border border-solid rounded-[var(--input-radius)] outline-none cursor-pointer',
              focusRing,
              'border-[var(--input-border-rest)]',
              'hover:border-[var(--input-border-hover)]',
              'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
              error && 'border-[var(--error)] focus:border-[var(--point)]',
              disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
              className,
            )}
          >
            <span
              className="w-5 h-5 rounded-[var(--radius-sm)] border border-solid border-[var(--border)] shrink-0"
              style={{ backgroundColor: displayColor ?? 'transparent' }}
            />
            <span
              className={cn(
                'truncate flex-1',
                displayColor ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]',
              )}
            >
              {displayColor ?? placeholder}
            </span>
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
                  'p-3 w-[300px]',
                )}
                variants={dropdownMotionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={tacSpring.magnetic}
                style={{ originY: 0 }}
              >
                {/* ─── Spectrum Picker ─── */}
                {showSpectrum && (
                  <>
                    {/* SV gradient area */}
                    <div
                      ref={svRef}
                      role="slider"
                      tabIndex={0}
                      aria-label="Saturation and brightness"
                      aria-valuetext={`Saturation ${Math.round(pendingHsv.s * 100)}%, Brightness ${Math.round(pendingHsv.v * 100)}%`}
                      className="relative w-full h-[150px] rounded-[var(--radius-sm)] cursor-crosshair select-none touch-none"
                      style={{
                        background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${pureHueColor})`,
                      }}
                      onPointerDown={handleSVPointerDown}
                      onPointerMove={handleSVPointerMove}
                      onPointerUp={handleSVPointerUp}
                      onKeyDown={handleSVKeyDown}
                    >
                      {/* Crosshair marker */}
                      <div
                        className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none"
                        style={{
                          left: `${pendingHsv.s * 100}%`,
                          top: `${(1 - pendingHsv.v) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                          boxShadow: '0 0 0 1px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.3)',
                        }}
                      />
                    </div>

                    {/* Hue slider */}
                    <div
                      ref={hueRef}
                      role="slider"
                      tabIndex={0}
                      aria-label="Hue"
                      aria-valuemin={0}
                      aria-valuemax={360}
                      aria-valuenow={Math.round(pendingHsv.h)}
                      className="relative w-full h-3 mt-2 rounded-full cursor-pointer select-none touch-none"
                      style={{
                        background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
                      }}
                      onPointerDown={handleHuePointerDown}
                      onPointerMove={handleHuePointerMove}
                      onPointerUp={handleHuePointerUp}
                      onKeyDown={handleHueKeyDown}
                    >
                      {/* Hue thumb */}
                      <div
                        className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-white pointer-events-none"
                        style={{
                          left: `${(pendingHsv.h / 360) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: pureHueColor,
                          boxShadow: '0 0 0 1px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                  </>
                )}

                {/* ─── Preset swatches ─── */}
                <div className={showSpectrum ? 'mt-3 pt-3 border-t border-solid border-[var(--border)]' : 'mt-2 pt-2'}>
                  <button
                    type="button"
                    onClick={() => setPresetsOpen((prev) => !prev)}
                    className="flex items-center gap-1 mb-1.5 bg-transparent border-none cursor-pointer p-0 select-none"
                    aria-expanded={presetsOpen}
                  >
                    <motion.svg
                      className="w-3 h-3 text-[var(--muted-foreground)]"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      animate={{ rotate: presetsOpen ? 90 : 0 }}
                      transition={tacSpring.magnetic}
                    >
                      <path d="M4.5 2.5l4 3.5-4 3.5" />
                    </motion.svg>
                    <span className="text-[10px] font-medium text-[var(--muted-foreground)]">Presets</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {presetsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ ...tacSpring.magnetic, opacity: { duration: EXIT_DURATION } }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="grid grid-cols-6 gap-1.5">
                          {colors.map((color) => {
                            const normalized = normalizeHex(color);
                            const isSelected = pendingHex === normalized;
                            return (
                              <button
                                key={color}
                                type="button"
                                aria-label={color}
                                onClick={() => handleSwatchClick(color)}
                                style={{
                                  backgroundColor: color,
                                  transition: `transform ${DURATION.normal} ${EASING}, box-shadow ${DURATION.normal} ${EASING}`,
                                }}
                                className={cn(
                                  'w-8 h-8 rounded-[var(--radius-sm)] border-none cursor-pointer',
                                  focusRing,
                                  'hover:scale-110 hover:shadow-[var(--shadow-m)]',
                                  isSelected &&
                                    'ring-2 ring-[var(--point)] ring-offset-2 ring-offset-[var(--dropdown-bg)] scale-110',
                                )}
                              />
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ─── Hex input row ─── */}
                {showInput && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-solid border-[var(--border)]">
                    <span
                      className="w-8 h-8 rounded-[var(--radius-sm)] border border-solid border-[var(--border)] shrink-0"
                      style={{ backgroundColor: pendingHex }}
                    />
                    <input
                      type="text"
                      value={hexInput}
                      onChange={handleHexInputChange}
                      onKeyDown={handleHexKeyDown}
                      placeholder="#000000"
                      maxLength={7}
                      style={{ transition: inputTransition }}
                      className={cn(
                        'flex-1 h-8 px-3 text-xs font-mono text-[var(--foreground)] bg-[var(--input-bg)] border border-solid border-[var(--input-border-rest)] rounded-[var(--radius-sm)] outline-none',
                        'hover:border-[var(--input-border-hover)]',
                        'focus:border-[var(--point)] focus:shadow-[var(--input-focus-glow)]',
                      )}
                    />
                    {showEyeDropper && hasEyeDropper && (
                      <button
                        type="button"
                        aria-label="Pick color from screen"
                        onClick={handleEyeDropper}
                        style={{ transition: btnTransition }}
                        className={cn(
                          'w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-solid border-[var(--input-border-rest)] bg-[var(--input-bg)] cursor-pointer text-[var(--muted-foreground)]',
                          'hover:border-[var(--input-border-hover)] hover:text-[var(--foreground)]',
                          focusRing,
                        )}
                      >
                        {/* Eyedropper / pipette icon */}
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
                          <path d="M13.5 2.5a2.12 2.12 0 0 0-3 0L9 4l-.5-.5L7 5l1 1-5 5v2h2l5-5 1 1 1.5-1.5L12 7l1.5-1.5a2.12 2.12 0 0 0 0-3z" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* ─── Channel inputs (RGB + HSB) ─── */}
                {showChannels && (
                  <div className="mt-3 pt-3 border-t border-solid border-[var(--border)] flex flex-col gap-2">
                    {/* RGB row */}
                    <div className="flex items-end gap-2 justify-between">
                      <ChannelInput
                        label="R"
                        value={pendingRgb.r}
                        min={0}
                        max={255}
                        onChange={(v) => handleRgbChange('r', v)}
                      />
                      <ChannelInput
                        label="G"
                        value={pendingRgb.g}
                        min={0}
                        max={255}
                        onChange={(v) => handleRgbChange('g', v)}
                      />
                      <ChannelInput
                        label="B"
                        value={pendingRgb.b}
                        min={0}
                        max={255}
                        onChange={(v) => handleRgbChange('b', v)}
                      />
                    </div>
                    {/* HSB row */}
                    <div className="flex items-end gap-2 justify-between">
                      <ChannelInput
                        label="H"
                        value={pendingHsv.h}
                        min={0}
                        max={360}
                        onChange={(v) => handleHsvChannelChange('h', v)}
                      />
                      <ChannelInput
                        label="S"
                        value={pendingHsv.s * 100}
                        min={0}
                        max={100}
                        onChange={(v) => handleHsvChannelChange('s', v)}
                      />
                      <ChannelInput
                        label="B"
                        value={pendingHsv.v * 100}
                        min={0}
                        max={100}
                        onChange={(v) => handleHsvChannelChange('v', v)}
                      />
                    </div>
                  </div>
                )}

                {/* ─── Confirm button ─── */}
                <button
                  type="button"
                  onClick={handleConfirm}
                  style={{ transition: btnTransition }}
                  className={cn(
                    'w-full h-8 mt-3 text-sm font-medium text-[var(--point-foreground)] bg-[var(--point)] rounded-[var(--radius-sm)] border-none cursor-pointer hover:opacity-90',
                    focusRing,
                  )}
                >
                  Select
                </button>
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
ColorPicker.displayName = 'ColorPicker';
