import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // Prop tables are generated from the source, so the docs cannot drift from
    // the API. The Babel-based extractor is used rather than the TypeScript one:
    // the latter needs the TS 6 JavaScript compiler API, which TypeScript 7 drops.
    reactDocgen: 'react-docgen',
  },
};

export default config;
