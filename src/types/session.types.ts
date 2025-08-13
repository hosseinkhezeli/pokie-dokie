import { IUser } from './user.types';

export type TCreateSessionBody = {
  name: string;
};

export type TJoinSessionBody = {
  sessionId: string;
};

export type TSession = {
  id: number;
  name: string;
  active: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  owner: IUser;
  participants: IUser[];
};

export type TGetRecentSessionsRes = TSession[]
