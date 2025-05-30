'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { useLogin } from '@/services/api/auth/hooks';
import { enqueueSnackbar } from 'notistack';
import { TextInput } from '@/components/ui/input/TextInput';
import { TLoginRes } from '@/types/auth.types';
import { useProfileStore } from '@/store/useProfileStore';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser, setToken } = useProfileStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const { mutate: loginFn, isPending } = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    loginFn(data, {
      onSuccess(response: TLoginRes) {
        setUser({
          email: response.data.email,
          fullname: response.data.fullname,
        });
        setToken(response.data.token);
        enqueueSnackbar({
          variant: 'success',
          message: response.message,
        });
        router.push('/');
      },
      onError(e) {
        enqueueSnackbar({ variant: 'error', message: e.message });
      },
    });
  };

  return (
    <>
      <h1 className='text-headline-lg mb-8'>ورود</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='flex flex-col gap-6'
      >
        <TextInput
          label='ایمیل'
          type='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid Email address',
            },
          })}
          error={errors.email?.message}
          autoComplete='email'
          aria-invalid={!!errors.email}
        />

        <TextInput
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

        <Button
          type='submit'
          disabled={isSubmitting || isPending}
          className='w-max'
        >
          {isSubmitting || isPending ? 'در حال ورود...' : 'ورود'}
        </Button>
      </form>
      <p className='mt-4 text-sm text-gray-600'>
        اکانت ندارید ؟{' '}
        <Link href='/signup' className='text-blue-600 hover:underline'>
          ثبت نام
        </Link>{' '}
        کنید
      </p>
    </>
  );
};

export default Login;
