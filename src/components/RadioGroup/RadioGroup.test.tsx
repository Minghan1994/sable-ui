import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from '../Radio/Radio';
import { RadioGroup } from './RadioGroup';

const options = (
  <>
    <Radio value="development" label="Development" />
    <Radio value="staging" label="Staging" />
    <Radio value="production" label="Production" />
  </>
);

describe('RadioGroup', () => {
  it('names the group through its legend', () => {
    render(<RadioGroup label="Deployment target">{options}</RadioGroup>);
    expect(screen.getByRole('group', { name: 'Deployment target' })).toBeInTheDocument();
  });

  it('gives every option the same name so only one can be selected', () => {
    render(<RadioGroup label="Target">{options}</RadioGroup>);
    const names = screen.getAllByRole<HTMLInputElement>('radio').map((radio) => radio.name);
    expect(new Set(names).size).toBe(1);
    expect(names[0]).toBeTruthy();
  });

  it('selects an option and reports the new value', async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup label="Target" onValueChange={onValueChange}>
        {options}
      </RadioGroup>,
    );
    await userEvent.click(screen.getByLabelText('Staging'));
    expect(screen.getByLabelText('Staging')).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('staging');
  });

  it('honours defaultValue', () => {
    render(
      <RadioGroup label="Target" defaultValue="production">
        {options}
      </RadioGroup>,
    );
    expect(screen.getByLabelText('Production')).toBeChecked();
  });

  it('stays put when controlled and the parent ignores the change', async () => {
    render(
      <RadioGroup label="Target" value="staging" onValueChange={() => {}}>
        {options}
      </RadioGroup>,
    );
    await userEvent.click(screen.getByLabelText('Production'));
    expect(screen.getByLabelText('Staging')).toBeChecked();
    expect(screen.getByLabelText('Production')).not.toBeChecked();
  });

  it('disables every option at once', () => {
    render(
      <RadioGroup label="Target" disabled>
        {options}
      </RadioGroup>,
    );
    for (const radio of screen.getAllByRole('radio')) expect(radio).toBeDisabled();
  });

  it('describes the group with its error message', () => {
    render(
      <RadioGroup label="Target" error="Choose a deployment target.">
        {options}
      </RadioGroup>,
    );
    expect(screen.getByRole('group')).toHaveAccessibleDescription('Choose a deployment target.');
  });
});
