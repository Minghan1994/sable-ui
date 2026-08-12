import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { Input } from './Input';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <title>Search</title>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'A text field together with its label, help text and error message. The `aria-describedby` and `aria-invalid` wiring is handled for you — that is the part hand-built forms usually get wrong.',
      },
    },
  },
  args: { label: 'Email address', placeholder: 'ada@example.com' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '22rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: { description: "We'll only use this to send receipts." },
};

/** Passing `error` marks the control invalid and links the message to it. */
export const Invalid: Story = {
  args: { error: 'Enter an email address in the form name@example.com', defaultValue: 'ada@' },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={4}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </Stack>
  ),
};

export const WithAdornments: Story = {
  render: (args) => (
    <Stack gap={4}>
      <Input {...args} label="Search" placeholder="Search projects" startAdornment={<SearchIcon />} />
      <Input {...args} label="Amount" placeholder="0.00" startAdornment="$" endAdornment="USD" />
    </Stack>
  ),
};

export const Required: Story = {
  args: { required: true, description: 'Required fields are marked with an asterisk.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'ada@example.com' },
};
