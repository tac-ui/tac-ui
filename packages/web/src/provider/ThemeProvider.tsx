'use client';

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { semanticTokens, typography, spacing, radius, elevation, motion, chart } from '@tac-ui/tokens';
import type { TacTheme, ThemeMode, ThemePreference, UseTacThemeReturn } from '@tac-ui/shared';

function buildTheme(mode: ThemeMode): TacTheme {
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

const TacThemeContext = createContext<UseTacThemeReturn | null>(null);

function TacThemeInner({ children }: { children: React.ReactNode }) {
  const { theme: rawTheme, setTheme, resolvedTheme } = useTheme();
  const mode: ThemeMode = (resolvedTheme as ThemeMode) ?? 'light';
  const preference: ThemePreference = (rawTheme as ThemePreference) ?? 'system';
  const tacTheme: TacTheme = useMemo(() => buildTheme(mode), [mode]);
  const setMode = useCallback((newMode: ThemeMode) => setTheme(newMode), [setTheme]);
  const setPreference = useCallback((pref: ThemePreference) => setTheme(pref), [setTheme]);
  const toggleMode = useCallback(() => setTheme(mode === 'light' ? 'dark' : 'light'), [mode, setTheme]);
  const value = useMemo<UseTacThemeReturn>(() => ({ theme: tacTheme, mode, setMode, toggleMode, preference, setPreference }), [tacTheme, mode, setMode, toggleMode, preference, setPreference]);
  return <TacThemeContext.Provider value={value}>{children}</TacThemeContext.Provider>;
}

export interface TacProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

export function TacProvider({ children, defaultTheme = 'light', storageKey = 'tac-theme' }: TacProviderProps) {
  return (
    <NextThemesProvider attribute="data-theme" defaultTheme={defaultTheme} storageKey={storageKey} enableSystem>
      <TacThemeInner>{children}</TacThemeInner>
    </NextThemesProvider>
  );
}

export function useTacTheme(): UseTacThemeReturn {
  const context = useContext(TacThemeContext);
  if (!context) throw new Error('useTacTheme must be used within a TacProvider');
  return context;
}
