import React from 'react';

import { useWebSocket } from '../../hooks/useWebSocket';
import VotingCard from './VotingCard';
import { useStore } from '@/store/useStore';
import { CARD_VALUES, CardValue } from '@/types/common.types';


const VotingCards: React.FC = () => {
  const { currentUser ,session} = useStore();

  const { sendVote } = useWebSocket();

  if (!session || !currentUser) return null;

  // Find current story
  const currentStory = session.stories.find(
    (story) => story.id === session.currentStoryId
  );

  if (!currentStory) return null;

  // User's current vote
  const userVote = currentStory.votes.find((v) => v.userId === currentUser.id);
  const selectedValue = userVote?.value;

  // Calculate vote counts for result display
  const voteCounts = CARD_VALUES.reduce((counts, value) => {
    const count = currentStory.votes.filter(
      (v) => v.value === value
    ).length;
    
    if (count > 0) {
      counts[value] = count;
    }
    
    return counts;
  }, {} as Record<CardValue, number>);

  const handleCardClick = (value: CardValue) => {
    // Toggle vote if already selected
    const newValue = value === selectedValue ? null : value;
    sendVote(currentStory.id, newValue === '?' ? null : newValue);
  };

  // Check if voting is completed (all users voted)
  const votingInProgress = currentStory.status === 'voting';
  const votingCompleted = session.areVotesRevealed;

  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-indigo-900">
          {votingCompleted
            ? 'Results'
            : votingInProgress
              ? 'Choose Your Estimate'
              : 'Waiting for host to start voting'}
        </h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {CARD_VALUES.map((value) => {
          // For result display, only show cards that have votes
          if (votingCompleted && !voteCounts[value]) {
            return null;
          }
          
          return (
            <VotingCard
              key={value}
              value={value}
              isSelected={selectedValue === value}
              onClick={handleCardClick}
              revealed={votingCompleted}
              count={votingCompleted ? voteCounts[value] : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VotingCards;