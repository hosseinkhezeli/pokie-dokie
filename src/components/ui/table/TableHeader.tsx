import React from 'react';
import { TTableHeaderProps } from './table.type';

export function TableHeader({ className, idx, label }: TTableHeaderProps) {
  return (
    <th
      scope='col'
      className={`px-4 py-2 align-top text-right break-words text-bodySm ${className}`}
      role='columnheader'
      aria-colindex={idx + 1}
    >
      {label}
    </th>
  );
}
