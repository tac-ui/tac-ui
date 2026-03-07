import React, { forwardRef, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  Animated,
  PanResponder,
  StyleSheet,
  ScrollView,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs } from '../constants/motion';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

// ─── Default Preset Colors ──────────────────────────────────────────────────

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

// ─── Color Conversion Helpers ────────────────────────────────────────────────

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

function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const n = parseInt(full, 16);
  return {
    r: (n >> 16) & 0xff,
    g: (n >> 8) & 0xff,
    b: n & 0xff,
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  return (
    '#' +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

function rgbToHsv({ r, g, b }: RGB): HSV {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return { h, s, v };
}

function hsvToRgb({ h, s, v }: HSV): RGB {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let rn = 0,
    gn = 0,
    bn = 0;
  if (h < 60) {
    rn = c;
    gn = x;
    bn = 0;
  } else if (h < 120) {
    rn = x;
    gn = c;
    bn = 0;
  } else if (h < 180) {
    rn = 0;
    gn = c;
    bn = x;
  } else if (h < 240) {
    rn = 0;
    gn = x;
    bn = c;
  } else if (h < 300) {
    rn = x;
    gn = 0;
    bn = c;
  } else {
    rn = c;
    gn = 0;
    bn = x;
  }

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

function isValidHex(hex: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function hueToRgb(h: number): string {
  return rgbToHex(hsvToRgb({ h, s: 1, v: 1 }));
}

// ─── Props Interface ─────────────────────────────────────────────────────────

/** Props for the ColorPicker component. */
export interface ColorPickerProps {
  /** Controlled hex color value (e.g. '#3B82F6'). */
  value?: string;
  /** Called with the new hex color when the user confirms a selection. */
  onChange?: (color: string) => void;
  /** Label rendered above the trigger button. */
  label?: string;
  /** Helper text shown below the trigger when there is no error. */
  helperText?: string;
  /** When true, applies error styling to the trigger border. */
  error?: boolean;
  /** Error message displayed when error is true. */
  errorMessage?: string;
  /** Preset swatch colors shown in the panel grid. */
  colors?: string[];
  /** Disables all interaction. @default false */
  disabled?: boolean;
  /** Placeholder text shown when no color is selected. @default 'Select color' */
  placeholder?: string;
  /** Show the hex text input in the panel. @default true */
  showInput?: boolean;
  /** Show the HSV spectrum + hue slider in the panel. @default true */
  showSpectrum?: boolean;
  /** Show R/G/B channel inputs in the panel. @default true */
  showChannels?: boolean;
  /** Optional style override for the trigger container. */
  style?: ViewStyle;
}

// ─── Spectrum Area ───────────────────────────────────────────────────────────

interface SpectrumAreaProps {
  hue: number;
  saturation: number;
  brightness: number;
  onChangeSV: (s: number, v: number) => void;
  disabled?: boolean;
}

const SPECTRUM_SIZE = 268;

const SpectrumArea = React.memo(({ hue, saturation, brightness, onChangeSV, disabled }: SpectrumAreaProps) => {
  const widthRef = useRef(SPECTRUM_SIZE);
  const heightRef = useRef(160);

  const crosshairX = saturation * widthRef.current;
  const crosshairY = (1 - brightness) * heightRef.current;

  const svRef = useRef({ s: saturation, v: brightness });
  svRef.current = { s: saturation, v: brightness };

  const updateFromTouch = useCallback(
    (x: number, y: number) => {
      const s = Math.min(Math.max(x / widthRef.current, 0), 1);
      const v = Math.min(Math.max(1 - y / heightRef.current, 0), 1);
      if (s !== svRef.current.s || v !== svRef.current.v) {
        onChangeSV(s, v);
      }
    },
    [onChangeSV],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => {
        updateFromTouch(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      },
      onPanResponderMove: (evt) => {
        updateFromTouch(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      },
    }),
  ).current;

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
    heightRef.current = e.nativeEvent.layout.height;
  }, []);

  const hueColor = hueToRgb(hue);

  return (
    <View style={spectrumStyles.container} onLayout={handleLayout} {...panResponder.panHandlers}>
      {/* Base hue */}
      <View style={[spectrumStyles.layer, { backgroundColor: hueColor }]} />
      {/* White saturation overlay (left = white, right = pure hue) */}
      <View style={[spectrumStyles.layer, spectrumStyles.whiteGradient]} />
      {/* Black brightness overlay (top = full brightness, bottom = black) */}
      <View style={[spectrumStyles.layer, spectrumStyles.blackGradient]} />
      {/* Crosshair */}
      <View
        style={[
          spectrumStyles.crosshair,
          {
            left: crosshairX - 6,
            top: crosshairY - 6,
          },
        ]}
        pointerEvents="none"
      />
    </View>
  );
});
SpectrumArea.displayName = 'SpectrumArea';

const spectrumStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  whiteGradient: {
    // Simulated: left side is white (opacity 1), right side is transparent
    // We use a background that fades from white on left to transparent on right
  },
  blackGradient: {
    // Bottom is black, top is transparent
  },
  crosshair: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
});

