import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';

const entry = fileURLToPath(new URL('src/index.ts', import.meta.url));

/** Ship tokens.css on its own so a consumer can adopt the tokens without the components. */
const copyTokens = (): Plugin => ({
  name: 'sable-copy-tokens',
  closeBundle() {
    copyFileSync(
      fileURLToPath(new URL('src/styles/tokens.css', import.meta.url)),
      fileURLToPath(new URL('dist/tokens.css', import.meta.url)),
    );
  },
});

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/**/*.stories.tsx'],
      tsconfigPath: './tsconfig.build.json',
    }),
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
