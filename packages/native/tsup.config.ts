import { defineConfig } from 'tsup';
import { baseConfig } from '../tsup.base';

export default defineConfig({
  ...baseConfig,
  entry: ['src/index.ts'],
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
    'react-native-svg',
    '@tac-ui/icon-native',
    'lucide-react-native',
  ],
});
