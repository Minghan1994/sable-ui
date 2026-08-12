import { type HTMLAttributes, type ReactNode, useEffect, useId, useRef } from 'react';
import { cx } from '../../utils/cx';
import { IconButton } from '../IconButton/IconButton';
import { CloseIcon } from '../internal/icons';
import './Modal.css';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'title'> {
  open: boolean;
  /** Called for every dismissal: close button, backdrop, and Escape. */
  onClose: () => void;
  /** The dialog's accessible name. */
  title: ReactNode;
  description?: ReactNode;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Actions, pinned to the bottom of the dialog. */
  footer?: ReactNode;
  /** @default true */
  closeOnBackdropClick?: boolean;
  /** Hides the corner close button. Escape still works. */
  hideCloseButton?: boolean;
  /** @default 'Close' */
  closeLabel?: string;
  children?: ReactNode;
}

/**
 * A modal dialog built on the native `<dialog>` element, which brings the focus
 * trap, the inert background, Escape-to-close and the top layer with it — all
 * the parts a hand-rolled modal usually gets subtly wrong.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  closeOnBackdropClick = true,
  hideCloseButton = false,
  closeLabel = 'Close',
  className,
  children,
  ...rest
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const titleId = `sable-modal-${id}-title`;
  const descriptionId = description ? `sable-modal-${id}-description` : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  // `close` fires for Escape too, so this is the single exit path.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: the click handler only covers backdrop dismissal, which is pointer-only by nature; the keyboard equivalent is Escape, handled natively by <dialog>.
    <dialog
      {...rest}
      ref={dialogRef}
      className={cx('sable-modal', className)}
      data-size={size}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={(event) => {
        // The dialog element fills the viewport; a click landing on it rather
        // than on the panel inside means the backdrop was hit.
        if (closeOnBackdropClick && event.target === dialogRef.current) onClose();
      }}
    >
      <div className="sable-modal__panel">
        <div className="sable-modal__header">
          <div className="sable-modal__heading">
            <h2 className="sable-modal__title" id={titleId}>
              {title}
            </h2>
            {description && (
              <p className="sable-modal__description" id={descriptionId}>
                {description}
              </p>
            )}
          </div>
          {!hideCloseButton && (
            <IconButton icon={<CloseIcon />} label={closeLabel} size="sm" onClick={onClose} />
          )}
        </div>

        {children && <div className="sable-modal__body">{children}</div>}
        {footer && <div className="sable-modal__footer">{footer}</div>}
      </div>
    </dialog>
  );
}
