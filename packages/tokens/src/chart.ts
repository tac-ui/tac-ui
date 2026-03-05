/**
 * Chart tokens — Tac UI palette.
 * Monochrome base with royal indigo accent and warm gold complementary tones.
 */
import type { ThemeMode, ThemeChart } from '@tac-ui/shared';

type ChartPalette = Pick<ThemeChart, 'colors' | 'grid' | 'axis' | 'label' | 'tooltipBg'>;

export const chart = {
  light: {
    colors: [
      '#18181B', // chart-1: Ink (Primary)
      '#5856D6', // chart-2: Royal Indigo (Point)
      '#854D0E', // chart-3: Dark Gold
      '#0F766E', // chart-4: Deep Teal (cool contrast)
      '#71717A', // chart-5: Zinc 500 (Neutral)
      '#4B49B8', // chart-6: Deep Indigo
      '#44403C', // chart-7: Stone 700 (Warm gray)
      '#D4D4D8', // chart-8: Zinc 300 (Light fill)
    ],
    grid: 'rgba(24, 24, 27, 0.04)',
    axis: 'rgba(24, 24, 27, 0.08)',
    label: '#71717A',
    tooltipBg: '#FFFFFF',
  },
  dark: {
    colors: [
      '#FAFAFA', // chart-1: Near-white (Primary)
      '#5E5CE6', // chart-2: Royal Indigo (Point)
      '#FCD34D', // chart-3: Amber 300 (Gold)
      '#2DD4BF', // chart-4: Teal 400 (cool contrast)
      '#A1A1AA', // chart-5: Zinc 400 (Neutral)
      '#7A78F0', // chart-6: Light Indigo
      '#78716C', // chart-7: Stone 500 (Warm gray)
      '#52525B', // chart-8: Zinc 600 (Deep fill)
    ],
    grid: 'rgba(255, 255, 255, 0.04)',
    axis: 'rgba(255, 255, 255, 0.06)',
    label: '#A1A1AA',
    tooltipBg: '#18181B',
  },
  lineWidth: 1.5,
  dotSize: 2.5,
  barRadius: 4,
  areaOpacity: 0.08,
} as const satisfies Record<ThemeMode, ChartPalette> & {
  lineWidth: number;
  dotSize: number;
  barRadius: number;
  areaOpacity: number;
};
