import { cloneElement, type ReactElement, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { cx } from '../../utils/cx';
import './Tooltip.css';

export interface TooltipProps {
  /** The tip itself. Keep it short — a tooltip is not a place for instructions. */
  content: ReactNode;
  /** @default 'top' */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing, in ms. Pointer only; focus opens immediately. @default 250 */
  delay?: number;
  /** Exactly one focusable element. */
  children: ReactElement<{ 'aria-describedby'?: string }>;
  className?: string;
}

/**
 * A short hint attached to a focusable element.
 *
 * It supplements the trigger's own label rather than replacing it: content that
 * only exists in a tooltip is unreachable by touch, so never put anything
 * essential here. Positioning is plain CSS relative to the trigger, so a tip
 * near a clipping container can be cut off — that is the trade for shipping no
 * positioning engine.
 */
export function Tooltip({ content, placement = 'top', delay = 250, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();
  const tooltipId = `sable-tooltip-${id}`;

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = (immediate = false) => {
    clearTimeout(timer.current);
    if (immediate || delay <= 0) setOpen(true);
    else timer.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  // Escape dismisses the tip without moving focus — WCAG 1.4.13.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: the wrapper only mirrors pointer state for the focusable trigger inside it; every bit of semantics lives on that trigger.
    <span
      className={cx('sable-tooltip', className)}
      onMouseEnter={() => show()}
      onMouseLeave={hide}
      onFocus={() => show(true)}
      onBlur={hide}
    >
      {cloneElement(children, { 'aria-describedby': open ? tooltipId : undefined })}
      <span
        className="sable-tooltip__bubble"
        id={tooltipId}
        role="tooltip"
        data-placement={placement}
        data-open={open || undefined}
      >
        {content}
      </span>
    </span>
  );
}
