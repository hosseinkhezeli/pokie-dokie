'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import TextField from '@/components/ui/text-field/TextField';
import Button from '@/components/ui/button/Button';
import { TextInput } from '@/components/ui/input/TextInput';

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const password = watch('password', '');

  const onSubmit = (data: SignUpFormInputs) => {
    console.log('Sign Up data:', data);
    // Add your sign up logic here
  };

  return (
    <>
      <h1 className='text-headline-lg mb-8'>ثبت نام</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col gap-6'>
        <TextInput
          label='نام و نام خانوادگی'
          type='text'
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
          })}
          error={errors.name?.message}
          autoComplete='name'
          aria-invalid={!!errors.name}
        />

        <TextInput
          label='ایمیل'
          type='email'
          {...register('email', {
            required: 'Email is required',
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
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
          error={errors.password?.message}
          autoComplete='new-password'
          aria-invalid={!!errors.password}
        />

        <TextInput
          label='تایید گذرواژه'
          type='password'
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={errors.confirmPassword?.message}
          autoComplete='new-password'
          aria-invalid={!!errors.confirmPassword}
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
    </>
  );
};

export default SignUp;