// Gradient using react-native-svg
const WhiteOverlay = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <Svg width="100%" height="100%">
      <Defs>
        <LinearGradient id="grad-white" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad-white)" />
    </Svg>
  </View>
);

const BlackOverlay = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <Svg width="100%" height="100%">
      <Defs>
        <LinearGradient id="grad-black" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad-black)" />
    </Svg>
  </View>
);

// ─── Hue Slider ──────────────────────────────────────────────────────────────

interface HueSliderProps {
  hue: number;
  onChangeHue: (h: number) => void;
  disabled?: boolean;
}

const HueSlider = React.memo(({ hue, onChangeHue, disabled }: HueSliderProps) => {
  const widthRef = useRef(SPECTRUM_SIZE);
  const hueRef = useRef(hue);
  hueRef.current = hue;

  const updateHue = useCallback(
    (x: number) => {
      const ratio = Math.min(Math.max(x / widthRef.current, 0), 1);
      const newHue = Math.round(ratio * 360);
      if (newHue !== hueRef.current) {
        onChangeHue(newHue);
      }
    },
    [onChangeHue],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => {
        updateHue(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        updateHue(evt.nativeEvent.locationX);
      },
    }),
  ).current;

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
  }, []);

  const thumbLeft = (hue / 360) * 100;

  return (
    <View style={hueStyles.container} onLayout={handleLayout} {...panResponder.panHandlers}>
      <View style={hueStyles.track}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient id="grad-hue" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#FF0000" />
              <Stop offset="16.66%" stopColor="#FFFF00" />
              <Stop offset="33.33%" stopColor="#00FF00" />
              <Stop offset="50%" stopColor="#00FFFF" />
              <Stop offset="66.66%" stopColor="#0000FF" />
              <Stop offset="83.33%" stopColor="#FF00FF" />
              <Stop offset="100%" stopColor="#FF0000" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad-hue)" />
        </Svg>
      </View>
      {/* Thumb */}
      <View style={[hueStyles.thumb, { left: `${thumbLeft}%` as unknown as number }]} pointerEvents="none" />
    </View>
  );
});
HueSlider.displayName = 'HueSlider';

const hueStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  thumb: {
    position: 'absolute',
    top: '50%',
    marginTop: -9,
    marginLeft: -9,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});

// ─── ColorPicker Component ───────────────────────────────────────────────────

