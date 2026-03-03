import { defineConfig } from 'tsup';
import { baseConfig } from '../tsup.base';

export default defineConfig({
  ...baseConfig,
  entry: ['src/index.ts', 'src/icons.ts', 'src/tailwind/preset.ts'],
  external: ['react', 'react-dom', 'next-themes', '@tac-ui/icon', 'lucide-react'],
});
