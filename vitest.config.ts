// Vitest configuration — runs in Node only (no DOM needed for the data layer).
// We test the pure-TS modules in `lib/` because they hold all business logic
// and structured-data schemas; if any of these break, every page breaks.

import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  // Resolve the `@/*` path alias the same way Next.js does.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    // Node environment — lib/ files don't import React or the DOM.
    environment: 'node',
    // Look for *.test.ts files anywhere in the repo (excluding build artefacts).
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**', 'out/**', 'components/**'],
    // Fail fast in CI — don't waste time on the rest of the suite.
    reporters: ['default'],
  },
});
