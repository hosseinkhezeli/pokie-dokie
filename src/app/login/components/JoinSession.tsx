'use client'
import React, { useState } from 'react';

import { User } from '@/types/common.types';
import { generateId } from '@/utils/methods';

interface JoinSessionProps {
  onJoin: (sessionId: string, user: User) => void;
  isLoading: boolean;
}

const JoinSession: React.FC<JoinSessionProps> = ({ onJoin, isLoading }) => {
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionId.trim()) {
      setError('Please enter a session ID');
      return;
    }
    
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    const user: User = {
      id: generateId(),
      name: userName.trim(),
      isActive: true,
    };
    
    onJoin(sessionId.trim(), user);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Join Planning Session</h2>
      
      <form onSubmit={handleJoin} className="space-y-4">
        <div>
          <label htmlFor="sessionId" className="block text-sm font-medium text-gray-700 mb-1">
            Session ID
          </label>
          <input
            id="sessionId"
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter session ID"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Joining...' : 'Join Session'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <span className="text-gray-600">Don&apos;t have a session ID?</span>{' '}
        <button
          type="button"
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
          onClick={() => window.location.hash = 'create'}
        >
          Create a new session
        </button>
      </div>
    </div>
  );
};

export default JoinSession;