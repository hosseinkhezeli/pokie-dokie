import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CopyIcon, GemIcon, LogOutIcon, UsersIcon } from 'lucide-react';

const SessionDetails: React.FC = () => {
  const { session, currentUser, setSession, setCurrentUser } = useStore();
  const [copied, setCopied] = useState(false);

  if (!session || !currentUser) return null;

  const handleCopySessionId = () => {
    navigator.clipboard.writeText(session.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveSession = () => {
    if (window.confirm('Are you sure you want to leave this session?')) {
      setSession(null);
      setCurrentUser(null);
    }
  };

  const activeUsers = session.users.filter((u) => u.isActive).length;

  return (
    <div className='bg-white border-b border-gray-200 py-3 px-4 sm:px-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center'>
          <GemIcon className='h-6 w-6 text-indigo-600 mr-2' />
          <h1 className='text-xl font-bold text-gray-900 mr-2'>
            {session.name}
          </h1>
          <div className='hidden sm:flex items-center text-sm text-gray-500'>
            <UsersIcon className='h-4 w-4 mr-1' />
            <span>{activeUsers} active</span>
          </div>
        </div>

        <div className='mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:space-x-4'>
          <div className='flex items-center sm:justify-end mb-2 sm:mb-0'>
            <div className='text-sm text-gray-500 mr-2'>Session ID:</div>
            <div className='text-sm font-medium flex items-center space-x-2'>
              <code className='bg-gray-100 px-2 py-1 rounded'>
                {session.id}
              </code>
              <button
                onClick={handleCopySessionId}
                className='text-indigo-600 hover:text-indigo-800 focus:outline-none'
                title='Copy session ID'
              >
                <CopyIcon className='h-4 w-4' />
              </button>
              {copied && (
                <span className='text-xs text-green-600'>Copied!</span>
              )}
            </div>
          </div>

          <button
            onClick={handleLeaveSession}
            className='flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <LogOutIcon className='h-4 w-4 mr-1' />
            Leave Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
