import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import { cx } from '../../utils/cx';
import { useRadioGroup } from '../RadioGroup/context';
import '../internal/choice.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** The value this option contributes when selected. */
  value: string;
  label?: ReactNode;
  description?: ReactNode;
  /** @default 'md' */
  size?: 'sm' | 'md';
  wrapperClassName?: string;
}

/** One option. Reads its `name`, selection and disabled state from an enclosing `RadioGroup`. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, size = 'md', wrapperClassName, className, id, disabled, name, ...rest },
  ref,
) {
  const group = useRadioGroup();
  const generatedId = useId();
  const controlId = id ?? `sable-radio-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const isDisabled = disabled ?? group?.disabled;

  return (
    <div
      className={cx('sable-choice', wrapperClassName)}
      data-size={size}
      data-shape="circle"
      data-invalid={group?.invalid ? '' : undefined}
      data-disabled={isDisabled ? '' : undefined}
    >
      <input
        {...rest}
        ref={ref}
        type="radio"
        id={controlId}
        value={value}
        name={name ?? group?.name}
        disabled={isDisabled}
        checked={group ? group.value === value : rest.checked}
        onChange={(event) => {
          group?.onSelect(value);
          rest.onChange?.(event);
        }}
        aria-describedby={descriptionId}
        className={cx('sable-choice__input', className)}
      />
      <span className="sable-choice__indicator" aria-hidden="true">
        <span className="sable-choice__dot" />
      </span>
      {(label || description) && (
        <span className="sable-choice__body">
          {label && (
            <label className="sable-choice__label" htmlFor={controlId}>
              {label}
            </label>
          )}
          {description && (
            <span className="sable-choice__description" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      )}
    </div>
  );
});
