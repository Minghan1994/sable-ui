import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  args: {},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <Stack gap={4}>
      <span>Deployment settings</span>
      <Divider {...args} />
      <span>Danger zone</span>
    </Stack>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Stack direction="row" gap={3} align="center" style={{ height: '2rem' }}>
      <span>Draft</span>
      <Divider {...args} />
      <span>Review</span>
      <Divider {...args} />
      <span>Published</span>
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: { label: 'or' },
  render: (args) => (
    <div style={{ maxWidth: '24rem' }}>
      <Divider {...args} />
    </div>
  ),
};
