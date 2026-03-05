/**
 * Theme-aware StyleSheet factory with simple caching.
 *
 * Usage:
 *   const useStyles = createStyles((theme) => ({
 *     container: { backgroundColor: theme.colors.background },
 *   }));
 *
 *   // In component:
 *   const { theme } = useTacNativeTheme();
 *   const styles = useStyles(theme);
 */
import { StyleSheet } from 'react-native';
import type { TacTheme } from '@tac-ui/shared';

type NamedStyles<T> = { [P in keyof T]: object };

export function createStyles<T extends NamedStyles<T>>(factory: (theme: TacTheme) => T): (theme: TacTheme) => T {
  let cachedMode: string | null = null;
  let cachedStyles: T | null = null;

  return (theme: TacTheme): T => {
    if (cachedMode === theme.mode && cachedStyles) {
      return cachedStyles;
    }
    cachedStyles = StyleSheet.create(factory(theme)) as T;
    cachedMode = theme.mode;
    return cachedStyles;
  };
}
