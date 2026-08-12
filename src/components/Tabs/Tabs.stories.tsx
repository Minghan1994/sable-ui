import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Follows the ARIA tabs pattern: the tab list is a single tab stop, arrow keys move between tabs, Home and End jump to the ends.',
      },
    },
  },
  args: { defaultValue: 'overview' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '34rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Project sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="deployments">Deployments</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">Traffic, error rate and latency for the last 24 hours.</TabPanel>
      <TabPanel value="deployments">Every build, who shipped it, and what changed.</TabPanel>
      <TabPanel value="settings">Environment variables, domains and access.</TabPanel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Account settings">
        <Tab value="overview">Profile</Tab>
        <Tab value="deployments">Notifications</Tab>
        <Tab value="settings">Billing</Tab>
      </TabList>
      <TabPanel value="overview">Your name, avatar and public handle.</TabPanel>
      <TabPanel value="deployments">Decide which events reach your inbox.</TabPanel>
      <TabPanel value="settings">Plan, payment method and invoices.</TabPanel>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Project sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="deployments">Deployments</Tab>
        <Tab value="analytics" disabled>
          Analytics
        </Tab>
      </TabList>
      <TabPanel value="overview">Arrow keys skip the disabled tab entirely.</TabPanel>
      <TabPanel value="deployments">Every build, who shipped it, and what changed.</TabPanel>
      <TabPanel value="analytics">Not reachable.</TabPanel>
    </Tabs>
  ),
};
