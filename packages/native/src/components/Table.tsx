import React, { forwardRef } from 'react';
import { View, Text, ScrollView, StyleSheet, type ViewProps } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';

// --- Table (root container with horizontal scroll) ---

export interface TableProps extends ViewProps {
  children?: React.ReactNode;
}

export const Table = forwardRef<ScrollView, TableProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          width: '100%',
        },
        style,
      ]}
      {...(props as object)}
    >
      <View style={styles.tableInner}>{children}</View>
    </ScrollView>
  );
});
Table.displayName = 'Table';

// --- TableHeader ---

export interface TableHeaderProps extends ViewProps {
  children?: React.ReactNode;
}

export const TableHeader = forwardRef<View, TableHeaderProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[{ backgroundColor: theme.colors.muted }, style]} {...props}>
      {children}
    </View>
  );
});
TableHeader.displayName = 'TableHeader';

// --- TableBody ---

export interface TableBodyProps extends ViewProps {
  children?: React.ReactNode;
}

export const TableBody = forwardRef<View, TableBodyProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={style} {...props}>
    {children}
  </View>
));
TableBody.displayName = 'TableBody';

// --- TableFooter ---

export interface TableFooterProps extends ViewProps {
  children?: React.ReactNode;
}

export const TableFooter = forwardRef<View, TableFooterProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View
      ref={ref}
      style={[
        {
          backgroundColor: theme.colors.muted,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});
TableFooter.displayName = 'TableFooter';

// --- TableRow ---

export interface TableRowProps extends ViewProps {
  selected?: boolean;
  children?: React.ReactNode;
}

export const TableRow = forwardRef<View, TableRowProps>(({ selected, children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View
      ref={ref}
      style={[
        {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: selected ? theme.colors.muted : undefined,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});
TableRow.displayName = 'TableRow';

// --- TableHead ---

export interface TableHeadProps extends ViewProps {
  width?: number;
  children?: React.ReactNode;
}

export const TableHead = forwardRef<View, TableHeadProps>(({ width, children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[width !== undefined ? { width } : { flex: 1 }, styles.headCell, style]} {...props}>
      {typeof children === 'string' ? (
        <Text
          style={{
            fontWeight: '500',
            fontSize: 13,
            color: theme.colors.mutedForeground,
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
});
TableHead.displayName = 'TableHead';

// --- TableCell ---

export interface TableCellProps extends ViewProps {
  width?: number;
  children?: React.ReactNode;
}

export const TableCell = forwardRef<View, TableCellProps>(({ width, children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[width !== undefined ? { width } : { flex: 1 }, styles.dataCell, style]} {...props}>
      {typeof children === 'string' ? (
        <Text style={{ fontSize: 14, color: theme.colors.foreground }}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
TableCell.displayName = 'TableCell';

// --- TableCaption ---

export interface TableCaptionProps extends ViewProps {
  children?: React.ReactNode;
}

export const TableCaption = forwardRef<View, TableCaptionProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTacNativeTheme();
  return (
    <View ref={ref} style={[styles.caption, style]} {...props}>
      {typeof children === 'string' ? (
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.mutedForeground,
            textAlign: 'center',
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
});
TableCaption.displayName = 'TableCaption';

// --- Static styles ---

const styles = StyleSheet.create({
  tableInner: {
    flexDirection: 'column',
  },
  headCell: {
    padding: 12,
  },
  dataCell: {
    padding: 12,
  },
  caption: {
    paddingVertical: 8,
  },
});
