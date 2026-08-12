import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'A native `<select>` wearing the shared control surface. Native buys the mobile picker, typeahead and form integration that a custom listbox has to rebuild from scratch.',
      },
    },
  },
  args: {
    label: 'Environment',
    children: (
      <>
        <option value="development">Development</option>
        <option value="staging">Staging</option>
        <option value="production">Production</option>
      </>
    ),
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '22rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The placeholder is a disabled option, so an untouched select still reads as a prompt. */
export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose an environment', description: 'Deploys go to this environment.' },
};

export const Invalid: Story = {
  args: { placeholder: 'Choose an environment', error: 'Pick an environment to continue.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'staging' },
};
