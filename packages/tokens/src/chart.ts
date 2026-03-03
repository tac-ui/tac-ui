/**
 * Chart tokens — Tac UI palette.
 * Modern minimal: clean, well-spaced hues with near-invisible grid.
 */
import type { ThemeMode, ThemeChart } from '@tac-ui/shared';

type ChartPalette = Pick<ThemeChart, 'colors' | 'grid' | 'axis' | 'label' | 'tooltipBg'>;

export const chart = {
  light: {
    colors: [
      '#1E232D', // chart-1: Iron Navy (Primary)
      '#323944', // chart-2: Steel Navy (Secondary)
      '#4A5361', // chart-3: Slate Navy (Tertiary)
      '#71717A', // chart-4: Zinc 500 (Accent 1)
      '#A1A1AA', // chart-5: Zinc 400 (Accent 2)
      '#D4D4D8', // chart-6: Zinc 300 (Fill)
      '#0F172A', // chart-7: Deep Slate 900 (Deep Fill)
      '#E4E4E7', // chart-8: Zinc 200 (Light Fill)
    ],
    grid: 'rgba(30, 35, 45, 0.04)',
    axis: 'rgba(30, 35, 45, 0.08)',
    label: '#71717A', // Zinc 500
    tooltipBg: '#FFFFFF',
  },
  dark: {
    colors: [
      '#B8C4D9', // chart-1: Bright Ice Navy (Primary)
      '#D1DBE8', // chart-2: Ice Steel (Secondary)
      '#E6ECEF', // chart-3: Pale Silver (Tertiary)
      '#A1A1AA', // chart-4: Zinc 400 (Accent 1)
      '#71717A', // chart-5: Zinc 500 (Accent 2)
      '#808B9D', // chart-6: Cold Steel (Fill)
      '#FFFFFF', // chart-7: Pure White (Highlight)
      '#52525B', // chart-8: Zinc 600 (Deep Fill)
    ],
    grid: 'rgba(255, 255, 255, 0.04)',
    axis: 'rgba(255, 255, 255, 0.06)',
    label: '#A1A1AA', // Zinc 400
    tooltipBg: '#18181A', // Off-black chart tooltip matches dropdowns
  },
  lineWidth: 1.5,
  dotSize: 2.5,
  barRadius: 4,
  areaOpacity: 0.08,
} as const satisfies Record<ThemeMode, ChartPalette> & { lineWidth: number; dotSize: number; barRadius: number; areaOpacity: number };
