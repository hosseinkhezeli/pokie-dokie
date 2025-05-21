import React, { ReactNode } from 'react';

export type Column<T> = {
  key: string;
  label: React.ReactNode;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  renderSkeleton?: () => ReactNode;
};

export type TableProps<T> = {
  data: T[] | undefined;
  columns: Column<T>[];
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: (row: T, index: number) => string | undefined;
  loading?: boolean;
  cellClassName?: (
    row: T,
    column: Column<T>,
    rowIndex: number,
    colIndex: number
  ) => string | undefined;
};

export type TTableHeaderProps = {
  className?: string;
  label: ReactNode;
  idx: number;
};

export type TTableRowProps<T> = {
  row: T;
  columns: Column<T>[];
  rowIndex: number;
  rowClassName?: (row: T, index: number) => string | undefined;
  cellClassName?: (
    row: T,
    column: Column<T>,
    rowIndex: number,
    colIndex: number
  ) => string | undefined;
  loading?: boolean;
  renderSkeleton?: () => ReactNode;
};
