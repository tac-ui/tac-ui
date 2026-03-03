import type { TacTheme, ThemeMode, ThemePreference } from './types';

/** Return type of the shared useTacTheme hook */
export interface UseTacThemeReturn {
  theme: TacTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  /** Raw theme preference including 'system' */
  preference: ThemePreference;
  /** Set theme preference (supports 'system') */
  setPreference: (pref: ThemePreference) => void;
}
