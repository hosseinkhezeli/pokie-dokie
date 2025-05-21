import React from 'react';

type TPageButtonProps = {
  onClick?: () => void;
  page: number;
  isCurrentPage: boolean;
};

export function PageButton({ isCurrentPage, page, onClick }: TPageButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-current={isCurrentPage ? 'page' : undefined}
      aria-label={isCurrentPage ? `صفحه فعلی، صفحه ${page}` : `صفحه ${page}`}
      className={`px-3 py-1 rounded-md hover:scale-105 ${
        isCurrentPage ? 'bg-[#CCEDF9]' : 'bg-surface-disabled'
      } `}
      tabIndex={isCurrentPage ? -1 : 0}
    >
      {page}
    </button>
  );
}
