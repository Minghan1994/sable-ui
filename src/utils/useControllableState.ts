import { useCallback, useRef, useState } from 'react';

/**
 * One hook for the controlled/uncontrolled split every input-like component needs.
 *
 * Pass `value` to control it from the outside; leave it undefined and the state
 * lives here, seeded by `defaultValue`. `onChange` fires either way.
 */
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void,
): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);
  const isControlled = value !== undefined;

  // Keeps the setter stable without making callers memoize onChange.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [isControlled ? value : uncontrolled, setValue];
}
