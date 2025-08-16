'use client';

import { useState, useMemo, KeyboardEvent } from 'react';

type Size = 'sm' | 'md' | 'lg';

export type PointCardProps = {
  /** The number shown on the card */
  value: number;
  /** Controlled selection (for radio-group usage) */
  selected?: boolean;
  /** Uncontrolled initial state */
  defaultSelected?: boolean;
  /** Notify parent when user toggles/selects */
  onSelect?: (value: number, selected: boolean) => void;
  /** Visual/interaction disable */
  disabled?: boolean;
  /** Card size */
  size?: Size;
  /** Extra classes */
  className?: string;
  /** If true, behaves as a toggle; if false, works like single select */
  togglable?: boolean;
};

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(' ');

const sizeMap = {
  sm: {
    w: 'w-10',
    h: 'h-16',
    text: 'text-xl',
    corner: 'text-[10px]',
    radius: 'rounded-lg',
    gap: 'p-2',
  },
  md: {
    w: 'w-12',
    h: 'h-20',
    text: 'text-2xl',
    corner: 'text-[11px]',
    radius: 'rounded-xl',
    gap: 'p-2.5',
  },
  lg: {
    w: 'w-16',
    h: 'h-24',
    text: 'text-3xl',
    corner: 'text-[12px]',
    radius: 'rounded-2xl',
    gap: 'p-3',
  },
} as const satisfies Record<Size, Record<string, string>>;

export default function PointCard({
  value,
  selected,
  defaultSelected,
  onSelect,
  disabled,
  size = 'md',
  className,
  togglable = true,
}: PointCardProps) {
  const [internalSelected, setInternalSelected] = useState(!!defaultSelected);
  const isControlled = selected !== undefined;
  const isSelected = isControlled ? selected : internalSelected;
  const sz = sizeMap[size];

  const toggle = () => {
    if (disabled) return;
    const next = togglable ? !isSelected : true;
    if (!isControlled) setInternalSelected(next);
    onSelect?.(value, next);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const ariaLabel = useMemo(
    () => `Story point ${value}${isSelected ? ' (selected)' : ''}`,
    [value, isSelected]
  );

  const formattedValue = value.toLocaleString('fa-IR');

  const cornerClasses = cx(
    'absolute pointer-events-none text-outline bg-surface rounded-full p-1',
    sz.corner
  );

  return (
    <button
      type='button'
      role='radio'
      aria-checked={isSelected}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={toggle}
      onKeyDown={onKeyDown}
      data-selected={isSelected}
      title={`${value}`}
      className={cx(
        'relative isolate inline-flex items-center justify-center select-none transition-all duration-150 ease-out',
        sz.w,
        sz.h,
        sz.radius,
        sz.gap,
        'bg-surface border border-gray-200 shadow-sm font-medium leading-none',
        !disabled && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md',
        disabled && 'opacity-60 cursor-not-allowed',
        isSelected
          ? 'ring-2 ring-primary-fixed border-primary-fixed'
          : 'hover:ring-1 hover:ring-primary-fixed-dim',
        className
      )}
    >
      <span className={cx(cornerClasses, 'top-1 left-1')}>
        {formattedValue}
      </span>
      <span className={cx(cornerClasses, 'bottom-1 right-1')}>
        {formattedValue}
      </span>

      <span
        className={cx(
          sz.text,
          'grid place-content-center w-full h-full transition-colors',
          isSelected
            ? 'text-primary rounded-lg bg-primary-container'
            : 'text-on-surface'
        )}
      >
        {formattedValue}
      </span>
    </button>
  );
}
