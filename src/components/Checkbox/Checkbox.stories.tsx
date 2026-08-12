import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stack } from '../Stack/Stack';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Email me about product updates' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'Roughly one email a month. Unsubscribe at any time.',
  },
};

export const States: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Invalid" invalid />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled and checked" disabled defaultChecked />
    </Stack>
  ),
};

/**
 * The classic parent/child pattern. `indeterminate` is a DOM property rather
 * than an attribute, which is why the component sets it through a ref.
 */
export const ParentAndChildren: Story = {
  render: () => {
    const [items, setItems] = useState([true, false, false]);
    const checkedCount = items.filter(Boolean).length;

    return (
      <Stack gap={3}>
        <Checkbox
          label="Select all regions"
          checked={checkedCount === items.length}
          indeterminate={checkedCount > 0 && checkedCount < items.length}
          onChange={(event) => setItems(items.map(() => event.target.checked))}
        />
        <Stack gap={3} style={{ paddingInlineStart: 'var(--sable-space-6)' }}>
          {['us-east-1', 'eu-west-1', 'ap-northeast-1'].map((region, index) => (
            <Checkbox
              key={region}
              label={region}
              checked={items[index]}
              onChange={(event) =>
                setItems(items.map((value, i) => (i === index ? event.target.checked : value)))
              }
            />
          ))}
        </Stack>
      </Stack>
    );
  },
};
