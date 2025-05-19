import { apiRoutes } from '@/config/apiRoutes';
import { http } from '@/services/core/http';
import { TPartialUpdateProfile, TProfileRes } from '@/types/profile.types';

export const profile = (): Promise<TProfileRes> => {
  return http.get(apiRoutes.profile.profile);
};

export const partialUpdateProfile = (
  params: TPartialUpdateProfile
): Promise<TProfileRes> => {
  return http.patch(apiRoutes.profile.profile, { params });
};

export const updateProfile = (
  params: TPartialUpdateProfile
): Promise<TProfileRes> => {
  return http.put(apiRoutes.profile.profile, { params });
};
