'use client'
import React, { useState, useEffect } from 'react';
import CreateSession from './CreateSession';
import JoinSession from './JoinSession';
import { GemIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Session, User } from '@/types/common.types';
import { useRouter } from 'next/navigation';

const SessionManager: React.FC = () => {
  const {push:navigateTo}=useRouter()
  const { isLoading, error, setSession, setCurrentUser, setLoading } = useStore();
  const [mode, setMode] = useState<'join' | 'create'>('join');

  // Check hash for mode
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'create' || hash === 'join') {
      setMode(hash as 'create' | 'join');
    }
    
    // Handle hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash === 'create' || newHash === 'join') {
        setMode(newHash as 'create' | 'join');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCreateSession = (session: Session, user: User) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSession(session);
      setCurrentUser(user);
      setLoading(false);
      navigateTo(`session/${session?.id}`)
    }, 1000);
  };

  const handleJoinSession = (sessionId: string, user: User) => {
    setLoading(true);
    
    // Simulate API call to join session
    setTimeout(() => {
      // In a real app, we would fetch the session from the server
      // For now, we'll create a mock session
      const mockSession: Session = {
        id: sessionId,
        name: 'Sample Planning Session',
        createdAt: Date.now() - 3600000, // 1 hour ago
        host: 'host-user-id',
        users: [
          { id: 'host-user-id', name: 'Session Host', isActive: true, isHost: true },
          user,
        ],
        stories: [
          {
            id: 'story-1',
            title: 'Implement user authentication',
            description: 'Add login/register functionality with JWT and secure storage',
            votes: [],
            status: 'voting',
            finalEstimate: null,
          },
          {
            id: 'story-2',
            title: 'Create dashboard UI',
            description: 'Design and implement responsive dashboard with key metrics',
            votes: [],
            status: 'pending',
            finalEstimate: null,
          },
        ],
        currentStoryId: 'story-1',
        timerDuration: 60,
        timerEndTime: null,
        areVotesRevealed: false,
      };
      
      setSession(mockSession);
      setCurrentUser(user);
      setLoading(false);
      navigateTo(`session/${mockSession?.id}`)
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <GemIcon className="h-10 w-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-indigo-800">Poker Planning</h1>
        <p className="text-gray-600 mt-2">Streamline your agile estimation process</p>
      </div>
      
      {error && (
        <div className="w-full max-w-md p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {mode === 'join' ? (
        <JoinSession onJoin={handleJoinSession} isLoading={isLoading} />
      ) : (
        <CreateSession onCreate={handleCreateSession} isLoading={isLoading} />
      )}
    </div>
  );
};

export default SessionManager;