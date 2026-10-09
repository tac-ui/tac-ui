import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Components must read colours from `theme.colors.*`, never name a literal.
 * A literal survives the theme flip and is unreachable from a consumer's theme.
 *
 * KNOWN_DEBT is a ratchet: the count per file may only go down. Remove an entry
 * once the file is clean; never add one.
 */
const KNOWN_DEBT: Record<string, number> = {
  // Colour math (HSV ↔ hex) and checkerboard swatches are inherent to a picker.
  'color-picker/color-picker.tsx': 52,
  // Glass / scrim overlays without a semantic token yet.
  'accordion/accordion.tsx': 2,
  'card/card.tsx': 2,
  'chip/chip.tsx': 2,
  'code-block/code-block.tsx': 4,
  'date-picker/date-picker.tsx': 1,
  'dialog/dialog.tsx': 1,
  'floating-menu-bar/floating-menu-bar.tsx': 2,
  'indicator/indicator.tsx': 1,
  'select/select.tsx': 1,
  'skeleton/skeleton.tsx': 1,
};

const COMPONENTS = path.resolve(__dirname, '../components');
const LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d/g;

const files = fs
  .readdirSync(COMPONENTS, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => `${e.name}/${e.name}.tsx`);

describe('colour literals in components', () => {
  it.each(files)('%s', (file) => {
    const count = (fs.readFileSync(path.join(COMPONENTS, file), 'utf8').match(LITERAL) ?? []).length;
    expect(count).toBeLessThanOrEqual(KNOWN_DEBT[file] ?? 0);
  });

  it('KNOWN_DEBT has no stale entries', () => {
    const stale = Object.entries(KNOWN_DEBT).filter(([file, max]) => {
      const p = path.join(COMPONENTS, file);
      return !fs.existsSync(p) || (fs.readFileSync(p, 'utf8').match(LITERAL) ?? []).length < max;
    });
    expect(stale.map(([f]) => f)).toEqual([]);
  });
});
