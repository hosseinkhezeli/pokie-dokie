export interface IResponseType<T> {
  status: number;
  message: string;
  data: T;
}

export interface IIconProps {
  width?: string;
  height?: string;
  fill?: string;
}

export type User = {
  id: string;
  name: string;
  isActive: boolean;
  isHost?: boolean;
};

export type Vote = {
  userId: string;
  value: number | null | '?';
  timestamp: number;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  votes: Vote[];
  status: 'pending' | 'voting' | 'completed';
  finalEstimate: number | null;
};

export type Session = {
  id: string;
  name: string;
  createdAt: number;
  host: string;
  users: User[];
  stories: Story[];
  currentStoryId: string | null;
  timerDuration: number;
  timerEndTime: number | null;
  areVotesRevealed: boolean;
};

export type AppState = {
  session: Session | null;
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
};

export type CardValue = 1 | 2 | 3 | 5 | 8 | 13 | 21 | '?';
export const CARD_VALUES: CardValue[] = [1, 2, 3, 5, 8, 13, 21, '?'];
