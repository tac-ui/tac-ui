import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, Modal, type ViewProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens, nativeShadows } from '@tac-ui/tokens/native';
import { springConfigs, duration } from '../constants/motion';

const tokens = componentTokens.dialog;

// ─── Dialog (root overlay) ─────────────────────────────────────────────────

export type DialogBackdrop = 'opaque' | 'blur' | 'transparent';

/** Size variant of the Dialog card. */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

const dialogSizeWidth: Record<DialogSize, number> = {
  sm: 280,
  md: 384,
  lg: 480,
  xl: 560,
};

/** Props for the Dialog root overlay component. */
export interface DialogProps {
  /** Controls whether the dialog is visible. */
  open: boolean;
  /** Called when the backdrop is pressed. */
  onClose?: () => void;
  /** Backdrop style: 'opaque' = semi-transparent dark, 'transparent' = no background, 'blur' = same as opaque in basic RN. */
  backdrop?: DialogBackdrop;
  /** Controls the card width. @default 'sm' */
  size?: DialogSize;
  children?: React.ReactNode;
}

export const Dialog = forwardRef<View, DialogProps>(
  ({ open, onClose, backdrop = 'opaque', size = 'sm', children }, ref) => {
  const { theme } = useTacNativeTheme();
  const scale = useRef(new Animated.Value(0.95)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(open);

  const shadow = nativeShadows[theme.mode].lg;

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, ...springConfigs.heavy, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: duration.fast, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scale, { toValue: 0.95, duration: duration.fast, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: duration.fast, useNativeDriver: true }),
      ]).start(() => setShouldRender(false));
    }
  }, [open, scale, opacity]);

  if (!shouldRender) return null;

  const backdropColor = backdrop === 'transparent' ? 'transparent' : 'rgba(0,0,0,0.5)';

  return (
    <Modal transparent visible={shouldRender} animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay} pointerEvents="box-none">
        <Pressable style={[styles.backdrop, { backgroundColor: backdropColor }]} onPress={onClose} />
        <Animated.View
          ref={ref}
          style={[
            styles.card,
            {
              width: dialogSizeWidth[size],
              backgroundColor: theme.colors.background,
              borderRadius: tokens.borderRadius,
              ...shadow,
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
  },
);
Dialog.displayName = 'Dialog';

// ─── DialogHeader ──────────────────────────────────────────────────────────

/** Props for the DialogHeader sub-component. */
export interface DialogHeaderProps extends ViewProps {
  children?: React.ReactNode;
}

export const DialogHeader = forwardRef<View, DialogHeaderProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.header, style as ViewStyle]} {...props}>
      {children}
    </View>
  );
});
DialogHeader.displayName = 'DialogHeader';

// ─── DialogTitle ───────────────────────────────────────────────────────────

/** Props for the DialogTitle sub-component. */
export interface DialogTitleProps extends ViewProps {
  children?: React.ReactNode;
}

export const DialogTitle = forwardRef<View, DialogTitleProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={style as ViewStyle} {...props}>
      {typeof children === 'string' ? (
        <Text style={[styles.titleText, { color: theme.colors.foreground }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
DialogTitle.displayName = 'DialogTitle';

// ─── DialogDescription ─────────────────────────────────────────────────────

/** Props for the DialogDescription sub-component. */
export interface DialogDescriptionProps extends ViewProps {
  children?: React.ReactNode;
}

export const DialogDescription = forwardRef<View, DialogDescriptionProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={style as ViewStyle} {...props}>
      {typeof children === 'string' ? (
        <Text style={[styles.descText, { color: theme.colors.mutedForeground }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
DialogDescription.displayName = 'DialogDescription';

// ─── DialogFooter ──────────────────────────────────────────────────────────

/** Props for the DialogFooter sub-component. */
export interface DialogFooterProps extends ViewProps {
  children?: React.ReactNode;
}

export const DialogFooter = forwardRef<View, DialogFooterProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[styles.footer, { borderTopColor: theme.colors.border }, style as ViewStyle]} {...props}>
      {children}
    </View>
  );
});
DialogFooter.displayName = 'DialogFooter';

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    maxWidth: '90%',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: tokens.headerPaddingX,
    paddingVertical: tokens.headerPaddingY,
    alignItems: 'center',
  },
  titleText: {
    fontSize: tokens.titleSize,
    fontWeight: '600',
    textAlign: 'center',
  },
  descText: {
    fontSize: tokens.descSize,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: tokens.footerPaddingX,
    paddingVertical: tokens.footerPaddingY,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: tokens.footerGap,
    borderTopWidth: 1,
  },
});
