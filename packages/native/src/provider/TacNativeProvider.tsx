import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import { buildNativeTheme } from '@tac-ui/tokens/native';
import type { TacTheme, ThemeMode, ThemePreference, UseTacThemeReturn } from '@tac-ui/shared';

const TacNativeThemeContext = createContext<UseTacThemeReturn | null>(null);

/** Props for the TacNativeProvider component. */
export interface TacNativeProviderProps {
  children: React.ReactNode;
  /** Initial theme preference. @default 'system' */
  defaultPreference?: ThemePreference;
}

function colorSchemeToMode(scheme: ColorSchemeName): ThemeMode {
  return scheme === 'dark' ? 'dark' : 'light';
}

/**
 * Theme provider for React Native.
 * Uses Appearance API for system theme detection, provides TacTheme via context.
 */
export function TacNativeProvider({ children, defaultPreference = 'system' }: TacNativeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(defaultPreference);
  const [systemMode, setSystemMode] = useState<ThemeMode>(colorSchemeToMode(Appearance.getColorScheme()));

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemMode(colorSchemeToMode(colorScheme));
    });
    return () => subscription.remove();
  }, []);

  const mode: ThemeMode = preference === 'system' ? systemMode : preference;
  const theme: TacTheme = useMemo(() => buildNativeTheme(mode), [mode]);

  const setMode = useCallback((m: ThemeMode) => setPreference(m), []);
  const toggleMode = useCallback(
    () =>
      setPreference((prev) => {
        const current = prev === 'system' ? systemMode : prev;
        return current === 'light' ? 'dark' : 'light';
      }),
    [systemMode],
  );

  const value = useMemo<UseTacThemeReturn>(
    () => ({ theme, mode, setMode, toggleMode, preference, setPreference }),
    [theme, mode, setMode, toggleMode, preference, setPreference],
  );

  return <TacNativeThemeContext.Provider value={value}>{children}</TacNativeThemeContext.Provider>;
}

/**
 * Hook to access the Tac UI theme in React Native.
 * Must be used within a TacNativeProvider.
 */
export function useTacNativeTheme(): UseTacThemeReturn {
  const context = useContext(TacNativeThemeContext);
  if (!context) {
    throw new Error('useTacNativeTheme must be used within a TacNativeProvider');
  }
  return context;
}
