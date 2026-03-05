import React, { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';
import { useTacNativeTheme } from '../provider/TacNativeProvider';

// ─── Context ───────────────────────────────────────────────────────────────

interface DropdownContextValue {
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext(): DropdownContextValue {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('DropdownItem must be used within a Dropdown');
  }
  return ctx;
}

// ─── Dropdown ──────────────────────────────────────────────────────────────

/** Props for the Dropdown root component. */
export interface DropdownProps {
  /** The trigger element that opens/closes the dropdown. */
  trigger: React.ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void;
  /** Horizontal alignment of the menu relative to the trigger. @default 'start' */
  align?: 'start' | 'center' | 'end';
  children?: React.ReactNode;
}

export const Dropdown = forwardRef<View, DropdownProps>(
  ({ trigger, open: controlledOpen, onOpenChange, align = 'start', children }, ref) => {
    const { theme } = useTacNativeTheme();
    const [internalOpen, setInternalOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(
      null,
    );
    const triggerRef = useRef<View>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const scale = useRef(new Animated.Value(0.97)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const shadow = nativeShadows[theme.mode].m;

    const measureTrigger = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
      });
    }, []);

    const openMenu = useCallback(() => {
      measureTrigger();
      if (isControlled) {
        onOpenChange?.(true);
      } else {
        setInternalOpen(true);
      }
    }, [isControlled, onOpenChange, measureTrigger]);

    const close = useCallback(() => {
      if (isControlled) {
        onOpenChange?.(false);
      } else {
        setInternalOpen(false);
      }
    }, [isControlled, onOpenChange]);

    const toggle = useCallback(() => {
      if (isOpen) {
        close();
      } else {
        openMenu();
      }
    }, [isOpen, openMenu, close]);

    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            ...springConfigs.magnetic,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: duration.fast,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.97,
            duration: duration.instant,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: duration.instant,
            useNativeDriver: true,
          }),
        ]).start(() => setShouldRender(false));
      }
    }, [isOpen, scale, opacity]);

    const menuPositionStyle: ViewStyle = triggerLayout
      ? {
          position: 'absolute',
          top: triggerLayout.y + triggerLayout.height + 4,
          ...(align === 'end'
            ? { right: Dimensions.get('window').width - triggerLayout.x - triggerLayout.width }
            : align === 'center'
              ? { left: triggerLayout.x + triggerLayout.width / 2 - 80 }
              : { left: triggerLayout.x }),
        }
      : { position: 'absolute', top: 60, left: 16 };

    return (
      <DropdownContext.Provider value={{ close }}>
        <View ref={ref} style={styles.container}>
          <View ref={triggerRef} collapsable={false}>
            <Pressable onPress={toggle}>{trigger}</Pressable>
          </View>

          {shouldRender && (
            <Modal transparent animationType="none" visible onRequestClose={close}>
              <Pressable style={styles.backdrop} onPress={close} />
              <Animated.View
                style={[
                  styles.menu,
                  menuPositionStyle,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    transform: [{ scale }],
                    opacity,
                    ...shadow,
                  },
                ]}
              >
                {children}
              </Animated.View>
            </Modal>
          )}
        </View>
      </DropdownContext.Provider>
    );
  },
);
Dropdown.displayName = 'Dropdown';

// ─── DropdownItem ──────────────────────────────────────────────────────────

/** Props for the DropdownItem component. */
export interface DropdownItemProps {
  /** Called when the item is pressed. */
  onPress?: () => void;
  /** When true, renders the item text in the error/destructive color. */
  destructive?: boolean;
  /** When true, the item is non-interactive and visually dimmed. */
  disabled?: boolean;
  children?: React.ReactNode;
}

export const DropdownItem = forwardRef<View, DropdownItemProps>(
  ({ onPress, destructive = false, disabled = false, children }, ref) => {
    const { theme } = useTacNativeTheme();
    const { close } = useDropdownContext();
    const [pressed, setPressed] = useState(false);

    const handlePress = useCallback(() => {
      onPress?.();
      close();
    }, [onPress, close]);

    const textColor = destructive ? theme.colors.error : theme.colors.foreground;
    const pressedBg = theme.colors.muted;

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={disabled ? undefined : handlePress}
        style={[styles.item, pressed && !disabled && { backgroundColor: pressedBg }, disabled && styles.itemDisabled]}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.itemText, { color: textColor }]}>{children}</Text>
        ) : (
          <View style={styles.itemContent}>{children}</View>
        )}
      </Pressable>
    );
  },
);
DropdownItem.displayName = 'DropdownItem';

// ─── DropdownTitle ─────────────────────────────────────────────────────────

/** Props for the DropdownTitle component. */
export interface DropdownTitleProps {
  children?: React.ReactNode;
}

export const DropdownTitle = forwardRef<View, DropdownTitleProps>(({ children }, ref) => {
  const { theme } = useTacNativeTheme();

  return (
    <View ref={ref} style={styles.title}>
      {typeof children === 'string' ? (
        <Text style={[styles.titleText, { color: theme.colors.mutedForeground }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
DropdownTitle.displayName = 'DropdownTitle';

// ─── DropdownDivider ───────────────────────────────────────────────────────

/** Props for the DropdownDivider component. */
export type DropdownDividerProps = Record<string, never>;

export const DropdownDivider = forwardRef<View, DropdownDividerProps>((_props, ref) => {
  const { theme } = useTacNativeTheme();

  return <View ref={ref} style={[styles.divider, { backgroundColor: theme.colors.border }]} />;
});
DropdownDivider.displayName = 'DropdownDivider';

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menu: {
    minWidth: 160,
    maxWidth: 280,
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    overflow: 'hidden',
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '400',
  },
  itemDisabled: {
    opacity: 0.4,
  },
  title: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});
