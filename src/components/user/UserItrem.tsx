import React from 'react';

import { CheckIcon, CrownIcon } from 'lucide-react';
import { User } from '@/types/common.types';
import { useStore } from '@/store/useStore';

interface UserItemProps {
  user: User;
  isCurrentUser: boolean;
  currentStoryId: string | null;
}

const UserItem: React.FC<UserItemProps> = ({ user, isCurrentUser, currentStoryId }) => {

  const { session } = useStore();
  
  if (!session) return null;

  // Check if the user has voted on the current story
  const hasVoted = currentStoryId 
    ? session.stories.find(s => s.id === currentStoryId)?.votes.some(v => v.userId === user.id)
    : false;

  return (
    <div className={`
      p-3 flex items-center justify-between
      ${!user.isActive ? 'opacity-50' : ''}
      ${isCurrentUser ? 'bg-indigo-50' : ''}
    `}>
      <div className="flex items-center">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${isCurrentUser ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}
          ${!user.isActive ? 'opacity-50' : ''}
        `}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="ml-3">
          <div className="flex items-center">
            <span className="font-medium text-gray-900">
              {user.name}
            </span>
            
            {user.isHost && (
              <span className="ml-1" title="Host">
                <CrownIcon className="h-3.5 w-3.5 text-amber-500" />
              </span>
            )}
            
            {isCurrentUser && (
              <span className="ml-1 text-xs text-gray-500">(you)</span>
            )}
          </div>
          
          {!user.isActive && (
            <div className="text-xs text-gray-500">Disconnected</div>
          )}
        </div>
      </div>
      
      <div>
        {hasVoted && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
            <CheckIcon className="h-3 w-3 mr-1" />
            Voted
          </span>
        )}
      </div>
    </div>
  );
};

export default UserItem;