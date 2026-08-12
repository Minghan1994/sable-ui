import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

function Example({ defaultValue = 'overview' }: { defaultValue?: string }) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabList aria-label="Project sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="deployments">Deployments</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">Overview panel</TabPanel>
      <TabPanel value="deployments">Deployments panel</TabPanel>
      <TabPanel value="settings">Settings panel</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('exposes the ARIA tabs structure', () => {
    render(<Example />);
    expect(screen.getByRole('tablist', { name: 'Project sections' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toBeInTheDocument();
  });

  it('shows only the selected panel', () => {
    render(<Example />);
    expect(screen.getByText('Overview panel')).toBeInTheDocument();
    expect(screen.queryByText('Settings panel')).not.toBeInTheDocument();
  });

  it('keeps a single tab stop in the page order', () => {
    render(<Example />);
    const [overview, deployments] = screen.getAllByRole('tab');
    expect(overview).toHaveAttribute('tabindex', '0');
    expect(deployments).toHaveAttribute('tabindex', '-1');
  });

  it('switches panels on click', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('tab', { name: 'Settings' }));
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Settings panel')).toBeInTheDocument();
  });

  describe('keyboard', () => {
    it('moves to the next tab with ArrowRight', async () => {
      render(<Example />);
      screen.getByRole('tab', { name: 'Overview' }).focus();
      await userEvent.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Deployments' })).toHaveFocus();
      expect(screen.getByText('Deployments panel')).toBeInTheDocument();
    });

    it('wraps around from the last tab', async () => {
      render(<Example defaultValue="settings" />);
      screen.getByRole('tab', { name: 'Settings' }).focus();
      await userEvent.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
    });

    it('jumps to the ends with Home and End', async () => {
      render(<Example defaultValue="deployments" />);
      screen.getByRole('tab', { name: 'Deployments' }).focus();
      await userEvent.keyboard('{End}');
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();
      await userEvent.keyboard('{Home}');
      expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
    });
  });

  it('keeps a mounted panel hidden rather than removing it', () => {
    render(
      <Tabs defaultValue="a">
        <TabList aria-label="Sections">
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b" keepMounted>
          Panel B
        </TabPanel>
      </Tabs>,
    );
    expect(screen.getByText('Panel B')).not.toBeVisible();
  });
});
