import { useMutation } from '@tanstack/react-query';
import { partialUpdateProfile, profile, updateProfile } from './services';
import { TPartialUpdateProfile } from '@/types/profile.types';

export const useProfile = () =>
  useMutation({
    mutationKey: ['profile'],
    mutationFn: profile,
  });

export const usePartialUpdateProfile = () =>
  useMutation({
    mutationKey: ['partial-update-profile'],
    mutationFn: (params: TPartialUpdateProfile) => partialUpdateProfile(params),
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationKey: ['update-profile'],
    mutationFn: (params: TPartialUpdateProfile) => updateProfile(params),
  });