export const ColorPicker = forwardRef<View, ColorPickerProps>(
  (
    {
      value,
      onChange,
      label,
      helperText,
      error = false,
      errorMessage,
      colors = DEFAULT_COLORS,
      disabled = false,
      placeholder = 'Select color',
      showInput = true,
      showSpectrum = true,
      showChannels = true,
      style,
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const shadow = nativeShadows[theme.mode].lg;

    const [open, setOpen] = useState(false);

    // Internal draft state while panel is open
    const initialHsv = value && isValidHex(value) ? rgbToHsv(hexToRgb(value)) : { h: 210, s: 0.7, v: 0.9 };
    const [draftHsv, setDraftHsv] = useState<HSV>(initialHsv);
    const [hexInput, setHexInput] = useState(value ?? '');
    const [rInput, setRInput] = useState('');
    const [gInput, setGInput] = useState('');
    const [bInput, setBInput] = useState('');

    // Trigger animation
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const syncInputsFromHsv = useCallback((hsv: HSV) => {
      const rgb = hsvToRgb(hsv);
      const hex = rgbToHex(rgb);
      setHexInput(hex);
      setRInput(String(rgb.r));
      setGInput(String(rgb.g));
      setBInput(String(rgb.b));
    }, []);

    const openPanel = useCallback(() => {
      if (disabled) return;
      // Sync draft from current value
      const hsv = value && isValidHex(value) ? rgbToHsv(hexToRgb(value)) : { h: 210, s: 0.7, v: 0.9 };
      setDraftHsv(hsv);
      syncInputsFromHsv(hsv);
      setOpen(true);
    }, [disabled, value, syncInputsFromHsv]);

    const closePanel = useCallback(() => {
      setOpen(false);
    }, []);

    const handleConfirm = useCallback(() => {
      const rgb = hsvToRgb(draftHsv);
      const hex = rgbToHex(rgb);
      onChange?.(hex);
      setOpen(false);
    }, [draftHsv, onChange]);

    const handleChangeSV = useCallback(
      (s: number, v: number) => {
        setDraftHsv((prev) => {
          const next = { ...prev, s, v };
          syncInputsFromHsv(next);
          return next;
        });
      },
      [syncInputsFromHsv],
    );

    const handleChangeHue = useCallback(
      (h: number) => {
        setDraftHsv((prev) => {
          const next = { ...prev, h };
          syncInputsFromHsv(next);
          return next;
        });
      },
      [syncInputsFromHsv],
    );

    const handleSwatchPress = useCallback(
      (color: string) => {
        const hsv = rgbToHsv(hexToRgb(color));
        setDraftHsv(hsv);
        syncInputsFromHsv(hsv);
      },
      [syncInputsFromHsv],
    );

    const handleHexInputChange = useCallback((text: string) => {
      setHexInput(text);
      const normalized = text.startsWith('#') ? text : '#' + text;
      if (isValidHex(normalized)) {
        const hsv = rgbToHsv(hexToRgb(normalized));
        setDraftHsv(hsv);
        const rgb = hsvToRgb(hsv);
        setRInput(String(rgb.r));
        setGInput(String(rgb.g));
        setBInput(String(rgb.b));
      }
    }, []);

    const handleChannelChange = useCallback((channel: 'r' | 'g' | 'b', text: string) => {
      const num = parseInt(text, 10);
      const clamped = isNaN(num) ? 0 : Math.min(255, Math.max(0, num));
      if (channel === 'r') setRInput(text);
      if (channel === 'g') setGInput(text);
      if (channel === 'b') setBInput(text);

      setDraftHsv((prev) => {
        const prevRgb = hsvToRgb(prev);
        const newRgb: RGB = {
          r: channel === 'r' ? clamped : prevRgb.r,
          g: channel === 'g' ? clamped : prevRgb.g,
          b: channel === 'b' ? clamped : prevRgb.b,
        };
        const newHsv = rgbToHsv(newRgb);
        setHexInput(rgbToHex(newRgb));
        return newHsv;
      });
    }, []);

    const handlePressIn = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
        ...springConfigs.light,
      }).start();
    }, [scaleAnim]);

    const handlePressOut = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        ...springConfigs.light,
      }).start();
    }, [scaleAnim]);

    const previewColor = value && isValidHex(value) ? value : undefined;
    const draftPreviewColor = rgbToHex(hsvToRgb(draftHsv));

    const borderColor = error ? theme.colors.error : theme.colors.inputBorderRest;

    return (
      <View ref={ref} style={[styles.wrapper, style]}>
        {/* Label */}
        {label && <Text style={[styles.label, { color: theme.colors.foreground }]}>{label}</Text>}

        {/* Trigger */}
        <Pressable
          onPress={openPanel}
          onPressIn={disabled ? undefined : handlePressIn}
          onPressOut={disabled ? undefined : handlePressOut}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={label ?? placeholder}
        >
          <Animated.View
            style={[
              styles.trigger,
              {
                backgroundColor: theme.colors.inputBg,
                borderColor,
                transform: [{ scale: scaleAnim }],
              },
              disabled && styles.disabled,
            ]}
          >
            {/* Color swatch preview */}
            <View
              style={[
                styles.triggerSwatch,
                {
                  backgroundColor: previewColor ?? theme.colors.muted,
                  borderColor: theme.colors.border,
                },
              ]}
            />
            {/* Hex text */}
            <Text
              style={[
                styles.triggerText,
                { color: previewColor ? theme.colors.foreground : theme.colors.mutedForeground },
              ]}
              numberOfLines={1}
            >
              {previewColor ?? placeholder}
            </Text>
            {/* Chevron */}
            <View style={styles.chevron}>
              <View style={[styles.chevronLine, { borderColor: theme.colors.mutedForeground }]} />
            </View>
          </Animated.View>
        </Pressable>

        {/* Helper / Error text */}
        {error && errorMessage && (
          <Text style={[styles.helperText, { color: theme.colors.error }]}>{errorMessage}</Text>
        )}
        {helperText && !error && (
          <Text style={[styles.helperText, { color: theme.colors.mutedForeground }]}>{helperText}</Text>
        )}

        {/* Panel Modal */}
        <Modal visible={open} transparent animationType="fade" onRequestClose={closePanel} statusBarTranslucent>
          <Pressable style={styles.backdrop} onPress={closePanel}>
            <Pressable
              style={[
                styles.panel,
                {
                  backgroundColor: theme.colors.surface,
                  ...shadow,
                },
              ]}
              onPress={() => {}}
            >
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {/* Spectrum + Hue */}
                {showSpectrum && (
                  <View style={styles.section}>
                    {/* Saturation-Value area */}
                    <View style={spectrumStyles.container}>
                      {/* Base hue background */}
                      <View
                        style={[spectrumStyles.layer, { backgroundColor: hueToRgb(draftHsv.h) }]}
                        pointerEvents="none"
                      />
                      {/* White overlay simulation */}
                      <WhiteOverlay />
                      {/* Black overlay simulation */}
                      <BlackOverlay />
                      {/* Interactive area on top */}
                      <SpectrumArea
                        hue={draftHsv.h}
                        saturation={draftHsv.s}
                        brightness={draftHsv.v}
                        onChangeSV={handleChangeSV}
                        disabled={disabled}
                      />
                    </View>

                    {/* Hue slider */}
                    <View style={styles.hueRow}>
                      {/* Draft preview */}
                      <View
                        style={[
                          styles.draftSwatch,
                          {
                            backgroundColor: draftPreviewColor,
                            borderColor: theme.colors.border,
                          },
                        ]}
                      />
                      <View style={styles.hueSliderContainer}>
                        <HueSlider hue={draftHsv.h} onChangeHue={handleChangeHue} disabled={disabled} />
                      </View>
                    </View>
                  </View>
                )}

                {/* Preset swatches */}
                {colors.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.swatchGrid}>
                      {colors.map((color, idx) => {
                        const isSelected = draftPreviewColor.toUpperCase() === color.toUpperCase();
                        return (
                          <Pressable
                            key={idx}
                            onPress={() => handleSwatchPress(color)}
                            style={[
                              styles.swatch,
                              {
                                backgroundColor: color,
                                borderColor: isSelected ? theme.colors.point : 'transparent',
                                borderWidth: isSelected ? 2 : 0,
                              },
                            ]}
                            accessibilityLabel={color}
                          />
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* Hex input */}
                {showInput && (
                  <View style={[styles.section, styles.hexRow]}>
                    <View
                      style={[
                        styles.hexPreview,
                        {
                          backgroundColor: draftPreviewColor,
                          borderColor: theme.colors.border,
                        },
                      ]}
                    />
                    <TextInput
                      value={hexInput}
                      onChangeText={handleHexInputChange}
                      placeholder="#000000"
                      placeholderTextColor={theme.colors.mutedForeground}
                      autoCapitalize="characters"
                      maxLength={7}
                      style={[
                        styles.hexInput,
                        {
                          color: theme.colors.foreground,
                          backgroundColor: theme.colors.inputBg,
                          borderColor: theme.colors.inputBorderRest,
                        },
                      ]}
                    />
                  </View>
                )}

                {/* RGB channel inputs */}
                {showChannels && (
                  <View style={[styles.section, styles.channelRow]}>
                    {(['r', 'g', 'b'] as const).map((ch) => {
                      const val = ch === 'r' ? rInput : ch === 'g' ? gInput : bInput;
                      const setter =
                        ch === 'r'
                          ? (t: string) => handleChannelChange('r', t)
                          : ch === 'g'
                            ? (t: string) => handleChannelChange('g', t)
                            : (t: string) => handleChannelChange('b', t);
                      return (
                        <View key={ch} style={styles.channelItem}>
                          <Text style={[styles.channelLabel, { color: theme.colors.mutedForeground }]}>
                            {ch.toUpperCase()}
                          </Text>
                          <TextInput
                            value={val}
                            onChangeText={setter}
                            keyboardType="numeric"
                            maxLength={3}
                            placeholder="0"
                            placeholderTextColor={theme.colors.mutedForeground}
                            style={[
                              styles.channelInput,
                              {
                                color: theme.colors.foreground,
                                backgroundColor: theme.colors.inputBg,
                                borderColor: theme.colors.inputBorderRest,
                              },
                            ]}
                          />
                        </View>
                      );
                    })}
                  </View>
                )}

                {/* Confirm button */}
                <View style={styles.section}>
                  <Pressable
                    onPress={handleConfirm}
                    style={[styles.confirmButton, { backgroundColor: theme.colors.point }]}
                    accessibilityRole="button"
                    accessibilityLabel="Select color"
                  >
                    <Text style={[styles.confirmText, { color: theme.colors.pointForeground }]}>Select</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    );
  },
);
ColorPicker.displayName = 'ColorPicker';

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 10,
  },
  triggerSwatch: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 0.5,
    flexShrink: 0,
  },
  triggerText: {
    flex: 1,
    fontSize: 14,
  },
  chevron: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chevronLine: {
    width: 8,
    height: 8,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{ rotate: '45deg' }, { translateY: -2 }],
  },
  helperText: {
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    width: 300,
    borderRadius: 16,
    padding: 16,
    maxHeight: '85%' as unknown as number,
  },
  section: {
    marginBottom: 14,
  },
  hueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  draftSwatch: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 0.5,
    flexShrink: 0,
  },
  hueSliderContainer: {
    flex: 1,
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 6,
  },
  hexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  hexPreview: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 0.5,
    flexShrink: 0,
  },
  hexInput: {
    flex: 1,
    height: 36,
    paddingHorizontal: 10,
    fontSize: 13,
    borderWidth: 0.5,
    borderRadius: 8,
    outlineWidth: 0,
  },
  channelRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  channelItem: {
    flex: 1,
    gap: 4,
  },
  channelLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  channelInput: {
    height: 36,
    paddingHorizontal: 8,
    fontSize: 13,
    borderWidth: 0.5,
    borderRadius: 8,
    textAlign: 'center',
  },
  confirmButton: {
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
