import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Field } from '../Field/Field';
import { ChevronDownIcon } from '../internal/icons';
import '../Field/Field.css';
import './Select.css';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  /** Renders a disabled first option, so an empty select still reads as a prompt. */
  placeholder?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

/**
 * A native `<select>` in the shared control surface. Native is deliberate:
 * it gets mobile pickers, typeahead, and form integration for free — things a
 * hand-rolled listbox has to re-earn.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    size = 'md',
    label,
    description,
    error,
    placeholder,
    fullWidth = false,
    wrapperClassName,
    className,
    id,
    required,
    disabled,
    defaultValue,
    value,
    children,
    ...rest
  },
  ref,
) {
  const needsPlaceholderDefault = placeholder && value === undefined && defaultValue === undefined;

  return (
    <Field
      label={label}
      description={description}
      error={error}
      required={required}
      id={id}
      className={wrapperClassName}
    >
      {(control) => (
        <div
          className="sable-control sable-select"
          data-size={size}
          data-invalid={error ? '' : undefined}
          data-disabled={disabled ? '' : undefined}
          data-full-width={fullWidth || undefined}
        >
          <select
            {...rest}
            {...control}
            ref={ref}
            required={required}
            disabled={disabled}
            value={value}
            defaultValue={needsPlaceholderDefault ? '' : defaultValue}
            className={cx('sable-control__input', 'sable-select__input', className)}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <span className="sable-control__adornment sable-select__chevron" aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </div>
      )}
    </Field>
  );
});
