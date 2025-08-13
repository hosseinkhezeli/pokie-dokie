import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createSession,
  getActiveSessions,
  getRecentSessions,
  joinSession,
} from './services';
import {
  TCreateSessionBody,
  TJoinSessionBody,
  TSession,
} from '@/types/session.types';

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

export const useGetRecentSession = () =>
  useQuery({
    queryKey: ['recent-session'],
    queryFn: getRecentSessions,
    staleTime: 10 * 60 * 1000,
    initialData: { data: mockSessions, message: '', status: 200 },
  });

export const useGetActiveSession = () =>
  useQuery({
    queryKey: ['active-session'],
    queryFn: getActiveSessions,
    staleTime: 10 * 60 * 1000,
    initialData: { data: mockSessions, message: '', status: 200 },
  });
export const mockSessions: TSession[] = [
  {
    id: 1,
    name: 'پلنینگ اسپرینت بعدی',
    active: true,
    createdAt: new Date('2025-08-01T10:00:00'),
    updatedAt: new Date('2025-08-05T12:00:00'),
    owner: {
      id: 1,
      fullName: 'حسین رضایی',
      email: 'hossein@example.com',
    },
    participants: [
      { id: 2, fullName: 'مریم احمدی', email: 'maryam@example.com' },
      { id: 3, fullName: 'سارا کریمی', email: 'sara@example.com' },
    ],
  },
  {
    id: 2,
    name: 'جلسه طراحی UI',
    active: false,
    createdAt: new Date('2025-07-20T09:30:00'),
    updatedAt: new Date('2025-07-22T11:15:00'),
    owner: {
      id: 2,
      fullName: 'مریم احمدی',
      email: 'maryam@example.com',
    },
    participants: [
      { id: 1, fullName: 'حسین رضایی', email: 'hossein@example.com' },
      { id: 4, fullName: 'امیر کاظمی', email: 'amir@example.com' },
    ],
  },
  {
    id: 3,
    name: 'برنامه‌ریزی پروژه',
    active: false,
    createdAt: new Date('2025-08-10T14:00:00'),
    updatedAt: new Date('2025-08-12T16:30:00'),
    owner: {
      id: 3,
      fullName: 'سارا کریمی',
      email: 'sara@example.com',
    },
    participants: [
      { id: 1, fullName: 'حسین رضایی', email: 'hossein@example.com' },
      { id: 2, fullName: 'مریم احمدی', email: 'maryam@example.com' },
    ],
  },
];
