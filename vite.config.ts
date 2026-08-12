import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

const entry = fileURLToPath(new URL('src/index.ts', import.meta.url));

/**
 * Storybook reuses this config for its own build, where declarations and a
 * tokens copy make no sense. Both plugins below opt out unless a library bundle
 * is what is actually being produced.
 */
const onlyForLibraryBuild = (config: UserConfig) => Boolean(config.build?.lib);

/** Ship tokens.css on its own so a consumer can adopt the tokens without the components. */
const copyTokens = (): Plugin => ({
  name: 'sable-copy-tokens',
  apply: onlyForLibraryBuild,
  closeBundle() {
    const outDir = fileURLToPath(new URL('dist/', import.meta.url));
    mkdirSync(outDir, { recursive: true });
    copyFileSync(fileURLToPath(new URL('src/styles/tokens.css', import.meta.url)), `${outDir}tokens.css`);
  },
});

export default defineConfig({
  plugins: [
    react(),
    {
      ...dts({
        include: ['src'],
        exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/**/*.stories.tsx'],
        tsconfigPath: './tsconfig.build.json',
      }),
      apply: onlyForLibraryBuild,
    },
    copyTokens(),
  ],
  build: {
    target: 'es2022',
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry,
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: (id) =>
        id === 'react' || id === 'react-dom' || id.startsWith('react/') || id.startsWith('react-dom/'),
      output: {
        assetFileNames: (asset) => (asset.names?.[0]?.endsWith('.css') ? 'styles.css' : '[name][extname]'),
      },
    },
  },
});
