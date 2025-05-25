import { useMutation } from '@tanstack/react-query';
import { login, refreshToken, signup } from './services';
import {
  TLoginParams,
  TRefreshTokenParams,
  TSignUpParams,
} from '@/types/auth.types';

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

export const useRefreshToken = () =>
  useMutation({
    mutationKey: ['refresh-token'],
    mutationFn: (params: TRefreshTokenParams) => refreshToken(params),
  });
