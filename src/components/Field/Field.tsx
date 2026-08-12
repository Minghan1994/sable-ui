import { type ReactNode, useId } from 'react';
import { cx } from '../../utils/cx';
import './Field.css';

export interface FieldControlProps {
  id: string;
  'aria-describedby': string | undefined;
  'aria-invalid': true | undefined;
  'aria-required': true | undefined;
}

export interface FieldProps {
  label?: ReactNode;
  /** Help text. Wired to the control through `aria-describedby`. */
  description?: ReactNode;
  /** Presence of an error makes the control invalid and announces the message. */
  error?: ReactNode;
  required?: boolean;
  /** Overrides the generated control id. */
  id?: string;
  className?: string;
  /** Receives the id and ARIA wiring to spread onto the control. */
  children: (control: FieldControlProps) => ReactNode;
}

/**
 * Label, help text, and error message around a form control — plus the
 * `aria-describedby` / `aria-invalid` wiring that is easy to forget and
 * invisible when you get it wrong.
 */
export function Field({ label, description, error, required, id, className, children }: FieldProps) {
  const generatedId = useId();
  const controlId = id ?? `sable-field-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('sable-field', className)} data-invalid={error ? '' : undefined}>
      {label && (
        <label className="sable-field__label" htmlFor={controlId}>
          {label}
          {required && (
            <span className="sable-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children({
        id: controlId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        'aria-required': required || undefined,
      })}

      {description && (
        <p className="sable-field__description" id={descriptionId}>
          {description}
        </p>
      )}
      {error && (
        <p className="sable-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
