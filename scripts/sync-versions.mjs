// Writes each package's `src/version.ts` from its package.json version.
// Runs after `changeset version` so the runtime `version` export never drifts.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const packages = ['web', 'native'];

for (const name of packages) {
  const dir = path.join(root, 'packages', name);
  const { version } = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  const file = path.join(dir, 'src', 'version.ts');
  const next = `export const version = '${version}';\n`;
  if (fs.readFileSync(file, 'utf8') !== next) {
    fs.writeFileSync(file, next);
    console.log(`synced packages/${name}/src/version.ts -> ${version}`);
  }
}
