import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useMemo,
  useRef,
} from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../../utils/useControllableState';
import { TabsContext, useTabs } from './context';
import './Tabs.css';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled selected tab. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
}

/**
 * Tabbed sections following the ARIA tabs pattern: one tab stop for the whole
 * list, arrow keys to move between tabs, Home/End to jump to the ends.
 */
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [selected, setSelected] = useControllableState<string | undefined>(value, defaultValue, (next) => {
    if (next !== undefined) onValueChange?.(next);
  });

  const context = useMemo(
    () => ({ value: selected, setValue: setSelected, baseId, orientation }),
    [selected, setSelected, baseId, orientation],
  );

  return (
    <div {...rest} className={cx('sable-tabs', className)} data-orientation={orientation}>
      <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
    </div>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the tab set for assistive tech. */
  'aria-label'?: string;
  children?: ReactNode;
}

export function TabList({ className, children, onKeyDown, ...rest }: TabListProps) {
  const { orientation } = useTabs('TabList');
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const [previous, next] =
      orientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    const keys = [previous, next, 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [],
    );
    if (tabs.length === 0) return;

    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    let index: number;
    if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = tabs.length - 1;
    else if (event.key === next) index = (current + 1) % tabs.length;
    else index = (current - 1 + tabs.length) % tabs.length;

    event.preventDefault();
    // Moving focus selects, which is the expected behaviour for tabs whose
    // panels are cheap to render.
    tabs[index]?.focus();
    tabs[index]?.click();
  };

  return (
    <div
      {...rest}
      ref={listRef}
      className={cx('sable-tabs__list', className)}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Matches the `value` of the panel this tab reveals. */
  value: string;
  children?: ReactNode;
}

export function Tab({ value, className, children, onClick, ...rest }: TabProps) {
  const { value: selected, setValue, baseId } = useTabs('Tab');
  const isSelected = selected === value;

  return (
    <button
      {...rest}
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={isSelected}
      // Only the selected tab is in the page's tab order.
      tabIndex={isSelected ? 0 : -1}
      className={cx('sable-tabs__tab', className)}
      data-selected={isSelected || undefined}
      onClick={(event) => {
        setValue(value);
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keeps the panel mounted while hidden — use when it holds form state. */
  keepMounted?: boolean;
  children?: ReactNode;
}

export function TabPanel({ value, keepMounted = false, className, children, ...rest }: TabPanelProps) {
  const { value: selected, baseId } = useTabs('TabPanel');
  const isSelected = selected === value;
  if (!isSelected && !keepMounted) return null;

  return (
    <div
      {...rest}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isSelected}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: the ARIA tabs pattern asks for this — a panel whose content holds nothing focusable would otherwise be unreachable by keyboard.
      tabIndex={0}
      className={cx('sable-tabs__panel', className)}
    >
      {children}
    </div>
  );
}
