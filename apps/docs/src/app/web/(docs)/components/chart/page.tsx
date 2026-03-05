'use client';

import React from 'react';
import { BarChart, LineChart, PieChart, DonutChart } from '@tac-ui/web';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  Showcase,
  PropsTable,
  DocText,
} from '@/components/docs/DocPage';
import { usePageTranslation } from '@/i18n';

const monthlyData = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 58 },
  { label: 'Mar', value: 35 },
  { label: 'Apr', value: 71 },
  { label: 'May', value: 63 },
  { label: 'Jun', value: 89 },
];

const weeklyData = [
  { label: 'Mon', value: 20 },
  { label: 'Tue', value: 45 },
  { label: 'Wed', value: 38 },
  { label: 'Thu', value: 60 },
  { label: 'Fri', value: 55 },
  { label: 'Sat', value: 30 },
  { label: 'Sun', value: 15 },
];

const deviceData = [
  { label: 'Desktop', value: 54 },
  { label: 'Mobile', value: 34 },
  { label: 'Tablet', value: 12 },
];

const taskData = [
  { label: 'Completed', value: 48 },
  { label: 'In Progress', value: 27 },
  { label: 'Pending', value: 15 },
];

export default function ChartPage() {
  const pt = usePageTranslation('chart');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Charts'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Responsive chart components built on Chart.js with Tac UI design tokens. Minimal grid lines, restrained monochrome palette, and clean typography.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['bar-chart']?.title ?? 'Bar Chart'}>
        <DocText>
          {pt?.sections?.['bar-chart']?.texts?.[0] ??
            'Vertical bars with per-bar color via the chart token palette. Grid lines are near-invisible for a clean canvas.'}
        </DocText>
        <Showcase
          code={`<BarChart
  data={[
    { label: 'Jan', value: 42 },
    { label: 'Feb', value: 58 },
    { label: 'Mar', value: 35 },
    { label: 'Apr', value: 71 },
    { label: 'May', value: 63 },
    { label: 'Jun', value: 89 },
  ]}
  colors={[
    'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)',
    'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)',
  ]}
  showValues
/>`}
        >
          <div className="w-full">
            <BarChart
              data={monthlyData}
              colors={[
                'var(--chart-1)',
                'var(--chart-2)',
                'var(--chart-3)',
                'var(--chart-4)',
                'var(--chart-5)',
                'var(--chart-6)',
              ]}
              showValues
            />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['line-chart']?.title ?? 'Line Chart'}>
        <DocText>
          {pt?.sections?.['line-chart']?.texts?.[0] ??
            'Smooth line with optional area fill and data points. Uses a single color from the chart palette.'}
        </DocText>
        <Showcase
          code={`<LineChart
  data={[
    { label: 'Mon', value: 20 },
    { label: 'Tue', value: 45 },
    { label: 'Wed', value: 38 },
    { label: 'Thu', value: 60 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 15 },
  ]}
  showDots
  showArea
/>`}
        >
          <div className="w-full">
            <LineChart data={weeklyData} showDots showArea />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['pie-chart']?.title ?? 'Pie Chart'}>
        <DocText>
          {pt?.sections?.['pie-chart']?.texts?.[0] ??
            'Proportional slices with legend. Borders blend into the background for clean separation.'}
        </DocText>
        <Showcase
          code={`<PieChart
  data={[
    { label: 'Desktop', value: 54 },
    { label: 'Mobile', value: 34 },
    { label: 'Tablet', value: 12 },
  ]}
  showValues
/>`}
        >
          <div className="w-full flex justify-center">
            <PieChart data={deviceData} showValues />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['donut-chart']?.title ?? 'Donut Chart'}>
        <DocText>
          {pt?.sections?.['donut-chart']?.texts?.[0] ??
            'Donut variant with a refined ring width. Hover for percentage tooltips.'}
        </DocText>
        <Showcase
          code={`<DonutChart
  data={[
    { label: 'Completed', value: 48 },
    { label: 'In Progress', value: 27 },
    { label: 'Pending', value: 15 },
  ]}
  showValues
/>`}
        >
          <div className="w-full flex justify-center">
            <DonutChart data={taskData} showValues />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference-bar']?.title ?? 'API Reference — BarChart'}>
        <PropsTable
          data={[
            {
              name: 'data',
              type: 'ChartDataPoint[]',
              default: '-',
              description: pt?.props?.['bar-data'] ?? 'Array of { label, value } data points to render.',
            },
            {
              name: 'height',
              type: 'number',
              default: '200',
              description: pt?.props?.['bar-height'] ?? 'Height of the SVG in pixels.',
            },
            {
              name: 'showGrid',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['bar-showGrid'] ?? 'Whether to show horizontal grid lines.',
            },
            {
              name: 'showLabels',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['bar-showLabels'] ?? 'Whether to show x-axis labels below bars.',
            },
            {
              name: 'showValues',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['bar-showValues'] ?? 'Whether to show value labels above bars.',
            },
            {
              name: 'color',
              type: 'string',
              default: 'var(--chart-1)',
              description: pt?.props?.['bar-color'] ?? 'CSS color for all bars.',
            },
            {
              name: 'colors',
              type: 'string[]',
              default: '-',
              description: pt?.props?.['bar-colors'] ?? 'Per-bar color overrides.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference-line']?.title ?? 'API Reference — LineChart'}>
        <PropsTable
          data={[
            {
              name: 'data',
              type: 'ChartDataPoint[]',
              default: '-',
              description: pt?.props?.['line-data'] ?? 'Array of { label, value } data points to render.',
            },
            {
              name: 'height',
              type: 'number',
              default: '200',
              description: pt?.props?.['line-height'] ?? 'Height of the SVG in pixels.',
            },
            {
              name: 'showDots',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['line-showDots'] ?? 'Whether to show dots at each data point.',
            },
            {
              name: 'showArea',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['line-showArea'] ?? 'Whether to fill the area under the line.',
            },
            {
              name: 'showGrid',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['line-showGrid'] ?? 'Whether to show horizontal grid lines.',
            },
            {
              name: 'color',
              type: 'string',
              default: 'var(--chart-1)',
              description: pt?.props?.['line-color'] ?? 'CSS color for the line and dots.',
            },
            {
              name: 'strokeWidth',
              type: 'number',
              default: '2',
              description: pt?.props?.['line-strokeWidth'] ?? 'Stroke width of the line.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference-pie-donut']?.title ?? 'API Reference — PieChart / DonutChart'}>
        <PropsTable
          data={[
            {
              name: 'data',
              type: 'PieChartDataPoint[]',
              default: '-',
              description: pt?.props?.['pie-data'] ?? 'Array of { label, value, color? } data points.',
            },
            {
              name: 'size',
              type: 'number',
              default: '200',
              description: pt?.props?.['pie-size'] ?? 'Diameter of the chart in pixels.',
            },
            {
              name: 'variant',
              type: '"pie" | "donut"',
              default: '"pie"',
              description:
                pt?.props?.['pie-variant'] ?? 'Whether to render as a pie or a donut. DonutChart defaults to "donut".',
            },
            {
              name: 'strokeWidth',
              type: 'number',
              default: '20',
              description: pt?.props?.['pie-strokeWidth'] ?? 'Ring width for the donut variant in pixels.',
            },
            {
              name: 'showLabels',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['pie-showLabels'] ?? 'Whether to show the legend below the chart.',
            },
            {
              name: 'showValues',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['pie-showValues'] ??
                'Whether to show percentage values (donut: center total; pie: in slice).',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
