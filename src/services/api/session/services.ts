import { apiRoutes } from '@/config/apiRoutes';
import { http } from '@/services/core/http';
import { IResponseType } from '@/types/common.types';
import {
  TCreateSessionBody,
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
