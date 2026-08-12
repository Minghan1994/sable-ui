import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Use a Switch when the change takes effect immediately. If it only applies after a Save button, that is a Checkbox.',
      },
    },
  },
  args: { label: 'Require two-factor authentication' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: { description: 'Everyone in the workspace will be prompted at their next sign-in.' },
};

export const States: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Switch {...args} label="Off" />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Disabled" disabled />
      <Switch {...args} label="Disabled and on" disabled defaultChecked />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Switch {...args} size="sm" label="Small" defaultChecked />
      <Switch {...args} size="md" label="Medium" defaultChecked />
    </Stack>
  ),
};
