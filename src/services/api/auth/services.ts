import { apiRoutes } from '@/config/apiRoutes';
import { http } from '@/services/core/http';
import {
  TLoginParams,
  TRefreshTokenParams,
  TRefreshTokenRes,
  TSignUpParams,
} from '@/types/auth.types';

export const login = (params: TLoginParams): Promise<TLoginParams> => {
  return http.post(apiRoutes.auth.login, { ...params });
};

export const signup = (params: TSignUpParams): Promise<TLoginParams> => {
  return http.post(apiRoutes.auth.signUp, { params });
};

export const refreshToken = (
  params: TRefreshTokenParams
): Promise<TRefreshTokenRes> => {
  return http.post(apiRoutes.auth.signUp, { params });
};
