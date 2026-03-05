import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition = 'top' | 'bottom';

export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  onAction?: () => void;
}

interface ToastEntry extends Required<Omit<ToastOptions, 'action' | 'icon' | 'onAction'>> {
  id: string;
  message: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  onAction?: () => void;
}

interface ToastContextValue {
  toast: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  entries: ToastEntry[];
  position: ToastPosition;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

let idCounter = 0;
const nextId = () => `toast-${++idCounter}`;

// ---------------------------------------------------------------------------
// ToastProvider
// ---------------------------------------------------------------------------

export function ToastProvider({ children, position = 'bottom', maxToasts = 5 }: ToastProviderProps) {
  const [entries, setEntries] = useState<ToastEntry[]>([]);
  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  const dismiss = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setEntries([]);
  }, []);

  const toast = useCallback(
    (message: string, options: ToastOptions = {}): string => {
      const id = nextId();
      const entry: ToastEntry = {
        id,
        message,
        variant: options.variant ?? 'default',
        duration: options.duration ?? 5000,
        action: options.action,
        icon: options.icon,
        onAction: options.onAction,
      };

      setEntries((prev) => {
        const next = [...prev, entry];
        if (next.length > maxToasts) {
          return next.slice(next.length - maxToasts);
        }
        return next;
      });

      return id;
    },
    [maxToasts],
  );

  const value = useMemo(
    () => ({ toast, dismiss, dismissAll, entries, position }),
    [toast, dismiss, dismissAll, entries, position],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return { toast: ctx.toast, dismiss: ctx.dismiss, dismissAll: ctx.dismissAll };
}

// ---------------------------------------------------------------------------
// ToastItem
// ---------------------------------------------------------------------------

interface ToastItemProps {
  entry: ToastEntry;
  onDismiss: (id: string) => void;
}

const ToastItem = React.memo(
  forwardRef<View, ToastItemProps>(({ entry, onDismiss }, ref) => {
    const { theme } = useTacNativeTheme();
    const translateY = useRef(new Animated.Value(20)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Enter animation
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          ...springConfigs.magnetic,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration.normal,
          useNativeDriver: true,
        }),
      ]).start();

      let timer: ReturnType<typeof setTimeout>;
      if (entry.duration > 0) {
        timer = setTimeout(() => {
          handleDismiss();
        }, entry.duration);
      }

      return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
      // Exit animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration.fast,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 10,
          duration: duration.fast,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss(entry.id);
      });
    };

    const getColors = () => {
      switch (entry.variant) {
        case 'success':
          return { dot: theme.colors.success, text: theme.colors.successForeground, bg: theme.colors.card };
        case 'error':
          return { dot: theme.colors.error, text: theme.colors.errorForeground, bg: theme.colors.card };
        case 'warning':
          return { dot: theme.colors.warning, text: theme.colors.warningForeground, bg: theme.colors.card };
        case 'info':
          return { dot: theme.colors.info, text: theme.colors.infoForeground, bg: theme.colors.card };
        default:
          return { text: theme.colors.foreground, bg: theme.colors.card };
      }
    };

    const colors = getColors();

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.toastItem,
          { backgroundColor: colors.bg, transform: [{ translateY }], opacity },
          nativeShadows[theme.mode].lg,
        ]}
      >
        {entry.variant !== 'default' && <View style={[styles.dot, { backgroundColor: colors.dot }]} />}
        {entry.icon && entry.variant === 'default' && <View style={styles.iconWrapper}>{entry.icon}</View>}
        <Text style={[styles.message, { color: colors.text }]}>{entry.message}</Text>
        {entry.action && (
          <Pressable
            onPress={() => {
              entry.onAction?.();
              handleDismiss();
            }}
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: theme.colors.secondary },
              pressed && { opacity: 0.8 },
            ]}
          >
            {entry.action}
          </Pressable>
        )}
        <Pressable
          onPress={handleDismiss}
          style={({ pressed }) => [styles.closeButton, pressed && { backgroundColor: theme.colors.interactiveHover }]}
        >
          {/* Simple X icon */}
          <Text style={{ color: theme.colors.mutedForeground, fontSize: 16, lineHeight: 18 }}>×</Text>
        </Pressable>
      </Animated.View>
    );
  }),
);

ToastItem.displayName = 'ToastItem';

// ---------------------------------------------------------------------------
// ToastContainer
// ---------------------------------------------------------------------------

export const ToastContainer = forwardRef<View, object>((_props, ref) => {
  const ctx = useContext(ToastContext);
  if (!ctx) return null;

  const { entries, dismiss, position } = ctx;

  if (entries.length === 0) return null;

  return (
    <View
      ref={ref}
      pointerEvents="box-none"
      style={[styles.container, position === 'top' ? { top: 60 } : { bottom: 60 }]}
    >
      {entries.map((entry) => (
        <ToastItem key={entry.id} entry={entry} onDismiss={dismiss} />
      ))}
    </View>
  );
});

ToastContainer.displayName = 'ToastContainer';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
    gap: 8,
    zIndex: 9999,
  },
  toastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 14,
    borderRadius: componentTokens.card.borderRadius,
    minWidth: 300,
    maxWidth: '100%',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  iconWrapper: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
