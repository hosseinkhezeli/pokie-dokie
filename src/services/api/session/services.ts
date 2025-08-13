import { apiRoutes } from '@/config/apiRoutes';
import { http } from '@/services/core/http';
import { IResponseType } from '@/types/common.types';
import {
  TCreateSessionBody,
  TGetRecentSessionsRes,
  TJoinSessionBody,
  TSession,
} from '@/types/session.types';

export const createSession = async (
  body: TCreateSessionBody
): Promise<IResponseType<TSession>> => {
  const response = await http.post<IResponseType<TSession>>(
    apiRoutes.session.create,
    {
      ...body,
    }
  );
  return response.data;
};

export const joinSession = async (
  body: TJoinSessionBody
): Promise<IResponseType<string>> => {
  const response = await http.post<IResponseType<string>>(
    apiRoutes.session.join,
    {
      ...body,
    }
  );
  return response.data;
};

export const getRecentSessions = async (): Promise<
  IResponseType<TGetRecentSessionsRes>
> => {
  const response = await http.get<IResponseType<TGetRecentSessionsRes>>(
    apiRoutes.session.recent
  );
  return response?.data;
};

export const getActiveSessions = async (): Promise<
  IResponseType<TGetRecentSessionsRes>
> => {
  const response = await http.get<IResponseType<TGetRecentSessionsRes>>(
    apiRoutes.session.active
  );
  return response.data;
};

