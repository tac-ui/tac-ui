import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTacNativeTheme, Divider } from '@tac-ui/native';

interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  data: PropRow[];
}

export function PropsTable({ data }: PropsTableProps) {
  const { theme } = useTacNativeTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.table, { borderColor: theme.colors.border }]}>
        {/* Header */}
        <View style={[styles.row, styles.headerRow, { backgroundColor: theme.colors.muted }]}>
          <Text style={[styles.cell, styles.nameCol, styles.headerText, { color: theme.colors.foreground }]}>Prop</Text>
          <Text style={[styles.cell, styles.typeCol, styles.headerText, { color: theme.colors.foreground }]}>Type</Text>
          <Text style={[styles.cell, styles.defaultCol, styles.headerText, { color: theme.colors.foreground }]}>
            Default
          </Text>
          <Text style={[styles.cell, styles.descCol, styles.headerText, { color: theme.colors.foreground }]}>
            Description
          </Text>
        </View>
        <Divider />
        {/* Rows */}
        {data.map((row, i) => (
          <React.Fragment key={row.name}>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.nameCol, styles.nameText, { color: theme.colors.point }]}>
                {row.name}
              </Text>
              <Text style={[styles.cell, styles.typeCol, styles.typeText, { color: theme.colors.mutedForeground }]}>
                {row.type}
              </Text>
              <Text style={[styles.cell, styles.defaultCol, { color: theme.colors.mutedForeground }]}>
                {row.default}
              </Text>
              <Text style={[styles.cell, styles.descCol, { color: theme.colors.foreground }]}>{row.description}</Text>
            </View>
            {i < data.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: 600,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  headerRow: {
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 12,
  },
  cell: {
    fontSize: 12,
    lineHeight: 18,
  },
  nameCol: {
    width: 100,
  },
  typeCol: {
    width: 160,
  },
  defaultCol: {
    width: 80,
  },
  descCol: {
    width: 260,
  },
  nameText: {
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  typeText: {
    fontFamily: 'monospace',
    fontSize: 11,
  },
});
