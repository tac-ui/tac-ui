import React, { forwardRef, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  type ViewStyle,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

/** Props for the DatePicker component. */
export interface DatePickerProps {
  /** Currently selected date value. */
  value?: Date;
  /** Called when a new date is selected. */
  onChange?: (date: Date) => void;
  /** Label shown above the trigger. */
  label?: string;
  /** Picker mode. @default 'date' */
  mode?: 'date' | 'datetime' | 'month';
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** When true, the trigger is not pressable. */
  disabled?: boolean;
  /** When true, shows the trigger border in error color. */
  error?: boolean;
  /** Error message displayed below the trigger when error is true. */
  errorMessage?: string;
  /** Style applied to the outer container. */
  style?: ViewStyle;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

function formatDate(date: Date, mode: 'date' | 'datetime' | 'month'): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  if (mode === 'month') return `${y}-${m}`;
  if (mode === 'datetime') {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}`;
  }
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function clampDate(date: Date, minDate?: Date, maxDate?: Date): Date {
  if (minDate && date < minDate) return new Date(minDate);
  if (maxDate && date > maxDate) return new Date(maxDate);
  return date;
}

function isDayDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate) {
    const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (d < min) return true;
  }
  if (maxDate) {
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (d > max) return true;
  }
  return false;
}

function isMonthDisabled(year: number, month: number, minDate?: Date, maxDate?: Date): boolean {
  // Disabled if the entire month is outside range
  if (minDate) {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    if (lastDayOfMonth < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
      return true;
    }
  }
  if (maxDate) {
    const firstDayOfMonth = new Date(year, month, 1);
    if (firstDayOfMonth > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
      return true;
    }
  }
  return false;
}

/** Minimal inline calendar icon — avoids icon package dependency. */
function CalendarIcon({ color }: { color: string }) {
  return (
    <View style={[styles.calendarIcon, { borderColor: color }]}>
      <View style={[styles.calendarIconTop, { borderColor: color }]} />
      <View style={[styles.calendarIconLines, { borderColor: color }]} />
    </View>
  );
}

/** Minimal inline left arrow. */
function ArrowLeftIcon({ color }: { color: string }) {
  return <View style={[styles.arrowLeft, { borderColor: color }]} />;
}

/** Minimal inline right arrow. */
function ArrowRightIcon({ color }: { color: string }) {
  return <View style={[styles.arrowRight, { borderColor: color }]} />;
}

export const DatePicker = forwardRef<View, DatePickerProps>(
  (
    { value, onChange, label, mode = 'date', minDate, maxDate, disabled = false, error = false, errorMessage, style },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const [open, setOpen] = useState(false);
    const shadow = nativeShadows[theme.mode].m;

    // Calendar navigation state
    const today = new Date();
    const initialYear = value ? value.getFullYear() : today.getFullYear();
    const initialMonth = value ? value.getMonth() : today.getMonth();
    const [navYear, setNavYear] = useState(initialYear);
    const [navMonth, setNavMonth] = useState(initialMonth);

    // Time inputs for datetime mode
    const [hours, setHours] = useState(value ? String(value.getHours()).padStart(2, '0') : '00');
    const [minutes, setMinutes] = useState(value ? String(value.getMinutes()).padStart(2, '0') : '00');

    // Animation
    const modalScale = useRef(new Animated.Value(0.92)).current;
    const modalOpacity = useRef(new Animated.Value(0)).current;

    function openPicker() {
      if (disabled) return;
      // Sync nav to current value
      const base = value ?? today;
      setNavYear(base.getFullYear());
      setNavMonth(base.getMonth());
      if (value) {
        setHours(String(value.getHours()).padStart(2, '0'));
        setMinutes(String(value.getMinutes()).padStart(2, '0'));
      }
      setOpen(true);
      Animated.parallel([
        Animated.spring(modalScale, {
          toValue: 1,
          ...springConfigs.entrance,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start();
    }

    function closePicker() {
      Animated.parallel([
        Animated.timing(modalScale, {
          toValue: 0.92,
          duration: duration.fast,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start(() => setOpen(false));
    }

    function prevMonth() {
      if (navMonth === 0) {
        setNavMonth(11);
        setNavYear((y) => y - 1);
      } else {
        setNavMonth((m) => m - 1);
      }
    }

    function nextMonth() {
      if (navMonth === 11) {
        setNavMonth(0);
        setNavYear((y) => y + 1);
      } else {
        setNavMonth((m) => m + 1);
      }
    }

    function prevYear() {
      setNavYear((y) => y - 1);
    }

    function nextYear() {
      setNavYear((y) => y + 1);
    }

    function handleDayPress(day: number) {
      const h = Math.min(23, Math.max(0, parseInt(hours, 10) || 0));
      const min = Math.min(59, Math.max(0, parseInt(minutes, 10) || 0));
      let selected = new Date(navYear, navMonth, day, h, min, 0, 0);
      selected = clampDate(selected, minDate, maxDate);
      onChange?.(selected);
      closePicker();
    }

    function handleMonthPress(monthIndex: number) {
      if (isMonthDisabled(navYear, monthIndex, minDate, maxDate)) return;
      // Pick the 1st of the month, or clamp to minDate/maxDate
      let selected = new Date(navYear, monthIndex, 1, 0, 0, 0, 0);
      selected = clampDate(selected, minDate, maxDate);
      onChange?.(selected);
      closePicker();
    }

    function handleTimeConfirm() {
      const h = Math.min(23, Math.max(0, parseInt(hours, 10) || 0));
      const min = Math.min(59, Math.max(0, parseInt(minutes, 10) || 0));
      const base = value ?? new Date(navYear, navMonth, 1);
      let selected = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, min, 0, 0);
      selected = clampDate(selected, minDate, maxDate);
      onChange?.(selected);
      closePicker();
    }

    // Build day grid
    function renderDayGrid() {
      const firstDow = getFirstDayOfWeek(navYear, navMonth);
      const daysInMonth = getDaysInMonth(navYear, navMonth);
      const cells: (number | null)[] = [
        ...Array(firstDow).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
      ];
      // Pad to full weeks
      while (cells.length % 7 !== 0) cells.push(null);

      return (
        <View style={styles.dayGrid}>
          {DAYS_OF_WEEK.map((d) => (
            <View key={d} style={styles.dayCell}>
              <Text style={[styles.dayOfWeekText, { color: theme.colors.mutedForeground }]}>{d}</Text>
            </View>
          ))}
          {cells.map((day, idx) => {
            if (day === null) {
              return <View key={`empty-${idx}`} style={styles.dayCell} />;
            }
            const cellDate = new Date(navYear, navMonth, day);
            const isDisabled = isDayDisabled(cellDate, minDate, maxDate);
            const isSelected = value ? isSameDay(cellDate, value) : false;
            const isTodayCell = isToday(cellDate);

            return (
              <Pressable
                key={day}
                onPress={() => !isDisabled && handleDayPress(day)}
                style={[
                  styles.dayCell,
                  isSelected && { backgroundColor: theme.colors.point },
                  !isSelected &&
                    isTodayCell && {
                      borderWidth: 1.5,
                      borderColor: 'transparent',
                      backgroundColor: theme.colors.muted,
                    },
                  isDisabled && styles.disabledCell,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    {
                      color: isSelected
                        ? theme.colors.pointForeground
                        : isDisabled
                          ? theme.colors.mutedForeground
                          : theme.colors.foreground,
                    },
                    !isSelected && isTodayCell && { color: theme.colors.point, fontWeight: '600' },
                  ]}
                >
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    }

    // Build month grid (3x4)
    function renderMonthGrid() {
      return (
        <View style={styles.monthGrid}>
          {MONTHS_SHORT.map((name, idx) => {
            const isDisabled = isMonthDisabled(navYear, idx, minDate, maxDate);
            const isSelected = value ? value.getFullYear() === navYear && value.getMonth() === idx : false;
            return (
              <Pressable
                key={name}
                onPress={() => handleMonthPress(idx)}
                style={[
                  styles.monthCell,
                  isSelected && { backgroundColor: theme.colors.point },
                  isDisabled && styles.disabledCell,
                ]}
              >
                <Text
                  style={[
                    styles.monthCellText,
                    {
                      color: isSelected
                        ? theme.colors.pointForeground
                        : isDisabled
                          ? theme.colors.mutedForeground
                          : theme.colors.foreground,
                    },
                  ]}
                >
                  {name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    }

    const triggerLabel = value ? formatDate(value, mode) : 'Select date';
    const hasValue = !!value;

    return (
      <View ref={ref} style={[styles.container, style]}>
        {label && <Text style={[styles.label, { color: theme.colors.foreground }]}>{label}</Text>}

        <Pressable
          onPress={openPicker}
          style={[
            styles.trigger,
            {
              backgroundColor: theme.colors.inputBg,
              borderColor: error ? theme.colors.error : theme.colors.border,
            },
            disabled && styles.disabled,
          ]}
        >
          <Text
            style={[
              styles.triggerText,
              {
                color: hasValue ? theme.colors.foreground : theme.colors.mutedForeground,
              },
            ]}
            numberOfLines={1}
          >
            {triggerLabel}
          </Text>
          <CalendarIcon color={theme.colors.mutedForeground} />
        </Pressable>
        {error && errorMessage && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errorMessage}</Text>}

        <Modal visible={open} transparent animationType="none" onRequestClose={closePicker}>
          <TouchableWithoutFeedback onPress={closePicker}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.panel,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      ...shadow,
                      opacity: modalOpacity,
                      transform: [{ scale: modalScale }],
                    },
                  ]}
                >
                  <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    {/* Header: month navigation for date/datetime, year for month mode */}
                    {mode === 'month' ? (
                      <View style={styles.navRow}>
                        <Pressable onPress={prevYear} style={styles.navBtn} hitSlop={8}>
                          <ArrowLeftIcon color={theme.colors.foreground} />
                        </Pressable>
                        <Text style={[styles.navTitle, { color: theme.colors.foreground }]}>{navYear}</Text>
                        <Pressable onPress={nextYear} style={styles.navBtn} hitSlop={8}>
                          <ArrowRightIcon color={theme.colors.foreground} />
                        </Pressable>
                      </View>
                    ) : (
                      <View style={styles.navRow}>
                        <Pressable onPress={prevMonth} style={styles.navBtn} hitSlop={8}>
                          <ArrowLeftIcon color={theme.colors.foreground} />
                        </Pressable>
                        <Text style={[styles.navTitle, { color: theme.colors.foreground }]}>
                          {MONTHS[navMonth]} {navYear}
                        </Text>
                        <Pressable onPress={nextMonth} style={styles.navBtn} hitSlop={8}>
                          <ArrowRightIcon color={theme.colors.foreground} />
                        </Pressable>
                      </View>
                    )}

                    {/* Calendar body */}
                    {mode === 'month' ? renderMonthGrid() : renderDayGrid()}

                    {/* Time inputs for datetime mode */}
                    {mode === 'datetime' && (
                      <View style={[styles.timeRow, { borderTopColor: theme.colors.border }]}>
                        <Text style={[styles.timeLabel, { color: theme.colors.mutedForeground }]}>Time</Text>
                        <View style={styles.timeInputs}>
                          <TextInput
                            style={[
                              styles.timeInput,
                              {
                                color: theme.colors.foreground,
                                backgroundColor: theme.colors.inputBg,
                                borderColor: theme.colors.border,
                              },
                            ]}
                            value={hours}
                            onChangeText={(t) => setHours(t.replace(/[^0-9]/g, '').slice(0, 2))}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder="HH"
                            placeholderTextColor={theme.colors.mutedForeground}
                            selectTextOnFocus
                          />
                          <Text style={[styles.timeSep, { color: theme.colors.foreground }]}>:</Text>
                          <TextInput
                            style={[
                              styles.timeInput,
                              {
                                color: theme.colors.foreground,
                                backgroundColor: theme.colors.inputBg,
                                borderColor: theme.colors.border,
                              },
                            ]}
                            value={minutes}
                            onChangeText={(t) => setMinutes(t.replace(/[^0-9]/g, '').slice(0, 2))}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder="MM"
                            placeholderTextColor={theme.colors.mutedForeground}
                            selectTextOnFocus
                          />
                        </View>
                        <Pressable
                          onPress={handleTimeConfirm}
                          style={[styles.confirmBtn, { backgroundColor: theme.colors.point }]}
                        >
                          <Text style={[styles.confirmBtnText, { color: theme.colors.pointForeground }]}>Confirm</Text>
                        </Pressable>
                      </View>
                    )}
                  </ScrollView>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  },
);
DatePicker.displayName = 'DatePicker';

const styles = StyleSheet.create({
  container: { gap: 8, width: '100%' },
  label: { fontSize: 14, fontWeight: '500' },
  errorText: { fontSize: 12, marginTop: 2 },

  trigger: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 10,
  },
  triggerText: { flex: 1, fontSize: 14, marginRight: 8 },
  disabled: { opacity: 0.5 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    maxHeight: '90%', // Use relative height to prevent squashing on small screens
    overflow: 'hidden',
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: { fontSize: 15, fontWeight: '600' },

  // Day grid
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%` as unknown as number,
    aspectRatio: 1, // Forces square
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  dayOfWeekText: { fontSize: 11, fontWeight: '500' },
  dayText: { fontSize: 13 },
  disabledCell: { opacity: 0.3 },

  // Month grid (3x4)
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  monthCell: {
    width: '30%',
    aspectRatio: 2, // prevents squashing vertically
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },
  monthCellText: { fontSize: 13, fontWeight: '500' },

  // Time inputs
  timeRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    // Note: Inline borderTopColor via theme in component, omitting here
    gap: 10,
  },
  timeLabel: { fontSize: 12, fontWeight: '500' },
  timeInputs: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  timeInput: {
    width: 56,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  timeSep: { fontSize: 20, fontWeight: '600', marginHorizontal: 2 },
  confirmBtn: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  confirmBtnText: { fontSize: 14, fontWeight: '600' },

  // Calendar icon (simple border-based)
  calendarIcon: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  calendarIconTop: {
    position: 'absolute',
    top: -1,
    left: 3,
    right: 3,
    height: 4,
    borderBottomWidth: 1.5,
  },
  calendarIconLines: {
    width: '100%',
    height: 7,
    borderTopWidth: 1,
  },

  // Arrow icons
  arrowLeft: {
    width: 8,
    height: 8,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{ rotate: '45deg' }],
    marginLeft: 3,
  },
  arrowRight: {
    width: 8,
    height: 8,
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    transform: [{ rotate: '45deg' }],
    marginRight: 3,
  },
});
