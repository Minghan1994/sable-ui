import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Field } from '../Field/Field';
import '../Field/Field.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  label?: ReactNode;
  description?: ReactNode;
  /** Marks the input invalid and renders the message below it. */
  error?: ReactNode;
  /** Leading decoration — an icon, a currency symbol. Not focusable. */
  startAdornment?: ReactNode;
  /** Trailing decoration. Not focusable. */
  endAdornment?: ReactNode;
  fullWidth?: boolean;
  /** Class for the outer field wrapper. `className` targets the input itself. */
  wrapperClassName?: string;
}

/** A single-line text field with its label, help text, and error message. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    label,
    description,
    error,
    startAdornment,
    endAdornment,
    fullWidth = false,
    wrapperClassName,
    className,
    id,
    required,
    disabled,
    type = 'text',
    ...rest
  },
  ref,
) {
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
          className="sable-control"
          data-size={size}
          data-invalid={error ? '' : undefined}
          data-disabled={disabled ? '' : undefined}
          data-full-width={fullWidth || undefined}
        >
          {startAdornment && (
            <span className="sable-control__adornment" aria-hidden="true">
              {startAdornment}
            </span>
          )}
          <input
            {...rest}
            {...control}
            ref={ref}
            type={type}
            required={required}
            disabled={disabled}
            className={cx('sable-control__input', className)}
          />
          {endAdornment && (
            <span className="sable-control__adornment" aria-hidden="true">
              {endAdornment}
            </span>
          )}
        </div>
      )}
    </Field>
  );
});
