import React, { forwardRef, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  type ViewStyle,
} from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

/** Size variant for the Select component. */
export type SelectSize = 'sm' | 'md' | 'lg';

/** A single option in the Select dropdown. */
export interface SelectOption {
  /** Unique value identifying the option. */
  value: string;
  /** Human-readable label shown in the dropdown and trigger. */
  label: string;
  /** When true, the option is not selectable. */
  disabled?: boolean;
}

/** Props for the Select component. */
export interface SelectProps {
  /** Array of selectable options. */
  options: SelectOption[];
  /** Currently selected value. */
  value?: string;
  /** Callback invoked when the user selects an option. */
  onChange?: (value: string) => void;
  /** Optional label shown above the trigger. */
  label?: string;
  /** Helper text shown below the trigger. */
  helperText?: string;
  /** When true, renders the trigger with error styling. */
  error?: boolean;
  /** Error message shown below the trigger when error is true. */
  errorMessage?: string;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Controls the height and font size of the trigger. */
  selectSize?: SelectSize;
  /** When true, the trigger is not pressable. */
  disabled?: boolean;
  /** Optional style applied to the outer container. */
  style?: ViewStyle;
}

const tokens = componentTokens.input.md;

const sizeConfig: Record<SelectSize, { height: number; fontSize: number }> = {
  sm: { height: 36, fontSize: 13 },
  md: { height: 44, fontSize: 14 },
  lg: { height: 52, fontSize: 16 },
};

export const Select = forwardRef<View, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      helperText,
      error = false,
      errorMessage,
      placeholder = 'Select an option',
      selectSize = 'md',
      disabled = false,
      style,
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const [open, setOpen] = useState(false);

    const chevronRotate = useRef(new Animated.Value(0)).current;
    const dropdownScale = useRef(new Animated.Value(0.95)).current;
    const dropdownOpacity = useRef(new Animated.Value(0)).current;

    const size = sizeConfig[selectSize];
    const selectedOption = options.find((o) => o.value === value);
    const shadow = nativeShadows[theme.mode].m;

    const borderColor = error ? theme.colors.error : open ? theme.colors.point : theme.colors.border;

    function openDropdown() {
      if (disabled) return;
      setOpen(true);
      Animated.parallel([
        Animated.timing(chevronRotate, {
          toValue: 1,
          duration: duration.normal,
          useNativeDriver: true,
        }),
        Animated.spring(dropdownScale, {
          toValue: 1,
          ...springConfigs.entrance,
          useNativeDriver: true,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 1,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start();
    }

    function closeDropdown() {
      Animated.parallel([
        Animated.timing(chevronRotate, {
          toValue: 0,
          duration: duration.normal,
          useNativeDriver: true,
        }),
        Animated.timing(dropdownScale, {
          toValue: 0.95,
          duration: duration.fast,
          useNativeDriver: true,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 0,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start(() => setOpen(false));
    }

    function handleSelect(option: SelectOption) {
      if (option.disabled) return;
      onChange?.(option.value);
      closeDropdown();
    }

    const chevronRotateDeg = chevronRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <View ref={ref} style={[styles.container, style]}>
        {label && <Text style={[styles.label, { color: theme.colors.foreground }]}>{label}</Text>}

        <Pressable
          onPress={openDropdown}
          style={[
            styles.trigger,
            {
              height: size.height,
              backgroundColor: theme.colors.inputBg,
              borderColor,
            },
            disabled && styles.disabled,
          ]}
        >
          {(open || error) && (
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
                  borderRadius: 12,
                  opacity: 0.2,
                },
              ]}
            />
          )}
          <Text
            style={[
              styles.triggerText,
              {
                fontSize: size.fontSize,
                color: selectedOption ? theme.colors.foreground : theme.colors.mutedForeground,
              },
            ]}
            numberOfLines={1}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>

          <Animated.View style={{ transform: [{ rotate: chevronRotateDeg }] }}>
            <ChevronIcon color={theme.colors.mutedForeground} />
          </Animated.View>
        </Pressable>

        {error && errorMessage && (
          <Text style={[styles.helperText, { color: theme.colors.error }]}>{errorMessage}</Text>
        )}
        {helperText && !error && (
          <Text style={[styles.helperText, { color: theme.colors.mutedForeground }]}>{helperText}</Text>
        )}

        <Modal visible={open} transparent animationType="none" onRequestClose={closeDropdown}>
          <TouchableWithoutFeedback onPress={closeDropdown}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      ...shadow,
                      opacity: dropdownOpacity,
                      transform: [{ scale: dropdownScale }],
                    },
                  ]}
                >
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    bounces={false}
                    renderItem={({ item }) => {
                      const isSelected = item.value === value;
                      return (
                        <Pressable
                          onPress={() => handleSelect(item)}
                          style={[
                            styles.option,
                            isSelected && {
                              backgroundColor: theme.colors.secondary,
                            },
                            item.disabled && styles.optionDisabled,
                          ]}
                        >
                          <Text
                            style={[
                              styles.optionText,
                              {
                                fontSize: size.fontSize,
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
                          {isSelected && <CheckIcon color={theme.colors.point} />}
                        </Pressable>
                      );
                    }}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  },
);
Select.displayName = 'Select';

/** Minimal inline chevron icon — avoids icon package dependency. */
function ChevronIcon({ color }: { color: string }) {
  return <View style={[styles.chevron, { borderColor: color }]} />;
}

/** Minimal inline check icon. */
function CheckIcon({ color }: { color: string }) {
  return <View style={[styles.checkIcon, { borderColor: color }]} />;
}

const styles = StyleSheet.create({
  container: { gap: 8, width: '100%' },
  label: { fontSize: 14, fontWeight: '500' },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.paddingX,
    borderWidth: 1,
    borderRadius: 10,
  },
  triggerText: { flex: 1, marginRight: 8 },
  helperText: { fontSize: 12 },
  disabled: { opacity: 0.5 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 12,
    maxHeight: 280,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionText: { flex: 1 },
  optionDisabled: { opacity: 0.4 },
  chevron: {
    width: 8,
    height: 8,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{ rotate: '45deg' }],
    marginBottom: 3,
  },
  checkIcon: {
    width: 8,
    height: 14,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -4,
  },
});
