'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { TextInput } from '@/components/ui/input/TextInput';
import { useSignUp } from '@/services/api/auth/hooks';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

interface SignUpFormInputs {
  fullname: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  const { mutate: signUpFn } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const onSubmit = (data: SignUpFormInputs) => {
    signUpFn(data, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: 'success',
          message: 'ثبت نام تکمیل شد. حالا با اطلاعاتت وارد شو!',
        });
        router?.push('/login');
      },
      onError: () => {
        enqueueSnackbar({ variant: 'error', message: 'نشد یه بار دیگه بزن' });
      },
    });
  };

  return (
    <section className='animate-slide-in'>
      <h1 className='text-headline-lg mb-8'>ثبت نام</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='flex flex-col gap-6'
      >
        <TextInput
          label='نام و نام خانوادگی'
          type='text'
          {...register('fullname', {
            required: ' نام و نام خانوادگی رو باید بگی!',
            minLength: { value: 2, message: 'Minimum 2 characters' },
          })}
          error={errors.fullname?.message}
          autoComplete='fullname'
          aria-invalid={!!errors.fullname}
        />

        <TextInput
          label='ایمیل'
          type='email'
          {...register('email', {
            required: 'ایمیلت رو باید بدی!',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
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
            required: 'پسورد باید داشته باشی',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
          error={errors.password?.message}
          autoComplete='new-password'
          aria-invalid={!!errors.password}
        />

        <Button type='submit' disabled={isSubmitting} className='w-max'>
          {isSubmitting ? 'ثبت نام...' : 'ثبت نام'}
        </Button>
      </form>
      <p className='mt-4 text-sm text-gray-600'>
        قبلا ثبت نام کردید ؟{' '}
        <Link href='/login' className='text-blue-600 hover:underline'>
          ورود
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
