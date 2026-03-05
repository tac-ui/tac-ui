import React, { forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet, type ViewProps, type ViewStyle, type PressableProps } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';

export type BreadcrumbProps = ViewProps;

export const Breadcrumb = forwardRef<View, BreadcrumbProps>(({ style, ...props }, ref) => (
  <View ref={ref} style={[style]} {...props} />
));
Breadcrumb.displayName = 'Breadcrumb';

export type BreadcrumbListProps = ViewProps;

export const BreadcrumbList = forwardRef<View, BreadcrumbListProps>(({ style, ...props }, ref) => (
  <View ref={ref} style={[styles.list, style]} {...props} />
));
BreadcrumbList.displayName = 'BreadcrumbList';

export interface BreadcrumbItemProps extends ViewProps {
  current?: boolean;
}

export const BreadcrumbItem = forwardRef<View, BreadcrumbItemProps>(({ current, style, children, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[styles.item, style]} {...props}>
      <BreadcrumbContext.Provider value={{ current }}>
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              current && { color: theme.colors.foreground, fontWeight: '500' },
              !current && { color: theme.colors.mutedForeground },
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </BreadcrumbContext.Provider>
    </View>
  );
});
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbContext = React.createContext<{ current?: boolean }>({});

export interface BreadcrumbLinkProps extends PressableProps {
  children?: React.ReactNode;
}

export const BreadcrumbLink = forwardRef<View, BreadcrumbLinkProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  const { current } = React.useContext(BreadcrumbContext);

  return (
    <Pressable ref={ref} style={style as ViewStyle} {...props}>
      {({ pressed }) =>
        typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              current && { color: theme.colors.foreground, fontWeight: '500' },
              !current && {
                color: pressed ? theme.colors.foreground : theme.colors.mutedForeground,
              },
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )
      }
    </Pressable>
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

export interface BreadcrumbSeparatorProps extends ViewProps {
  children?: React.ReactNode;
}

export const BreadcrumbSeparator = forwardRef<View, BreadcrumbSeparatorProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[styles.separator, style]} {...props}>
      {children || <ChevronRight color={theme.colors.mutedForeground} size={14} />}
    </View>
  );
});
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export type BreadcrumbEllipsisProps = ViewProps;

export const BreadcrumbEllipsis = forwardRef<View, BreadcrumbEllipsisProps>(({ style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[styles.ellipsis, style]} {...props}>
      <Text style={{ color: theme.colors.mutedForeground, letterSpacing: 2 }}>...</Text>
    </View>
  );
});
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

function ChevronRight({ color, size }: { color: string; size: number }) {
  const thickness = 1.5;
  const halfW = size / 2;
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: halfW,
          height: halfW,
          borderRightWidth: thickness,
          borderTopWidth: thickness,
          borderColor: color,
          transform: [{ rotate: '45deg' }, { translateX: -halfW / 4 }, { translateY: halfW / 4 }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    fontSize: 14,
  },
  separator: {
    opacity: 0.5,
  },
  ellipsis: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
