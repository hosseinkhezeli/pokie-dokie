import { useMutation } from '@tanstack/react-query';
import { createSession, joinSession } from './services';
import { TCreateSessionBody, TJoinSessionBody } from '@/types/session.types';

export const useCreateSession = () =>
  useMutation({
    mutationKey: ['create-session'],
    mutationFn: (body: TCreateSessionBody) => createSession(body),
  });

export const useJoinSession = () =>
  useMutation({
    mutationKey: ['join-session'],
    mutationFn: (body: TJoinSessionBody) => joinSession(body),
  });
