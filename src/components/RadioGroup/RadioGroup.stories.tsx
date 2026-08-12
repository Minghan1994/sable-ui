import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from '../Radio/Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Radios are rendered inside a `<fieldset>` so the legend names the whole set. Without that, a screen reader reads each option with no idea what question it answers.',
      },
    },
  },
  args: {
    label: 'Deployment target',
    defaultValue: 'staging',
    children: (
      <>
        <Radio value="development" label="Development" />
        <Radio value="staging" label="Staging" />
        <Radio value="production" label="Production" />
      </>
    ),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescriptions: Story = {
  args: {
    description: 'Where this build will be released.',
    children: (
      <>
        <Radio value="development" label="Development" description="Rebuilt on every commit." />
        <Radio value="staging" label="Staging" description="Mirrors production data, weekly refresh." />
        <Radio value="production" label="Production" description="Live traffic. Requires approval." />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const Invalid: Story = {
  args: { defaultValue: undefined, error: 'Choose a deployment target.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
