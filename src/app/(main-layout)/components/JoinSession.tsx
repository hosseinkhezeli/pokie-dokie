'use client';
import React from 'react';

import Button from '@/components/ui/button/Button';
import { TextInput } from '@/components/ui/input/TextInput';
import { useForm } from 'react-hook-form';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SEARCH_PARAMS_KEYS } from '@/lib/consts';
import { EnterIcon } from '@/lib/icons/Enter';
import { IJoinSessionForm, useSession } from '../hooks/useSession';

export function JoinSession() {
  const { joinSessionError, isPendingJoinSession, handleJoinSession } =
    useSession();
  const { addQueryParam } = useQueryParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinSessionForm>();

  const onSubmit = (data: IJoinSessionForm) => {
    handleJoinSession(data);
  };

  const handleNavigateRoCreate = () => {
    addQueryParam(SEARCH_PARAMS_KEYS.dialogMode, 'create');
  };

  return (
    <div className='animate-slide-in'>
      <h2 className='text-display-sm mb-6 font-black'>کلید داری؟</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='flex flex-col gap-6'
      >
        <TextInput
          label='کلید نشست'
          {...register('sessionId', {
            required: 'کلید نشست اجباریه!',
          })}
          error={errors.sessionId?.message ?? joinSessionError?.message}
          autoComplete='session id'
          aria-invalid={!!errors.sessionId}
          disabled={isPendingJoinSession}
        />

        <Button
          type='submit'
          loading={isPendingJoinSession}
          className='w-max'
          endIcon={<EnterIcon />}
        >
          {isPendingJoinSession ? 'در حال ورود...' : 'ورود'}
        </Button>
      </form>

      <div className='mt-4 text-body-md'>
        <span className=''>کلید نشست رو نداری؟</span>{' '}
        <button
          className='text-tertiary underline underline-tertiary cursor-pointer'
          onClick={handleNavigateRoCreate}
        >
          نشست جدید بساز
        </button>
      </div>
    </div>
  );
}
