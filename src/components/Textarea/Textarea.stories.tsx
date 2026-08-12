import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { label: 'Release notes', placeholder: 'What changed in this version?' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '28rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: { description: 'Markdown is supported.' },
};

export const Invalid: Story = {
  args: { error: 'Release notes are required before publishing.' },
};

/** `resize="none"` when the surrounding layout cannot absorb a taller field. */
export const FixedHeight: Story = {
  args: { resize: 'none', rows: 3 },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Locked while the release is publishing.' },
};
