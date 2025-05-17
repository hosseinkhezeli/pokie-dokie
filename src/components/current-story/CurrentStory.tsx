import React from 'react';

import { useWebSocket } from '../../hooks/useWebSocket';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Story } from '@/types/common.types';
import { useStore } from '@/store/useStore';

interface CurrentStoryProps {
  story: Story;
  votingProgress: number;
}

const CurrentStory: React.FC<CurrentStoryProps> = ({
  story,
  votingProgress,
}) => {
  const { session, currentUser } = useStore();

  const { revealVotes, hideVotes, resetVoting } = useWebSocket();

  if (!session || !currentUser) return null;

  const isHost = currentUser.isHost;
  const areVotesRevealed = session.areVotesRevealed;

  const handleRevealVotes = () => {
    revealVotes();
  };

  const handleHideVotes = () => {
    hideVotes();
  };

  const handleResetVoting = () => {
    resetVoting();
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='bg-indigo-600 px-6 py-4'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
          <h2 className='text-xl font-bold text-white'>{story.title}</h2>

          {story.status === 'voting' && isHost && (
            <div className='mt-3 sm:mt-0 flex space-x-3'>
              {areVotesRevealed ? (
                <button
                  onClick={handleHideVotes}
                  className='flex items-center px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600'
                >
                  <EyeOffIcon className='h-4 w-4 mr-1' />
                  Hide Votes
                </button>
              ) : (
                <button
                  onClick={handleRevealVotes}
                  className='flex items-center px-3 py-1 text-sm bg-white text-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600'
                >
                  <EyeIcon className='h-4 w-4 mr-1' />
                  Reveal Votes
                </button>
              )}

              <button
                onClick={handleResetVoting}
                className='px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600'
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='p-6'>
        <div className='mb-4'>
          <p className='text-gray-700'>{story.description}</p>
        </div>

        {story.status === 'voting' && !areVotesRevealed && (
          <div className='mt-4'>
            <div className='flex justify-between text-sm text-gray-600 mb-1'>
              <span>Voting Progress</span>
              <span>{votingProgress}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out'
                style={{ width: `${votingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {story.status === 'completed' && (
          <div className='mt-4 flex items-center'>
            <span className='text-gray-700 font-medium'>Final Estimate:</span>
            <span className='ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800'>
              {story.finalEstimate} points
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentStory;
