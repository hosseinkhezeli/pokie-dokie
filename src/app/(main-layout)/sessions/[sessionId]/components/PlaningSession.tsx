'use client';
import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { calculateVotingCompletion } from '@/utils/methods';
import { useWebSocket } from '@/hooks/useWebSocket';
import Timer from '@/components/timer/Timer';
import StoryList from '@/components/story/StoryList';
import CurrentStory from '@/components/current-story/CurrentStory';
import VotingCards from '@/components/voting/VotingCards';
import ResultsDisplay from '@/components/voting/ResultDisplay';
import UserList from '@/components/user/UsersList';
import SessionDetails from '@/components/session/SessionDetails';

const PlanningSession: React.FC = () => {
  const { session, currentUser } = useStore();
  const { revealVotes } = useWebSocket();

  // Find current story
  const currentStory = session?.stories.find(
    (s) => s.id === session.currentStoryId
  );

  // Check if all users have voted on current story
  useEffect(() => {
    if (!session || !currentStory || session.areVotesRevealed) return;

    const activeUserIds = session.users
      .filter((u) => u.isActive)
      .map((u) => u.id);

    const allUsersVoted =
      activeUserIds.length > 0 &&
      activeUserIds.every((userId) =>
        currentStory.votes.some((v) => v.userId === userId)
      );

    // Automatically reveal votes when all users have voted
    if (allUsersVoted && activeUserIds.length > 1) {
      revealVotes();
    }
  }, [currentStory?.votes]);

  // Calculate voting progress
  const calculateProgress = () => {
    if (!session || !currentStory) return 0;

    const activeUserIds = session.users
      .filter((u) => u.isActive)
      .map((u) => u.id);

    return calculateVotingCompletion(currentStory.votes, activeUserIds);
  };
  if (!session || !currentUser) return null;
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <SessionDetails />

      <div className='flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Left Sidebar */}
        <div className='lg:col-span-1 space-y-6'>
          <StoryList />
          <UserList />
        </div>

        {/* Main Content */}
        <div className='lg:col-span-3 space-y-6'>
          {currentStory ? (
            <>
              <CurrentStory
                story={currentStory}
                votingProgress={calculateProgress()}
              />

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='md:col-span-2'>
                  <VotingCards />
                  {session.areVotesRevealed && <ResultsDisplay />}
                </div>

                <div>
                  <Timer />
                </div>
              </div>
            </>
          ) : (
            <div className='bg-white rounded-lg shadow-md p-6 text-center'>
              <h3 className='text-xl font-medium text-gray-800 mb-2'>
                No story selected
              </h3>
              <p className='text-gray-600'>
                Select a story from the list to start estimating or
                {currentUser.isHost
                  ? ' add a new one.'
                  : ' wait for the host to add one.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanningSession;
