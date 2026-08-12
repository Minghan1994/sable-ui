import { type ReactNode, useId, useMemo } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../../utils/useControllableState';
import { RadioGroupContext } from './context';
import '../internal/choice.css';

export interface RadioGroupProps {
  /** Shared `name` for the underlying inputs. Generated when omitted. */
  name?: string;
  /** Controlled selection. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Rendered as the fieldset's legend — the group's accessible name. */
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  /** @default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Groups radios in a `<fieldset>` so the legend names the whole set. Without
 * that grouping a screen reader reads each option out of context.
 */
export function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  label,
  description,
  error,
  orientation = 'vertical',
  disabled,
  className,
  children,
}: RadioGroupProps) {
  const generatedName = useId();
  const groupId = useId();
  const [selected, setSelected] = useControllableState<string | undefined>(value, defaultValue, (next) => {
    if (next !== undefined) onValueChange?.(next);
  });

  const descriptionId = description ? `${groupId}-description` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const context = useMemo(
    () => ({
      name: name ?? `sable-radio-${generatedName}`,
      value: selected,
      onSelect: setSelected,
      disabled,
      invalid: Boolean(error),
    }),
    [name, generatedName, selected, setSelected, disabled, error],
  );

  return (
    <fieldset
      className={cx('sable-choice-group', className)}
      data-orientation={orientation}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      disabled={disabled}
    >
      {label && <legend className="sable-choice-group__legend">{label}</legend>}
      {description && (
        <p className="sable-choice-group__description" id={descriptionId}>
          {description}
        </p>
      )}
      <div className="sable-choice-group__items">
        <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
      </div>
      {error && (
        <p className="sable-choice-group__error" id={errorId}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
