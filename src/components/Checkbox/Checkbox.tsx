import { forwardRef, type InputHTMLAttributes, type ReactNode, useEffect, useId, useRef } from 'react';
import { cx } from '../../utils/cx';
import { mergeRefs } from '../../utils/mergeRefs';
import { CheckIcon, MinusIcon } from '../internal/icons';
import '../internal/choice.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  /** Secondary line under the label. Wired through `aria-describedby`. */
  description?: ReactNode;
  /** The "some but not all" state. Purely visual — the input still reports `checked`. */
  indeterminate?: boolean;
  invalid?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md';
  wrapperClassName?: string;
}

/** A checkbox with its label and optional description. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    description,
    indeterminate = false,
    invalid = false,
    size = 'md',
    wrapperClassName,
    className,
    id,
    disabled,
    ...rest
  },
  forwardedRef,
) {
  const innerRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const controlId = id ?? `sable-checkbox-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;

  // `indeterminate` exists only as a DOM property, never as an attribute.
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div
      className={cx('sable-choice', wrapperClassName)}
      data-size={size}
      data-shape="box"
      data-invalid={invalid ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      <input
        {...rest}
        ref={mergeRefs(innerRef, forwardedRef)}
        type="checkbox"
        id={controlId}
        disabled={disabled}
        aria-describedby={descriptionId}
        aria-invalid={invalid || undefined}
        className={cx('sable-choice__input', className)}
      />
      <span className="sable-choice__indicator" aria-hidden="true">
        {indeterminate ? <MinusIcon /> : <CheckIcon />}
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
