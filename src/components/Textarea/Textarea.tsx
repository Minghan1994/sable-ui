import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Field } from '../Field/Field';
import '../Field/Field.css';
import './Textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  /** @default 'vertical' */
  resize?: 'none' | 'vertical';
  wrapperClassName?: string;
}

/** A multi-line text field. Shares the control surface with `Input`. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    description,
    error,
    fullWidth = false,
    resize = 'vertical',
    wrapperClassName,
    className,
    id,
    required,
    disabled,
    rows = 4,
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
          data-size="md"
          data-multiline=""
          data-invalid={error ? '' : undefined}
          data-disabled={disabled ? '' : undefined}
          data-full-width={fullWidth || undefined}
        >
          <textarea
            {...rest}
            {...control}
            ref={ref}
            rows={rows}
            required={required}
            disabled={disabled}
            className={cx('sable-control__input', 'sable-textarea', className)}
            data-resize={resize}
          />
        </div>
      )}
    </Field>
  );
});
