import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react-vite';
import '../src/styles/index.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Colour', 'Typography', 'Spacing'], 'Components'],
      },
    },
    a11y: {
      // Surface violations in the addon panel rather than failing the story.
      test: 'todo',
    },
    docs: { toc: true },
  },
  decorators: [
    // Flips `data-theme` on <html>, which is exactly how a consuming app switches themes.
    withThemeByDataAttribute<ReactRenderer>({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    (Story) => (
      <div className="sable-root sb-canvas">
        <Story />
      </div>
    ),
  ],
};

export default preview;
