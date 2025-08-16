// Controlled, single-select group
'use client';
import { useState } from 'react';
import PointCard from '@/components/PointCard';

const values = [0, 1, 2, 3, 5, 13, 20, 40];

export default function PointsDeck() {
  const [sel, setSel] = useState<number | null>(2);
  return (
    <div className='pt-3 pb-4 fixed bg-surface bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-min  rounded-full flex justify-between px-12 '>
      <div role='radiogroup' className='flex gap-3'>
        {values.map((v) => (
          <PointCard
            key={v}
            value={v}
            selected={sel === v}
            togglable={false}
            onSelect={() => setSel(v)}
          />
        ))}
      </div>
    </div>
  );
}
