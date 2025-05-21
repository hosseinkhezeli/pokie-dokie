import React from 'react';
import { TextSkeleton } from '@/components/ui/skeleton/TextSkeleton';
import { EMPTY_TEXT } from '@/const';
import { TTableRowProps } from '@/components/ui/table/table.type';

export function TableRow<T>({
  row,
  columns,
  rowIndex,
  rowClassName,
  cellClassName,
  loading,
}: TTableRowProps<T>) {
  const computedRowClass = rowClassName ? rowClassName(row, rowIndex) : '';

  const defaultRender = (val: any): React.ReactNode => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'boolean') return val ? 'True' : 'False';
    if (typeof val === 'object') return JSON.stringify(val);
    return val;
  };

  return (
    <tr
      className={`${computedRowClass ?? ''}`}
      role='row'
      aria-rowindex={rowIndex + 2} // +2 because header is row 1
    >
      {columns.map((column, colIndex) => {
        const value = row[column.key] ?? EMPTY_TEXT;
        const content = column.render
          ? column.render(value, row, rowIndex)
          : defaultRender(value);
        const computedCellClass = cellClassName
          ? cellClassName(row, column, rowIndex, colIndex)
          : '';

        return (
          <td
            key={String(column.key)}
            className={`px-4 py-2 align-middle text-bodySm break-words ${
              column.className ?? ''
            } ${column.cellClassName ?? ''} ${computedCellClass ?? ''}`}
            role='gridcell'
            aria-colindex={colIndex + 1}
            tabIndex={0}
          >
            {loading
              ? (column?.renderSkeleton?.() ?? (
                  <TextSkeleton key={colIndex} className={'w-1/2 mx-auto'} />
                ))
              : content}
          </td>
        );
      })}
    </tr>
  );
}
