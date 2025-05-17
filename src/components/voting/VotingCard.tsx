import { CardValue } from '@/types/common.types';
import React from 'react';


interface VotingCardProps {
  value: CardValue;
  isSelected: boolean;
  onClick: (value: CardValue) => void;
  revealed?: boolean;
  count?: number;
}

const VotingCard: React.FC<VotingCardProps> = ({
  value,
  isSelected,
  onClick,
  revealed = false,
  count,
}) => {
  const handleClick = () => {
    onClick(value);
  };

  // Determine the display value (for card front and back)
  const displayValue = value === '?' ? '?' : value;

  return (
    <div 
      className={`
        relative group perspective
        transition-transform duration-300 ease-in-out
        transform-gpu ${isSelected ? 'scale-110' : 'hover:scale-105'}
      `}
      onClick={handleClick}
    >
      <div className={`
        transition-all duration-300 ease-in-out transform-gpu preserve-3d
        ${revealed ? 'rotate-y-180' : ''}
        w-16 h-24 sm:w-20 sm:h-28 cursor-pointer
      `}>
        {/* Card Front */}
        <div className={`
          absolute w-full h-full backface-hidden
          flex items-center justify-center
          rounded-lg border-2 select-none
          ${isSelected 
            ? 'bg-indigo-600 text-white border-indigo-700' 
            : 'bg-white text-indigo-800 border-indigo-200 hover:border-indigo-400'}
        `}>
          <span className="text-2xl font-bold">{displayValue}</span>
        </div>
        
        {/* Card Back */}
        <div className={`
          absolute w-full h-full backface-hidden rotate-y-180
          flex items-center justify-center
          rounded-lg border-2 border-indigo-200
          bg-gradient-to-br from-indigo-500 to-indigo-700
        `}>
          <div className="text-white text-2xl font-bold">{displayValue}</div>
          
          {/* Vote count badge (when revealed) */}
          {revealed && count !== undefined && count > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">
              {count}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingCard;