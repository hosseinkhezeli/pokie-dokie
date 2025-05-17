import { useStore } from '@/store/useStore';
import { calculateRemainingTime } from '@/utils/methods';
import { useState, useEffect, useCallback } from 'react';

export const useTimer = () => {
  const { session } = useStore();
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Calculate remaining time and update state
  const updateTimer = useCallback(() => {
    if (!session?.timerEndTime) {
      setRemainingTime(0);
      setIsRunning(false);
      return;
    }

    const newRemainingTime = calculateRemainingTime(session.timerEndTime);
    setRemainingTime(newRemainingTime);
    
    // If timer reaches zero, stop it
    if (newRemainingTime <= 0) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }, [session?.timerEndTime]);

  // Set up timer interval
  useEffect(() => {
    updateTimer();

    const intervalId = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [updateTimer]);

  // Format remaining time as mm:ss
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [remainingTime]);

  // Calculate progress percentage
  const progressPercentage = useCallback(() => {
    if (!session?.timerDuration || !isRunning) return 0;
    return Math.min(100, ((session.timerDuration - remainingTime) / session.timerDuration) * 100);
  }, [remainingTime, session?.timerDuration, isRunning]);

  return {
    remainingTime,
    isRunning,
    formattedTime,
    progressPercentage,
  };
};