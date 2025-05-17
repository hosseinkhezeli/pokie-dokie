import { useEffect, useState } from 'react';


import { useStore } from '@/store/useStore';
import { Vote } from '@/types/common.types';
import { websocketService } from '@/utils/websocket';

/**
 * Hook for interacting with WebSocket service
 */
export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
   
    const {setSession,addVote,setVotesRevealed,setTimer,setError,setLoading,session,currentUser}= useStore()


  useEffect(() => {
    if (!session || !currentUser) return;

    // Set WebSocket callbacks
    websocketService.setCallbacks({
      onConnectionChange: (connected) => {
        setIsConnected(connected);
      },
      onSessionUpdate: (updatedSession) => {
        setSession(updatedSession);
      },
      onUserJoin: (user) => {
        if (!session) return;
        
        setSession({
            ...session,
            users: [...session.users, user],
          });
      },
      onUserLeave: (userId) => {
        if (!session) return;
        
        setSession({
            ...session,
            users: session.users.map(u => 
              u.id === userId ? { ...u, isActive: false } : u
            ),
          });
      },
      onVoteCast: (storyId, vote) => {
        addVote( storyId, vote);
      },
      onVotesReveal: (revealed) => {
        setVotesRevealed(revealed);
      },
      onTimerStart: (duration, endTime) => {
        setTimer(duration, endTime );
      },
      onTimerStop: () => {
        setTimer(  session.timerDuration,  null );
      },
      onError: (error) => {
        setError(error);
      },
    });

    // Connect to WebSocket
    const connectToSession = async () => {
      setLoading(true);
      try {
        await websocketService.connect(session.id, currentUser.id);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    connectToSession();

    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
    };
  }, [session?.id, currentUser?.id]);

  // Functions to interact with WebSocket
  const sendVote = (storyId: string, value: number | null) => {
    if (!session || !currentUser) return;
    
    const vote: Vote = {
      userId: currentUser.id,
      value,
      timestamp: Date.now(),
    };
    
    websocketService.send('VOTE_CAST', { storyId, vote });
  };

  const revealVotes = () => {
    if (!session) return;
    websocketService.send('VOTES_REVEAL', true);
  };

  const hideVotes = () => {
    if (!session) return;
    websocketService.send('VOTES_REVEAL', false);
  };

  const startTimer = (duration: number) => {
    if (!session) return;
    const endTime = Date.now() + duration * 1000;
    websocketService.send('TIMER_START', { duration, endTime });
  };

  const stopTimer = () => {
    if (!session) return;
    websocketService.send('TIMER_STOP', undefined);
  };

  const resetVoting = () => {
    if (!session) return;
    websocketService.send('VOTES_REVEAL', false);
  };

  return {
    isConnected,
    sendVote,
    revealVotes,
    hideVotes,
    startTimer,
    stopTimer,
    resetVoting,
  };
};