import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles when the label is clicked', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Email me updates" onChange={onChange} />);
    await userEvent.click(screen.getByText('Email me updates'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('sets indeterminate as a DOM property, since it has no attribute', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole<HTMLInputElement>('checkbox');
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).not.toBeChecked();
  });

  it('clears indeterminate when the prop goes away', () => {
    const { rerender } = render(<Checkbox label="Select all" indeterminate />);
    rerender(<Checkbox label="Select all" indeterminate={false} />);
    expect(screen.getByRole<HTMLInputElement>('checkbox').indeterminate).toBe(false);
  });

  it('describes itself with its description', () => {
    render(<Checkbox label="Email me updates" description="About one email a month." />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('About one email a month.');
  });

  it('exposes the invalid state', () => {
    render(<Checkbox label="Accept the terms" invalid />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not toggle while disabled', async () => {
    render(<Checkbox label="Email me updates" disabled />);
    await userEvent.click(screen.getByText('Email me updates'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
