import { useStore } from '@/store/useStore';
import { CARD_VALUES } from '@/types/common.types';
import { calculateAverage, calculateMode } from '@/utils/methods';
import React from 'react';


const ResultsDisplay: React.FC = () => {

  const { session, currentUser,setFinalEstimate,resetVotes } = useStore();

  if (!session || !currentUser) return null;

  // Find current story
  const currentStory = session.stories.find(
    (story) => story.id === session.currentStoryId
  );

  if (!currentStory || !session.areVotesRevealed) return null;

  // Extract vote values (excluding null votes)
  const voteValues = currentStory.votes
    .map((v) => v.value)
    .filter((v): v is number => v !== null && v !== '?');

  // Calculate statistics
  const average = calculateAverage(voteValues);
  const mode = calculateMode(voteValues);
  const lowestVote = voteValues.length > 0 ? Math.min(...voteValues) : null;
  const highestVote = voteValues.length > 0 ? Math.max(...voteValues) : null;

  // Count of "?" votes
  const uncertainVotes = currentStory.votes.filter(
    (v) => v.value === '?' || v.value === null
  ).length;

  // Get the closest valid card value to the average
  const findClosestCardValue = (avg: number): number => {
    if (avg === null) return 0;
    let closest = CARD_VALUES[0] as number;
    
    for (const value of CARD_VALUES) {
      if (typeof value === 'number') {
        if (Math.abs(value - avg) < Math.abs(closest - avg)) {
          closest = value;
        }
      }
    }
    
    return closest;
  };

  const suggestedEstimate = average !== null ? findClosestCardValue(average) : null;

  // Set final estimate
  const handleSetEstimate = (estimate: number) => {
    setFinalEstimate( currentStory.id, estimate );
  };

  // Reset voting
  const handleResetVoting = () => {
    resetVotes(currentStory.id);
  };

  const isHost = currentUser.isHost;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Voting Results</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 p-3 rounded-md">
          <div className="text-sm text-indigo-700">Average</div>
          <div className="text-xl font-bold text-indigo-900">
            {average !== null ? average.toFixed(1) : 'N/A'}
          </div>
        </div>
        
        <div className="bg-emerald-50 p-3 rounded-md">
          <div className="text-sm text-emerald-700">Most Common</div>
          <div className="text-xl font-bold text-emerald-900">
            {mode !== null ? mode : 'N/A'}
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="text-sm text-blue-700">Lowest</div>
          <div className="text-xl font-bold text-blue-900">
            {lowestVote !== null ? lowestVote : 'N/A'}
          </div>
        </div>
        
        <div className="bg-amber-50 p-3 rounded-md">
          <div className="text-sm text-amber-700">Highest</div>
          <div className="text-xl font-bold text-amber-900">
            {highestVote !== null ? highestVote : 'N/A'}
          </div>
        </div>
      </div>
      
      {uncertainVotes > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-md text-yellow-800 text-sm">
          {uncertainVotes} {uncertainVotes === 1 ? 'person needs' : 'people need'} more information
        </div>
      )}
      
      {suggestedEstimate !== null && isHost && currentStory.finalEstimate === null && (
        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            Suggested estimate based on team votes:
          </p>
          <div className="flex flex-wrap gap-2">
            {CARD_VALUES.filter(v => typeof v === 'number').map((value) => (
              <button
                key={value}
                onClick={() => handleSetEstimate(value as number)}
                className={`
                  px-4 py-2 rounded-md text-white font-medium
                  ${value === suggestedEstimate
                    ? 'bg-indigo-600 ring-2 ring-indigo-300'
                    : 'bg-indigo-500 hover:bg-indigo-600'}
                  transition-colors
                `}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isHost && (
        <div className="flex justify-end mt-4">
          {currentStory.finalEstimate !== null ? (
            <div className="text-emerald-600 font-medium flex items-center">
              Final estimate: {currentStory.finalEstimate} points
            </div>
          ) : (
            <button
              onClick={handleResetVoting}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Reset Voting
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;