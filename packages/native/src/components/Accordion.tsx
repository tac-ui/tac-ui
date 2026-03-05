import React, { forwardRef, createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, type ViewProps, type LayoutChangeEvent } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { springConfigs, duration } from '../constants/motion';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
  glass: boolean;
  outline: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

// ---------------------------------------------------------------------------
// Accordion (root)
// ---------------------------------------------------------------------------

/** Props for the Accordion root component. */
export interface AccordionProps extends ViewProps {
  /** Controls whether one or multiple items can be open simultaneously. @default 'single' */
  type?: 'single' | 'multiple';
  /** Initially open item values. */
  defaultValue?: string | string[];
  /** Applies a semi-transparent glass background. @default false */
  glass?: boolean;
  /** Adds a border outline around each item. @default true */
  outline?: boolean;
  children?: React.ReactNode;
}

export const Accordion = forwardRef<View, AccordionProps>(
  ({ type = 'single', defaultValue = [], glass = false, outline = true, children, style, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<string[]>(
      Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [],
    );

    const toggle = useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const isOpen = prev.includes(value);
          if (type === 'single') {
            return isOpen ? [] : [value];
          }
          return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
        });
      },
      [type],
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle, glass, outline }}>
        <View ref={ref} style={[{ width: '100%' }, style]} {...props}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

/** Props for the AccordionItem component. */
export interface AccordionItemProps extends ViewProps {
  /** Unique value identifying this item. */
  value: string;
  children?: React.ReactNode;
}

export const AccordionItem = forwardRef<View, AccordionItemProps>(({ value, children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  const ctx = useContext(AccordionContext);
  const isOpen = ctx?.openItems.includes(value) ?? false;
  const outline = ctx?.outline ?? false;

  const itemStyle = outline
    ? {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden' as const,
      }
    : {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.border,
      };

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <View ref={ref} style={[itemStyle, style]} {...props}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
});
AccordionItem.displayName = 'AccordionItem';

// ---------------------------------------------------------------------------
// AccordionTrigger
// ---------------------------------------------------------------------------

/** Props for the AccordionTrigger component. */
export interface AccordionTriggerProps extends ViewProps {
  /** Optional leading icon element. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const AccordionTrigger = forwardRef<View, AccordionTriggerProps>(({ icon, children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  const accordionCtx = useContext(AccordionContext);
  const itemCtx = useContext(AccordionItemContext);

  const isOpen = itemCtx?.isOpen ?? false;
  const glass = accordionCtx?.glass ?? false;

  // Chevron rotation animation
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  // Press scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Keep rotation in sync when isOpen changes
  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: duration.normal,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      ...springConfigs.light,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      ...springConfigs.light,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    if (itemCtx?.value !== undefined) {
      accordionCtx?.toggle(itemCtx.value);
    }
  }, [accordionCtx, itemCtx]);

  const triggerBackground = glass ? 'rgba(255,255,255,0.06)' : 'transparent';

  // Chevron icon (simple SVG-less implementation using Text/rotation)
  const ChevronIcon = () => (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <ChevronDown color={theme.colors.mutedForeground} size={18} />
    </Animated.View>
  );

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{ backgroundColor: triggerBackground }, style]}
      {...props}
    >
      <Animated.View ref={ref} style={[styles.trigger, { transform: [{ scale: scaleAnim }] }]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <View style={styles.triggerContent}>
          {typeof children === 'string' ? (
            <Text style={[styles.triggerText, { color: theme.colors.foreground }]}>{children}</Text>
          ) : (
            children
          )}
        </View>
        <ChevronIcon />
      </Animated.View>
    </Pressable>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

// ---------------------------------------------------------------------------
// ChevronDown — lightweight inline chevron (avoids lucide-react-native dep)
// ---------------------------------------------------------------------------

function ChevronDown({ color, size }: { color: string; size: number }) {
  // Render a simple "V" shape using two thin View borders
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
// AccordionContent
// ---------------------------------------------------------------------------

/** Props for the AccordionContent component. */
export interface AccordionContentProps extends ViewProps {
  children?: React.ReactNode;
}

export const AccordionContent = forwardRef<View, AccordionContentProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  const itemCtx = useContext(AccordionItemContext);
  const accordionCtx = useContext(AccordionContext);
  const isOpen = itemCtx?.isOpen ?? false;
  const glass = accordionCtx?.glass ?? false;

  const heightAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const measuredHeight = useRef<number>(0);
  const isMeasured = useRef(false);

  // Animate on open/close after initial measurement
  React.useEffect(() => {
    if (!isMeasured.current) return;
    Animated.timing(heightAnim, {
      toValue: isOpen ? 1 : 0,
      duration: isOpen ? duration.normal : duration.fast,
      useNativeDriver: false,
    }).start();
  }, [isOpen, heightAnim]);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      if (h > 0 && !isMeasured.current) {
        measuredHeight.current = h;
        isMeasured.current = true;
        // Set the initial animated value without animation
        heightAnim.setValue(isOpen ? 1 : 0);
      }
    },
    [isOpen, heightAnim],
  );

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, measuredHeight.current || 0],
  });

  const contentBackground = glass ? 'rgba(255,255,255,0.03)' : 'transparent';

  const renderedChildren =
    typeof children === 'string' ? (
      <Text style={{ color: theme.colors.foreground, fontSize: 14, lineHeight: 20 }}>{children}</Text>
    ) : (
      children
    );

  return (
    <Animated.View
      style={[
        { height: isMeasured.current ? animatedHeight : undefined, overflow: 'hidden' },
        { backgroundColor: contentBackground },
      ]}
    >
      {/* Invisible measure layer — always rendered off-screen until measured */}
      {!isMeasured.current && (
        <View onLayout={handleLayout} style={{ position: 'absolute', opacity: 0, top: 0, left: 0, right: 0 }}>
          <View ref={ref} style={[styles.content, { borderTopColor: theme.colors.border }, style]} {...props}>
            {renderedChildren}
          </View>
        </View>
      )}
      {/* Actual visible content */}
      <View
        ref={isMeasured.current ? ref : undefined}
        style={[styles.content, { borderTopColor: theme.colors.border }, style]}
        {...props}
      >
        {renderedChildren}
      </View>
    </Animated.View>
  );
});
AccordionContent.displayName = 'AccordionContent';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  triggerContent: {
    flex: 1,
  },
  triggerText: {
    fontSize: 15,
    fontWeight: '500',
  },
  iconWrapper: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 0,
    paddingBottom: 16,
  },
});
