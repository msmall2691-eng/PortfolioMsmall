/**
 * ESLint flat config.
 *
 * eslint-config-next 16 ships flat config directly: `core-web-vitals` and
 * `typescript` each export an array of flat config objects. Earlier versions
 * exported eslintrc-style objects, which is why this file used to wrap them in
 * `FlatCompat` from @eslint/eslintrc.
 *
 * Do not put that wrapper back. Feeding an already-flat config through
 * FlatCompat crashes config validation with a circular-reference error inside
 * JSON.stringify — the plugin objects reference each other, which the legacy
 * validator cannot serialise. The crash names `property 'react' closes the
 * circle` and says nothing about the real cause, so it is worth knowing.
 *
 * Keep this package's version pinned to the same version as `next` itself.
 * The 15.x config was what dragged a vulnerable `minimatch` into the tree.
 */
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  /*
    `.claude/**` is NOT optional here. It holds scratch git worktrees made
    when a coding agent works on an isolated copy of the repo, and each one
    is a full checkout. .gitignore hides them from git but says nothing to
    eslint: with two present, `npm run lint` went from clean to 11,121
    problems, all of them in copies of this same source. Lint output that
    large is lint output nobody reads.
  */
  { ignores: ['.next/**', 'out/**', 'node_modules/**', '.claude/**'] },
];

export default config;
