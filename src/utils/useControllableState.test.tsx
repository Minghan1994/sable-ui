import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState';

function Counter({ value, onChange }: { value?: number; onChange?: (next: number) => void }) {
  const [count, setCount] = useControllableState(value, 0, onChange);
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

describe('useControllableState', () => {
  it('manages its own state when uncontrolled', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('1');
  });

  it('reports changes while uncontrolled', async () => {
    const onChange = vi.fn();
    render(<Counter onChange={onChange} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('defers to the prop when controlled', async () => {
    const onChange = vi.fn();
    render(<Counter value={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('5');
    expect(onChange).toHaveBeenCalledWith(6);
  });
});
