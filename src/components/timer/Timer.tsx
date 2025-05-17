import React, { useState } from 'react';

import { ClockIcon, PauseIcon, PlayIcon } from 'lucide-react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useStore } from '@/store/useStore';
import { useTimer } from './useTimer';

const Timer: React.FC = () => {
  const { session, currentUser } = useStore();

  const { isRunning, formattedTime, progressPercentage } = useTimer();
  const { startTimer, stopTimer } = useWebSocket();
  const [timerDuration, setTimerDuration] = useState(60); // Default: 1 minute

  if (!session || !currentUser) return null;

  const isHost = currentUser.isHost;

  // Timer duration options (in seconds)
  const durationOptions = [
    { label: '30s', value: 30 },
    { label: '1m', value: 60 },
    { label: '2m', value: 120 },
    { label: '3m', value: 180 },
    { label: '5m', value: 300 },
  ];

  const handleStartTimer = () => {
    startTimer(timerDuration);
  };

  const handleStopTimer = () => {
    stopTimer();
  };

  const handleDurationChange = (duration: number) => {
    setTimerDuration(duration);
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-lg font-medium text-gray-900 flex items-center'>
          <ClockIcon className='h-5 w-5 mr-2 text-indigo-600' />
          Timer
        </h3>

        {isHost && !isRunning && (
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-gray-500'>Duration:</span>
            <div className='flex rounded-md overflow-hidden border border-gray-300'>
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDurationChange(option.value)}
                  className={`
                    px-2 py-1 text-xs font-medium
                    ${
                      timerDuration === option.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='relative h-8 bg-gray-100 rounded-full overflow-hidden'>
        <div
          className='absolute h-full bg-indigo-500 transition-all duration-1000'
          style={{ width: `${isRunning ? progressPercentage() : 0}%` }}
        />
        <div className='absolute inset-0 flex items-center justify-center text-sm font-medium'>
          {isRunning ? formattedTime() : 'Ready'}
        </div>
      </div>

      {isHost && (
        <div className='mt-3 flex justify-end'>
          {isRunning ? (
            <button
              onClick={handleStopTimer}
              className='flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            >
              <PauseIcon className='h-4 w-4 mr-1' />
              Stop
            </button>
          ) : (
            <button
              onClick={handleStartTimer}
              className='flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              <PlayIcon className='h-4 w-4 mr-1' />
              Start
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;
