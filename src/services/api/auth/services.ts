import { apiRoutes } from '@/config/apiRoutes';
import { http } from '@/services/core/http';
import { TLoginParams, TLoginRes, TSignUpParams } from '@/types/auth.types';

export const login = (params: TLoginParams): Promise<TLoginRes> => {
  return http.post(apiRoutes.auth.login, { ...params });
};

export const signup = async (params: TSignUpParams): Promise<TLoginRes> => {
  const response = await http.post<TLoginRes>(apiRoutes.auth.signUp, {
    ...params,
  });
  return response.data;
};
