import React from 'react';

import { UsersIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import UserItem from './UserItrem';

const UserList: React.FC = () => {
  const { session, currentUser } = useStore();

  if (!session || !currentUser) return null;

  // Sort users: active first, then host first, then alphabetically
  const sortedUsers = [...session.users].sort((a, b) => {
    // Active users first
    if (a.isActive !== b.isActive) {
      return a.isActive ? -1 : 1;
    }

    // Host first
    if (a.isHost !== b.isHost) {
      return a.isHost ? -1 : 1;
    }

    // Alphabetically by name
    return a.name.localeCompare(b.name);
  });

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center'>
        <h2 className='text-lg font-medium text-indigo-800 flex items-center'>
          <UsersIcon className='h-5 w-5 mr-2 text-indigo-600' />
          Participants
        </h2>
        <span className='text-sm text-indigo-700 font-medium'>
          {session.users.filter((u) => u.isActive).length} active
        </span>
      </div>

      <div className='divide-y divide-gray-200'>
        {sortedUsers.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isCurrentUser={user.id === currentUser.id}
            currentStoryId={session.currentStoryId}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
