'use client';
import React, { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NextPrevButton } from '@/components/ui/pagination/NextPrevButton';
import { PageButton } from '@/components/ui/pagination/PageButton';
import { SEARCH_PARAMS_KEYS } from '@/const';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useSelector } from 'react-redux';
import { selectTotalCount } from '@/redux/selectors';

interface PaginationProps {
  totalCount?: number;
  pageSize?: number;
  collapseThreshold?: number;
}

const PAGE_SIZE = 8;

export function Pagination({
  totalCount,
  pageSize = PAGE_SIZE,
  collapseThreshold = 7,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addQueryParam, removeQueryParam } = useQueryParams();
  const reduxTotalCount = useSelector(selectTotalCount);

  const totalPages = Math.ceil(
    (totalCount ?? (reduxTotalCount || pageSize)) / pageSize
  );
  const currentPage = Number(searchParams.get(SEARCH_PARAMS_KEYS?.page)) || 1;

  useEffect(() => {
    if (totalPages < 2) {
      removeQueryParam(SEARCH_PARAMS_KEYS?.page);
    }
  }, [totalPages]);
  const Ellipsis = (key: string) => (
    <span
      key={key}
      className='px-2 text-gray-500 select-none'
      aria-hidden='true'
    >
      &hellip;
    </span>
  );

  const getPageNumbers = () => {
    if (totalPages <= collapseThreshold) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'left-ellipsis' | 'right-ellipsis')[] = [];

    pages.push(1);
    pages.push(2);

    if (currentPage > 4 && currentPage < totalPages - 3) {
      pages.push('left-ellipsis');
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push('right-ellipsis');
    } else if (currentPage <= 4) {
      pages.push(3, 4, 5);
      pages.push('right-ellipsis');
    } else {
      pages.push('left-ellipsis');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      const params = new URLSearchParams(searchParams.toString());
      addQueryParam(
        SEARCH_PARAMS_KEYS?.page,
        page?.toString(),
        params?.toString()
      );
    },
    [currentPage, router, searchParams, totalPages]
  );

  return (
    <nav aria-label='Pagination Navigation' className='med-pagination'>
      <NextPrevButton
        type='prev'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pageNumbers.map((page, idx) =>
        page === 'left-ellipsis' || page === 'right-ellipsis' ? (
          Ellipsis(page + idx.toString())
        ) : (
          <PageButton
            key={page}
            page={page}
            isCurrentPage={page === currentPage}
            onClick={() => handlePageChange(page as number)}
          />
        )
      )}

      <NextPrevButton
        type='next'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      />
    </nav>
  );
}
