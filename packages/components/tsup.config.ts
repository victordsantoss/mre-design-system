import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    external: ['react', 'react-dom', '@ds/tokens'],
    banner: {
      js: '"use client";',
    },
  },
  {
    entry: ['src/tailwind.config.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist',
    sourcemap: false,
  },
])
