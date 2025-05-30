import { useMutation } from '@tanstack/react-query';
import { login, signup } from './services';
import { TLoginParams, TSignUpParams } from '@/types/auth.types';

export const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (params: TLoginParams) => login(params),
  });

export const useSignUp = () =>
  useMutation({
    mutationKey: ['sign-up'],
    mutationFn: (params: TSignUpParams) => signup(params),
  });
