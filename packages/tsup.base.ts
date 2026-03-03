import type { Options } from 'tsup';

export const baseConfig: Options = {
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  treeshake: true,
};
