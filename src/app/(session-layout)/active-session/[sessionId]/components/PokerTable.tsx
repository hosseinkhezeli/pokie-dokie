'use client';

import { IUser } from '@/types/user.types';
import { useMemo } from 'react';

type PokerTableProps = {
  participants: IUser[];
  onShowCards?: () => void;
};

export function PokerTable({ participants, onShowCards }: PokerTableProps) {
  // Spread participants evenly in a circle
  const positions = useMemo(() => {
    const angleStep = (2 * Math.PI) / participants.length;
    return participants.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2; // start from top
      const radius = 200; // distance from center
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, [participants]);

  return (
    <div className='grow'>
      <div className='mx-auto relative w-full aspect-[4/3] flex items-center justify-center'>
        {/* Center button */}
        <div className='absolute z-10 w-1/2'>
          <button
            onClick={onShowCards}
            className='px-6 py-3 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition'
          >
            Show cards
          </button>
        </div>

        {/* Players */}
        {participants.map((p, i) => (
          <div
            key={p.id}
            className='absolute flex flex-col items-center'
            style={{
              transform: `translate(${positions[i].x}px, ${positions[i].y}px)`,
            }}
          >
            <div className='w-12 h-16 bg-sky-400 rounded-md mb-1'></div>
            <span className='text-sm font-medium'>{p.fullName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
