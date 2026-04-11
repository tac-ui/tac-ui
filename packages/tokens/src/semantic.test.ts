import { describe, it, expect } from 'vitest';
import { semanticTokens } from './semantic';

describe('semanticTokens', () => {
  it('exposes both light and dark modes', () => {
    expect(semanticTokens.light).toBeDefined();
    expect(semanticTokens.dark).toBeDefined();
  });

  it('defines the Royal Indigo brand point color on both modes', () => {
    // Light uses #5856D6, dark uses #5E5CE6 — these are load-bearing brand values.
    expect(semanticTokens.light.point).toBe('#5856D6');
    expect(semanticTokens.dark.point).toBe('#5E5CE6');
  });

  it('keeps light and dark in structural parity', () => {
    // Any key missing between modes would cause theme switching to fall back to undefined.
    const lightKeys = Object.keys(semanticTokens.light).sort();
    const darkKeys = Object.keys(semanticTokens.dark).sort();
    expect(lightKeys).toEqual(darkKeys);
  });

  it('has no empty or missing color values', () => {
    for (const mode of ['light', 'dark'] as const) {
      for (const [key, value] of Object.entries(semanticTokens[mode])) {
        expect(value, `${mode}.${key} must be a non-empty string`).toBeTruthy();
        expect(typeof value).toBe('string');
      }
    }
  });
});
