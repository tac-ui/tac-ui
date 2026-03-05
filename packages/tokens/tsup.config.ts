import { defineConfig } from 'tsup';
import { baseConfig } from '../tsup.base';

export default defineConfig({
  ...baseConfig,
  entry: ['src/index.ts', 'src/web/css-variables.ts', 'src/native/index.ts'],
});
