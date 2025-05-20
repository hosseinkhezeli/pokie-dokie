'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import TextField from '@/components/ui/text-field/TextField';
import Button from '@/components/ui/button/Button';
import { useLogin } from '@/services/api/auth/hooks';
import { enqueueSnackbar } from 'notistack';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const { mutate: loginFn, isPending } = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    loginFn(
      { password: data.password, username: data.username },
      {
        onSuccess() {
          enqueueSnackbar({
            variant: 'success',
            message: 'Login has been successful',
          });
        },
        onError() {
          enqueueSnackbar({ variant: 'error', message: 'Login failed' });
        },
      }
    );
  };

  return (
    <main className='min-h-screen min-w-screen flex items-center justify-center bg-surface-dim px-4'>
      <div className='max-w-md w-full bg-surface rounded-3xl p-8'>
        <h1 className='text-headline-lg mb-6'>ورود</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label='نام کاربری'
            type='string'
            {...register('username', {
              required: 'Username is required',
              //   pattern: {
              //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              //     message: 'Invalid username address',
              //   },
            })}
            error={errors.username?.message}
            autoComplete='username'
            aria-invalid={!!errors.username}
          />

          <TextField
            label='گذرواژه'
            type='password'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
            error={errors.password?.message}
            autoComplete='current-password'
            aria-invalid={!!errors.password}
          />

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'در حال ورود...' : 'ورود'}
          </Button>
        </form>
        <p className='mt-4 text-sm text-gray-600'>
          اکانت ندارید ؟{' '}
          <Link href='/signup' className='text-blue-600 hover:underline'>
            ثبت نام
          </Link>{' '}
          کنید
        </p>
      </div>
    </main>
  );
};

export default Login;
