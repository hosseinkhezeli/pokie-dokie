import React from 'react';

type TNextPrevButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  type: 'prev' | 'next';
};

export function NextPrevButton({
  disabled,
  onClick,
  type,
}: TNextPrevButtonProps) {
  const label = {
    prev: 'صفحه قبلی',
    next: 'صفحه بعدی',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label[type]}
      className={`btn-pagination`}
      tabIndex={disabled ? -1 : 0}
    >
      {label[type]}
    </button>
  );
}
