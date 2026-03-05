/**
 * Native token export — provides TacTheme objects for React Native.
 * All values are raw JS (numbers, hex strings) — no CSS variables.
 */
import { semanticTokens } from '../semantic';
import { typography } from '../typography';
import { spacing, radius } from '../spacing';
import { elevation } from '../elevation';
import { motion } from '../motion';
import { chart } from '../chart';
import type { TacTheme, ThemeMode } from '@tac-ui/shared';

export { nativeShadows, type NativeShadow } from './shadows';

/**
 * Build a complete TacTheme object for React Native consumption.
 * Same shape as web's buildTheme() but without CSS variable indirection.
 */
export function buildNativeTheme(mode: ThemeMode): TacTheme {
  const colors = semanticTokens[mode];
  const chartTokens = chart[mode];
  return {
    mode,
    colors: { ...colors },
    typography: {
      fontFamily: typography.fontFamily,
      display: typography.display,
      heading: typography.heading,
      body: typography.body,
      caption: typography.caption,
      fontWeight: typography.fontWeight,
    },
    spacing: { ...spacing },
    radius: { ...radius },
    elevation: { ...elevation[mode] },
    motion: {
      duration: { ...motion.duration },
      easing: {
        standard: motion.easing.standard,
        easeIn: motion.easing.easeIn,
        easeOut: motion.easing.easeOut,
        easeInOut: motion.easing.easeInOut,
        bounce: motion.easing.bounce,
        spring: motion.easing.spring,
        elastic: motion.easing.elastic,
      },
    },
    chart: {
      colors: [...chartTokens.colors],
      grid: chartTokens.grid,
      axis: chartTokens.axis,
      label: chartTokens.label,
      tooltipBg: chartTokens.tooltipBg,
      lineWidth: chart.lineWidth,
      dotSize: chart.dotSize,
      barRadius: chart.barRadius,
      areaOpacity: chart.areaOpacity,
    },
  };
}

/** Pre-built light theme */
export const lightTheme = buildNativeTheme('light');

/** Pre-built dark theme */
export const darkTheme = buildNativeTheme('dark');

/** Re-export component tokens for direct numeric access */
export { component as componentTokens } from '../component';

/** Re-export motion spring presets for react-native-reanimated */
export { motion as motionTokens, tacSpring, springConfigs } from '../motion';
