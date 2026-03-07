import React, { forwardRef, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Animated,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  type ViewStyle,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs } from '../constants/motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single option in the Combobox dropdown list. */
export interface ComboboxOption {
  /** The underlying value submitted when this option is selected. */
  value: string;
  /** The human-readable label displayed in the list and input. */
  label: string;
  /** When true the option is rendered but cannot be selected. */
  disabled?: boolean;
}

/** Props for the Combobox component. */
export interface ComboboxProps {
  /** Array of selectable options. */
  options: ComboboxOption[];
  /** Currently selected value (controlled). */
  value?: string;
  /** Called with the new value when the user selects an option. */
  onChange?: (value: string) => void;
  /** Placeholder shown when no value is selected and the input is empty. */
  placeholder?: string;
  /** Text shown when the filtered list is empty. @default 'No results found' */
  emptyText?: string;
  /** Label displayed above the input. */
  label?: string;
  /** When true, applies error styling to the Combobox border. */
  error?: boolean;
  /** Error message displayed below the input when `error` is true. */
  errorMessage?: string;
  /** Style applied to the outer container. */
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// ChevronDown — inline chevron icon (avoids extra dependency)
// ---------------------------------------------------------------------------

function ChevronDown({ color, size }: { color: string; size: number }) {
  const thickness = 1.5;
  const halfW = size / 2;
  return (
    <View style={{ width: size, height: size / 2, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: halfW,
          height: halfW,
          borderRightWidth: thickness,
          borderBottomWidth: thickness,
          borderColor: color,
          transform: [{ rotate: '45deg' }, { translateY: -halfW / 4 }],
        }}
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Combobox
// ---------------------------------------------------------------------------

export const Combobox = forwardRef<View, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Search…',
      emptyText = 'No results found',
      label,
      error = false,
      errorMessage,
      style,
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const shadow = nativeShadows[theme.mode].md;

    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // Animated values for dropdown entrance
    const dropdownOpacity = useRef(new Animated.Value(0)).current;
    const dropdownScale = useRef(new Animated.Value(0.95)).current;
    // Animated value for chevron rotation
    const chevronRotate = useRef(new Animated.Value(0)).current;

    const selectedOption = options.find((o) => o.value === value);

    // Filter options based on query
    const filteredOptions =
      query.trim() === '' ? options : options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

    // Layout for the input to properly position the dropdown modal
    const [dropdownLayout, setDropdownLayout] = useState<{ top: number; left: number; width: number }>({
      top: 0,
      left: 0,
      width: 0,
    });
    const containerRef = useRef<View>(null);

    const openDropdown = useCallback(() => {
      containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setDropdownLayout({ top: pageY + height + 4, left: pageX, width });
        setOpen(true);
        Animated.parallel([
          Animated.spring(dropdownOpacity, {
            toValue: 1,
            ...springConfigs.magnetic,
            useNativeDriver: true,
          }),
          Animated.spring(dropdownScale, {
            toValue: 1,
            ...springConfigs.magnetic,
            useNativeDriver: true,
          }),
          Animated.spring(chevronRotate, {
            toValue: 1,
            ...springConfigs.magnetic,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, [dropdownOpacity, dropdownScale, chevronRotate]);

    const closeDropdown = useCallback(() => {
      Animated.parallel([
        Animated.spring(dropdownOpacity, {
          toValue: 0,
          ...springConfigs.magnetic,
          useNativeDriver: true,
        }),
        Animated.spring(dropdownScale, {
          toValue: 0.95,
          ...springConfigs.magnetic,
          useNativeDriver: true,
        }),
        Animated.spring(chevronRotate, {
          toValue: 0,
          ...springConfigs.magnetic,
          useNativeDriver: true,
        }),
      ]).start(() => setOpen(false));
    }, [dropdownOpacity, dropdownScale, chevronRotate]);

    const handleFocus = useCallback(() => {
      setFocused(true);
      setQuery('');
      openDropdown();
    }, [openDropdown]);

    const handleBlur = useCallback(() => {
      setFocused(false);
      // Delay close to allow option press to register
      setTimeout(() => {
        closeDropdown();
        setQuery('');
      }, 150);
    }, [closeDropdown]);

    const handleSelect = useCallback(
      (option: ComboboxOption) => {
        if (option.disabled) return;
        onChange?.(option.value);
        setQuery('');
        inputRef.current?.blur();
        closeDropdown();
      },
      [onChange, closeDropdown],
    );

    const handleChevronPress = useCallback(() => {
      if (open) {
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    }, [open]);

    const chevronRotation = chevronRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const borderColor = error ? theme.colors.error : focused ? theme.colors.ring : theme.colors.inputBorderRest;

    const inputDisplayValue = focused || open ? query : (selectedOption?.label ?? '');

    return (
      <View ref={ref} style={[styles.container, { overflow: 'visible' }, style]}>
        {label && (
          <Text style={{ fontSize: 14, fontWeight: '500', color: theme.colors.foreground, marginBottom: 8 }}>
            {label}
          </Text>
        )}
        {/* Input row */}
        <View
          ref={containerRef}
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme.colors.inputBg,
              borderColor,
              borderRadius: 10,
            },
            focused && !error ? { borderColor: theme.colors.ring } : undefined,
          ]}
        >
          {focused && (
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                {
                  top: -3,
                  left: -3,
                  right: -3,
                  bottom: -3,
                  borderWidth: 3,
                  borderColor: error ? theme.colors.error : theme.colors.ring,
                  borderRadius: 12, // slightly larger than 10px inner radius
                  opacity: 0.2, // Simulate web's focus-visible ring glow
                },
              ]}
            />
          )}
          <TextInput
            ref={inputRef}
            value={inputDisplayValue}
            onChangeText={setQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.mutedForeground}
            style={[
              styles.input,
              {
                color: theme.colors.foreground,
                fontSize: 15,
                outlineWidth: 0,
              },
            ]}
          />
          <Pressable onPress={handleChevronPress} style={styles.chevronBtn} hitSlop={8}>
            <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
              <ChevronDown color={theme.colors.mutedForeground} size={18} />
            </Animated.View>
          </Pressable>
        </View>

        {error && errorMessage && (
          <Text style={{ fontSize: 12, color: theme.colors.error, marginTop: 8 }}>{errorMessage}</Text>
        )}

        {/* Dropdown */}
        <Modal transparent visible={open} animationType="none" onRequestClose={closeDropdown}>
          <TouchableWithoutFeedback onPress={closeDropdown}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.dropdown,
              {
                top: dropdownLayout.top,
                left: dropdownLayout.left,
                width: dropdownLayout.width,
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: 12,
                opacity: dropdownOpacity,
                transform: [{ scale: dropdownScale }],
                ...shadow,
              },
            ]}
          >
            {filteredOptions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyText, { color: theme.colors.mutedForeground }]}>{emptyText}</Text>
              </View>
            ) : (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                keyboardShouldPersistTaps="handled"
                style={{ maxHeight: 200 }}
                renderItem={({ item }) => {
                  const isSelected = item.value === value;
                  return (
                    <Pressable
                      onPress={() => handleSelect(item)}
                      disabled={item.disabled}
                      style={[styles.option, item.disabled ? styles.optionDisabled : undefined]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color: isSelected
                              ? theme.colors.point
                              : item.disabled
                                ? theme.colors.mutedForeground
                                : theme.colors.foreground,
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            )}
          </Animated.View>
        </Modal>
      </View>
    );
  },
);
Combobox.displayName = 'Combobox';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
  },
  chevronBtn: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 20,
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 14,
  },
  optionDisabled: {
    opacity: 0.4,
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});
