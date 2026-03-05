'use client';

import React, { forwardRef, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { cn } from '../utils/cn';

// Register Chart.js components
ChartJS.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  PieController,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  Legend,
  Filler,
);

// ---------------------------------------------------------------------------
// Types (keep existing exports)
// ---------------------------------------------------------------------------

export type PieChartVariant = 'pie' | 'donut';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

function resolveColor(color: string): string {
  if (!color.startsWith('var(')) return color;
  const varName = color
    .replace(/^var\(/, '')
    .replace(/\)$/, '')
    .trim();
  if (typeof document !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || color;
  }
  return color;
}

function tooltipConfig() {
  return {
    enabled: true,
    backgroundColor: resolveColor('var(--chart-tooltip-bg)'),
    titleColor: resolveColor('var(--foreground)'),
    bodyColor: resolveColor('var(--muted-foreground)'),
    borderColor: resolveColor('var(--border)'),
    borderWidth: 0.5,
    cornerRadius: 6,
    padding: { top: 8, bottom: 8, left: 12, right: 12 },
    boxPadding: 4,
    titleFont: { size: 11, weight: 'bold' as const, family: 'var(--font-primary, system-ui, sans-serif)' },
    bodyFont: { size: 11, family: 'var(--font-primary, system-ui, sans-serif)' },
    displayColors: true,
    usePointStyle: true,
  };
}

// ---------------------------------------------------------------------------
// BarChart
// ---------------------------------------------------------------------------

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  color?: string;
  colors?: string[];
}

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      className,
      data,
      height = 200,
      showGrid = true,
      showLabels = true,
      showValues = false,
      color,
      colors,
      style,
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
      if (!canvasRef.current) return;

      chartRef.current?.destroy();

      const bgColors = data.map((_, i) =>
        resolveColor((colors && colors[i]) ?? color ?? `var(--chart-${(i % 8) + 1})`),
      );
      const gridColor = resolveColor('var(--chart-grid)');
      const labelColor = resolveColor('var(--chart-label)');

      chartRef.current = new ChartJS(canvasRef.current, {
        type: 'bar',
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              backgroundColor: bgColors,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: tooltipConfig(),
          },
          scales: {
            x: {
              display: showLabels,
              border: { display: false },
              grid: { display: false },
              ticks: { color: labelColor, font: { size: 11 }, padding: 4 },
            },
            y: {
              display: true,
              border: { display: false },
              grid: { display: showGrid, color: gridColor, drawTicks: false, lineWidth: 0.5 },
              ticks: { color: labelColor, font: { size: 11 }, padding: 8 },
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        chartRef.current?.destroy();
        chartRef.current = null;
      };
    }, [data, height, showGrid, showLabels, showValues, color, colors]);

    return (
      <div ref={ref} className={cn('w-full animate-blur-fade-in', className)} style={{ ...style, height }} {...props}>
        <canvas ref={canvasRef} />
      </div>
    );
  },
);
BarChart.displayName = 'BarChart';

// ---------------------------------------------------------------------------
// LineChart
// ---------------------------------------------------------------------------

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  showDots?: boolean;
  showArea?: boolean;
  color?: string;
  strokeWidth?: number;
}

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      className,
      data,
      height = 200,
      showGrid = true,
      showLabels = true,
      showDots = true,
      showArea = false,
      color,
      strokeWidth = 2,
      style,
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      chartRef.current?.destroy();

      const lineColor = resolveColor(color ?? 'var(--chart-1)');
      const gridColor = resolveColor('var(--chart-grid)');
      const labelColor = resolveColor('var(--chart-label)');

      chartRef.current = new ChartJS(canvasRef.current, {
        type: 'line',
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              borderColor: lineColor,
              backgroundColor: showArea ? lineColor + '14' : 'transparent',
              fill: showArea,
              tension: 0.4,
              borderWidth: strokeWidth,
              pointRadius: showDots ? 2.5 : 0,
              pointHoverRadius: showDots ? 4 : 0,
              pointBackgroundColor: lineColor,
              pointBorderColor: resolveColor('var(--background)'),
              pointBorderWidth: 1.5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: tooltipConfig(),
          },
          scales: {
            x: {
              display: showLabels,
              border: { display: false },
              grid: { display: false },
              ticks: { color: labelColor, font: { size: 11 }, padding: 4 },
            },
            y: {
              display: true,
              border: { display: false },
              grid: { display: showGrid, color: gridColor, drawTicks: false, lineWidth: 0.5 },
              ticks: { color: labelColor, font: { size: 11 }, padding: 8 },
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        chartRef.current?.destroy();
        chartRef.current = null;
      };
    }, [data, height, showGrid, showLabels, showDots, showArea, color, strokeWidth]);

    return (
      <div ref={ref} className={cn('w-full animate-blur-fade-in', className)} style={{ ...style, height }} {...props}>
        <canvas ref={canvasRef} />
      </div>
    );
  },
);
LineChart.displayName = 'LineChart';

// ---------------------------------------------------------------------------
// PieChart
// ---------------------------------------------------------------------------

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PieChartDataPoint[];
  size?: number;
  variant?: PieChartVariant;
  strokeWidth?: number;
  showLabels?: boolean;
  showValues?: boolean;
}

export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      className,
      data,
      size = 200,
      variant = 'pie',
      strokeWidth = 20, // Refined donut stroke
      showLabels = true,
      showValues = false,
      style,
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      chartRef.current?.destroy();

      const bgColors = data.map((d, i) => resolveColor(d.color ?? `var(--chart-${(i % 8) + 1})`));
      const isDonut = variant === 'donut';

      chartRef.current = new ChartJS(canvasRef.current, {
        type: isDonut ? 'doughnut' : 'pie',
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              backgroundColor: bgColors,
              borderColor: resolveColor('var(--background)'),
              borderWidth: 1.5,
              ...(isDonut ? { cutout: `${100 - (strokeWidth / (size / 2)) * 100}%` } : {}),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: showLabels,
              position: 'bottom',
              labels: {
                color: resolveColor('var(--chart-label)'),
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 16,
                font: { size: 11 },
              },
            },
            tooltip: {
              ...tooltipConfig(),
              callbacks: showValues
                ? {
                    label: (ctx) => {
                      const total = (ctx.dataset.data as number[]).reduce((sum: number, val) => sum + val, 0);
                      const percentage = Math.round(((ctx.parsed as number) / total) * 100);
                      return ` ${ctx.label}: ${ctx.parsed} (${percentage}%)`;
                    },
                  }
                : undefined,
            },
          },
        },
      });

      return () => {
        chartRef.current?.destroy();
        chartRef.current = null;
      };
    }, [data, size, variant, strokeWidth, showLabels, showValues]);

    return (
      <div
        ref={ref}
        className={cn('inline-flex flex-col items-center animate-blur-fade-in', className)}
        style={{ ...style, width: size, height: size }}
        {...props}
      >
        <canvas ref={canvasRef} />
      </div>
    );
  },
);
PieChart.displayName = 'PieChart';

// ---------------------------------------------------------------------------
// DonutChart
// ---------------------------------------------------------------------------

export const DonutChart = forwardRef<HTMLDivElement, PieChartProps>((props, ref) => (
  <PieChart ref={ref} variant="donut" {...props} />
));
DonutChart.displayName = 'DonutChart';
