import React, { useMemo } from 'react';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableHeader } from '@/components/ui/table/TableHeader';
import { TableProps } from '@/components/ui/table/table.type';

const MemoizedTableRow = React.memo(TableRow) as typeof TableRow;

export default function Table<T>({
  data = [],
  columns,
  tableClassName = '',
  headerClassName = '',
  rowClassName,
  cellClassName,
  loading,
}: TableProps<T>) {
  const skeletonData = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
  })) as unknown as T[];
  const memoizedData = useMemo(
    () => (loading ? skeletonData : data),
    [data, loading]
  );
  const memoizedColumns = useMemo(() => columns, [columns]);

  return (
    <div
      className='overflow-x-auto min-h-max'
      role='region'
      aria-label='prescription table'
    >
      <table
        className={`${tableClassName} min-w-full table-fixed border-collapse`}
        role='grid'
        aria-rowcount={memoizedData?.length + 1} // +1 for header
        aria-colcount={memoizedColumns?.length}
      >
        <thead>
          <tr role='row' aria-rowindex={1}>
            {memoizedColumns.map((column, idx) => (
              <TableHeader
                key={String(column.key) + column?.label}
                className={`${headerClassName} ${column.headerClassName ?? ''}`}
                idx={idx}
                label={column.label}
              />
            ))}
          </tr>
        </thead>
        <tbody className={'overflow-y-auto'}>
          {memoizedData?.map((row, idx) => (
            <MemoizedTableRow
              key={idx}
              row={row}
              columns={memoizedColumns}
              rowIndex={idx}
              rowClassName={rowClassName}
              cellClassName={cellClassName}
              loading={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
